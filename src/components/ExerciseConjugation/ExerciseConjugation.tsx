'use client'

import React from 'react'
import { Fragment, ReactNode, Reducer, useEffect, useReducer, useRef, createContext, useContext } from 'react'
import { sanitize } from 'isomorphic-dompurify'
import styles from './exerciseConjugation.module.scss'
import stylesFdb from './Components/Feedback/feedback.module.scss'
import ExerciseTextInput from './Components/ExerciseTextInput/ExerciseTextInput'
import { Selector } from '../Selector/Selector'
import Alert from '../Alert/Alert'
import { isSuccess, isError } from '@/utils/constants'
import { SVGAdd, SVGCross, SVGExercise } from '@/assets/svg/svgExports'
import { IConjugation, IExerciseConjugation, IExerciseConjugationTexts, TExerciseState, getConjugationFromTense, statesExerciseConjugation } from './ExerciseConjugation.exports'
import { getCorrectAnswers, getOptionsDropdown, setLocalstorageItem } from '@/utils/utils'
import { IExerciseConjugationState, ITensesState, IVerbsState, TExerciseConjugationAction, actions, reducer } from './ExerciseConjugationReducer'
import { ExerciseHelpTrigger } from './Components/ExerciseHelpTrigger/ExerciseHelpTrigger'
import { getApiVerbConjugationsFromTenses } from '@/lib/getApiData'
import LoaderSpin from '@/elements/LoaderSpin/LoaderSpin'
import { VerbsList } from './Components/VerbsList/VerbsList'
import { TensesList } from './Components/TensesList/TensesList'
import { ShareExercise } from './Components/ShareExercise/ShareExercise'
import { ExerciseGenerate } from '../ExerciseGenerate/ExerciseGenerate'
import { ExerciseFeedbackAndBtns } from './Components/Feedback/ExerciseFeedbackAndBtns'

export const ExerciseConjugationContext = createContext<IExerciseConjugationState | null>(null)
export const ExerciseConjugationContextTexts = createContext<IExerciseConjugationTexts | null>(null)

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
        currentTenseNumber: 0,
        exerciseState: statesExerciseConjugation.filling,
        exerciseConjugations: undefined,
        numFilledInputs: 0,
        numErroredInputs: 0,
        numCorrectedInputs: 0,
        isTenseAlertOpen: false,
        isExerciseSetOpen: props.isSetNewExerciseOpen || false,
        selectedTense: '',
        previousTense: '',
        tenseToConfirm: '',
        triggerInputsAnimation: false,
        isHelpOpen: false,
        successTenses: [],
        verbsState: props.verbs ? props.verbs.map((verb)=> {
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

    const setVerbsState = (verbsState: IVerbsState[]) => {
        dispatch({
            type: actions.SET_VERBS_STATE,
            payload: verbsState
        })
    }

    // The conjugations for the selected tense
    const setExerciseConjugations = (conjugations: IConjugation[] | undefined) =>
        dispatch({
            type: actions.SET_CONJUGATIONS,
            payload: conjugations
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

    // Open or close Exercise set
    const setIsExerciseSetOpen = (isOpen: boolean) => {
        console.log("HEY CLICK!")

        if (props.callbackOnSetExerciseChange) props.callbackOnSetExerciseChange(isOpen)

        dispatch({
            type: actions.SET_IS_EXERCISE_STATE_OPEN,
            payload: isOpen
        })
    }

    // Array with the exercise inputs
    const refsInputs = [useRef<any>(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null)]

    // update set Exercise component from page:
    useEffect(() => {
        setIsExerciseSetOpen(props.isSetNewExerciseOpen || false)

    },[props.isSetNewExerciseOpen])


    /**
     * Actions on Random mode set
     */
    useEffect(() => {
        console.log("helooo random mode")
    }, [props.isRandomMode])


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
        console.log("IEEEE USE EFFECT FOR CURRENT VERB")
        console.log(state.currentVerb)
        if (!props.isRandomMode) fetchExerciseTense()
    }, [state.currentVerb])



    const fetchExerciseTense = ()=> {
           if (!props.allTenses) {
            (async () => {

                let tensesObj: any
                // Check if the verb is saved on localstorage:
                const verbLocalStorage: any = window.localStorage.getItem('verb-current')
                const isCurrentVerbInLocalstorage = verbLocalStorage?.verb === state.currentVerb

                if (!props.conjugationCurrentVerb) {
                    // case verb is in localstorage:
                    if (verbLocalStorage && isCurrentVerbInLocalstorage) {
                        const objVerbLocalStorage = JSON.parse(verbLocalStorage)

                        if (objVerbLocalStorage.verb === state.currentVerb) {
                            tensesObj = objVerbLocalStorage.tenses
                            console.log(tensesObj)
                        }
                        else {
                            const tensesResp: any = (await getApiVerbConjugationsFromTenses(props.verb, props.tenses)) as unknown as any
                            tensesObj = tensesResp.props.verbData.verb.data.tenses
                        }
                    // case verb is not in localstorage:
                    } else {
                        console.log('not un localstorage')
                        console.log('we will fetch')
                        console.log(state.currentVerb)
                        const tensesResp: any = (await getApiVerbConjugationsFromTenses(state.currentVerb, props.tenses)) as unknown as any
                        tensesObj = tensesResp.props.verbData.verb.data.tenses
                    }

                    if (tensesObj) setCurrentVerbTensesConj(tensesObj)
                }

                setExerciseConjugations(
                    props.conjugationCurrentVerb || getConjugationFromTense(tensesObj, props.tenseExercise)
                )
                restartAllInputs()
                animateReveal()

            })()
        }

        setTimeout(() => focusFirstInput(), 300)
    }

    /**
     * Changes component state depending on number of elements filled
     */
    useEffect(() => {
        const numInputs = state.exerciseConjugations?.length

        if (state.numFilledInputs === 0) {
            dispatch({
                type: actions.SET_EXERCISE_STATE,
                payload: statesExerciseConjugation.empty
            })
        } else if (numInputs === state.numFilledInputs) {
            dispatch({
                type: actions.SET_EXERCISE_STATE,
                payload: statesExerciseConjugation.filled
            })
        } else if (state.exerciseState === statesExerciseConjugation.filled) {
            dispatch({
                type: actions.SET_EXERCISE_STATE,
                payload: statesExerciseConjugation.filling
            })
        }
    }, [state.numFilledInputs])

    /**
     * Changes component state depending on number of elements filled
     */
    useEffect(() => {
        if (state.numFilledInputs > 0 && state.numCorrectedInputs > 0 && state.numErroredInputs > 0 && state.numCorrectedInputs === state.numErroredInputs) {
            dispatch({
                type: actions.SET_EXERCISE_STATE,
                payload: statesExerciseConjugation.filled
            })
        }
    }, [state.numCorrectedInputs])

    /**
     * Changes current tense to active
     */
    useEffect(() => {
        setCurrentTenseState('active')
    }, [state.currentTense])

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

        dispatch({
            type: actions.SET_EXERCISE_STATE,
            payload: exerciseNewState
        })
        // dispatch({
        //     type: actions.SET_NUM_FILLED_INPUTS,
        //     payload: state.numFilledInputs - numErroredInputs
        // })
        setCurrentTenseState(exerciseNewState as any)
        if (isFinalTense() && numErroredInputs === 0) {
            setCurrentVerbState(true)
        }
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
        dispatch({
            type: actions.SET_NUM_FILLED_INPUTS,
            payload: 0
        })
        setNumErroredInputs(0)
        setNumCorrectedInputs(0)
        setIsHelpOpen(false)

        refsInputs.forEach((refInput) => {
            if (refInput.current === null) return
            refInput.current.restartInput()
            dispatch({
                type: actions.SET_EXERCISE_STATE,
                payload: statesExerciseConjugation.filling
            })
        })

        focusFirstInput()
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
        const areAllFilled = state.exerciseConjugations?.length === state.numFilledInputs
        if (areAllFilled) return
        dispatch({
            type: actions.SET_NUM_FILLED_INPUTS,
            payload: state.numFilledInputs + 1
        })
    }

    /**
     * Increases the count by one unit for the filled inputs
     */
    const actionOnCorrectedInput = () => {
        // setNumeInputs(state.numCorrectedInputs + 1)
        setNumCorrectedInputs(state.numCorrectedInputs + 1)
    }

    /**
     * Decreases the count by one unit for the filled inputs
     */
    const actionOnEmptiedInput = () => {
        dispatch({
            type: actions.SET_NUM_FILLED_INPUTS,
            payload: state.numFilledInputs - 1
        })
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

    const setCurrentTenseState = (newState: 'active' | 'success' | 'error' | 'inactive' | 'active')=> {
        setTensesState(props.tenses.map((tense, i)=> {
            return {
                tense: tense,
                tenseState: state.currentTense === tense
                    ? newState
                    : state.tensesState[i].tenseState
            }})
        )
    }

    const setCurrentVerbState = (isCompleted: boolean)=> {
        setVerbsState(props.verbs.map((verb, i)=> {
            return {
                verb: verb,
                isCompleted: verb === state.currentVerb
                    ? isCompleted
                    : state.verbsState[i].isCompleted
            }})
        )
    }


    // const setCurrentVerbState = (newState: 'active' | 'success' | 'error' | 'inactive' | 'active')=> {
    //     setTensesState(props.tenses.map((tense, i)=> {
    //         return {
    //             tense: tense,
    //             tenseState: state.currentExerciseNumber === i
    //                 ? newState
    //                 : state.tensesState[i].tenseState
    //         }})
    //     )
    // }


    const loadNextExercise = () => {

        console.log('click next')

        const currentTenseIndex = props.tenses.indexOf(state.currentTense)
        console.log('HEY INDEX IS ' +currentTenseIndex)
        console.log('from length ' +props.tenses.length)

        // If there is more than one tense and the current tense index is not the last one
        if (props.tenses.length > 1 && !isFinalTense()) {
            console.log('in first condition')
            const nextTense: string = props.tenses[getCurrentTenseIndex() + 1]
            dispatch({
                type: actions.SET_CURRENT_TENSE,
                payload: nextTense
            })
            setSelectedTense(nextTense)
            setExerciseConjugations(getConjugationFromTense(state.currentVerbTensesConj, nextTense))
            // setCurrentExerciseNumber(state.currentExerciseNumber + 1) // ???needed?
            restartAllInputs()

        // Actions on last tense
        } else {
            console.log('in second condition')
            const isThereNextVerb: boolean = getCurrentVerbIndex() < (props.verbs.length - 1)

            console.log('heyy in load next')
            console.log(isThereNextVerb)

            console.log('index is: '+getCurrentVerbIndex())
            console.log('then:')
            console.log(getCurrentVerbIndex() + 1)
            console.log(props.verbs[getCurrentVerbIndex() + 1])
            console.log('-----------–')

            // Load new verb
            if (isThereNextVerb && props.verbs) {
                dispatch({
                    type: actions.SET_CURRENT_VERB,
                    payload: props.verbs[getCurrentVerbIndex() + 1]
                })
                restartTenses()
            }
        }
        // setSelectedTense(props.selectedTenses[state.currentExerciseNumber + 1])
    }

    const getCurrentVerbIndex = ()=> {
        return props.verbs.indexOf(state.currentVerb)
    }

    const getCurrentTenseIndex = ()=> {
        return props.tenses.indexOf(state.currentTense)
    }

    const isFinalVerb = ()=> {
        if (!props.verb) return true
        return (props.verbs as string[]).indexOf(state.currentTense) === ((props.verbs as string[]).length - 1)

    }

    const isFinalTense = ()=> {
        return props.tenses.indexOf(state.currentTense) === (props.tenses.length - 1)
    }

    const restartTenses = ()=> {
        dispatch({
            type: actions.SET_CURRENT_TENSE,
            payload: props.tenses[0]
        })
        setSelectedTense(props.tenses[0])
        // setExerciseConjugations(getConjugationFromTense(state.currentVerbTensesConj, nextTense))

        setTensesState(
            props.tenses.map((tense, i)=> {
            return {
                tense: tense,
                tenseState: i === 0 ? 'active' : 'inactive'
            }
         }))
    }

    const goBackOneStep = ()=> {
        const nextTense: string = props.tenses[getCurrentTenseIndex()]
        dispatch({
            type: actions.SET_CURRENT_TENSE,
            payload: nextTense
        })
        setCurrentVerbState(false)
        setSelectedTense(nextTense)
        setExerciseConjugations(getConjugationFromTense(state.currentVerbTensesConj, nextTense))
        setCurrentTenseState('active')
    }

    const handleMainBtnClick = () => {
        console.log('HANDLE MAIN BUTTON')

        if (state.exerciseState === 'filled') {
            validateInputs()
        // In this case the button allows repeating the exercise
        } else if (state.exerciseState === 'success') {
            goBackOneStep()
            restartAllInputs()
            animateReveal()
        }
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
                <span
                    data-text
                    dangerouslySetInnerHTML={{ __html: sanitize(props.texts.textVerb) }}
                ></span>
                <span
                    className={styles.verb}
                    dangerouslySetInnerHTML={{ __html: sanitize(state.currentVerb) }}
                ></span>
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
                <ExerciseConjugationContextTexts.Provider value={props.texts}>

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
                                                                displayAnswer={state.isHelpOpen}
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

                        <ExerciseFeedbackAndBtns
                            callBackBtnMain={handleMainBtnClick}
                            callbackBtnNext={loadNextExercise}
                            tenses={props.tenses}
                            verbs={props.verbs}
                        />
                        <Alert
                            isOpen={state.isTenseAlertOpen}
                            texts={props.texts.alertTenseChange}
                            actionsOnAlertConfirm={actionsOnAlertConfirm} actionsOnAlertNegate={actionsOnAlertNegate} />

                        {   props.isLessonExercise ? <CrossClose/> : <></> }

                    </div>

                    <div className={styles.sideInfo}>
                        <button
                            className={styles.newExerciseBtn}
                            onClick={()=> setIsExerciseSetOpen(!state.isExerciseSetOpen)}
                        >
                            New exercise
                            <SVGAdd />
                        </button>
                        {props.verbs && props.verbs?.length > 1 ? <VerbsList/> : <></>}
                        {props.tenses && props.tenses?.length > 1 ? <TensesList/> : <></>}

                        <ShareExercise/>
                    </div>

                    <div data-open={state.isExerciseSetOpen} className={styles.containerSetNewExercise}>
                        <div className={styles.containerAlign}>
                            <p>Select verb(s) and tenses for your new exercise:</p>
                            <ExerciseGenerate
                                isSearchBarOption={false}
                                component='exercise-page'
                            />
                        </div>
                    </div>
                </div>

                {/* <ExerciseHelp
                    text={props.texts.help.text}
                    textBtn={props.texts.help.textBtn}
                    title={props.texts.help.title}
                    callout={props.texts.help.callout}
                    isEmbedded={props.isEmbedded}
                    tense={state.selectedTense}
                    isOpen={state.isHelpOpen}
                    conjugation={state.exerciseConjugations}
                    actionClose={() => setIsHelpOpen(false)}
                /> */}

            </ExerciseConjugationContextTexts.Provider>
            </ExerciseConjugationContext.Provider>
        </Fragment>
    )
}
