import { Fragment } from "react"
import { LessonPage } from "./LessonPage"
import { InferGetStaticPropsType } from "next/types"
import { getLessonData } from "@/lib/lessons"
import { getPageVerbsTexts, getTextsVerbExercise } from "@/lib/getApiData"


export default async function Page({ params }: { params: { slug: string } }) {
    const lesson = decodeURI(params.slug)

    const pageData = await getLessonData(lesson)
    const textsVerbExercise = await getTextsVerbExercise()

    return (
        <Fragment>
            <LessonPage
                data={JSON.stringify(pageData.props.lessonData)}
                exercisesTense={lesson}
                textsExercise={JSON.stringify(textsVerbExercise)}
            ></LessonPage>
        </Fragment>
    )
}


export async function generateStaticParams() {
    const posts = [{slug: encodeURI("präsens")}, {slug: encodeURI("präteritum")}]

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
//     await import(`../../../../public/data/lessons/präsens.json`)
//     .then(result => data = result)

//     // By returning { props: { posts } }, the Blog component
//     // will receive `posts` as a prop at build time
//     return {
//         props: {
//             data,
//         },
//     }
// }