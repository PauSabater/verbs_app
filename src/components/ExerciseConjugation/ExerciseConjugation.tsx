'use client'

import { Fragment, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import styles from './exerciseConjugation.module.scss'
import stylesFeedback from './feedback.module.scss'
import { ExerciseTextInput } from '../ExerciseTextInput/ExerciseTextInput'
import { sanitize } from 'isomorphic-dompurify'
import { Button, TColor } from '../Button/Button'
import React from 'react'
import { strSuccess, strError, strInactive, isSuccess, isError, isFilled } from '@/utils/constants'
import { SVGCorrect, SVGIncorrect, getFeedbackSvg } from '@/assets/svg/svgExports'
import { Selector } from '../Selector/Selector'


interface IConjugation {
    person: string; conjugation: string; conjugationHTML: string;
}

interface IExerciseConjugation {
    tense: string,
    textBeforeTense: string,
    textAfterTense: string,
    conjugation: IConjugation[] | undefined
}

type TExerciseState = "filling" | "filled" | "success" | "error"

export function ExerciseConjugation(props: IExerciseConjugation) {

    // Count for the number of inputs filled
    const [numFilledInputs, SetNumFilledInputs] = useState(0)

    // Whether all the inputs of the form are filled
    const [isFormFilled, setIsFormFilled] = useState(false)

    const [exerciseState, setExerciseState] = useState<TExerciseState>("filling")

    const refsInputs = [useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null)]

    const handleBackgroundClick = ()=> {
        console.log("CLICK BACKGROUND")
    }

    useEffect(() => {
        console.log("conjugation is")
        console.log(props.conjugation)

        const numInputs = props.conjugation?.length

        console.log("IN USE EFFECT")
        console.log("NUM INPUTS "+numInputs)
        console.log("NUM filled "+numFilledInputs)

        if (numInputs === (numFilledInputs)) {

            setExerciseState("filled")}
        else if(exerciseState === "filled") {
            setExerciseState("filling")
        }
    },[numFilledInputs])

    useEffect(() => {setIsFormFilled(false)},[])

    const validateInputs = ()=> {
        let numValidatedInputs = 0
        const numInputs = props.conjugation?.length

        refsInputs.forEach((refInput)=> {
            if (refInput.current === null) return
            // @ts-ignore
            if (refInput.current.validateInput()) numValidatedInputs++
        })

        numValidatedInputs === numInputs
            ? setExerciseState(strSuccess)
            : setExerciseState(strError)
    }

    // const isCorrect = (stateExercise: string)=> {
    //     return stateExercise === strValid ? true : false
    // }

    const increaseFilledInputs = ()=> {
        SetNumFilledInputs(numFilledInputs + 1)
    }

    const decreaseFilledInputs = ()=> {
        SetNumFilledInputs(numFilledInputs - 1)
    }

    const getBtnText = (state: string)=> {
        if(isSuccess(state)) return "REPEAT EXERCISE"
        if(isError(state)) return "CHECK AGAIN"
        return "CHECK"
    }

    const getFeedbackText = (state: string)=> {
        if(isSuccess(state)) return "Amazing!"
        if(isError(state)) return "Correct the wrong tenses"
        return ""
    }

    return (
        <div className={styles.exerciseConjugation} data-state={exerciseState}>
            <div className={styles.container}>
                <p className={styles.statement}>
                    <span data-text dangerouslySetInnerHTML={{__html: sanitize(props.textBeforeTense)}}></span>
                    <Selector title={props.tense} options={['hey', 'hey']}></Selector>
                    <span data-text dangerouslySetInnerHTML={{__html: sanitize(props.textAfterTense)}}></span>
                </p>
                <div className={styles.rowsContainer}>
                    {
                        props.conjugation !== undefined ? props.conjugation.map((conj, i)=> {
                            return (
                                <div key={i} className={styles.row}>
                                    <p className={styles.person}>{conj.person}</p>
                                    <ExerciseTextInput
                                        ref={refsInputs[i]}
                                        answer={conj.conjugation}
                                        answerHTML={conj.conjugationHTML}
                                        checkResult={false}
                                        increaseFilledInputs={increaseFilledInputs}
                                        decreaseFilledInputs={decreaseFilledInputs}
                                    ></ExerciseTextInput>
                                </div>
                            )
                        })
                        : null
                    }
                </div>
            </div>

            <div className={stylesFeedback.container} data-state={exerciseState}>
                <div className={stylesFeedback.message}>
                    {getFeedbackSvg(exerciseState)}
                    <p>{getFeedbackText(exerciseState)}</p>
                </div>

                <div onClick={()=> validateInputs()}>
                    <Button
                        text={getBtnText(exerciseState)}
                        width='fullWidth'
                        color={isFilled(exerciseState) ? "primary" : exerciseState as TColor || strInactive}
                    ></Button>
                </div>
            </div>
        </div>
    )
}