import { Fragment } from 'react'
import stylesPage from '../page.module.scss'
import styles from './lessonsPage.module.scss'
import { getLessonsData } from '@/lib/getApiData'
import LessonLink from '@/components/LessonsLinks/components/LessonLink/LessonLink'

interface ILessonsPage {
    lessonsProps: any[]
}

export default async function LessonsPage(props: ILessonsPage) {

    return (
        <Fragment>
            <div className={stylesPage.content}>
                <h1 className={styles.title}>Lessons</h1>

                <div className={styles.lessonsContainer}>
                    {props.lessonsProps.map((lesson) => {
                        return <LessonLink tense={lesson.tense} title={lesson.title} level={lesson.level}></LessonLink>
                    })}
                </div>
            </div>
        </Fragment>
    )
}