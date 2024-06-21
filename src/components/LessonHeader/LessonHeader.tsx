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
            {/* <p className={styles.intro}>The Präsens tense in German direclty corresponds to the present tense in English, as it is used to describe actions that are happening right now or habitual actions.
    However, it can also be used to describe future actions or actions happenning now with continuation on the future. This is because in German the future tense is rarely used and there is no present continuous. The Präsens should be the first tense to learn when starting to learn German.
    </p> */}

            {/* <div className={styles.background}></div>
            <p>THIS IS A HEADER</p> */}
        </div>
    )
}