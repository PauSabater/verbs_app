import { SVGBookmark, SVGDoc } from '@/assets/svg/svgExports'
import InfoInCircle from '../../elements/InfoInCircle/InfoInCircle'
import styles from './lessonHeader.module.scss'
import { ButtonBookmark } from '../Bookmarker/ButtonBookmark'
import { fontTitles } from '@/app/fonts'
import { useContext } from 'react'
import { LessonPageContext } from '@/app/lessons/[slug]/LessonPage'

interface ILessonHeader {
    title: string,
    level: string,
    date: string
}

export function LessonHeader(props: ILessonHeader) {

    const lessonPageContext = useContext(LessonPageContext)

    return (
        <div className={styles.container}>
            <h1 className={fontTitles.className}>{props.title}</h1>
            <div className={styles.levelContainer}>
                <InfoInCircle text={props.level} />
                <p>level</p>
                <p>|</p>
                <p>{props.date}</p>
            </div>
            <ButtonBookmark text={'Bookmark lesson'} />
        </div>
    )
}