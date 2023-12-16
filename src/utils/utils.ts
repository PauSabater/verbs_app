import { ISelectorDropdownOptions } from "@/components/Selector/Selector";

export const formatStringForValidation = (str: string)=> {
    return str.toLowerCase().trim().replace(/\s+/g, ' ')
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
    utterance.text = text
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

                    let germanVoices = voices.filter(function (voice) {
                        return voice.name === 'Google Deutsch'
                    })

                    if (germanVoices.length === 0) {
                        germanVoices = voices.filter(function (voice) {
                            return voice.lang === 'de-DE'
                        })
                    }

                    const utterance = new SpeechSynthesisUtterance()
                    utterance.voice = voices[0];
                    utterance.pitch = 1;
                    utterance.rate = 0.9;
                    utterance.volume = 1;

                    resolve(utterance);
                    clearInterval(id);
                }
            }, 20);
        }
    )
}

// export async function getUtteraceInstance = (text: string): SpeechSynthesisUtterance => {
//     const synthesis = window.speechSynthesis

//     let id: any

//     let speechPromise = setSpeech()

//     speechPromise.then((voices: SpeechSynthesisVoice[])=> {
//         console.log(navigator.userAgent)
//         let germanVoices = voices.filter(function (voice) {
//             return voice.name === 'Google Deutsch'
//         })

//         if (germanVoices.length === 0) {
//             germanVoices = voices.filter(function (voice) {
//                 return voice.lang === 'de-DE'
//             })
//         }

//         const voice = germanVoices[0]

//         return new SpeechSynthesisUtterance();

//         // // Set utterance properties
//         // utterance.voice = voice;
//         // utterance.pitch = 1;
//         // utterance.rate = 0.9;
//         // utterance.volume = 1;

//         // // Speak the utterance
//         // synthesis.speak(utterance);
//     })
// }