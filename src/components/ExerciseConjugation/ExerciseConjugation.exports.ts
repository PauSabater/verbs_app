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
    modeExercise: string,
    texts: IExerciseConjugationTexts,
    allTenses: IVerbAllTenses
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

export const getConjugationsFromTenseAndMode = (tenses: IVerbAllTenses, mode: TExerciseModes, tableTense: string)=> {
    const modeToFind = mode as TExerciseModes as string

    if(!mode && !tableTense) return
    return tenses[mode].find((tense)=> tense.tense === tableTense)?.conjugations
}