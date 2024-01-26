'use client'

import { MouseEventHandler, ReactNode, useState } from 'react'
import styles from './inputText.module.scss'
import { useRef } from 'react'

interface IInputText {
    type: 'email' | 'password'
    placeholder?: string
    feedbackText?: string
    lengthReqTxt?: string
    charReqTxt?: string
    onValidate?: Function
}

export function InputText(props: IInputText) {
    const [isSelected, setIsSelected] = useState(false)

    const [selectedItems, setSelectedItems] = useState<string[]>([])

    const refInput = useRef(null)

    const updateState = () => {}

    const validate = ()=> {
        const value = refInput.current ? (refInput.current as HTMLInputElement).value : ''
    }

    const getFeedback = ()=> {
        if (props.type === 'password') {
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
            <input ref={refInput} type={props.type} className={styles.input} onChange={validate}></input>
            {getFeedback()}
        </>
    )
}
