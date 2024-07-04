'use client'

import { Fragment, MouseEventHandler, ReactNode, useContext, useState } from 'react'
import styles from './feedback.module.scss'
import { useRef } from 'react'
import { IExerciseConjugationTexts, TExerciseState, getButtonColor } from '../../ExerciseConjugation.exports'
import { getFeedbackSvg } from '@/assets/svg/svgExports'
import { Button } from '@/components/Button/Button'
import { ExerciseConjugationContext, ExerciseConjugationContextTexts } from '../../ExerciseConjugation'
import { IExerciseConjugationState } from '../../ExerciseConjugationReducer'
import { isError, isSuccess } from '@/utils/constants'
import { getRandomInt } from '@/utils/utils'

interface IExerciseFeedback {
    callbackBtnNext: Function
    callBackBtnMain: Function
    tenses: string[]
    verbs: string[]
}

export function ExerciseFeedbackAndBtns(props: IExerciseFeedback): JSX.Element {

    const context = useContext(ExerciseConjugationContext) as IExerciseConjugationState
    const contextTexts = useContext(ExerciseConjugationContextTexts) as IExerciseConjugationTexts

    const getBtnText = (state: string, isFirstBtn: boolean, isLastOfSerial?: boolean) => {
        console.log('in get button text')

        // Button to check and repeat
        if (isFirstBtn) {
            if (isSuccess(state)) {
                return contextTexts.button.repeatShort
            }
            if (isError(state)) return contextTexts.button.checkAgain
            return contextTexts.button.check
        // button to go to next exercise
        } else {

            // inform we pass to next verb and tense
            if (isSuccess(state) && isLastTense() && !isLastVerb()) {
                console.log('first condition')
                return `NEXT: ${getNextVerb()} - ${props.tenses[0]}`
            }
            // informs that we pass to next tense of the same verb
            if (isSuccess(state) && !isLastTense()) {
                console.log('second condition')
                return `${contextTexts.button.nextTense.toUpperCase()} ${getNextTense()}`
            }
            // Case we have finished
            if (isSuccess(state) && isLastTenseAndVerb()) {
                return contextTexts.button.newExercise.toUpperCase()
            }
            if (isError(state)) return contextTexts.button.checkAgain
            return contextTexts.button.check
        }
    }

    const isLastTenseAndVerb = ()=> {
        return isLastTense() && (isLastVerb() || props.verbs.length === 1)
    }

    const getBtnIcon = (state: string, isFirstBtn: boolean, isLastOfSerial?: boolean) => {
        if (isFirstBtn) {
            if (isSuccess(state)) return 'repeat'
        } else {
            if (isSuccess(state) && !isLastTenseAndVerb()) {
                return 'next'
            }
            if (isSuccess(state) && isLastTenseAndVerb()) return 'add'
        }

        return ''
    }

    const isLastExercise = ()=> {
        // todo
        return false
    }

    const isLastTense = ()=> {
        return props.tenses.indexOf(context.currentTense) === (props.tenses.length - 1)
    }

    const getNextTense = ()=> {
        return props.tenses[props.tenses.indexOf(context.currentTense) + 1]
    }

    const getNextVerb = ()=> {
        return props.verbs[props.verbs.indexOf(context.currentVerb) + 1]
    }

    const isLastVerb = ()=> {
        return props.verbs.indexOf(context.currentVerb) === (props.verbs.length - 1)
    }

    const getFeedbackText = (state: string) => {
        if (isSuccess(state)) {
            return contextTexts.successMessages[getRandomInt(contextTexts.successMessages.length)]
        }
        if (isError(state)) return 'Correct the wrong tenses'
        return ''
    }

    return (
        <div
            data-feedback
            className={styles.container}
            data-state={context.exerciseState}
        >
            <div className={styles.message}>
                {getFeedbackSvg(context.exerciseState)}
                <p>
                    {getFeedbackText(context.exerciseState)}
                </p>
            </div>

            <div className={isSuccess(context.exerciseState) ? styles.containerBtns : ''}>
                { /* Main button */ }
                <Button
                    callback={props.callBackBtnMain}
                    text={getBtnText(context.exerciseState, true, isLastTense())}
                    width="fullWidth"
                    color={getButtonColor(
                        context.exerciseState,
                        {
                            isLastExercise: isLastExercise(),
                            isSecondBtn: false
                        })}
                    icon={getBtnIcon(context.exerciseState, true)}
                ></Button>

                { // Second button appearing only after a success after checking
                isSuccess(context.exerciseState) ? (
                    <Button
                        callback={props.callbackBtnNext}
                        text={getBtnText(context.exerciseState, false, isLastTense())}
                        width="fullWidth"
                        color={getButtonColor(
                            context.exerciseState,
                            {
                                isLastExercise: isLastTense(),
                                isSecondBtn: true
                            })}
                        icon={getBtnIcon(context.exerciseState, false)}
                    ></Button>
                ) : (
                    <></>
                )}
            </div>
        </div>
    )
}