"use client"

import styles from './exerciseText.module.scss'
import { sanitize } from 'isomorphic-dompurify'
import { TextReplaced } from '../Lesson/Components/TextReplaced/TextRepaced'
import "../../../public/img/exercises/knoblauchsuppe.png"


const test = {
    "verbsUsed": [
        "gehen",
        "probieren"
    ],
    "sentences": [
        {
            "audio": "Michael geht mit Lina in ein spanisches Restaurant, um zum ersten Mal spanisches Essen zu probieren.",
            "text": "Michael $__geht-gehen[verb-link-hover]__$ mit Lina in ein spanisches Restaurant, um zum ersten Mal spanisches Essen zu $__probieren-probieren[verb-link-hover]__$."
        },
        {
            "character": "Michael",
            "audio": "Was denkst du, Lina? Ich glaube, ich würde den Jamón bestellen. Ich liebe Schinken!",
            "text": "Michael $__geht-gehen[verb-link-hover]__$ mit Lina in ein spanisches Restaurant, um zum ersten Mal spanisches Essen zu $__probieren-probieren[verb-link-hover]__$."
        }
        ,
    ]
}

interface IExerciseText {
    img: string,
    path: string,
    tense: string,
    title: string,
    level: string,
    url: string
    sentences: {
        audio: string
        text: string
    }[]
}

export default function ExerciseText({
    img,
    path,
    tense,
    title,
    level,
    url,
    sentences
}: IExerciseText) {


    return (
        <div>
            {
                sentences.map((sentence, i)=> {
                    return (
                        <div className={styles.sentenceContainer} key={'sentence' + i}>
                            <div>
                                {
                                    i === 0 ? <h2>{title}</h2> : ''
                                }
                                <p className={styles.sentence}>
                                    <TextReplaced key={'text-replaced' + i} text={sentence.text}></TextReplaced>
                                </p>
                            </div>
                                {
                                    i === 0
                                        ? <img
                                            src={"/img/exercises/" + img}
                                            className={styles.mainImage}
                                            alt="audio"
                                            width="200"
                                            height="200"
                                        />
                                        : ''
                                }
                        </div>
                    )
                })
            }
        </div>
    )
}
