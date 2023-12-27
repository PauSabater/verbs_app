import { Fragment } from "react"
import VerbsPage from "./VerbPage"




export default function Page({ params }: { params: { slug: string } }) {
    return (
        <Fragment>
            <VerbsPage params={{slug: params.slug}}></VerbsPage>
        </Fragment>
    )
}


export async function generateStaticParams() {
    const posts = [{slug: "sein"}, {slug: "hello"}]

    return posts.map((post) => ({
      slug: post.slug,
    }))
}