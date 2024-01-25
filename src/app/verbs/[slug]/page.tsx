import { Fragment } from 'react'
import VerbsPage from './VerbPage'
import { getApiVerbData, getPageVerbsTexts } from '@/lib/getApiData'

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
