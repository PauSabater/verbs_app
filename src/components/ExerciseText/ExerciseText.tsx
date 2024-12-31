import { FormEvent, useState } from 'react'
import styles from './exerciseText.module.scss'
import { sanitize } from 'isomorphic-dompurify'


const test = {
    "texts": [
        "Michael $__geht-gehen[verb-link-hover]__$ mit Lina in ein spanisches Restaurant, um zum ersten Mal spanisches Essen zu $__probieren-probieren[verb-link-hover]__$.",
    ]
}

export default function ExerciseText(textss: string[]) {

    const texts = test.texts

    return (
        <div>
            {
                texts.map((text, index)=> {
                    return (
                        <p key={index} dangerouslySetInnerHTML={{__html: sanitize(text)}}></p>
                    )
                })
            }
        </div>
    )
}
