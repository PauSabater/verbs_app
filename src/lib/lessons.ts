

export async function getLessonData(lesson: string) {

    let lessonData
    await import(`../../public/data/lessons/${lesson}.json`)
    .then(result => {
        console.log("IN GET LESSON DATA!")
        lessonData = result
        console.log(lessonData)
    })

    // By returning { props: { posts } }, the Blog component
    // will receive `posts` as a prop at build time
    return {
        props: {
            lessonData,
        },
    }

}