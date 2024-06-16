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

// export interface conditionalOrConjunctiveII {

// }

export interface IVerbAllTenses {
    indicative: IVerbTense[],
    conjunctive: IVerbTense[],
    conditionalOrConjunctiveII: IVerbTense[],
    imperative: IVerbTense[]
}

export interface IExerciseConjugation {
    verb: string,
    tensesDropdown?: any,
    tenseExercise: string,
    modeExercise?: string,
    texts: IExerciseConjugationTexts,
    allTenses?: IVerbAllTenses,
    selectedTenses?: string[],
    isSingleTense?: boolean,
    isEmbedded?: boolean,
    verbs?: string[],
    tenses: string[],
    isLessonExercise?: boolean,
    actionOnBtnClose?: any
    conjugationCurrentVerb?: any
    // isIrregular: string
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

    if (!tenses) return

    for (const mode of Object.values(tenses)) {

        if (mode.hasOwnProperty(tableTense)) {
            return mode[tableTense][0].conjugations
        }
    }

    return
}

export const getTenseFromTenseName = (tenses: IVerbAllTenses, tableTense: string, mode?: string): IVerbTense | undefined => {

    // console.log("hey")
    // // console.log(tenses)
    // console.log(tableTense)
    // console.log(mode || '--')

    if (mode === 'subjunctive_II' && tableTense === 'konjunktiv_II') {
        const mode = tenses.conditionalOrConjunctiveII as any
        console.log(mode[tableTense][0])
        return mode[tableTense][0]
    }

    if (mode === 'subjunctive_I' && tableTense === 'konjunktiv_II') {
        const mode = tenses.conjunctive as any
        console.log(mode[tableTense][0])
        return mode[tableTense][0]
    }

    for (const mode of Object.values(tenses)) {

        if (mode.hasOwnProperty(tableTense)) {
            return mode[tableTense][0]
        }
    }

    return
}