export async function getLessonData(lessonPath: string) {

    console.log('TEST IS ' + lessonPath)

    let lessonWithUmlaut = lessonPath
    if ((lessonPath === 'prasens')) lessonWithUmlaut = 'präsens'
    if ((lessonPath === 'prateritum')) lessonWithUmlaut = 'präteritum'

    let lessonData
    await import(`../../public/data/lessons/${lessonWithUmlaut}.json`).then((result) => {
        lessonData = result
    })

    // By returning { props: { lessonData } }, the lesson component
    // will receive `lessonData` as a prop at build time
    return {
        props: {
            lessonData
        }
    }
}
