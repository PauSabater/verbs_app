
export interface IExerciseConjugationState {
    selectedTenses: string[],
    selectedTypes: string[],
    selectedLevels: string[],
    selectedVerbs: string[]
    updatedSelectedTypes: string[]
}

export type TExerciseGenerateActions =
    | 'SET_SELECTED_TYPES'
    | 'SET_SELECTED_TENSES'
    | 'SET_SELECTED_LEVELS'
    | 'SET_SELECTED_VERBS'
    | 'SET_SELECTED_VERBS'
    | 'SET_UPDATED_SELECTED_TYPES'

export type TExerciseGenerateAction = {
    type: TExerciseGenerateActions,
    payload?: string[]
}

export const actions: {[key in TExerciseGenerateActions]: TExerciseGenerateActions} = {
    SET_SELECTED_TENSES: 'SET_SELECTED_TENSES',
    SET_SELECTED_TYPES: 'SET_SELECTED_TYPES',
    SET_SELECTED_LEVELS: 'SET_SELECTED_LEVELS',
    SET_SELECTED_VERBS: 'SET_SELECTED_VERBS',
    SET_UPDATED_SELECTED_TYPES: 'SET_UPDATED_SELECTED_TYPES'
}

export function reducer(state: IExerciseConjugationState, action: TExerciseGenerateAction): IExerciseConjugationState {

    switch (action.type) {
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

        default: return state
    }
}