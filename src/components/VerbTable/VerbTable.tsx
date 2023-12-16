import Image from 'next/image'
import styles from './VerbTable.module.scss'
import { Fragment } from 'react'
import { sanitize } from 'isomorphic-dompurify'
import { SVGAudio, SVGDoc, SVGExercise } from '@/assets/svg/svgExports'
import HoverWithInfo from '../HoverWithInfo/HoverWithInfo'
import { speak } from '@/utils/utils'

interface IVerbData {
        tense: string,
        conjugations: {
                person: string,
                conjugation: string,
                conjugationHTML: string
        }[]
}

interface IVerbTable {
    verbData: IVerbData | undefined,
    mode: string,
    utterance: SpeechSynthesisUtterance | null,
    callbackLessonOpen?: Function
}

export default function VerbTable(props: IVerbTable) {

    const dispatchModalOpen = (tense: string)=> {
        //First, we initialize our event
        const event = new CustomEvent('openModalExercise', {
            detail: {
                tense: tense,
                mode: props.mode
            },
            bubbles: false
        })

        // Next, we dispatch the event.
        document.dispatchEvent(event);
    }

    const getTextForConjugationAudio = ()=> {

        let text

        if (!props.verbData?.conjugations) return ""

        for(const conj of props.verbData.conjugations) {
            text = `${text || ""}${conj.person} ${conj.conjugation}, `
        }

        return text
    }

    function setSpeech(): Promise<SpeechSynthesisVoice[]> {
        return new Promise(
            function (resolve, reject) {
                let synth = window.speechSynthesis;
                let id: any

                id = setInterval(() => {
                    if (synth.getVoices().length !== 0) {
                        resolve(synth.getVoices() as SpeechSynthesisVoice[]);
                        clearInterval(id);
                    }
                }, 20);
            }
        )
    }

    const playAudio = (text: string)=> {
        if (props.utterance)
        speak(props.utterance, text)

        // const synthesis = window.speechSynthesis

        // let id: any

        // let speechPromise = setSpeech()

        // speechPromise.then((voices: SpeechSynthesisVoice[])=> {
        //     console.log(navigator.userAgent)
        //     let germanVoices = voices.filter(function (voice) {
        //         return voice.name === 'Google Deutsch'
        //     })

        //     if (germanVoices.length === 0) {
        //         germanVoices = voices.filter(function (voice) {
        //             return voice.lang === 'de-DE'
        //         })
        //     }

        //     const voice = germanVoices[0]

        //     var utterance: SpeechSynthesisUtterance = new SpeechSynthesisUtterance(text);

        //     // Set utterance properties
        //     utterance.voice = voice;
        //     utterance.pitch = 1;
        //     utterance.rate = 0.9;
        //     utterance.volume = 1;

        //     // Speak the utterance
        //     synthesis.speak(utterance);
        // })
    }

    return props.verbData === undefined ? null : (
        <div className={styles.container}>
            <table>
                <thead>
                    <tr>
                        <th colSpan={3} className={styles.tenseTitle}>
                            <div onClick={()=> dispatchModalOpen((props.verbData as IVerbData).tense)}>
                                <HoverWithInfo text={`practise ${props.verbData.tense} tense`}>
                                    {props.verbData.tense}
                                    <SVGExercise></SVGExercise>
                                </HoverWithInfo>
                            </div>
                            <div onClick={()=> props.callbackLessonOpen ? props.callbackLessonOpen() : null}>
                                <HoverWithInfo text={`lesson for ${props.verbData.tense} tense`}>
                                    <SVGDoc></SVGDoc>
                                </HoverWithInfo>
                            </div>
                            <div onClick={()=> playAudio(getTextForConjugationAudio() as string)}>
                                <HoverWithInfo text={`lesson for ${props.verbData.tense} tense`}>
                                    <SVGAudio></SVGAudio>
                                </HoverWithInfo>
                            </div>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        props.verbData.conjugations.map((row, i) => {
                            return (
                                <tr key={`row-${row.person}`}>
                                    <td>{row.person}</td>
                                    <td dangerouslySetInnerHTML={{__html: sanitize(row.conjugationHTML)}}></td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

{/* <table>
<thead>
  <tr>
    <th>Company</th>
    <th>Contact</th>
    <th>Country</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>Alfreds Futterkiste</td>
    <td>Maria Anders</td>
    <td>Germany</td>
  </tr>
  <tr>
    <td>Centro comercial Moctezuma</td>
    <td>Francisco Chang</td>
    <td>Mexico</td>
  </tr>
</tbody>
</table> */}