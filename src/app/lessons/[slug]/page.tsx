'use server'

import { Fragment, createContext, useContext } from 'react'
import { LessonPage } from './LessonPage'
import { InferGetStaticPropsType } from 'next/types'
import { getLessonData } from '@/lib/lessons'
import { getApiVerbConjugationsFromTenses, getPageVerbsTexts, getTextsVerbExercise, getVerbsProperties } from '@/lib/getApiData'
import { headers } from 'next/headers'
import { getConjugationFromTense } from '@/components/ExerciseConjugation/ExerciseConjugation.exports'
import { Metadata, ResolvingMetadata } from 'next'


export default async function Page({ params }: { params: { slug: string } }) {

    console.log("IN DATA PAGE, WE HAVE")
    console.log(params)

    // Data requests in server:
    const dataResponse = await getLessonData(params.slug)
    const pageData = dataResponse.props.lessonData as any
    const textsVerbExercise = await getTextsVerbExercise()
    const dataVerbsInText = await getVerbsProperties((pageData as any).verbsUsed as string[])
    const verbsExercises: string[] = (pageData as any).verbsExercises
    const tenseExercise: string = (pageData as any).tenseExercises

    let exercisesConjugations = []

    for (const verb of verbsExercises) {

        const tensesResp: any = (await getApiVerbConjugationsFromTenses(verb, [tenseExercise]))
        const tensesObj = tensesResp.props.verbData.verb.data.tenses

        exercisesConjugations.push({
            verb: verb,
            conjugations: getConjugationFromTense(tensesObj, tenseExercise)
        })
    }


    return (
        <Fragment>
            {/* <p>{JSON.stringify(dataVerbsInText)}</p> */}
            <LessonPage
                host={headers().get('host') || ''}
                data={JSON.stringify(pageData)}
                dataVerbsInText={dataVerbsInText}
                exercisesTense={'präsens'}
                textsExercise={JSON.stringify(textsVerbExercise)}
                verbsConjugations={exercisesConjugations}
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

type Props = {
    params: { slug: string }
    // searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {

    return {
        title: getMetaTitle(params.slug),
        description: `Learn how to conjugate the ${params.slug} tense in German with our comprehensive guide. Discover its usage, master conjugation rules, and practice with exercises.`
        // openGraph: {
        //     images: ['/some-specific-page-image.jpg', ...previousImages]
        // }
    }
}

function getMetaTitle(slug: string) {

    switch(slug){
        case 'prateritum' || 'präteritum':
            return 'Präteritum (German Simple Past) | Guide and exercises'
        case 'präsens' || 'prasens':
            return 'Präsens (German Present Tense) | Guide and exercises'
        case 'perfekt':
            return 'Perfect (German Present Perfect Tense) | Guide and exercises'
        case 'futur-I':
            return 'Futur I (German Future Tense) | Guide and exercises'
        default:
            return ''
    }
}
