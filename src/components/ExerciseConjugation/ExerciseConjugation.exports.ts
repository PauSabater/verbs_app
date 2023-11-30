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
    conjugation: IConjugation[] | undefined,
    allTenses: IVerbAllTenses
}

export const statesExerciseConjugation = {
    filling: "filling" as TExerciseState,
    filled: "filled" as TExerciseState,
    success: "success" as TExerciseState,
    error: "error" as TExerciseState,
    correcting: "correcting" as TExerciseState,
}

export type TExerciseState = "filling" | "filled" | "success" | "error" | "correcting"

export type TExerciseModes = "indicative" | "conjunctive" | "conditionalOrConjunctiveII" | "imperative"


export const getButtonColor = (state: string)=> {
    switch(state) {
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