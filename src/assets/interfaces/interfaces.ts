
export interface IVerbData {
    url: string,
    verb: string,
    data: {
        level: string,
        verbHTML: string,
        stemFormationHTML: string,
        isIrregular: boolean,
        isSeparable: boolean,
        indicative: ITense[],
        conjunctive: ITense[],
        conditionalOrConjunctiveII: ITense[],
        imperative: ITense[],
    }
}

export interface ITense {
    tense: string,
    conjugations: {
        person: string,
        conjugation: string,
        conjugationHTML: string,
    }[];
}