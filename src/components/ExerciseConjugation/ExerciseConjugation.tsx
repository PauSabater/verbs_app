'use client'

import React from 'react'
import { Fragment, ReactNode, Reducer, useEffect, useReducer, useRef, createContext, useContext } from 'react'
import { sanitize } from 'isomorphic-dompurify'
import styles from './exerciseConjugation.module.scss'
import stylesFdb from './Components/Feedback/feedback.module.scss'
import ExerciseTextInput from './Components/ExerciseTextInput/ExerciseTextInput'
import { Selector } from '../Selector/Selector'
import Alert from '../Alert/Alert'
import { isSuccess, isError, allTenses } from '@/utils/constants'
import { SVGAdd, SVGCross, SVGExercise } from '@/assets/svg/svgExports'
import { IConjugation, IExerciseConjugation, IExerciseConjugationTexts, TExerciseState, formatTenseForHeading, getConjugationFromTense, getIgnoreInitialValue, statesExerciseConjugation } from './ExerciseConjugation.exports'
import { getCorrectAnswers, getOptionsDropdown, setLocalstorageItem } from '@/utils/utils'
import { IExerciseConjugationState, ITensesState, IVerbsState, TExerciseConjugationAction, actions, reducer } from './ExerciseConjugationReducer'
import { ExerciseHelpTrigger } from './Components/ExerciseHelpTrigger/ExerciseHelpTrigger'
import { getApiVerbConjugationsFromTenses, getRandomVerb, getUrlRandomVerb } from '@/lib/getApiData'
import LoaderSpin from '@/elements/LoaderSpin/LoaderSpin'
import { VerbsList } from './Components/VerbsList/VerbsList'
import { TensesList } from './Components/TensesList/TensesList'
import { ShareExercise } from './Components/ShareExercise/ShareExercise'
import { ExerciseGenerate } from '../ExerciseGenerate/ExerciseGenerate'
import { ExerciseFeedbackAndBtns } from './Components/Feedback/ExerciseFeedbackAndBtns'
import { VerbInfo } from './Components/VerbInfo/VerbInfo'
import IgnoreSpecialCharacters from './Components/IgnoreSpecialCharacters/IgnoreSpecialCharacters'
import NextPrevious from './Components/NextPrevious/NextPrevious'
import Link from 'next/link'
import InputsSpecialCharacters from './Components/SpecialCharacters/SpecialCharacters'

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
        verbsNotRandom: props.verbs,
        currentVerbTensesConj: undefined,
        nextVerbTensesConj: undefined,
        currentVerbProps: undefined,
        currentVerbIndex: 0,
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
        ignoreSpecialChars: getIgnoreInitialValue(),
        lastFocusedInput: 0,
        randomVerbsResults: [],
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

    const setCurrentVerbIndex = (index: number) => {
        dispatch({
            type: actions.SET_CURRENT_VERB_INDEX,
            payload: index
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

    const setLastInputFocused = (e: MouseEvent, num: number) => {
        dispatch({
            type: actions.SET_LAST_INPUT_FOCUSED,
            payload: num
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
        if (!props.isRandomMode) return

        setAdditionalRandomVerbs()
    }, [props.isRandomMode])


    const setAdditionalRandomVerbs = async ()=> {
        const url = getUrlRandomVerb(props.types, props.levels)

        const res = await fetch(url)
        const verbData = await res.json()

        const results = verbData.results.map((result: any)=> {
            return result._id
        })

        console.log("VERB RESULTS WILL BE")
        console.log(results)

        if (state.randomVerbsResults.length === 0) {
            dispatch({
                type: actions.SET_CURRENT_VERB,
                payload: verbData.results[0]._id
            })
        }

        dispatch({
            type: actions.SET_RANDOM_VERB_RESULTS,
            payload: [...state.randomVerbsResults, ...results]
        })
    }




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
        if (state.currentVerb) {
            fetchExerciseTense()
        }
        setCurrentVerbIndex(getCurrentVerbIndex())

        // retrieve more verbs if we reach the third last one:
        if (props.isRandomMode && getCurrentVerbIndex() === (state.randomVerbsResults.length - 3)) {
            setAdditionalRandomVerbs()
        }
    }, [state.currentVerb])



    const fetchExerciseTense = (tense?: string[])=> {
           if (!props.allTenses) {
            (async () => {

                let tensesObj: any
                let verbPropsObj: any
                // Check if the verb is saved on localstorage:
                const verbLocalStorage: any = window.localStorage.getItem('verb-current')
                const isCurrentVerbInLocalstorage = verbLocalStorage?.verb === state.currentVerb

                if (!props.conjugationCurrentVerb) {

                    // case verb is in localstorage:
                    if (verbLocalStorage && isCurrentVerbInLocalstorage) {
                        const objVerbLocalStorage = JSON.parse(verbLocalStorage)

                        if (objVerbLocalStorage.verb === state.currentVerb) {
                            tensesObj = objVerbLocalStorage.tenses
                        }
                        else {
                            const tensesResp: any = (await getApiVerbConjugationsFromTenses(
                                props.verb,
                                tense || props.tenses
                            )) as unknown as any
                            tensesObj = tensesResp.props.verbData.verb.data.tenses
                        }

                    // case verb is not in localstorage:
                    } else {
                        const tensesResp: any = (await getApiVerbConjugationsFromTenses(
                            state.currentVerb,
                            tense || props.tenses
                        )) as unknown as any
                        console.log("response is ")
                        console.log(tensesResp)
                        tensesObj = tensesResp.props.verbData.verb.data.tenses
                        verbPropsObj = tensesResp.props.verbData.verb.data.properties
                    }

                    if (tensesObj) setCurrentVerbTensesConj(tensesObj)
                }

                setExerciseConjugations(
                    tense
                        ? getConjugationFromTense(tensesObj, tense[0])
                        : props.conjugationCurrentVerb || getConjugationFromTense(tensesObj, props.tenseExercise)
                )
                dispatch({
                    type: actions.SET_CURRENT_VERB_PROPS,
                    payload: verbPropsObj
                })
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
        console.log('HEY FILLED INPUT')
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

    const loadNextRandomVerb = ()=> {
        dispatch({
            type: actions.SET_CURRENT_VERB,
            payload: state.randomVerbsResults[getCurrentVerbIndex() + 1]
        })

        restartTenses()
    }



    const loadNextExercise = () => {

        if (props.isRandomMode && isFinalTense()) loadNextRandomVerb()

        // If there is more than one tense and the current tense index is not the last one
        if (props.tenses.length > 1 && !isFinalTense()) {
            const nextTense: string = props.tenses[getCurrentTenseIndex() + 1]
            dispatch({
                type: actions.SET_CURRENT_TENSE,
                payload: nextTense
            })
            setSelectedTense(nextTense)
            setExerciseConjugations(getConjugationFromTense(state.currentVerbTensesConj, nextTense))
            restartAllInputs()

        // Actions on last tense
        } else {
            console.log('in second condition')
            const isThereNextVerb: boolean = getCurrentVerbIndex() < (props.verbs.length - 1)

            // Load new verb
            if (isThereNextVerb && props.verbs) {
                updateCurrentVerb(props.verbs[getCurrentVerbIndex() + 1])
            }
        }
    }

    const updateCurrentVerb = (verb: string)=> {
        dispatch({
            type: actions.SET_CURRENT_VERB,
            payload: verb
        })
        restartTenses()
    }

    const getCurrentVerbIndex = ()=> {
        if (props.isRandomMode) {
            return state.randomVerbsResults.indexOf(state.currentVerb)
        }
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

    const onIgnoreSpecialCharsChange = (e: Event)=> {
        const elInput = e.target as HTMLInputElement
        if (!elInput) return
        console.log(elInput)
        const isIgnored = elInput.id.includes('yes') ? true : false
        window.localStorage.setItem('ignore-special-chars', isIgnored ? 'true': 'false')

        dispatch({
            type: actions.SET_IGNORE_SPECIAL_CHARS,
            payload: isIgnored
        })
    }

    const onSpecialCharacterClick = (char: string)=> {
        console.log('HEY SPECIAL CHAR CLICK')
        if (!char) return
        const inputFocused = refsInputs[state.lastFocusedInput].current

        if (inputFocused) {
            inputFocused.addSpecialChar(char)
            inputFocused.focusInput()
        }
    }

    const HelpContent = (): React.JSX.Element => {
        return <div className={stylesFdb.container} data-state={state.exerciseState}></div>
    }

    const handleTenseChange = (tense: string) => {
        dispatch({
            type: actions.SET_CURRENT_TENSE,
            payload: tense
        })
        setSelectedTense(tense)
        fetchExerciseTense([tense])
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
                    <span data-text>{props.texts.textTense}</span>

                    {
                        props.tenses.length === 1
                            ? <Selector
                                options={[{
                                    title: "Change exerise tense",
                                    options: allTenses
                                }]}
                                selectedOption={state.currentTense}
                                callbackOnChange={handleTenseChange}
                            />

                        :   <Link href={`/lessons/${state.currentTense}`}>
                                <span>{formatTenseForHeading(state.currentTense)}</span>
                            </Link>

                    }

                <span
                    data-text
                    dangerouslySetInnerHTML={{ __html: sanitize(props.texts.textVerb) }}
                ></span>
                <Link href={`/verbs/${state.currentVerb}`}>
                    <span
                        className={styles.verb}
                        dangerouslySetInnerHTML={{ __html: sanitize(state.currentVerb) }}
                    ></span>
                </Link>
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

    const onIgnoreSpecialCharsClick = (e: Event)=> {
        const elInput = e.target as HTMLInputElement
        if (!elInput) return
        console.log(elInput)
        const isIgnored = elInput.id.includes('yes') ? true : false
        window.localStorage.setItem('ignore-special-chars', isIgnored ? 'true': 'false')

        dispatch({
            type: actions.SET_IGNORE_SPECIAL_CHARS,
            payload: isIgnored
        })
    }

    return (
        <Fragment>
            <ExerciseConjugationContext.Provider value={state as any}>
                <ExerciseConjugationContextTexts.Provider value={props.texts}>

                <div className={styles.layoutExercise}>

                    <div className={`${styles.exerciseConjugation} ${props.isEmbedded ? styles.isEmbedded : ''} ${props.isLessonExercise ? styles.isLessonExercise : ''}`} data-exercise data-state={state.exerciseState}>

                        <div className={styles.container}>

                                <ExerciseStatement />
                                <div className={styles.rowsContainer} data-animate={state.triggerInputsAnimation}>


                                {
                                    state.exerciseConjugations ?
                                            state.exerciseConjugations !== undefined ? (
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
                                                                inputNumber={i}
                                                                ignoreSpecialChars={state.ignoreSpecialChars}
                                                                onInputFocus={setLastInputFocused}
                                                            />
                                                        </div>
                                                    )
                                                })
                                            ) : (
                                                <></>
                                            )

                                    : (
                                    <LoaderSpin isLoading={true}></LoaderSpin>
                                    )
                                }
                                </div>
                            <div>
                                <InputsSpecialCharacters
                                    callbackOnClick={onSpecialCharacterClick}
                                    isActive={state.exerciseState !== 'success'}
                                />
                                <ExerciseHelpTrigger
                                    exerciseState={state.exerciseState}
                                    isOpen={state.isHelpOpen}
                                    openTxt={props.texts.help.openTxt}
                                    closeTxt={props.texts.help.closeTxt}
                                    action={() => setIsHelpOpen(!state.isHelpOpen)}
                                />
                            </div>

                        </div>


                        <ExerciseFeedbackAndBtns
                            callBackBtnMain={handleMainBtnClick}
                            callbackBtnNext={loadNextExercise}
                            tenses={props.tenses}
                            verbs={props.verbs}
                            isRandomMode={props.isRandomMode}
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
                        <VerbInfo />
                        {
                            props.verbs && props.verbs?.length > 1
                                ? <VerbsList/>
                                : <></>
                        }
                        {
                            props.tenses && props.tenses?.length > 1
                                ? <TensesList/>
                                : <></>
                        }
                        <NextPrevious updateVerb={updateCurrentVerb} />
                        {/* <IgnoreSpecialCharacters
                            callbackOnChange={onIgnoreSpecialCharsChange}
                            initialValue={getIgnoreInitialValue()}
                        /> */}
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
