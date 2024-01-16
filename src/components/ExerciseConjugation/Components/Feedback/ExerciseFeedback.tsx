'use client'

import { Fragment, MouseEventHandler, ReactNode, useState } from 'react'
import styles from './feedback.module.scss'
import { useRef } from 'react'
import { TExerciseState } from '../../ExerciseConjugation.exports'
import { getFeedbackSvg } from '@/assets/svg/svgExports'
import { Button } from '@/components/Button/Button'

interface IExerciseFeedback {
    exerciseState: TExerciseState,
    feedbackText?: string,
    btnText: string,
    isOnlyBtn?: boolean
    callBackBtn: Function
}

export function ExerciseFeedback(props: IExerciseFeedback): JSX.Element {

    const [selectedItems, setSelectedItems] = useState<string[]>([])

    const [exerciseState, setExerciseState] = useState<TExerciseState>(props.exerciseState || "empty")

    const getBtnText = (state: TExerciseState)=> {
        return "START EXERCISE"
    }

    const getFeedbackText = (state: string)=> {

        return ""
    }

    const handleBtnAction = ()=> {
        props.callBackBtn()
    }

    const getButtonColor = (state: string)=> {
        if (state === "empty") return "inactive"
        if (state === "filled") return "primary"
    }

    return (
        <div className={styles.container} data-state={props.exerciseState}>
            <div className={styles.message}>
                {getFeedbackSvg(props.exerciseState)}
                <p>{getFeedbackText(props.exerciseState)}</p>
            </div>

                <Button
                    callback={handleBtnAction}
                    text={getBtnText(props.exerciseState)}
                    width='fullWidth'
                    color={getButtonColor(props.exerciseState)}
                ></Button>
        </div>
    )
}