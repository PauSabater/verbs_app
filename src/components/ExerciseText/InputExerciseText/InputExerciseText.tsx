"use client"

import styles from './inputExerciseText.module.scss'
import { sanitize } from 'isomorphic-dompurify'
import { ExercisePageContext } from '@/app/exercises/[slug]/ExercisePage'
import { useContext, useEffect, useRef, useState } from 'react'

import { ExerciseTextUnitContext } from '@/components/ExerciseText/ExerciseTextUnit/ExerciseTextUnit'
import { useSpeechRecognition } from '@/hooks/useSpeechRecognition'
import { Loader } from '@/components/atoms/Loader/Loader'


interface IInputExerciseText {
    answer: string
}

export default function InputExerciseText({
    answer
}: IInputExerciseText) {

    const { transcript, isListening, startRecognition, stopRecognition } = useSpeechRecognition('de-DE');

    const exercisePageContext = useContext(ExercisePageContext)
    const exerciseTextUnitContext = useContext(ExerciseTextUnitContext)

    const { callbackOnExerciseOpen } = exercisePageContext;
    const refInput = useRef<HTMLInputElement>(null)

    const [inputState, setInputState] = useState<'filling' | 'correct' | 'incorrect'>('filling')

    // useEffect(() => {
    //     if (answer) {
    //         exerciseTextUnitContext.callbackOnAddedInput(answer)
    //     }
    // }, [])

    useEffect(() => {
        if (transcript && refInput.current) {
            refInput.current.value = transcript
            validateInput()
        }
    }, [transcript])

    useEffect(() => {
        if (isListening) {
            if (refInput.current) refInput.current.value = "listening"
        }
    }, [isListening])

    useEffect(() => {
        console.log("validation trigger! num is", exerciseTextUnitContext.validationTrigger)
        if (exerciseTextUnitContext.validationTrigger > 0) {
            validateInput()
        } else {
            setInputState('filling')
            if (refInput.current) refInput.current.value = ''
        }
    }, [exerciseTextUnitContext.validationTrigger])

    const validateInput = ()=> {
        if (refInput.current) {

            const answer = refInput.current.dataset.answer
            const input = refInput.current.value

            if (answer === input) {
                console.log("WE HAVE CORRECT!!")
                setInputState('correct')
                exerciseTextUnitContext.callBackOnCorrectInput()
            } else {
                setInputState('incorrect')
            }
        }

    }

    const onInputChange = ()=> {
        setInputState('filling')
    }


    return (
        <div className={styles.wrapper}>
            <input
                ref={refInput}
                onFocus={(e)=> exerciseTextUnitContext.callBackOnInputFocus(e)}
                type="text"
                data-answer={answer}
                data-state={inputState}
                onChange={()=> onInputChange()}
                className={`${styles.inputExerciseText} input-exercise-text`}
            ></input>
            {
                isListening && <Loader display={true} type={'linear-dots'} animate={true} />
            }
            <button
                title="click to start speech recognition"
                onClick={isListening ? stopRecognition : startRecognition}
                className={styles.btnAudio}
            >
                <img
                    className={styles.imgMicrophone}
                    src={inputState === 'correct' ? '/img/icons/correct-small.svg' : isListening ? "/img/icons/stop.svg" : "/img/icons/microphone.svg"}
                    alt="microphone"
                    width="20"
                    height="20"
                />
            </button>
            <img
                className={styles.imgIncorrect}
                src={"/img/icons/incorrect.svg"}
                alt="incorrect"
                width="20"
                height="20"
                data-state={inputState}
            />
        </div>
    )
}
