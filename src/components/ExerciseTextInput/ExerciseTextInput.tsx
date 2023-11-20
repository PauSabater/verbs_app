'use client'

import { ChangeEvent, Fragment, forwardRef, useImperativeHandle, useRef, useState } from 'react'
import styles from './ExerciseTextInput.module.scss'
import { formatStringForValidation } from '@/utils/utils'
import { strError, strInactive, strSuccess } from '@/utils/constants'
import { getFeedbackSvg } from '@/assets/svg/svgExports'
import { sanitize } from 'isomorphic-dompurify'


interface IExerciseInput {
    answer: string,
    answerHTML: string,
    checkResult: boolean,
    increaseFilledInputs: Function,
    decreaseFilledInputs: Function
}

export const ExerciseTextInput = forwardRef((props: IExerciseInput, ref) => {

    const refInput = useRef(null)
    const [isFilled, setIsFilled] = useState(false)
    const [isValidated, setIsValidated] = useState(false)
    const [shouldCountChange, setShouldCountChange] = useState(true)

    const [isInputValid, setIsInputValid] = useState<boolean | null>(null)


    const handleChangeEvent = (e: ChangeEvent<HTMLInputElement>)=> {
        const inputValue = (e.target as HTMLInputElement).value

        if (inputValue !== "" && isFilled === false) {
            props.increaseFilledInputs()
            setIsFilled(true)

        } else if (inputValue === "") {
            props.decreaseFilledInputs()
            setIsFilled(false)
        }
    }

    const validateInput = (): boolean => {
        if (refInput.current === null) return false

        const inputValue = (refInput.current as HTMLInputElement).value
        const isInputValid = formatStringForValidation(inputValue) === props.answer

        setIsInputValid(isInputValid)
        return isInputValid
    }

    // Forward function to ref:
    useImperativeHandle(ref, () => ({
        validateInput
    }))

    const getInputState = (isValid: boolean | null)=> {
        return isValid === null ? strInactive : isValid === true ? strSuccess : strError
    }


    return (
        <div className={styles.container}>
            <input
                ref={refInput}
                type="text"
                className={styles.input}
                data-statsse={`INPUT-${isInputValid}`}
                data-state={getInputState(isInputValid)}
                onChange={(e)=> handleChangeEvent(e)}
            ></input>
            {getFeedbackSvg(getInputState(isInputValid))}
            {isInputValid === false ?
            <p className={styles.answerCorrection} dangerouslySetInnerHTML={{__html: sanitize(props.answer)}}></p>
            : null

            }


        </div>
    )
})