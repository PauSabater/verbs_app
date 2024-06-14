'use client'

import React, { Context, useLayoutEffect } from 'react'
import { Fragment, ReactNode, Reducer, useEffect, useReducer, useRef, createContext, useContext } from 'react'
import { sanitize } from 'isomorphic-dompurify'
import styles from './exerciseConjugation.module.scss'
import stylesFdb from './Components/Feedback/feedback.module.scss'
import ExerciseTextInput from './Components/ExerciseTextInput/ExerciseTextInput'
import { Button } from '../Button/Button'
import { Selector } from '../Selector/Selector'
import Alert from '../Alert/Alert'
import { isSuccess, isError } from '@/utils/constants'
import { SVGCross, SVGExercise, SVGHelp, getFeedbackSvg } from '@/assets/svg/svgExports'
import { IConjugation, IExerciseConjugation, IVerbAllTenses, TExerciseState, getButtonColor, getConjugationFromTense, statesExerciseConjugation } from './ExerciseConjugation.exports'
import { getCorrectAnswers, getOptionsDropdown, getRandomInt, setLocalstorageItem } from '@/utils/utils'
import { IExerciseConjugationState, ITensesState, TExerciseConjugationAction, actions, reducer } from './ExerciseConjugationReducer'
import { ExerciseHelp } from './Components/ExerciseHelp/ExerciseHelp'
import { ExerciseHelpTrigger } from './Components/ExerciseHelpTrigger/ExerciseHelpTrigger'
import { getAllVerbTenses, getApiVerbConjugationsFromTenses, getApiVerbData } from '@/lib/getApiData'
import LoaderSpin from '@/elements/LoaderSpin/LoaderSpin'
import { VerbsList } from './Components/VerbsList/VerbsList'
import { TensesList } from './Components/TensesList/TensesList'
import { ShareExercise } from './Components/ShareExercise/ShareExercise'

export const ExerciseConjugationContext = createContext<IExerciseConjugationState | null>(null)

/**
 * Component that renders a conjugaion exercise.
 *
 * @param   {IExerciseConjugation} props component props.
 * @returns {ReactNode}
 */
export function ExerciseConjugation(props: IExerciseConjugation): ReactNode {
    // console.log("EXERCISE CONJUG!!")
    // console.log(props)

    const [state, dispatch] = useReducer<Reducer<IExerciseConjugationState, TExerciseConjugationAction>>(reducer, {
        currentVerb: props.verb,
        currentTense: props.tenseExercise,
        currentVerbTensesConj: undefined,
        exerciseState: statesExerciseConjugation.filling,
        exerciseConjugations: undefined,
        numFilledInputs: 0,
        numErroredInputs: 0,
        numCorrectedInputs: 0,
        isTenseAlertOpen: false,
        selectedTense: '',
        previousTense: '',
        tenseToConfirm: '',
        triggerInputsAnimation: false,
        currentExerciseNumber: 0,
        isHelpOpen: false,
        successTenses: [],
        verbs: props.verbs ? props.verbs.map((verb)=> {
            return {
                verb: verb,
                isCompleted: false
            }
        }) : [],
        tensesState: props.tenses.map((tense, i)=> {
            return {
                tense: tense,
                tenseState: i === 0 ? 'active' : 'inactive'
            }
        })
    })

    // Tenses already made and succeeded
    const setCompletedVerb = (verb: string) => {
        dispatch({
            type: actions.SET_COMPLETED_VERB,
            payload: verb
        })
    }

    // Tenses already made and succeeded
    const setCurrentVerb = (verb: string) => {
        dispatch({
            type: actions.SET_CURRENT_VERB,
            payload: verb
        })
    }

    // Tenses already made and succeeded
    const setCurrentTense = (tense: string) => {
        dispatch({
            type: actions.SET_CURRENT_TENSE,
            payload: tense
        })
    }

    // Tenses already made and succeeded
    const setTensesState = (tensesState: ITensesState[]) => {
        dispatch({
            type: actions.SET_TENSES_STATE,
            payload: tensesState as any
        })
    }

    // Tenses from the api response to be stored
    const setCurrentVerbTensesConj = (verbTenses: any) => {
        dispatch({
            type: actions.SET_CURRENT_VERB_TENSES_CONJ,
            payload: verbTenses
        })
    }

    // The state of the exercise
    const setExerciseState = (state: TExerciseState) =>
        dispatch({
            type: actions.SET_EXERCISE_STATE,
            payload: state
        })

    // The conjugations for the selected tense
    const setExerciseConjugations = (conjugations: IConjugation[] | undefined) =>
        dispatch({
            type: actions.SET_CONJUGATIONS,
            payload: conjugations
        })

    // Count for the number of inputs filled
    const setNumFilledInputs = (num: number) =>
        dispatch({
            type: actions.SET_NUM_FILLED_INPUTS,
            payload: num
        })

    // Count for the number of inputs errored
    const setNumErroredInputs = (num: number) =>
        dispatch({
            type: actions.SET_NUM_ERRORED_INPUTS,
            payload: num
        })

    // Count for the number of inputs corrected
    const setNumCorrectedInputs = (num: number) =>
        dispatch({
            type: actions.SET_NUM_CORRECTED_INPUTS,
            payload: num
        })

    // State for the Tenses change alert
    const setIsTenseAlertOpen = (isOpen: boolean) =>
        dispatch({
            type: actions.SET_IS_TENSE_ALERT_OPEN,
            payload: isOpen
        })

    // Current tense to use on exercise
    const setSelectedTense = (tense: string) =>
        dispatch({
            type: actions.SET_SELECTED_TENSE,
            payload: tense
        })

    // Previous tense used on exercise
    const setPreviousTense = (tense: string) =>
        dispatch({
            type: actions.SET_PREVIOUS_TENSE,
            payload: tense
        })

    // Tense to confirm through alert
    const setTenseToConfirm = (tense: string) =>
        dispatch({
            type: actions.SET_TENSE_TO_CONFIRM,
            payload: tense
        })

    // Tense to confirm through alert
    const setTriggerInputsAnimation = (shouldAnimate: boolean) =>
        dispatch({
            type: actions.SET_TRIGGER_INPUTS_ANIMATION,
            payload: shouldAnimate
        })

    // Tense to confirm through alert
    const setCurrentExerciseNumber = (num: number) =>
        dispatch({
            type: actions.SET_CURRENT_EXERCISE_NUMBER,
            payload: num
        })

    // Tense to confirm through alert
    const setIsHelpOpen = (isOpen: boolean) => {
        dispatch({
            type: actions.SET_IS_HELP_OPEN,
            payload: isOpen
        })
    }



    // Array with the exercise inputs
    const refsInputs = [useRef<any>(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null)]

    /**
     * Gets needed data and
     */
    useEffect(() => {
        setSelectedTense(props.tenseExercise)
    }, [props.tenseExercise])

    /**
     * Sets exercise on multiple exercises mode
     */
    useEffect(() => {
        if (props.selectedTenses && props.selectedTenses.length > 1) {
            setSelectedTense(props.selectedTenses[0])
        }
    }, [props.selectedTenses])

    /**
     * Actions with change in the exercise verb
     */
    useEffect(() => {
        const tense = state.currentTense

        console.log("HEY IN CURRENT VERB EFFECT")

        // Call API in case the tenses are not passed as property
        if (!props.allTenses) {
            (async () => {
                console.log("HELLO WE ARE IN CALL API")

                const tensesResp: any = (await getApiVerbConjugationsFromTenses(props.verb, props.tenses)) as unknown as any
                const tensesObj: any = tensesResp.props.verbData.verb.data.tenses

                if (tensesObj) setCurrentVerbTensesConj(tensesObj)

                // console.log(tensesObj)

                console.log("HEYYY IT IS SET")
                console.log(state.currentVerbTensesConj)

                if (props.tenseExercise) {
                    setExerciseConjugations(getConjugationFromTense(tensesObj, props.tenseExercise))
                    restartAllInputs()
                    animateReveal()
                }
            })()
        }
    }, [state.currentVerb])

    /**
     * Updates conjugation data when a change on the select component is confirmed, and triggers inputs animation
     */
    // useEffect(() => {

    //     console.log("HEYY LETS CHANGE THE TENSE, IN HOOK")

    //     if (!state.selectedTense) return

    //     console.log("LETS COMPARE")
    //     comparePreviousAndCurrentState()

    //     if (!props.allTenses) {
    //         console.log("lets set conj for "+state.selectedTense)

    //         console.log(state.currentVerbTensesConj)
    //         console.log('---')

    //         console.log(getConjugationFromTense(state.currentVerbTensesConj, state.selectedTense))

    //         console.log('---')

    //         setExerciseConjugations(getConjugationFromTense(state.currentVerbTensesConj, state.selectedTense))
    //         restartAllInputs()
    //         animateReveal()
    //     }

    //     // // case we passed the conjugation as prop
    //     // if (props.allTenses) {
    //     //     console.log(getConjugationFromTense(props.allTenses, state.selectedTense))
    //     //     setExerciseConjugations(getConjugationFromTense(props.allTenses, state.selectedTense))
    //     //     animateReveal()
    //     // }
    // }, [state.selectedTense])

    /**
     * Changes component state depending on number of elements filled
     */
    useEffect(() => {
        const numInputs = state.exerciseConjugations?.length

        if (state.numFilledInputs === 0) {
            setExerciseState(statesExerciseConjugation.empty)
        } else if (numInputs === state.numFilledInputs) {
            setExerciseState(statesExerciseConjugation.filled)
        } else if (state.exerciseState === statesExerciseConjugation.filled) {
            setExerciseState(statesExerciseConjugation.filling)
        }
    }, [state.numFilledInputs])

    /**
     * Changes component state depending on number of elements filled
     */
    useEffect(() => {
        if (state.numFilledInputs > 0 && state.numCorrectedInputs > 0 && state.numErroredInputs > 0 && state.numCorrectedInputs === state.numErroredInputs) {
            setExerciseState(statesExerciseConjugation.filled)
        }
    }, [state.numCorrectedInputs])

    /**
     * Changes current tense to active
     */
    useEffect(() => {
        updateTenseCurrentState('active')
    }, [state.currentExerciseNumber])

    /**
     * Validades all inputs according to the correct answer and updates the exercise state depending on the outcome
     */
    const validateInputs = () => {
        let numValidatedInputs = 0
        let numErroredInputs = 0
        const numInputs = state.exerciseConjugations?.length

        refsInputs.forEach((refInput) => {
            if (refInput.current === null) return
            // @ts-ignore
            if (refInput.current.validateInput()) {
                numValidatedInputs++
            } else {
                numErroredInputs++
            }
        })

        const exerciseNewState: TExerciseState = numErroredInputs === 0
            ? statesExerciseConjugation.success
            : statesExerciseConjugation.error

        setExerciseState(exerciseNewState)
        updateTenseCurrentState(exerciseNewState as any)
        setNumErroredInputs(numErroredInputs)
        setNumCorrectedInputs(0)
    }

    const animateReveal = () => {
        setTriggerInputsAnimation(true)
        setTimeout(() => setTriggerInputsAnimation(false), 100)
        setTimeout(() => focusFirstInput(), 300)
    }

    /**
     * Compares previous tense value state in case a restart is needed
     */
    const comparePreviousAndCurrentState = () => {
        // If a different tense than the previous one is opened, restart all inputs values
        if (props.tenseExercise !== state.previousTense && state.previousTense !== '') {
            restartAllInputs()
        }
        // Save previous state in order to compare
        setPreviousTense(props.tenseExercise)
    }

    /**
     * Actions when user changes the tense from the selector
     */
    const handleSelectorChange = (selectedItem: string, itemGroup: string) => {
        if (state.exerciseState !== statesExerciseConjugation.success && state.numFilledInputs > 0) {
            setTenseToConfirm(selectedItem)
            setIsTenseAlertOpen(true)
        } else {
            setSelectedTense(selectedItem)
            restartAllInputs()
        }
    }

    /**
     * Restarts all inputs from the exercise to an empty string.
     */
    const restartAllInputs = () => {
        // Restart count
        setNumFilledInputs(0)
        setNumErroredInputs(0)
        setNumCorrectedInputs(0)

        refsInputs.forEach((refInput) => {
            const elInput: HTMLInputElement = refInput.current as unknown as HTMLInputElement
            if (refInput.current === null) return
            refInput.current.restartInput()
            setExerciseState(statesExerciseConjugation.filling)
        })
    }

    /**
     * Increases the count by one unit for the filled inputs
     */
    const focusFirstInput = () => {
        if (refsInputs[0].current !== null) {
            refsInputs[0].current.focusInput()
        }
    }

    /**
     * Increases the count by one unit for the filled inputs
     */
    const actionOnFilledInput = () => {
        setNumFilledInputs(state.numFilledInputs + 1)
    }

    /**
     * Increases the count by one unit for the filled inputs
     */
    const actionOnCorrectedInput = () => {
        setNumCorrectedInputs(state.numCorrectedInputs + 1)
    }

    /**
     * Decreases the count by one unit for the filled inputs
     */
    const actionOnEmptiedInput = () => {
        setNumFilledInputs(state.numFilledInputs - 1)
    }

    const getBtnText = (state: string, isFirstBtn: boolean, isLastOfSerial?: boolean) => {
        if (isFirstBtn) {
            if (isSuccess(state)) return props.texts.button.repeatShort
            if (isError(state)) return props.texts.button.checkAgain
            return props.texts.button.check
        } else {
            if (isSuccess(state) && !isLastOfSerial) return props.texts.button.next
            if (isSuccess(state) && isLastOfSerial) return props.texts.button.startAgain
            if (isError(state)) return props.texts.button.checkAgain
            return props.texts.button.check
        }
    }

    const getBtnIcon = (state: string, isFirstBtn: boolean, isLastOfSerial?: boolean) => {
        if (isFirstBtn) {
            if (isSuccess(state)) return 'repeat'
        } else {
            if (isSuccess(state) && !isLastOfSerial) return 'next'
        }
    }

    const getFeedbackText = (state: string) => {
        if (isSuccess(state)) {
            return props.texts.successMessages[getRandomInt(props.texts.successMessages.length)]
        }
        if (isError(state)) return 'Correct the wrong tenses'
        return ''
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
        setSelectedTense(state.tenseToConfirm)
        setIsTenseAlertOpen(false)
        restartAllInputs()
    }

    const updateTenseCurrentState = (newState: 'active' | 'success' | 'error' | 'inactive' | 'active')=> {
        setTensesState(props.tenses.map((tense, i)=> {
            return {
                tense: tense,
                tenseState: state.currentExerciseNumber === i
                    ? newState
                    : state.tensesState[i].tenseState
            }})
        )
    }

    const loadNextExercise = () => {
        // if (!props.selectedTenses) return
        if (props.tenses.length > 1) {
            const nextTense: string = props.tenses[state.currentExerciseNumber + 1]
            setCurrentTense(nextTense)
            setSelectedTense(nextTense)
            setExerciseConjugations(getConjugationFromTense(state.currentVerbTensesConj, nextTense))
        }
        // setSelectedTense(props.selectedTenses[state.currentExerciseNumber + 1])
        setCurrentExerciseNumber(state.currentExerciseNumber + 1)
        restartAllInputs()
    }

    const handleMainBtnClick = () => {
        if (state.exerciseState === 'filled') {
            validateInputs()
        } else if (state.exerciseState === 'success') {
            restartAllInputs()
            animateReveal()
        }
    }

    const ExerciseFeedback = (): React.JSX.Element => {
        return (
            <div data-feedback className={stylesFdb.container} data-state={state.exerciseState}>
                <div className={stylesFdb.message}>
                    {getFeedbackSvg(state.exerciseState)}
                    <p>{getFeedbackText(state.exerciseState)}</p>
                </div>

                <div className={props.selectedTenses && props.selectedTenses.length > 1 && isSuccess(state.exerciseState) ? stylesFdb.containerBtns : ''}>
                    <Button
                        callback={handleMainBtnClick}
                        text={getBtnText(state.exerciseState, true)}
                        width="fullWidth"
                        color={getButtonColor(state.exerciseState, props.selectedTenses !== undefined && props.selectedTenses.length > 1, false)}
                        icon={getBtnIcon(state.exerciseState, true)}
                    ></Button>
                    {props.selectedTenses && props.selectedTenses.length > 1 && isSuccess(state.exerciseState) ? (
                        <Button
                            callback={loadNextExercise}
                            text={getBtnText(state.exerciseState, false, props.selectedTenses.length - 1 === state.currentExerciseNumber)}
                            width="fullWidth"
                            color={getButtonColor(state.exerciseState, false, true)}
                            icon={getBtnIcon(state.exerciseState, false, props.selectedTenses.length - 1 === state.currentExerciseNumber)}
                        ></Button>
                    ) : (
                        <></>
                    )}
                </div>
            </div>
        )
    }

    const HelpContent = (): React.JSX.Element => {
        return <div className={stylesFdb.container} data-state={state.exerciseState}></div>
    }

    const ExerciseStatement = () => {
        return (
            <div className={styles.statement}>
                {
                    props.isLessonExercise
                        ?
                        <div className={styles.titleContainer}>
                            <div className={styles.svgContainer}>
                                <SVGExercise></SVGExercise>
                            </div>
                            <p className={styles.titleLessonExercise}>Exercise</p>
                        </div>
                        : <></>
                }
                <p data-statement-text dangerouslySetInnerHTML={{ __html: sanitize(props.texts.statement) }}></p>
                {(props.selectedTenses && props.selectedTenses.length > 1) || props.isSingleTense === true ? (
                    <Fragment>
                        <span data-text>{props.texts.textTense}</span>
                        <span>{state.currentTense}</span>
                    </Fragment>
                ) : (
                    <Selector color={'primary'} selectedOption={state.selectedTense} options={getOptionsDropdown(props.tensesDropdown)} callbackOnChange={handleSelectorChange} />
                )}
                <span data-text dangerouslySetInnerHTML={{ __html: sanitize(props.texts.textVerb) }}></span>
                <span className={styles.verb} dangerouslySetInnerHTML={{ __html: sanitize(props.verb) }}></span>
            </div>
        )
    }

    const CrossClose = ()=> {
        if (!props.actionOnBtnClose) return <></>

        return (
            <div className={styles.cross} onClick={()=> props.actionOnBtnClose()}>
                <SVGCross color={'var(--c-grey-dark)'}></SVGCross>
            </div>
        )
    }

    return (
        <Fragment>
            <ExerciseConjugationContext.Provider value={state as any}>

                <div className={styles.layoutExercise}>

                    <div className={`${styles.exerciseConjugation} ${props.isEmbedded ? styles.isEmbedded : ''} ${props.isLessonExercise ? styles.isLessonExercise : ''}`} data-exercise data-state={state.exerciseState}>

                        <div className={styles.container}>

                            {
                                state.exerciseConjugations ?
                                    <>
                                        <ExerciseStatement />
                                        <div className={styles.rowsContainer} data-animate={state.triggerInputsAnimation}>
                                            {state.exerciseConjugations !== undefined ? (
                                                state.exerciseConjugations.map((conj, i) => {
                                                    return (
                                                        <div key={i} className={styles.row}>
                                                            <p className={styles.person}>{conj.person === 'er' ? 'er/sie/es' : conj.person}</p>
                                                            <ExerciseTextInput
                                                                ref={refsInputs[i]}
                                                                answers={getCorrectAnswers(conj.conjugation)}
                                                                answerHTML={conj.conjugationHTML}
                                                                checkResult={false}
                                                                actionOnFilled={actionOnFilledInput}
                                                                actionOnEmptied={actionOnEmptiedInput}
                                                                actionOnCorrected={actionOnCorrectedInput}
                                                            />
                                                        </div>
                                                    )
                                                })
                                            ) : (
                                                <></>
                                            )}
                                        </div>
                                    </>

                                : (
                                    <LoaderSpin isLoading={true}></LoaderSpin>
                                )
                            }

                        </div>

                        <ExerciseHelpTrigger
                            exerciseState={state.exerciseState}
                            isOpen={state.isHelpOpen}
                            openTxt={props.texts.help.openTxt}
                            closeTxt={props.texts.help.closeTxt}
                            action={() => setIsHelpOpen(!state.isHelpOpen)}
                        />

                        <ExerciseFeedback />
                        <Alert isOpen={state.isTenseAlertOpen} texts={props.texts.alertTenseChange} actionsOnAlertConfirm={actionsOnAlertConfirm} actionsOnAlertNegate={actionsOnAlertNegate} />


                        {   props.isLessonExercise ? <CrossClose/> : <></> }

                    </div>

                    <div className={styles.sideInfo}>
                        {props.verbs && props.verbs?.length > 1 ? <VerbsList/> : <></>}
                        {props.tenses && props.tenses?.length > 1 ? <TensesList/> : <></>}
                        <ShareExercise/>
                    </div>

                </div>

                <ExerciseHelp
                    text={props.texts.help.text}
                    textBtn={props.texts.help.textBtn}
                    title={props.texts.help.title}
                    callout={props.texts.help.callout}
                    isEmbedded={props.isEmbedded}
                    tense={state.selectedTense}
                    isOpen={state.isHelpOpen}
                    conjugation={state.exerciseConjugations}
                    actionClose={() => setIsHelpOpen(false)}
                />

            </ExerciseConjugationContext.Provider>
        </Fragment>
    )
}
