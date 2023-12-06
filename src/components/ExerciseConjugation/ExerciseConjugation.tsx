'use client'

import { ChangeEvent, Fragment, ReactNode, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import styles from './exerciseConjugation.module.scss'
import stylesFeedback from './feedback.module.scss'
import { ExerciseTextInput, statesInputExercise } from './Components/ExerciseTextInput/ExerciseTextInput'
import { sanitize } from 'isomorphic-dompurify'
import { Button, TColor } from '../Button/Button'
import React from 'react'
import { isSuccess, isError } from '@/utils/constants'
import { getFeedbackSvg } from '@/assets/svg/svgExports'
import { ISelectorDropdownOptions, Selector } from '../Selector/Selector'
import Alert from '../Alert/Alert'
import { IConjugation, IExerciseConjugation, TExerciseModes, TExerciseState, getButtonColor, getConjugationsFromTenseAndMode, statesExerciseConjugation } from './ExerciseConjugation.exports'
import { getOptionsDropdown, getRandomInt, setLocalstorageItem } from '@/utils/utils'
import { ExerciseCheckboxList } from '../ExerciseCheckboxList/ExerciseCheckboxList'
// import { ExerciseChoice } from '../ExerciseCheckboxList/ExerciseCheckboxList'


/**
 * Component that renders a conjugaion exercise.
 *
 * @param   {IExerciseConjugation} props component props.
 * @returns {ReactNode}
 */
export function ExerciseConjugation(props: IExerciseConjugation): ReactNode {

    // The state of the exercise
    const [exerciseState, setExerciseState] = useState<TExerciseState>(statesExerciseConjugation.filling)

    // Conjugations to practise for the current exercise
    const [exerciseConjugations, setExerciseConjugations] = useState<IConjugation[] | undefined>([])

    // Conjugations to practise for the current exercise
    const [isSelectMode, setIsSelectMode] = useState<boolean>(false)

    // Count for the number of inputs filled
    const [numFilledInputs, SetNumFilledInputs] = useState(0)

    // Count for the number of inputs errored
    const [numErroredInputs, SetNumErroredInputs] = useState(0)

    // Count for the number of inputs errored
    const [numCorrectedInputs, setNumCorrectedInputs] = useState(0)

    // State for the Tenses change alert
    const [isTenseAlertOpen, setIsTenseAlertOpen] = useState(false)

    // Current tense to use on exercise
    const [selectedTenseAndMode, setSelectedTenseAndMode] = useState<{tense: string, mode: string}>({tense: '', mode: ''})

    // Previous tense used on exercise
    const [previousTenseAndMode, setPreviousTenseAndMode] = useState<{tense: string, mode: string}>({tense: '', mode: ''})

    // Tense to confirm through alert
    const [tenseAndModeToConfirm, setTenseAndModeToConfirm] = useState<{tense: string, mode: string}>({tense: '', mode: ''})

    // Array with the exercise inputs
    const refsInputs = [useRef<any>(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null)]

    // State to trigger animation on inputs
    const [triggerInputsAnimation, setTriggerInputsAnimation] = useState(false)


    /**
     * Gets needed data and
     */
    useEffect(() => {
        setSelectedTenseAndMode({
            tense: props.tenseExercise,
            mode: props.modeExercise
        })
    },[props.tenseExercise])

    /**
     * Updates conjugation data when a change on the select component is confirmed, and triggers inputs animation
     */
    useEffect(() => {

        console.log("HEY! IN exercise")



        // Restart count
        SetNumFilledInputs(0)
        SetNumErroredInputs(0)
        setNumCorrectedInputs(0)

        comparePreviousAndCurrentState()

        setExerciseConjugations(
            getConjugationsFromTenseAndMode(props.allTenses, selectedTenseAndMode.mode.toLowerCase() as TExerciseModes, selectedTenseAndMode.tense)
        )

        setTriggerInputsAnimation(true)
        setTimeout(()=> setTriggerInputsAnimation(false), 100)
        setTimeout(()=> focusFirstInput(), 300)

    },[selectedTenseAndMode.tense, selectedTenseAndMode.mode])

    /**
     * Changes component state depending on number of elements filled
     */
    useEffect(() => {
        const numInputs = exerciseConjugations?.length

        if(numFilledInputs === 0) {
            setExerciseState(statesExerciseConjugation.empty)
        }
        else if (numInputs === (numFilledInputs)) {
            setExerciseState(statesExerciseConjugation.filled)
        }
        else if(exerciseState === statesExerciseConjugation.filled) {
            setExerciseState(statesExerciseConjugation.filling)
        }
    },[numFilledInputs])

    /**
     * Changes component state depending on number of elements filled
     */
    useEffect(() => {
        if(numFilledInputs > 0 && numCorrectedInputs > 0 && numErroredInputs > 0 && numCorrectedInputs === numErroredInputs) {
            setExerciseState(statesExerciseConjugation.filled)
        }
    },[numCorrectedInputs])


    /**
     * Validades all inputs according to the correct answer and updates the exercise state depending on the outcome
     */
    const validateInputs = ()=> {
        let numValidatedInputs = 0
        let numErroredInputs = 0
        const numInputs = exerciseConjugations?.length

        refsInputs.forEach((refInput)=> {
            if (refInput.current === null) return
            // @ts-ignore
            if (refInput.current.validateInput()) {
                numValidatedInputs++
            } else {
                numErroredInputs++
            }
        })

        if (numErroredInputs === 0) {
            setExerciseState(statesExerciseConjugation.success)
        } else {
            setExerciseState(statesExerciseConjugation.error)
        }

        SetNumErroredInputs(numErroredInputs)
        // setExerciseState(numValidatedInputs === numInputs ? statesExerciseConjugation.success : statesExerciseConjugation.error)
        // Restart corrected inputs count
        setNumCorrectedInputs(0)
    }

    /**
     * Compares previous tense value state in case a restart is needed
     */
    const comparePreviousAndCurrentState = ()=> {
        // If a different tense than the previous one is opened, restart all inputs values
        if (props.tenseExercise !== previousTenseAndMode.tense && previousTenseAndMode.tense !== '') {
            restartAllInputs()
        }
        // Save previous state in order to compare
        setPreviousTenseAndMode({
            tense: props.tenseExercise,
            mode: props.modeExercise
        })
    }

    /**
     * Actions when user changes the tense from the selector
     */
    const handleSelectorChange = (selectedItem: string, itemGroup: string)=> {

        if (exerciseState !== statesExerciseConjugation.success && numFilledInputs > 0) {
            setTenseAndModeToConfirm({tense: selectedItem, mode: itemGroup})
            setIsTenseAlertOpen(true)
        } else {
            setSelectedTenseAndMode({tense: selectedItem, mode: itemGroup})
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
            refInput.current.restartInput()
            setExerciseState(statesExerciseConjugation.filling)
        })
    }

    /**
     * Increases the count by one unit for the filled inputs
     */
    const focusFirstInput = ()=> {
        if (refsInputs[0].current !== null) {
            refsInputs[0].current.focusInput()
        }
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
        setNumCorrectedInputs(numCorrectedInputs + 1)
    }

    /**
     * Decreases the count by one unit for the filled inputs
     */
    const actionOnEmptiedInput = ()=> {
        SetNumFilledInputs(numFilledInputs - 1)

    }

    const getBtnText = (state: string)=> {
        if(isSuccess(state)) return props.texts.button.repeat
        if(isError(state)) return "CHECK AGAIN"
        return "CHECK"
    }

    const getFeedbackText = (state: string)=> {
        if(isSuccess(state)) {
            return props.texts.successMessages[getRandomInt(props.texts.successMessages.length)]
        }
        if(isError(state)) return "Correct the wrong tenses"
        return ""
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
        setSelectedTenseAndMode({tense: tenseAndModeToConfirm.tense, mode: tenseAndModeToConfirm.mode})
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

                    <Button
                        callback={validateInputs}
                        text={getBtnText(exerciseState)}
                        width='fullWidth'
                        color={getButtonColor(exerciseState)}
                    ></Button>
            </div>
        )
    }

    const HelpContent = (): React.JSX.Element => {
        return (
            <div className={stylesFeedback.container} data-state={exerciseState}>

            </div>
        )
    }

    const ExerciseStatement = ()=> {
        return (
            <div className={styles.statement}>
                <p dangerouslySetInnerHTML={{__html: sanitize(props.texts.statement)}}></p>
                <Selector
                    color={"primary"}
                    selectedOption={selectedTenseAndMode.tense}
                    options={getOptionsDropdown(props.tensesDropdown)}
                    callbackOnChange={handleSelectorChange}
                />
                <span data-text dangerouslySetInnerHTML={{__html: sanitize(props.texts.textVerb)}}></span>
                <span className={styles.verb} dangerouslySetInnerHTML={{__html: sanitize(props.verb)}}></span>
            </div>
        )
    }


    return (
        <div className={styles.exerciseConjugation} data-exercise data-state={exerciseState}>
            <div className={styles.container}>
                <ExerciseStatement />

                <div className={styles.rowsContainer} data-animate={triggerInputsAnimation}>
                    {
                        isSelectMode === false && exerciseConjugations !== undefined
                            ? exerciseConjugations.map((conj, i)=> {
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
                        : isSelectMode === true
                            ? <></>
                            : <></>
                        // : isSelectMode
                        //     ? <ExerciseCheckboxList></ExerciseChoice>
                        //     : <></>
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