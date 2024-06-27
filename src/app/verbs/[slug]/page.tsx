import { Fragment } from 'react'
import VerbsPage from './VerbPage'
import { getApiVerbData, getPageVerbsTexts } from '@/lib/getApiData'
import { Metadata, ResolvingMetadata } from 'next'
import { headers } from 'next/headers'
import verbsList from '@/data/verbsList.json'


export default async function Page({ params }: { params: { slug: string } }) {
    const pageData = await getApiVerbData(params.slug)
    const pageTexts = await getPageVerbsTexts()
    const verbNum = verbsList.verbs.findIndex((item) => item === params.slug)
    const prevVerb = verbNum !== 0 ? verbsList.verbs[verbNum - 1] : undefined
    const nextVerb = verbsList.verbs[verbNum + 1]


    return (
        <Fragment>
            <VerbsPage
                slug={params.slug}
                prevVerb={prevVerb}
                nextVerb={nextVerb}
                verbNum={verbNum}
                data={JSON.stringify(pageData)}
                texts={JSON.stringify(pageTexts)}
            ></VerbsPage>
        </Fragment>
    )
}

type Props = {
    params: { slug: string }
    // searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {

    return {
        title: `Conjugation and practise of the German verb "${params.slug}"`,
        description: `Learn and practise how to conjugate the verb ${params.slug} for the tenses präsens, präteritum, imperative`
        // openGraph: {
        //     images: ['/some-specific-page-image.jpg', ...previousImages]
        // }
    }
}
