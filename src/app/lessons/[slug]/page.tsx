'use server'

import { Fragment, createContext, useContext } from 'react'
import { LessonPage } from './LessonPage'
import { InferGetStaticPropsType } from 'next/types'
import { getLessonData } from '@/lib/lessons'
import { getPageVerbsTexts, getTextsVerbExercise } from '@/lib/getApiData'
import { headers } from 'next/headers'


export default async function Page({ params }: { params: { slug: string } }) {
    const pageData = await getLessonData(params.slug)
    const textsVerbExercise = await getTextsVerbExercise()
    // const value = useContext(LessonPageContext)

    return (
        <Fragment>
            <LessonPage host={headers().get('host') || ''} data={JSON.stringify(pageData.props.lessonData)} exercisesTense={params.slug} textsExercise={JSON.stringify(textsVerbExercise)}></LessonPage>
        </Fragment>
    )
}

export async function generateStaticParams() {
    const posts = [{ slug: 'prasens' }, { slug: 'prateritum' }]

    return posts.map((post) => ({
        slug: post.slug
    }))
}
