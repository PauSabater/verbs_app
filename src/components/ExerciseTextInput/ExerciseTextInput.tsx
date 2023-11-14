'use client'

import { useState } from 'react'
import styles from './ExerciseTextInput.module.scss'

interface IConjugation {
    person: string; conjugation: string; conjugationHTML: string;
}

export function ExerciseTextInput({answer, answerHTML, checkResult}: {answer: string, answerHTML: string, checkResult: boolean}) {

    // const [setIsOpen, isOpen] = useState(open)


    return (
        <input type="text" className={styles.input}></input>
    )
}