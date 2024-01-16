

export async function getLessonData(lesson: string) {

    let lessonData
    await import(`../../public/data/lessons/${lesson}.json`)
    .then(result => {
        lessonData = result
    })

    // By returning { props: { posts } }, the Blog component
    // will receive `posts` as a prop at build time
    return {
        props: {
            lessonData,
        },
    }
}