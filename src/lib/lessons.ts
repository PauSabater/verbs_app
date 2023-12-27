

export async function getLessonData(lesson: string) {

    let data: any
    await import(`../../public/data/lessons/prasens.json`)
    .then(result => {
        console.log("IN GET LESSON DATA!")
        console.log(data)
        data = result
    })

    // By returning { props: { posts } }, the Blog component
    // will receive `posts` as a prop at build time
    return {
        props: {
            data,
        },
    }

}