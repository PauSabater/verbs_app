"use client"

import styles from './exerciseText.module.scss'
import { sanitize } from 'isomorphic-dompurify'
import { TextReplaced } from '../Lesson/Components/TextReplaced/TextRepaced'
import { ExerciseTextUnit } from './ExerciseTextUnit/ExerciseTextUnit'
import { Fragment } from 'react'
import { fontTitles } from '@/app/fonts'
import InfoInCircle from '@/elements/InfoInCircle/InfoInCircle'
import { fontHandwritten } from '@/app/fonts'



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
    tenseUrl: string,
    title: string,
    level: string,
    url: string,
    subtitle: string,
    instructions: string,
    sentences: {
        imgPath: string
        audio: string
        audioPath: string
        text: string
        translations: { en: string, es: string, fr: string }
        onlyText?: boolean
    }[],
    characters: {
        name: string
        img: string
        url: string
    }[]
}

export default function ExerciseText({
    img,
    path,
    tense,
    tenseUrl,
    title,
    level,
    url,
    sentences,
    subtitle,
    characters,
    instructions
}: IExerciseText) {


    return (
        <div className={styles.exerciseText}>
            <div className={styles.wrapper}>
                <div className={styles.introContainer}>
                    <div className={styles.infoContainert}>
                        <h1 className={`${styles.title} ${fontTitles.className}`} dangerouslySetInnerHTML={{ __html: sanitize(title) }}></h1>
                        <p className={`${fontHandwritten.className} ${styles.subtitle}`}>{subtitle}</p>
                        <div className={styles.levelContainer}>
                            <InfoInCircle text={level}/>
                            <p>Level</p>
                            <p> | </p>
                            <a href={tenseUrl} target="_blank" className={styles.tenseLink}>{tense}</a>
                        </div>
                        <div className={styles.charactersContainer}>
                            {
                                characters.map((character, i) => {
                                    return (
                                            <img
                                                key={`character${i}`}
                                                src={"/img/exercises/characters/" + character.img}
                                                alt={`character ${character.name}`}
                                                width="40"
                                                height="40"
                                                className={styles.imgCharacter}
                                            />
                                    )
                                })
                            }

                        </div>
                    </div>
                    <div className={styles.mainImageContainer}>
                        <img
                            src={"/img/exercises/" + img}
                            className={styles.mainImage}
                            alt="audio"
                            width="200"
                            height="200"
                        />
                    </div>
                </div>
            </div>
            <div className={styles.instructionsContainer}>
                <p>{instructions}</p>

            </div>
            {
                sentences.map((sentence, i) => {
                    return (
                        <ExerciseTextUnit
                            sentence={sentence}
                            order={i}
                            key={`sentence${i}`}
                        ></ExerciseTextUnit>
                    )
                })
            }
        </div>
    )
}