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
    actionOnFilled: Function,
    actionOnEmptied: Function,
    actionOnCorrected: Function
}

type TExerciseInputState = "empty" | "filling" | "success" | "error"

export const statesInputExercise = {
    empty: "empty" as TExerciseInputState,
    filling: "filling" as TExerciseInputState,
    success: "success" as TExerciseInputState,
    error: "error" as TExerciseInputState
}

export const ExerciseTextInput = forwardRef((props: IExerciseInput, ref) => {

    const isFillingState = (state: string)=> {return inputState === statesInputExercise.filling}
    const isSuccessState = (state: string)=> {return inputState === statesInputExercise.success}
    const isErrorState = (state: string)=> {return inputState === statesInputExercise.error}


    const refInput = useRef(null)
    const [inputState, setInputState] = useState<TExerciseInputState>(statesInputExercise.empty as TExerciseInputState)

    // Forward function to ref:
    useImperativeHandle(ref, () => ({
        validateInput,
        restartInput
    }))

    const handleChangeEvent = (e: ChangeEvent<HTMLInputElement>)=> {
        const inputValue = (e.target as HTMLInputElement).value

        if (inputValue !== "" && isFillingState(inputState) === false) {
            if (inputState === statesInputExercise.error) {
                props.actionOnCorrected
            }
            props.actionOnFilled()
            setInputState(statesInputExercise.filling)

        } else if (inputValue === "") {
            props.actionOnEmptied()
            setInputState(statesInputExercise.empty)
        }
    }

    const validateInput = (): boolean => {
        if (refInput.current === null) return false

        const inputValue = (refInput.current as HTMLInputElement).value
        const isInputValid = formatStringForValidation(inputValue) === props.answer

        setInputState(isInputValid ? statesInputExercise.success : statesInputExercise.error)

        return isInputValid
    }

    const restartInput = ()=> {

        if (refInput.current === null) return false

        const inputValue = (refInput.current as HTMLInputElement).value
        if (inputValue !== '') {
            (refInput.current as HTMLInputElement).value = ''
            setInputState("empty")
        }
    }




    return (
        <div className={styles.container}>
            <input
                ref={refInput}
                type="text"
                className={styles.input}
                data-state={inputState}
                onChange={(e)=> handleChangeEvent(e)}
            ></input>
            {getFeedbackSvg(inputState)}
            {isErrorState(inputState)
                ? <p className={styles.answerCorrection} dangerouslySetInnerHTML={{__html: sanitize(props.answer)}}></p>
                : null
            }


        </div>
    )
})