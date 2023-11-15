'use client'

import { ChangeEvent, useRef, useState } from 'react'
import styles from './ExerciseTextInput.module.scss'

interface IExerciseInput {
    answer: string,
    answerHTML: string,
    checkResult: boolean
}

export function ExerciseTextInput(props: IExerciseInput) {

    // const [setIsOpen, isOpen] = useState(open)

    const refInput = useRef(null)

    const [isFilled, setIsFilled] = useState(false)
    const [isValidated, setIsValidated] = useState(false)

    const handleChangeEvent = (e: ChangeEvent<HTMLInputElement>)=> {
        if ((e.target as HTMLInputElement).value !== "" && isFilled === false) setIsFilled(true)
        else setIsFilled(false)
    }


    return (
        <input
            ref={refInput}
            type="text"
            className={styles.input}
            onChange={(e)=> handleChangeEvent(e)}
        ></input>
    )
}