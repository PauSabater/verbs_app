

export async function getApiVerbData(verb: string) {

    let verbData
    await import(`../../public/data/verbs/${verb}.json`)
    .then(result => {
        console.log("IN GET VERB DATA!")
        verbData = result
        console.log(verbData)
    })

    // By returning { props: { posts } }, the Blog component
    // will receive `posts` as a prop at build time
    return {
        props: {
            verbData,
        },
    }
}