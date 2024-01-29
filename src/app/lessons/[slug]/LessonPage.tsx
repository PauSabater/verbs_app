'use client'

import Lesson, { ILessonSection } from '@/components/Lesson/Lesson'
import { getUtteraceInstance } from '@/utils/utils'
import { createContext, useLayoutEffect, useRef, useState } from 'react'
import styles from './lessonPage.module.scss'
import { IndexContent } from '@/components/IndexContent/IndexContent'
import { LessonHeader } from '@/components/LessonHeader/LessonHeader'
import { sanitize } from 'isomorphic-dompurify'
import ModalExercises from '@/components/ModalExercises/ModalExercises'
import { ExerciseConjugation } from '@/components/ExerciseConjugation/ExerciseConjugation'

interface ILessonPage {
    host: string,
    data: any
    exercisesTense: string
    textsExercise: any
}

export const LessonPageContext = createContext({ url: '', selectorLinksPath: '' })

export function LessonPage(props: ILessonPage) {
    const [utterance, setUtterance] = useState<SpeechSynthesisUtterance | null>(null)
    const [intersectedHeading, setIntersectedHeading] = useState<string>('')
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const refModal = useRef(null)
    const textsExercise = JSON.parse(props.textsExercise)

    useLayoutEffect(() => {
        getUtteraceInstance().then((utterance) => {
            setUtterance(utterance)
        })
    }, [])

    const handleHeadingIntersection = (id: string) => {
        setIntersectedHeading(id)
    }

    const callbackCloseModal = () => {
        setIsModalOpen(false)
    }

    const callbackOpenModal = () => {
        console.log("HEY CLICK!!")
        setIsModalOpen(true)
    }

    return (
        <LessonPageContext.Provider value={{ url: props.host, selectorLinksPath: '/lessons'}}>
            <div className={styles.container}>
                <LessonHeader></LessonHeader>
                <IndexContent content={props.data} intersectedIndex={intersectedHeading}></IndexContent>
                <Lesson
                    data={props.data}
                    utterance={utterance}
                    lesson={'präsens'}
                    isPost={true}
                    onHeadingIntersection={handleHeadingIntersection}
                    callbackOnExerciseOpen={callbackOpenModal}
                ></Lesson>

                <ModalExercises text={''} open={isModalOpen} ref={refModal} callbackClose={callbackCloseModal}>
                    <ExerciseConjugation
                        // isDynamic={true}
                        verb={'sein'}
                        tensesDropdown={props.exercisesTense}
                        texts={textsExercise}
                        tenseExercise={props.exercisesTense}
                        // allTenses={props.exercisesTense}
                        selectedTenses={[props.exercisesTense]}
                        isSingleTense={true}
                    ></ExerciseConjugation>
                </ModalExercises>
            </div>
        </LessonPageContext.Provider>
    )
}
