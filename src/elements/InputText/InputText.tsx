'use client'

import { ChangeEvent, MouseEventHandler, ReactNode, useLayoutEffect, useState } from 'react'
import styles from './inputText.module.scss'
import { useRef } from 'react'

interface IInputText {
    /**
     * The type of validation for the input
     */
    validationType: 'email' | 'password'
    /**
     * The placeholder for the input
     */
    placeholder?: string
    /**
     * Message to show on error state
     */
    errorText?: string
    /**
     * Text to inform on the requested length
     */
    lengthReqTxt?: string
    /**
     * Text to inform on the requested characters requirement
     */
    charReqTxt?: string
    /**
     * Function to execute on validate
     */
    onValidate?: Function
}

type TInputState = 'empty' | 'filling' | 'error' | 'success'

export function InputText(props: IInputText) {

    const refInput = useRef(null)

    const updateState = () => {}

    const [inputState, setInputState] = useState<TInputState>('empty')

    useLayoutEffect(()=> {
        if (refInput.current !== null)
        (refInput.current as HTMLInputElement).addEventListener('focusout', (event) => {
            validate()
        })
    })

    const validate = ()=> {
        const value = refInput.current ? (refInput.current as HTMLInputElement).value : ''

        if (value === '') {
            setInputState('empty')
            props.onValidate && props.onValidate(props.validationType, '')
            return
        }

        if (props.validationType === 'email') {
            const emailRegex: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
            const isValid = emailRegex.test(value)
            setInputState(isValid ? 'success' : 'error')
            props.onValidate && props.onValidate(props.validationType, isValid ? value : '')
            return
        }
    }

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = refInput.current ? (refInput.current as HTMLInputElement).value : ''

        if (value === '') setInputState('empty')
        else if (inputState === 'error' || inputState === 'success') validate()
    }

    const getFeedback = ()=> {
        if (props.validationType === 'password') {
            return (
                <>
                    <p className={styles.feedback}>{props.lengthReqTxt}</p>
                    <p className={styles.feedback}>{props.charReqTxt}</p>
                </>
            )
        }
    }

    return (
        <>
            <input
                data-state={inputState}
                ref={refInput}
                type={props.validationType}
                className={styles.input}
                onChange={(e)=> handleInputChange(e)}
            ></input>
            {getFeedback()}
        </>
    )
}
