import { Fragment } from 'react'
import { LessonPage } from './LessonPage'
import { InferGetStaticPropsType } from 'next/types'
import { getLessonData } from '@/lib/lessons'
import { getPageVerbsTexts, getTextsVerbExercise } from '@/lib/getApiData'

export default async function Page({ params }: { params: { slug: string } }) {
    const lesson = decodeURI(params.slug)

    const pageData = await getLessonData(lesson)
    const textsVerbExercise = await getTextsVerbExercise()

    return (
        <Fragment>
            <LessonPage data={JSON.stringify(pageData.props.lessonData)} exercisesTense={lesson} textsExercise={JSON.stringify(textsVerbExercise)}></LessonPage>
        </Fragment>
    )
}

export async function generateStaticParams() {
    const posts = [{ slug: encodeURI('präsens') }, { slug: encodeURI('präteritum') }]

    return posts.map((post) => ({
        slug: post.slug
    }))
}
