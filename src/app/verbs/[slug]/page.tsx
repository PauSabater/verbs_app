import { Fragment } from 'react'
import VerbsPage from './VerbPage'
import { getApiVerbData, getPageVerbsTexts } from '@/lib/getApiData'
import { Metadata, ResolvingMetadata } from 'next'
import { headers } from 'next/headers'


export default async function Page({ params }: { params: { slug: string, nextSlug: string } }) {
    const pageData = await getApiVerbData(params.slug)
    const pageTexts = await getPageVerbsTexts()

    return (
        <Fragment>
            <VerbsPage
                slug={params.slug}
                nextSlug={params.nextSlug}
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
