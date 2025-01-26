import Image from 'next/image'
import styles from './VerbTable.module.scss'
import { Fragment, useLayoutEffect } from 'react'
import { sanitize } from 'isomorphic-dompurify'
import { SVGAudio, SVGDoc, SVGExercise } from '@/assets/svg/svgExports'
import { HoverWithInfo } from '../HoverWithInfo/HoverWithInfo'
import { cleanConjugation, replaceTenseForURL, speak } from '@/utils/utils'
import { adaptTenseForApiUrl } from '@/lib/getApiData'

interface IVerbData {
        tense: string,
        conjugations: {
                preconjugation?: string,
                preconjugationHTML?: string,
                person: string,
                conjugation: string,
                conjugationHTML: string
        }[]
}

interface IVerbTable {
    title: string,
    verb: string,
    tense: string,
    verbData: IVerbData | undefined,
    mode?: string,
    utterance: SpeechSynthesisUtterance | null,
    callbackLessonOpen?: Function,
    isSeparable: boolean
}

export default function VerbTable(props: IVerbTable) {

    // const dispatchModalOpen = (tense: string)=> {
    //     //First, we initialize our event
    //     const event = new CustomEvent('openModalExercise', {
    //         detail: {
    //             tense: props.tense,
    //             mode: props.mode
    //         },
    //         bubbles: false
    //     })

    //     // Next, we dispatch the event.
    //     document.dispatchEvent(event);
    // }

    const getTextForConjugationAudio = ()=> {

        let text

        if (!props.verbData?.conjugations) return ""

        for(const conj of props.verbData.conjugations) {
            text = `${text || ""}${conj.person} ${conj.conjugation}, `
        }

        return text
    }

    const playAudio = (text: string)=> {
        if (props.utterance)
        speak(props.utterance, text)
    }

    return props.verbData === undefined ? null : (
        <div className={styles.container}>
            <table>
                <thead>
                    <tr>
                        <th colSpan={3} className={`${styles.tenseTitle}`}>
                            <a href={`https://localhost:3000/exercise?tenses=${
                                adaptTenseForApiUrl(props.tense)
                                }&verbs=${props.verb}`}
                                data-tense={props.tense}
                                data-adapted={adaptTenseForApiUrl(props.tense)}
                            >
                                <HoverWithInfo text={`practise ${props.tense} tense`} bg={"primaryLighter"}>
                                    {props.title}
                                    <SVGExercise></SVGExercise>
                                </HoverWithInfo>
                            </a>
                            <div onClick={()=> props.callbackLessonOpen ? props.callbackLessonOpen() : null}>
                                <HoverWithInfo text={`lesson for ${props.tense} tense`} bg={"primaryLighter"}>
                                    <SVGDoc></SVGDoc>
                                </HoverWithInfo>
                            </div>
                            <div onClick={()=> playAudio(getTextForConjugationAudio() as string)}>
                                <HoverWithInfo text={`lesson for ${props.tense} tense`} bg={"primaryLighter"}>
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
                                    {row.preconjugationHTML
                                        ? <td dangerouslySetInnerHTML={{__html: sanitize(cleanConjugation(row.preconjugationHTML))}}></td>
                                        : <></>
                                    }
                                    {row.person
                                        ? <td>{row.person}</td>
                                        : <></>
                                    }
                                    {
                                        props.isSeparable === false || (props.isSeparable && props.tense !== 'präsens' && props.tense !== 'präteritum')
                                            ? <td dangerouslySetInnerHTML={
                                                {__html: sanitize(cleanConjugation(row.conjugationHTML))}}></td>
                                            :
                                                <><td
                                                    dangerouslySetInnerHTML={{__html: sanitize(cleanConjugation(row.conjugationHTML.split(' ')[0]))}}>
                                                </td>
                                                <td
                                                    dangerouslySetInnerHTML={{__html: sanitize(cleanConjugation(row.conjugationHTML.split(' ')[1]))}}>
                                                </td>
                                                </>
                                    }

                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

const getHTMLRowSeparable = ()=> {

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