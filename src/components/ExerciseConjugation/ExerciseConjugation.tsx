'use client'

import { useState } from 'react'
import styles from './ExerciseConjugation.module.scss'
import { ExerciseTextInput } from '../ExerciseTextInput/ExerciseTextInput';

interface IConjugation {
    person: string; conjugation: string; conjugationHTML: string;
}

export function ExerciseConjugation({text, conjugation}: {text: string, conjugation: IConjugation[] | undefined}) {

    // const [setIsOpen, isOpen] = useState(open)

    const handleBackgroundClick = ()=> {
        console.log("CLICK BACKGROUND")
    }


    return (
        <div className={styles.container}>
            <p className={styles.statement}>{text}</p>
            {
                conjugation !== undefined ? conjugation.map((conj, i)=> {
                    return (
                        <div key={i} className={styles.row}>
                            <p className={styles.person}>{conj.person}</p>
                            <ExerciseTextInput
                                answer={conj.person}
                                answerHTML={conj.conjugationHTML}
                                checkResult={false}
                            ></ExerciseTextInput>
                        </div>
                    )
                })
                : null
            }

        </div>
    )
}