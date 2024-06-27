import { ISelectorDropdownOptions } from "@/components/Selector/Selector";

export const formatStringForValidation = (str: string)=> {
    return str.toLowerCase().trim().replace(/\s+/g, ' ')
}

export const replaceSpacesForURL = (str: string)=> {
    return str.replaceAll(' ', '-')
}

export const replaceUmlautsURL = (str: string) => {
    return str.replaceAll('ä', 'a').replaceAll('ö', 'a')
}

export function disableScroll() {
    (document.body.parentElement as HTMLElement).style.overflowY = 'hidden';
  }
export function enableScroll() {
    (document.body.parentElement as HTMLElement).style.overflowY = 'visible';
}

export function setLocalstorageItem(key: string, item: string | string[]) {
    localStorage.setItem(key, JSON.stringify(item))
}

export function checkLocalstorageItem(key: string, item: string) {
    return localStorage.getItem(key)?.includes(item)
}

export function getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
}

export function cleanConjugation(conj: string) {
    const regex = /[()⁷&#42;]/g
    return conj.replace(regex, '')
}

export const getOptionsDropdown = (tenses: any)=> {
    let optionsDropdown: ISelectorDropdownOptions[] = []

    for (const tenseGroup of tenses) {
        optionsDropdown.push({
            title: tenseGroup.title,
            options: tenseGroup.tenses
        })
    }

    return optionsDropdown
}

export const replaceWithCurrentUrl = (text: string)=> {

    return text.replaceAll('replace-url', 'http://localhost:3000/')

    // return text.replace(/$link$.*$link$/, 'helooooo')
}

export function speak(utterance: SpeechSynthesisUtterance, text: string) {
    if (!utterance) return
    utterance.text = text
    window.speechSynthesis.cancel()
    window.speechSynthesis.speak(utterance)
}

export function getUtteraceInstance(): Promise<SpeechSynthesisUtterance> {
    return new Promise(
        function (resolve, reject) {
            let synth = window.speechSynthesis;
            let id: any

            id = setInterval(() => {
                const voices = synth.getVoices()

                if (voices.length !== 0) {
                    let voice
                    let germanVoices = voices.filter(function (voice) {
                        return voice.name === 'Google Deutsch'
                    })

                    if (germanVoices.length > 0) {
                        voice = germanVoices[0]
                    } else {
                        germanVoices = voices.filter(function (voice) {
                            return voice.lang === 'de-DE' && voice.name === "Reed (German (Germany))"
                        })

                        voice = germanVoices[0] || voices.filter(function (voice) {
                            return voice.lang === 'de-DE'
                        })[0]
                    }

                    const utterance = new SpeechSynthesisUtterance()
                    utterance.voice = voice;
                    utterance.pitch = 1;
                    utterance.rate = voice.name.includes("Google") ? 0.85 : 0.7;
                    utterance.volume = 1;

                    resolve(utterance);
                    clearInterval(id);
                }
            }, 20);
        }
    )
}

export const verbsTenseException = ['sein', 'haben']

export function removeTags(text: string) {
    if (!text) return ''
    return text.replaceAll('</a>', '').replaceAll('</p>', '').replaceAll('</b>', '').replaceAll('-', '').replaceAll(/<.*>/g, '')
}

export const getAnchorLinkStr = (str: string | undefined)=> {
    return str ? `#${str.toLowerCase().replaceAll(' ', '-')}` : ''
}

export const getAnchorId = (str: string | undefined)=> {
    return str ? `${str.toLowerCase().replaceAll(' ', '-')}` : ''
}

export const getCorrectAnswers = (answerHTML: string): string[] => {
    if (answerHTML.includes('(')) {
        const answers: string[] = []
        const answerHTMLclean = answerHTML.replace('&#42;', '')
        answers.push(answerHTMLclean.replace('(e)', ''))
        answers.push(answerHTMLclean.replace('(', '').replace(')', ''))

        return answers

    } else return [answerHTML]
}


export const extractVarTextGetString = (text: string) => {
    const regex = /(?<=\$)(.*?)(?=\$)/
    let strMatched = regex.exec(text)
    if (!strMatched) return

    return strMatched[1].replaceAll('_', '')
}

export const variablesTextGetProp = (textClean: string) => {
    const regexProps = /(?<=\[)(.*?)(?=\])/
    let strProp
    let strPropMatched = regexProps.exec(textClean)
    if (!strPropMatched) return
    return strPropMatched[1]
}

export const variablesTextGetValue = (textClean: string, strProp: string | undefined) => {
    return textClean.replace(/[\[\]]/g, '').replace(strProp || '', '')
}

export const getTenseNames = (tense: string, lang: string)=> {
    // const tenses = {
    //     konj_perfek
    // }
    // if (tense === 'konj_perfek') return 'Imperfect'
    // if (tense === 'konjunktiv_I') return 'Present'
    // if (tense === 'konj_perfek') return 'Imperfect'
    // if (tense === 'konjunktiv_I') return 'Present'

}

    // "Präsens",
    // "Präteritum",
    // "Perfekt",
    // "Plusquamperfekt",
    // "Futur I",
    // "Futur II",
    // "Imperativ",
    // "Konj II Präteritum",
    // "Konj II Plusquam.",
    // "Konj II Futur I",
    // "Konj II Futur II",
    // "Konj I Präsens",
    // "Konj I Futur I",
    // "Konj I Futur II",
    // "Konj I Perfekt",
    // "Partizip II"

export const replaceTenseFromStringForUrl = (tense: string)=> {
    const tenseToCheck = tense.toLowerCase()

    switch (tenseToCheck) {
        case 'futur I':
            return 'futur_I'
        case 'Futur II':
            return 'futur_II'
        default:
            return tenseToCheck
    }
}

export const replaceTensesArrayForUrl = (tenses: string[]): string[] => {
    const newArray: string[] = []

    tenses.forEach((tense, i)=> {
        newArray.push(replaceTenseFromStringForUrl(tense))
    })

    return newArray
}

export const getComaSeparatedStringFromArray = (array: string[])=> {
    let stringWithComas: string = ''
    array.forEach((value, i)=> {
        if (i === 0) stringWithComas = `${value}`
        else stringWithComas = `${stringWithComas},${value}`
    })
    return stringWithComas
}


export const replaceTenseForURL = (tense: string) => {
    switch (tense) {
        case 'präsens':
            return 'prasens'
        case 'präteritum':
            return 'präteritum'
        default:
            return tense
    }
}

export const replaceTenseFromURL = (tense: string) => {
    switch (tense) {
        case 'prasens':
            return 'präsens'
        case 'prateritum':
            return 'präteritum'
        default:
            return tense
    }
}

export const getTenseNumEquivalent = (number: number) => {
    switch (number) {
        case 1:
            return 'präsens'
        case 2:
            return 'präteritum'
        case 3:
            return 'perfekt'
        case 4:
            return 'plusquamperfekt'
        case 5:
            return 'futur I'
        case 6:
            return 'futur II'
        case 7:
            return 'infinitive I'
        case 8:
            return 'infinitive II'
        case 9:
            return 'partizip I'
        case 10:
            return 'partizip II'
        case 11:
            return 'imperative'
        case 12:
            return 'konjunktiv I'
        case 13:
            return 'konjunktiv II'
        case 14:
            return 'konjunktiv plusquamperfekt'
        case 15:
            return 'konjunktiv perfekt'
        case 16:
            return 'konjunktiv futur I'
        case 17:
            return 'konjunktiv futur II'
    }
}



export const getModeTenses = (mode: string): string[] => {
    switch (mode) {
        case 'indicative':
            return ['präsens', 'präteritum', 'prasens', 'prateritum', 'perfekt', 'plusquam', 'futur_I', 'futur_II']
        case 'konjunktiv_I':
            return ['konjunktiv_I', 'konj_futur_I', 'konj_perfekt', 'konj_futur_II', 'konjunktiv_II', 'konj_plusquam']
        case 'konjunktiv_II':
            return ['konjunktiv_II', 'konj_futur_I', 'konj_perfekt', 'konj_futur_II', 'konjunktiv_II', 'konj_plusquam'] // TO CORRECT!!
        case 'imperative':
            return ['imperative']
        case 'partizip':
            return ['partizip_I', 'partizip_II']
        default:
            return []
    }
}

export const isAuxliaryVerb = (verb: string) => {
    return (verb === 'sein' || verb ===  'haben' || verb === 'werden')
}

export const isModalVerb = (verb: string) => {
    return (verb === 'dürfen' || verb ===  'können' || verb === 'mögen' || verb ===  'müssen' || verb ===  'sollen' || verb ===  'wollen')
}

// export const getModeTenses = (mode: strong)

export const getTenseFromNumber = (tense: string) => {
    switch (tense) {
        case 'präsens':
            return 1
        case 'präteritum':
            return 2
        case 'perfekt':
            return 3
        case 'plusquam':
            return 4
        case 'futur_I':
            return 5
        case 'futur_II':
            return 6
        case 'infinitiv_I':
            return 7
        case 'infinitiv_II':
            return 8
        case 'partizip_I':
            return 9
        case 'partizip_II':
            return 10
        case 'imperative':
            return 11
        case 'konjunktiv_II':
            return 12
        case 'konjunktiv II':
            return 13
        case 'konj_plusquam':
            return 14
        case 'konjunktiv perfekt':
            return 15
        case 'konjunktiv futur I':
            return 16
        case 'konjunktiv futur II':
            return 17
    }
}