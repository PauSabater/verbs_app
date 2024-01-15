'use client'

import { ChangeEvent, Fragment, forwardRef, useImperativeHandle, useRef, useState } from 'react'
import styles from './ExerciseTextInput.module.scss'
import { formatStringForValidation } from '@/utils/utils'
import { strError, strInactive, strSuccess } from '@/utils/constants'
import { getFeedbackSvg } from '@/assets/svg/svgExports'
import { sanitize } from 'isomorphic-dompurify'


interface IExerciseInput {
    answers: string[],
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


    const refInput = useRef<HTMLInputElement>(null)
    const [inputState, setInputState] = useState<TExerciseInputState>(statesInputExercise.empty as TExerciseInputState)

    // Forward function to ref:
    useImperativeHandle(ref, () => ({
        validateInput,
        restartInput,
        focusInput
    }))

    const handleChangeEvent = (e: ChangeEvent<HTMLInputElement>)=> {
        const inputValue = (e.target as HTMLInputElement).value

        if (inputValue !== "" && isFillingState(inputState) === false) {
            // Case an errored input starts being corrected
            if (inputState === statesInputExercise.error) {
                props.actionOnCorrected()
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

        const inputValue = refInput.current.value
        const isInputValid = props.answers.includes(formatStringForValidation(inputValue))

        setInputState(isInputValid ? statesInputExercise.success : statesInputExercise.error)

        return isInputValid
    }

    const restartInput = ()=> {

        if (refInput.current === null) return false

        const inputValue = refInput.current.value
        if (inputValue !== '') {
            refInput.current.value = ''
            setInputState("empty")
        }
    }

    const focusInput = ()=> {
        if (refInput.current === null) return
        refInput.current.focus()
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
                ?   <p
                        className={styles.answerCorrection}
                        dangerouslySetInnerHTML={{__html: sanitize(props.answerHTML.replace('&#42;', ''))}}
                    ></p>
                :   null
            }


        </div>
    )
})