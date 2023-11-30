'use client'

import { ChangeEvent, Fragment, ReactNode, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import styles from './exerciseConjugation.module.scss'
import stylesFeedback from './feedback.module.scss'
import { ExerciseTextInput, statesInputExercise } from '../ExerciseTextInput/ExerciseTextInput'
import { sanitize } from 'isomorphic-dompurify'
import { Button, TColor } from '../Button/Button'
import React from 'react'
import { isSuccess, isError } from '@/utils/constants'
import { getFeedbackSvg } from '@/assets/svg/svgExports'
import { ISelectorDropdownOptions, Selector } from '../Selector/Selector'
import Alert from '../Alert/Alert'
import { IConjugation, IExerciseConjugation, TExerciseModes, TExerciseState, getButtonColor, statesExerciseConjugation } from './ExerciseConjugation.exports'
import { setLocalstorageItem } from '@/utils/utils'


/**
 * Component that renders a conjugaion exercise.
 *
 * @param   {IExerciseConjugation} props component props.
 * @returns {ReactNode}
 */
export function ExerciseConjugation(props: IExerciseConjugation): ReactNode {

    // Conjugations to practise for the current exercise
    const [exerciseConjugations, setExerciseConjugations] = useState<IConjugation[]>([])

    // Count for the number of inputs filled
    const [numFilledInputs, SetNumFilledInputs] = useState(0)

    // Count for the number of inputs errored
    const [numErroredInputs, SetNumErroredInputs] = useState(0)

    // Whether all the inputs of the form are filled
    const [isFormFilled, setIsFormFilled] = useState(false)

    // State for the Tenses change alert
    const [isTenseAlertOpen, setIsTenseAlertOpen] = useState(false)

    const [selectedTense, setSelectedTense] = useState<string>('')

    const [tenseToConfirm, setTenseToConfirm] = useState<string>('')

    const [exerciseState, setExerciseState] = useState<TExerciseState>(statesExerciseConjugation.filling)

    const refsInputs = [useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null)]

    const handleBackgroundClick = ()=> {
        console.log("CLICK BACKGROUND")
    }

    useEffect(() => {
        // setSelectedTense(props.tenseExercise)
        // setIsFormFilled(false)
    },[])

    useEffect(() => {
        const numInputs = props.conjugation?.length

        console.log("HEYYY")
        console.log(props.allTenses)

        if (numInputs === (numFilledInputs)) {
            setExerciseState(statesExerciseConjugation.filled)}
        else if(exerciseState === statesExerciseConjugation.filled) {
            setExerciseState(statesExerciseConjugation.filling)
        }
    },[numFilledInputs])

    useEffect(() => {
        setSelectedTense(props.tenseExercise)
        setIsFormFilled(false)
    },[props.tenseExercise])


    const getConjugationsFromTenseAndMode = (mode: TExerciseModes, tableTense: string)=> {
        props.allTenses[mode].find((tense)=> tense.tense === tableTense)
    }

    /**
     * Validades all inputs according to the correct answer and updates the exercise state depending on the outcome
     */
    const validateInputs = ()=> {
        let numValidatedInputs = 0
        let numErroredInputs = 0
        const numInputs = props.conjugation?.length

        refsInputs.forEach((refInput)=> {
            if (refInput.current === null) return
            // @ts-ignore
            if (refInput.current.validateInput()) {
                numValidatedInputs++
            } else {
                numErroredInputs++
            }
        })

        SetNumErroredInputs(numErroredInputs)
        setExerciseState(numValidatedInputs === numInputs ? statesExerciseConjugation.success : statesExerciseConjugation.error)
    }

    /**
     * Actions when user changes the tense from the selector
     */
    const handleSelectorChange = (selectedItem: string)=> {

        if (exerciseState !== statesExerciseConjugation.success || numFilledInputs > 0) {
            setTenseToConfirm(selectedItem)
            setIsTenseAlertOpen(true)
        } else {
            restartAllInputs()
        }
    }

    /**
     * Restarts all inputs from the exercise to an empty string.
     */
    const restartAllInputs = ()=> {
        refsInputs.forEach((refInput)=> {
            const elInput: HTMLInputElement = refInput.current as unknown as HTMLInputElement
            if (refInput.current === null) return
            // @ts-ignore
            refInput.current.restartInput()
            setExerciseState(statesExerciseConjugation.filling)
        })
    }

    /**
     * Increases the count by one unit for the filled inputs
     */
    const actionOnFilledInput = ()=> {
        SetNumFilledInputs(numFilledInputs + 1)
    }

    /**
     * Increases the count by one unit for the filled inputs
     */
    const actionOnCorrectedInput = ()=> {
        console.log("HEYYY CORRECTING INPUT")
        setExerciseState(statesExerciseConjugation.correcting)
        // SetNumFilledInputs(numFilledInputs + 1)
    }


    /**
     * Decreases the count by one unit for the filled inputs
     */
    const actionOnEmptiedInput = ()=> {
        SetNumFilledInputs(numFilledInputs - 1)
    }

    const getBtnText = (state: string)=> {
        if(isSuccess(state)) return "REPEAT EXERCISE"
        if(isError(state)) return "CHECK AGAIN"
        return "CHECK"
    }

    const getFeedbackText = (state: string)=> {
        if(isSuccess(state)) return "Amazing!"
        if(isError(state)) return "Correct the wrong tenses"
        return ""
    }

    const getOptionsDropdown = (tenses: any)=> {
        let optionsDropdown: ISelectorDropdownOptions[] = []

        for (const tenseGroup of tenses) {
            optionsDropdown.push({
                title: tenseGroup.title,
                options: tenseGroup.tenses
            })
        }

        return optionsDropdown

    }

    /**
     * Function to update the state of the alert for tenses change state when user clicks the negate button.
     */
    const actionsOnAlertNegate = (isCheckboxChecked: boolean): void => {
        if (isCheckboxChecked === true) {
            setLocalstorageItem('showAlertTenseChange', 'false')
        }

        setIsTenseAlertOpen(false)
    }

    /**
     * Function to update the state of the alert for tenses change state when user clicks the confirm button.
     */
    const actionsOnAlertConfirm = (): void => {
        setSelectedTense(tenseToConfirm)
        setIsTenseAlertOpen(false)
        restartAllInputs()
    }

    const ExerciseFeedback = (): React.JSX.Element => {
        return (
            <div className={stylesFeedback.container} data-state={exerciseState}>
                <div className={stylesFeedback.message}>
                    {getFeedbackSvg(exerciseState)}
                    <p>{getFeedbackText(exerciseState)}</p>
                </div>

                <div onClick={()=> validateInputs()}>
                    <Button
                        text={getBtnText(exerciseState)}
                        width='fullWidth'
                        color={getButtonColor(exerciseState)}
                    ></Button>
                </div>
            </div>
        )
    }

    return (
        <div className={styles.exerciseConjugation} data-state={exerciseState}>
            <div className={styles.container}>
                <div className={styles.statement}>
                    <p dangerouslySetInnerHTML={{__html: sanitize(props.texts.statement)}}></p>
                    {/* <span data-text dangerouslySetInnerHTML={{__html: sanitize(props.texts.textTense)}}></span> */}
                    <Selector
                        color={"primary"}
                        selectedOption={selectedTense}
                        options={getOptionsDropdown(props.tensesDropdown)}
                        callbackOnChange={handleSelectorChange}
                    />
                    <span data-text dangerouslySetInnerHTML={{__html: sanitize(props.texts.textVerb)}}></span>
                    <span className={styles.verb} dangerouslySetInnerHTML={{__html: sanitize(props.verb)}}></span>
                </div>
                <div className={styles.rowsContainer}>
                    {
                        props.conjugation !== undefined ? props.conjugation.map((conj, i)=> {
                            return (
                                <div key={i} className={styles.row}>
                                    <p className={styles.person}>{conj.person}</p>
                                    <ExerciseTextInput
                                        ref={refsInputs[i]}
                                        answer={conj.conjugation}
                                        answerHTML={conj.conjugationHTML}
                                        checkResult={false}
                                        actionOnFilled={actionOnFilledInput}
                                        actionOnEmptied={actionOnEmptiedInput}
                                        actionOnCorrected={actionOnCorrectedInput}
                                    />
                                </div>
                            )
                        })
                        : null
                    }
                </div>
            </div>

            <ExerciseFeedback />
            <Alert
                isOpen={isTenseAlertOpen}
                texts={props.texts.alertTenseChange}
                actionsOnAlertConfirm={actionsOnAlertConfirm}
                actionsOnAlertNegate={actionsOnAlertNegate}
            />

        </div>
    )
}