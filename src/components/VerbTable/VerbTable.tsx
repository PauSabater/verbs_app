import Image from 'next/image'
import styles from './VerbTable.module.scss'
import { Fragment } from 'react'
import { sanitize } from 'isomorphic-dompurify'
import { SVGAudio, SVGDoc, SVGExercise } from '@/assets/svg/svgExports'
import HoverWithInfo from '../HoverWithInfo/HoverWithInfo'

interface IVerbData {
        tense: string,
        conjugations: {
                person: string,
                conjugation: string,
                conjugationHTML: string
        }[]
}

export default function VerbTable({verbData, mode}: {verbData: IVerbData | undefined, mode: string}) {

    const dispatchModalOpen = (tense: string)=> {
        console.log("DISPATCH MODEEEE")
        //First, we initialize our event
        const event = new CustomEvent('openModalExercise', {
            detail: {
                tense: tense,
                mode: mode
            },
            bubbles: false
        })

        // Next, we dispatch the event.
        document.dispatchEvent(event);
    }

    const getTextForConjugationAudio = ()=> {
        console.log(verbData?.conjugations)

        let text

        if (!verbData?.conjugations) return ""

        for(const conj of verbData.conjugations) {
            console.log(conj.person)
            text = `${text || ""}${conj.person} ${conj.conjugation}, `
        }

        return text
    }

    const playAudio = (text: string)=> {
        const synthesis = window.speechSynthesis

        const langRegex = /^de(-[a-z]{2})?$/i

        // const voices = synthesis
        //     .getVoices()
        //     .filter((voice) => langRegex.test(voice.lang))



        // var voice = synthesis.getVoices().filter(function (voice) {
        //     return voice.lang === 'de-DE';
        // })[0]

        console.log(text)

        var voicees = synthesis.getVoices().filter(function (voice) {
            return voice.lang === 'de-DE';
        })

        let voices = synthesis.getVoices().filter(function (voice) {
            return voice.name === 'Google Deutsch'
        })


        const voice = voices.length > 0 ? voices[0] : synthesis.getVoices().filter(function (voice) {
            return voice.lang === 'de-DE';
        })[0]

        // Create an utterance object
        var utterance = new SpeechSynthesisUtterance(text);

        // Set utterance properties
        utterance.voice = voice;
        utterance.pitch = 1;
        utterance.rate = 0.9;
        utterance.volume = 1;

        // Speak the utterance
        synthesis.speak(utterance);
    }

    return verbData === undefined ? null : (
        <div className={styles.container}>
            <table>
                <thead>
                    <tr>
                        <th colSpan={3} className={styles.tenseTitle}>
                            <div onClick={()=> dispatchModalOpen(verbData.tense)}>
                                <HoverWithInfo text={`practise ${verbData.tense} tense`}>
                                    {verbData.tense}
                                    <SVGExercise></SVGExercise>
                                </HoverWithInfo>
                            </div>
                            <HoverWithInfo text={`lesson for ${verbData.tense} tense`}>
                                <SVGDoc></SVGDoc>
                            </HoverWithInfo>
                            <div onClick={()=> playAudio(getTextForConjugationAudio() as string)}>
                                <HoverWithInfo text={`lesson for ${verbData.tense} tense`}>
                                    <SVGAudio></SVGAudio>
                                </HoverWithInfo>
                            </div>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        verbData.conjugations.map((row, i) => {
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