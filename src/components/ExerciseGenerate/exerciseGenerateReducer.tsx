
export type TExerciseMode = "search" | "random" | "lists"

export interface IExerciseGenerateState {
    exerciseMode: TExerciseMode,
    selectedTypes: string[],
    selectedTenses: string[],
    selectedLevels: string[],
    selectedVerbs: string[],
}

export type TExerciseGenerateActions =
    | 'SET_EXERCISE_MODE'
    | 'SET_SELECTED_TYPES'
    | 'SET_SELECTED_TENSES'
    | 'SET_SELECTED_LEVELS'
    | 'SET_SELECTED_VERBS'
    | 'SET_SELECTED_VERBS'

export type TExerciseGenerateAction = {
    type: TExerciseGenerateActions,
    payload?: string[] | TExerciseMode
}

export const actions: {[key in TExerciseGenerateActions]: TExerciseGenerateActions} = {
    SET_EXERCISE_MODE: 'SET_EXERCISE_MODE',
    SET_SELECTED_TENSES: 'SET_SELECTED_TENSES',
    SET_SELECTED_TYPES: 'SET_SELECTED_TYPES',
    SET_SELECTED_LEVELS: 'SET_SELECTED_LEVELS',
    SET_SELECTED_VERBS: 'SET_SELECTED_VERBS',
}

export function reducer(state: IExerciseGenerateState, action: TExerciseGenerateAction): IExerciseGenerateState {

    switch (action.type) {
        case actions.SET_EXERCISE_MODE:
            return {
                ...state,
                exerciseMode: action.payload as TExerciseMode
            }

        case actions.SET_SELECTED_TENSES:
            return {
                ...state,
                selectedTenses: action.payload as string[]
            }

        case actions.SET_SELECTED_TYPES:
            return {
                ...state,
                selectedTypes: action.payload as string[]
            }

        case actions.SET_SELECTED_LEVELS:
            return {
                ...state,
                selectedLevels: action.payload as string[]
            }

        case actions.SET_SELECTED_VERBS:
            return {
                ...state,
                selectedVerbs: action.payload as string[]
            }

        case actions.SET_SELECTED_LEVELS:
            return {
                ...state,
                selectedVerbs: action.payload as string[]
            }


        default: return state
    }
}