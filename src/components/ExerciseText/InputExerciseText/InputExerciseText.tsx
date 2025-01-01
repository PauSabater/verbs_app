"use client"

import styles from './inputExerciseText.module.scss'
import { sanitize } from 'isomorphic-dompurify'
import { ExercisePageContext } from '@/app/exercises/[slug]/ExercisePage'
import { useContext, useEffect, useRef } from 'react'


interface IInputExerciseText {
    answer: string
}

export default function InputExerciseText({
    answer
}: IInputExerciseText) {

    const exercisePageContext = useContext(ExercisePageContext)
    const { callbackOnExerciseOpen } = exercisePageContext;
    const refInput = useRef<HTMLInputElement>(null)

    useEffect(() => {
        console.log("context is", ExercisePageContext)
        // () => callbackOnExerciseOpen("ieeee")
    }, [])


    return (
        <input
            ref={refInput}
            type="text"
            data-ab={answer}
            onChange={()=> callbackOnExerciseOpen("ieeee")}
            className={styles.inputExerciseText}
        ></input>
    )
}
