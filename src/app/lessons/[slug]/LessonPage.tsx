'use client'

import Lesson, { ILessonSection } from "@/components/Lesson/Lesson";
import { getUtteraceInstance } from "@/utils/utils";
import { useLayoutEffect, useState } from "react";
import styles from './lessonPage.module.scss'
import { IndexContent } from "@/components/IndexContent/IndexContent";
import { LessonHeader } from "@/components/LessonHeader/LessonHeader";
import { sanitize } from "isomorphic-dompurify";

export function LessonPage(data: any) {

    const [utterance, setUtterance] = useState<SpeechSynthesisUtterance | null>(null)

    const [lessonData, setLessonData] = useState<any>(null)

    useLayoutEffect(()=> {
        getUtteraceInstance()
            .then((utterance)=> {
                setUtterance(utterance)
            })

        let data
        import(`../../../../public/data/lessons/prasens.json`)
            .then(result => setLessonData(result))
    }, [])

    return (
        <div className={styles.container}>
            <LessonHeader></LessonHeader>
            <IndexContent
                content={lessonData}

            ></IndexContent>
            <Lesson
                data={data}
                utterance={utterance}
                lesson={"präsens"}
                isPost={true}
            ></Lesson>
        </div>
    )
}