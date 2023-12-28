'use client'

import Lesson, { ILessonSection } from "@/components/Lesson/Lesson";
import { getUtteraceInstance } from "@/utils/utils";
import { useLayoutEffect, useState } from "react";
import styles from './lessonPage.module.scss'
import { IndexContent } from "@/components/IndexContent/IndexContent";
import { LessonHeader } from "@/components/LessonHeader/LessonHeader";
import { sanitize } from "isomorphic-dompurify";

interface ILessonPage {
    data: any
}

export function LessonPage(props: ILessonPage) {

    const [utterance, setUtterance] = useState<SpeechSynthesisUtterance | null>(null)
    const [intersectedHeading, setIntersectedHeading] = useState<string>('')

    // const [lessonData, setLessonData] = useState<any>(data)

    useLayoutEffect(()=> {
        getUtteraceInstance()
            .then((utterance)=> {
                setUtterance(utterance)
            })

        // let data
        // import(`../../../../public/data/lessons/prasens.json`)
        //     .then(result => setLessonData(result))
    }, [])

    const handleHeadingIntersection = (id: string)=> {
        setIntersectedHeading(id)
    }

    return (
        <div className={styles.container}>
            <LessonHeader></LessonHeader>
            <IndexContent
                content={props.data}
                intersectedIndex={intersectedHeading}

            ></IndexContent>
            <Lesson
                data={props.data}
                utterance={utterance}
                lesson={"präsens"}
                isPost={true}
                onHeadingIntersection={handleHeadingIntersection}
            ></Lesson>
        </div>
    )
}