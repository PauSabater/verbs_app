import { FormEvent, useState } from 'react'
import styles from './lessonLink.module.scss'
import Link from 'next/link'
import { replaceUmlautsURL } from '@/utils/utils'
import InfoInCircle from '@/components/UI/InfoInCircle/InfoInCircle'

interface ILessonsLink {
    tense: string,
    title: string,
    level: string
}

// export const APP_ID = 'konjug-users-awatt'
// const app = new App(APP_ID)

export default function LessonLink(props: ILessonsLink) {
    // const [isSignUp, setIsSignUp] = useState<boolean>(true)

    return (
        <Link className={styles.link} href={`/lessons/${replaceUmlautsURL(props.tense)}`}>
            <div className={styles.background}></div>
            <div className={styles.content}>
                <h1 className={styles.title}>{props.title}</h1>
                <div></div>
                <div className={styles.levelContainer}>
                    <InfoInCircle text={props.level}></InfoInCircle>
                    <p>{`level`}</p>
                </div>
            </div>
        </Link>
    )
}
