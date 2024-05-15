'use server'

import { Fragment, createContext, useContext } from 'react'
import { LessonPage } from './LessonPage'
import { InferGetStaticPropsType } from 'next/types'
import { getLessonData } from '@/lib/lessons'
import { getPageVerbsTexts, getTextsVerbExercise, getVerbsProperties } from '@/lib/getApiData'
import { headers } from 'next/headers'


export default async function Page({ params }: { params: { slug: string } }) {

    console.log("IN DATA PAGE, WE HAVE")
    console.log(params)

    // Data requests in server:
    const pageData = await getLessonData(params.slug)
    const textsVerbExercise = await getTextsVerbExercise()
    const dataVerbsInText = await getVerbsProperties((pageData.props.lessonData as any).verbsUsed as string[])

    // console.log((pageData.props.lessonData as any).verbsUsed)
    // console.log("DATA FROM VERBS PAGE FETCHED")
    // console.log(JSON.stringify(dataVerbsInText))

    // const value = useContext(LessonPageContext)

    return (
        <Fragment>
            {/* <p>{JSON.stringify(dataVerbsInText)}</p> */}
            <LessonPage
                host={headers().get('host') || ''}
                data={JSON.stringify(pageData.props.lessonData)}
                dataVerbsInText={dataVerbsInText}
                exercisesTense={'präsens'}
                textsExercise={JSON.stringify(textsVerbExercise)}
            ></LessonPage>
        </Fragment>
    )
}

export async function generateStaticParams() {
    const posts = [{ slug: 'prasens' }, { slug: 'perfekt' },  { slug: 'plusquamperfekt' }, { slug: 'prateritum' }]

    return posts.map((post) => ({
        slug: post.slug
    }))
}
