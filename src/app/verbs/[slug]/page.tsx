import { Fragment } from "react"
import VerbsPage from "./VerbPage"
import { getApiVerbData } from "@/lib/getApiData"



export default async function Page({ params }: { params: { slug: string } }) {

    const pageData = await getApiVerbData(params.slug)
    console.log(pageData)

    return (
        <Fragment>
            <VerbsPage
                params={{slug: params.slug, data: JSON.stringify(pageData)}}
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