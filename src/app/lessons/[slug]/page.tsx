import { Fragment } from "react"
import { LessonPage } from "./LessonPage"
import { InferGetStaticPropsType } from "next/types"
import { getLessonData } from "@/lib/lessons"




export default async function Page({ params }: { params: { slug: string } }) {

    const pageData = await getLessonData(params.slug)

    return (
        <Fragment>
            {/* <p>BEEEEEEEEE</p> */}
            {/* <p>{JSON.stringify(pageData.props.lessonData)}</p> */}
            <p>Post: {params.slug}</p>
            <LessonPage
                data={JSON.stringify(pageData.props.lessonData)}
            ></LessonPage>
        </Fragment>
    )
}


export async function generateStaticParams() {
    const posts = [{slug: "prasens"}, {slug: "prateritum"}]

    return posts.map((post) => ({
      slug: post.slug,
    }))
}

// // This function gets called at build time on server-side.
// // It won't be called on client-side, so you can even do
// // direct database queries.
// export async function getInitialProps() {
//     // Call an external API endpoint to get posts.
//     // You can use any data fetching library
//     // const res = await fetch('https://.../posts')
//     // const posts = await res.json()

//     let data
//     await import(`../../../../public/data/lessons/prasens.json`)
//     .then(result => data = result)

//     // By returning { props: { posts } }, the Blog component
//     // will receive `posts` as a prop at build time
//     return {
//         props: {
//             data,
//         },
//     }
// }