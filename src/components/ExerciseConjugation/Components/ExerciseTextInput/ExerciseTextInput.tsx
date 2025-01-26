'use client'

import { ChangeEvent, Fragment, forwardRef, useContext, useEffect, useImperativeHandle, useRef, useState } from 'react'
import styles from './ExerciseTextInput.module.scss'
import { formatStringForValidation, validateConjugationString } from '@/utils/utils'
import { strError, strInactive, strSuccess } from '@/utils/constants'
import { getFeedbackSvg } from '@/assets/svg/svgExports'
import { sanitize } from 'isomorphic-dompurify'
import { ExerciseConjugationContext } from '../../ExerciseConjugation'
import { IExerciseConjugationState } from '../../ExerciseConjugationReducer'

interface IExerciseInput {
    answers: string[]
    answerHTML: string
    checkResult: boolean
    actionOnFilled: Function
    actionOnEmptied: Function
    actionOnCorrected: Function
    displayAnswer: boolean
    inputNumber: number
    ignoreSpecialChars: boolean
    onInputFocus: Function
}

type TExerciseInputState = 'empty' | 'filling' | 'success' | 'error'

export const statesInputExercise = {
    empty: 'empty' as TExerciseInputState,
    filling: 'filling' as TExerciseInputState,
    success: 'success' as TExerciseInputState,
    error: 'error' as TExerciseInputState
}

const ExerciseTextInput = forwardRef((props: IExerciseInput, ref) => {
    const context = useContext(ExerciseConjugationContext) as IExerciseConjugationState

    const isFillingState = (state: string) => {
        return inputState === statesInputExercise.filling
    }
    const isSuccessState = (state: string) => {
        return inputState === statesInputExercise.success
    }
    const isErrorState = (state: string) => {
        return inputState === statesInputExercise.error
    }

    const refInput = useRef<HTMLInputElement>(null)
    const [inputState, setInputState] = useState<TExerciseInputState>(statesInputExercise.empty as TExerciseInputState)
    const [focusTextPosition, setFocusTextPosition] = useState<number>(0)

    // Forward function to ref:
    useImperativeHandle(ref, () => ({
        validateInput,
        restartInput,
        focusInput,
        addSpecialChar
    }))

    const addSpecialChar = (char: string): void => {
        if (refInput.current === null) return

        const inputVal = refInput.current.value || ''
        const newInputVal = inputVal.slice(0, focusTextPosition) + char + inputVal.slice(focusTextPosition)
        refInput.current.value = newInputVal
        setInputState(statesInputExercise.filling)
        updateStatesOnInputChange()
    }

    // useEffect(()=> {

    // }, [context.ex])

    const handleChangeEvent = (e: ChangeEvent<HTMLInputElement>) => {
        const inputValue = (e.target as HTMLInputElement).value

        console.log("posizion is " + e.target.selectionStart)
        setFocusTextPosition(e.target.selectionStart || 0)
        updateStatesOnInputChange()
    }

    const updateStatesOnInputChange = () => {
        const inputValue = (refInput.current as HTMLInputElement).value

        if (inputValue !== '' && isFillingState(inputState) === false) {
            // Case an errored input starts being corrected
            if (inputState === statesInputExercise.error) {
                props.actionOnCorrected()
            }
            props.actionOnFilled()
            setInputState(statesInputExercise.filling)
        } else if (inputValue === '') {
            // if we empty it on error mode we do not change state to prevent error
            if (inputState !== statesInputExercise.error) {
                props.actionOnEmptied()
                setInputState(statesInputExercise.empty)
            }
        }
    }

    const validateInput = (): boolean => {
        if (refInput.current === null) return false

        const inputValue = refInput.current.value
        const formatedStringForValidation = formatStringForValidation(inputValue)
        const isInputValid = props.answers.includes(formatedStringForValidation)

        setInputState(isInputValid ? statesInputExercise.success : statesInputExercise.error)

        // const newVal = validateConjugationString(
        //     formatedStringForValidation,
        //     props.answers[0],
        //     props.ignoreSpecialChars
        // )

        return isInputValid
    }

    const restartInput = () => {
        if (refInput.current === null) return false

        const inputValue = refInput.current.value
        if (inputValue !== '') {
            refInput.current.value = ''
            setInputState('empty')
        }
    }

    const focusInput = () => {
        if (refInput.current === null) return
        const updatedFocusPosition = focusTextPosition + 1
        refInput.current.setSelectionRange(updatedFocusPosition, updatedFocusPosition)
        setFocusTextPosition(updatedFocusPosition)
        refInput.current.focus()
    }

    const handleInputFocus = (e: React.FocusEvent<HTMLInputElement, Element>) => {
        setFocusTextPosition(e.target.selectionStart || 0)
        props.onInputFocus(e, props.inputNumber)
    }

    const updateTextPosition = () => {
        setFocusTextPosition(refInput.current?.selectionStart || 0)
    }

    return (
        <div className={styles.container}>
            <input ref={refInput}
                type="text"
                className={styles.input}
                data-state={inputState}
                onChange={(e) => handleChangeEvent(e)}
                onFocus={(e) => handleInputFocus(e)}
                onClick={() => updateTextPosition()}
            ></input>
            {getFeedbackSvg(inputState)}
            {props.displayAnswer && !isSuccessState(context.exerciseState)
                ? <p className={styles.answerCorrection} dangerouslySetInnerHTML={{ __html: sanitize(props.answerHTML.replace('&#42;', '')) }}></p>
                : <></>
            }
        </div>
    )
})

ExerciseTextInput.displayName = 'ExerciseTextInput'

export default ExerciseTextInput
