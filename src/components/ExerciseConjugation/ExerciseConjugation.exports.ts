import { isError, isSuccess } from "@/utils/constants"

export interface IConjugation {
    person: string,
    conjugation: string,
    conjugationHTML: string
}

export interface ITensesDropdown {
    level: string,
    title: string,
    tenses: string[],
}

export interface IExerciseConjugationTexts {
    statement: string,
    textTense: string,
    textVerb: string,
    alertTenseChange: {
        text: string,
        textConfirm: string,
        textNegate: string
    },
    successMessages: string[],
    button: {
        repeat: string,
        check: string,
        checkAgain: string
    }
}

export interface IVerbTense {
    tense: string,
    conjugations: IConjugation[]
}

export interface IVerbAllTenses {
    indicative: IVerbTense[],
    conjunctive: IVerbTense[],
    conditionalOrConjunctiveII: IVerbTense[],
    imperative: IVerbTense[]
}

export interface IExerciseConjugation {
    verb: string,
    tensesDropdown: any,
    tenseExercise: string,
    modeExercise?: string,
    texts: IExerciseConjugationTexts,
    allTenses: IVerbAllTenses,
    selectedTenses?: string[]
}

export const statesExerciseConjugation = {
    empty: "empty" as TExerciseState,
    filling: "filling" as TExerciseState,
    filled: "filled" as TExerciseState,
    success: "success" as TExerciseState,
    error: "error" as TExerciseState,
    correcting: "correcting" as TExerciseState,
}

export type TExerciseState = "empty" | "filling" | "filled" | "success" | "error" | "correcting"

export type TExerciseModes = "indicative" | "conjunctive" | "conditionalOrConjunctiveII" | "imperative"


export const getButtonColor = (state: string)=> {
    switch(state) {
        case statesExerciseConjugation.empty:
            return "inactive"
        case statesExerciseConjugation.filling:
            return "inactive"
        case statesExerciseConjugation.filled:
            return "primary"
        case statesExerciseConjugation.success:
            return "success"
        case statesExerciseConjugation.error:
            return "inactive"
        case statesExerciseConjugation.correcting:
            return "error"
    }
}

export const getConjugationsFromTenseAndMode = (tenses: IVerbAllTenses, tableTense: string): IConjugation[] | undefined => {

    Object.values(tenses).forEach(mode => {
        Object.values(mode).forEach(tense => {
            const verbTense: IVerbTense = tense as IVerbTense

            if (verbTense.tense == tableTense) {
                console.log("WE HAAAAAAAAAAAVE, RETURN")
                console.log(verbTense.conjugations)
                return verbTense.conjugations
            }
        })
    })

    return

    // return tenses['indicative'].find((tense)=> tense.tense === tableTense)?.conjugations

    // for (const mode in Object.entries(tenses)) {
    //     mode.find((tense)=> tense.tense === tableTense)


    // }

    // if(!mode && !tableTense) return
    // return tenses[mode].find((tense)=> tense.tense === tableTense)?.conjugations
}