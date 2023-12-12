import { ISelectorDropdownOptions } from "@/components/Selector/Selector"

export interface IPageState {
    isExerciseConjugationOpen: boolean,
    isCheckboxListOpen: boolean,
    exerciseTense: string,
    exerciseTensesCheckboxList: ISelectorDropdownOptions[] | null,
    selectedTensesFromCheckboxList: string[]
}

export type TPageActions =
    | 'OPEN_CONJUGATION_EXERCISE'
    | 'CLOSE_CONJUGATION_EXERCISE'
    | 'OPEN_TENSES_CHECKBOXLIST'
    | 'CLOSE_TENSES_CHECKBOXLIST'
    | 'SET_EXERCISE_TENSE'
    | 'SET_TENSES_CHECKBOXLIST'
    | 'SET_SELECTED_TENSES_FROM_CHECKBOXLIST'

export type TPageAction = {
    type: TPageActions,
    payload?: string | string[] | ISelectorDropdownOptions[]
}

// export type TActionNames =

export const actions: {[key in TPageActions]: TPageActions} = {
    OPEN_CONJUGATION_EXERCISE: 'OPEN_CONJUGATION_EXERCISE',
    CLOSE_CONJUGATION_EXERCISE: 'CLOSE_CONJUGATION_EXERCISE',
    OPEN_TENSES_CHECKBOXLIST: 'OPEN_TENSES_CHECKBOXLIST',
    CLOSE_TENSES_CHECKBOXLIST: 'CLOSE_TENSES_CHECKBOXLIST',
    SET_EXERCISE_TENSE: 'SET_EXERCISE_TENSE',
    SET_TENSES_CHECKBOXLIST: 'SET_TENSES_CHECKBOXLIST',
    SET_SELECTED_TENSES_FROM_CHECKBOXLIST: 'SET_SELECTED_TENSES_FROM_CHECKBOXLIST'
}

// export const initialState: IPageState = {
//     isExerciseConjugationOpen: false,
//     isCheckboxListOpen: false,
//     exerciseTense: ''
// }

export function reducer(state: IPageState, action: TPageAction): IPageState {
    console.log(action.type)

    switch (action.type) {
        case actions.OPEN_CONJUGATION_EXERCISE:
            return {
                ...state,
                isExerciseConjugationOpen: true
            }
        case actions.CLOSE_CONJUGATION_EXERCISE:
            return {
                ...state,
                isExerciseConjugationOpen: false
            }
        case actions.OPEN_TENSES_CHECKBOXLIST:
            return {
                ...state,
                isCheckboxListOpen: true
            }
        case actions.CLOSE_TENSES_CHECKBOXLIST:
            return {
                ...state,
                isCheckboxListOpen: false
            }
        case actions.SET_EXERCISE_TENSE:
            return {
                ...state,
                exerciseTense: action.payload as string || ''
            }
        case actions.SET_TENSES_CHECKBOXLIST:
            return {
                ...state,
                exerciseTensesCheckboxList: action.payload as ISelectorDropdownOptions[] || null
            }

        case actions.SET_SELECTED_TENSES_FROM_CHECKBOXLIST:
            return {
                ...state,
                selectedTensesFromCheckboxList: action.payload as string[] || null
            }

        default: return state

    }
}