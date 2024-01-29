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