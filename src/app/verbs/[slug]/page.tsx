import { Fragment } from "react"
import VerbsPage from "./VerbPage"
import { getApiVerbData, getPageVerbsTexts } from "@/lib/getApiData"



export default async function Page({ params }: { params: { slug: string } }) {

    const pageData = await getApiVerbData(params.slug)
    const pageTexts = await getPageVerbsTexts()

    return (
        <Fragment>
            <VerbsPage
                slug={params.slug}
                data={JSON.stringify(pageData)}
                texts={JSON.stringify(pageTexts)}
            ></VerbsPage>
        </Fragment>
    )
}


export async function generateStaticParams() {
    const posts = [{slug: "sein"}, {slug: "sagen"}]

    return posts.map((post) => ({
      slug: post.slug,
    }))
}