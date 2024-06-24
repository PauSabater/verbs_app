import { IConjugation, TExerciseState } from "./ExerciseConjugation.exports";

export interface ITensesState {
    tense: string,
    tenseState: 'success' | 'error' | 'active' | 'inactive'
}

export interface IExerciseConjugationState {
    currentVerb: string,
    currentTense: string,
    currentVerbTensesConj: any,
    exerciseState: TExerciseState,
    exerciseConjugations: IConjugation[] | undefined,
    numFilledInputs: number,
    numErroredInputs: number,
    numCorrectedInputs: number,
    isTenseAlertOpen: boolean,
    isExerciseSetOpen: boolean,
    selectedTense: string,
    previousTense: string,
    tenseToConfirm: string,
    triggerInputsAnimation: boolean,
    currentExerciseNumber: number,
    isHelpOpen: boolean,
    successTenses: string[],
    verbs: {
        verb: string,
        isCompleted: boolean
    }[],
    tensesState: ITensesState[]
}

export type TExerciseConjugationActions =
    | 'SET_EXERCISE_STATE'
    | 'SET_CONJUGATIONS'
    | 'SET_NUM_FILLED_INPUTS'
    | 'SET_NUM_ERRORED_INPUTS'
    | 'SET_NUM_CORRECTED_INPUTS'
    | 'SET_IS_TENSE_ALERT_OPEN'
    | 'SET_SELECTED_TENSE'
    | 'SET_PREVIOUS_TENSE'
    | 'SET_TENSE_TO_CONFIRM'
    | 'SET_TRIGGER_INPUTS_ANIMATION'
    | 'SET_CURRENT_EXERCISE_NUMBER'
    | 'SET_IS_HELP_OPEN'
    | 'SET_COMPLETED_VERB'
    | 'SET_CURRENT_VERB'
    | 'SET_CURRENT_TENSE'
    | 'SET_CURRENT_VERB_TENSES_CONJ'
    | 'SET_TENSES_STATE'
    | 'SET_IS_EXERCISE_STATE_OPEN'

export type TExerciseConjugationAction = {
    type: TExerciseConjugationActions,
    payload?: TExerciseState | IConjugation[] | number | boolean | string
}

export const actions: {[key in TExerciseConjugationActions]: TExerciseConjugationActions} = {
    SET_EXERCISE_STATE: 'SET_EXERCISE_STATE',
    SET_CONJUGATIONS: 'SET_CONJUGATIONS',
    SET_NUM_FILLED_INPUTS: 'SET_NUM_FILLED_INPUTS',
    SET_NUM_ERRORED_INPUTS: 'SET_NUM_ERRORED_INPUTS',
    SET_NUM_CORRECTED_INPUTS: 'SET_NUM_CORRECTED_INPUTS',
    SET_IS_TENSE_ALERT_OPEN: 'SET_IS_TENSE_ALERT_OPEN',
    SET_SELECTED_TENSE: 'SET_SELECTED_TENSE',
    SET_PREVIOUS_TENSE: 'SET_PREVIOUS_TENSE',
    SET_TENSE_TO_CONFIRM: 'SET_TENSE_TO_CONFIRM',
    SET_TRIGGER_INPUTS_ANIMATION: 'SET_TRIGGER_INPUTS_ANIMATION',
    SET_CURRENT_EXERCISE_NUMBER: 'SET_CURRENT_EXERCISE_NUMBER',
    SET_IS_HELP_OPEN: 'SET_IS_HELP_OPEN',
    SET_COMPLETED_VERB: 'SET_COMPLETED_VERB',
    SET_CURRENT_VERB: 'SET_CURRENT_VERB',
    SET_CURRENT_TENSE: 'SET_CURRENT_TENSE',
    SET_CURRENT_VERB_TENSES_CONJ: 'SET_CURRENT_VERB_TENSES_CONJ',
    SET_TENSES_STATE: 'SET_TENSES_STATE',
    SET_IS_EXERCISE_STATE_OPEN: 'SET_IS_EXERCISE_STATE_OPEN'
}

export function reducer(state: IExerciseConjugationState, action: TExerciseConjugationAction): IExerciseConjugationState {

    switch (action.type) {
        case actions.SET_CURRENT_TENSE:
            return {
                ...state,
                currentTense: action.payload as TExerciseState
            }
        case actions.SET_EXERCISE_STATE:
            return {
                ...state,
                exerciseState: action.payload as TExerciseState
            }
        case actions.SET_CURRENT_VERB_TENSES_CONJ:
            return {
                ...state,
                currentVerbTensesConj: action.payload as TExerciseState
            }
        case actions.SET_TENSES_STATE:
            return {
                ...state,
                tensesState: action.payload as any
            }
        case actions.SET_CONJUGATIONS:
            return {
                ...state,
                exerciseConjugations: action.payload as IConjugation[]
            }

        case actions.SET_NUM_FILLED_INPUTS:
            return {
                ...state,
                numFilledInputs: action.payload as number
            }

        case actions.SET_NUM_ERRORED_INPUTS:
            return {
                ...state,
                numErroredInputs: action.payload as number
            }

        case actions.SET_NUM_CORRECTED_INPUTS:
            return {
                ...state,
                numCorrectedInputs: action.payload as number
            }

        case actions.SET_IS_TENSE_ALERT_OPEN:
            return {
                ...state,
                isTenseAlertOpen: action.payload as boolean
            }

        case actions.SET_SELECTED_TENSE:
            return {
                ...state,
                selectedTense: action.payload as string
            }

        case actions.SET_PREVIOUS_TENSE:
            return {
                ...state,
                previousTense: action.payload as string
            }

        case actions.SET_TENSE_TO_CONFIRM:
            return {
                ...state,
                tenseToConfirm: action.payload as string
            }

        case actions.SET_TRIGGER_INPUTS_ANIMATION:
            return {
                ...state,
                triggerInputsAnimation: action.payload as boolean
            }

        case actions.SET_CURRENT_EXERCISE_NUMBER:
            return {
                ...state,
                currentExerciseNumber: action.payload as number
            }

        case actions.SET_IS_HELP_OPEN:
            return {
                ...state,
                isHelpOpen: action.payload as boolean
            }

        case actions.SET_IS_EXERCISE_STATE_OPEN:
            return {
                ...state,
                isExerciseSetOpen: action.payload as boolean
            }

        default: return state

    }
}