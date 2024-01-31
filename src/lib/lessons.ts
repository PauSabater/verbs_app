export async function getLessonData(lesson: string) {
    let lessonWithUmlaut = lesson
    if ((lesson = 'prasens')) lessonWithUmlaut = 'präsens'
    if ((lesson = 'praterium')) lessonWithUmlaut = 'präterium'

    let lessonData
    await import(`../../public/data/lessons/${lessonWithUmlaut}.json`).then((result) => {
        lessonData = result
    })

    // By returning { props: { posts } }, the Blog component
    // will receive `posts` as a prop at build time
    return {
        props: {
            lessonData
        }
    }
}
