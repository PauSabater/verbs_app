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
    help: {
        openTxt: string,
        closeTxt: string,
        text: string,
        textBtn: string,
        callout: string,
        title: string,
    },
    successMessages: string[],
    button: {
        repeat: string,
        repeatShort: string,
        check: string,
        checkAgain: string,
        next: string,
        startAgain: string
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
    allTenses?: IVerbAllTenses,
    selectedTenses?: string[],
    isSingleTense?: boolean
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


export const getButtonColor = (state: string, isLastExercise: boolean, isSecondBtn: boolean)=> {
    switch(state) {
        case statesExerciseConjugation.empty:
            return "inactive"
        case statesExerciseConjugation.filling:
            return "inactive"
        case statesExerciseConjugation.filled:
            return "primary"
        case statesExerciseConjugation.success:
            if (isLastExercise && isSecondBtn === false) return "primaryReverse"
            else return "success"
        case statesExerciseConjugation.error:
            return "inactive"
        case statesExerciseConjugation.correcting:
            return "error"
    }
}

export const getConjugationFromTense = (tenses: IVerbAllTenses, tableTense: string): IConjugation[] | undefined => {
    const tenseToFind = tableTense === 'präsens' ? 'Präsens' : tableTense

    for (const mode of Object.values(tenses)) {
        for (const tense of Object.values(mode)) {
            if ((tense as IVerbTense).tense === tenseToFind) return (tense as IVerbTense).conjugations
        }
    }

    return
}

export const getTenseFromTenseName = (tenses: IVerbAllTenses, tableTense: string): IVerbTense | undefined => {

    for (const mode of Object.values(tenses)) {
        for (const tense of Object.values(mode)) {
            if ((tense as IVerbTense).tense === tableTense) return tense as IVerbTense
        }
    }

    return
}