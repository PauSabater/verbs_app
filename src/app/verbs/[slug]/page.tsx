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
            <VerbsPage slug={params.slug} nextSlug={params.nextSlug} data={JSON.stringify(pageData)} texts={JSON.stringify(pageTexts)}></VerbsPage>
        </Fragment>
    )
}

const verbsList = [
    'sein',
    'haben',
    'werden',
    'können',
    'müssen',
    'sagen',
    'machen',
    'gehen',
    'wissen',
    'kommen',
    'sehen',
    'wollen',
    'lassen',
    'stehen',
    'finden',
    'liegen',
    'denken',
    'nehmen',
    'tun',
    'glauben'
]

export async function generateStaticParams() {
    const posts: any[] = []

    verbsList.forEach((verb) => {
        posts.push({ slug: verb })
    })

    return posts.map((post) => ({
        slug: post.slug,
    }))
}

type Props = {
    params: { slug: string }
    searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata({ params, searchParams }: Props, parent: ResolvingMetadata): Promise<Metadata> {
    // read route params
    // const id = params.id

    // // fetch data
    // const product = await fetch(`https://.../${id}`).then((res) => res.json())

    // // optionally access and extend (rather than replace) parent metadata
    // const previousImages = (await parent).openGraph?.images || []

    const posts: any[] = []

    verbsList.forEach((verb) => {
        posts.push({ slug: verb })
    })

    return {
        title: `Conjugation and practise of the German verb "${params.slug}"`,
        description: `Learn and practise how to conjugate the verb ${params.slug} for the tenses präsens, präteritum, imperative`
        // openGraph: {
        //     images: ['/some-specific-page-image.jpg', ...previousImages]
        // }
    }
}
