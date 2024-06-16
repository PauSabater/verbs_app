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
import { IVerbProperties } from '@/assets/interfaces/interfaces'
import LessonLink from '@/components/LessonsLinks/components/LessonLink/LessonLink'
import EmbeddedExercise from '@/components/EmbeddedExercise/EmbeddedExercise'

interface ILessonPage {
    host: string
    data: any
    exercisesTense: string
    textsExercise: any
    dataVerbsInText: any
    verbsConjugations: any
}

interface IContextLessonPage {
    url: string
    selectorLinksPath: string
    utterance: SpeechSynthesisUtterance | null
    dataVerbsInText: {
        verb: string
        properties: IVerbProperties
    }[]
    callbackOnExerciseOpen: Function
    verbsConjugations: any
}

export const LessonPageContext = createContext<IContextLessonPage>({} as IContextLessonPage)

export function LessonPage(props: ILessonPage) {

    const [utterance, setUtterance] = useState<SpeechSynthesisUtterance | null>(null)
    const [intersectedHeading, setIntersectedHeading] = useState<string>('')
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const refModal = useRef(null)
    const textsExercise = JSON.parse(props.textsExercise)
    const [verbExercise, setVerbExercise] = useState<string>('')
    const [isEmbeddedExerciseOpen, setIsEmbeddedExerciseOpen] = useState<boolean>(true)

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

    const callbackOpenModal = (verb: string) => {
        console.log("HEY CLICK!!")
        console.log("VERB IS")
        console.log(verb)
        if (verb) {
            setIsModalOpen(true)
            setVerbExercise(verb)
        }
    }

    return (
        <LessonPageContext.Provider
            value={{
                url: props.host,
                selectorLinksPath: '/lessons',
                utterance: utterance,
                dataVerbsInText: props.dataVerbsInText,
                callbackOnExerciseOpen: callbackOpenModal,
                verbsConjugations: props.verbsConjugations
            }}
        >
            <div className={styles.container}>
                <LessonHeader></LessonHeader>

                <Lesson
                    data={props.data}
                    utterance={utterance}
                    lesson={'präsens'}
                    isPost={true}
                    onHeadingIntersection={handleHeadingIntersection}
                    exerciseTexts={props.textsExercise}
                    // callbackOnExerciseOpen={callbackOpenModal}
                ></Lesson>

                <div className={styles.sideContent}>
                    <IndexContent content={props.data} intersectedIndex={intersectedHeading}></IndexContent>
                    {/* <EmbeddedExercise text={''} open={isEmbeddedExerciseOpen} ref={refModal} callbackClose={callbackCloseModal}>
                        <ExerciseConjugation
                            verb={'sein'}
                            tensesDropdown={props.exercisesTense}
                            texts={textsExercise}
                            tenseExercise={'präsens'}
                            selectedTenses={[props.exercisesTense]}
                            isSingleTense={true}
                            isEmbedded={true}
                        ></ExerciseConjugation>
                    </EmbeddedExercise> */}
                </div>

                {/* {props.lessonsProps.map((lesson) => {
                    return <LessonLink tense={lesson.tense} title={lesson.title} level={lesson.level}></LessonLink>
                })} */}

                {/* <ModalExercises text={''} open={isModalOpen} ref={refModal} callbackClose={callbackCloseModal}>
                    <ExerciseConjugation
                        // isDynamic={true}
                        verb={verbExercise}
                        tensesDropdown={props.exercisesTense}
                        texts={textsExercise}
                        tenseExercise={props.exercisesTense}
                        // allTenses={props.exercisesTense}
                        selectedTenses={[props.exercisesTense]}
                        isSingleTense={true}
                        tenses={['präsens']}
                    ></ExerciseConjugation>
                </ModalExercises> */}
            </div>
        </LessonPageContext.Provider>
    )
}
