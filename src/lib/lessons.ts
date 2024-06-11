export async function getLessonData(lessonPath: string) {

    console.log('TEST IS ' + lessonPath)

    let lessonWithUmlaut = lessonPath
    if ((lessonPath === 'prasens')) lessonWithUmlaut = 'präsens'
    if ((lessonPath === 'prateritum')) lessonWithUmlaut = 'präteritum'

    let lessonData
    await import(`../../public/data/lessons/${lessonWithUmlaut}.json`).then((result) => {
        lessonData = result
    })

    console.log("HEY WE GOT LESSON FOR")
    console.log(lessonPath)

    // By returning { props: { posts } }, the Blog component
    // will receive `posts` as a prop at build time
    return {
        props: {
            lessonData
        }
    }
}
