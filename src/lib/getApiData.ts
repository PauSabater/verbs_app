import { IVerbAllTenses } from "@/components/ExerciseConjugation/ExerciseConjugation.exports"


export async function getApiVerbData(verb: string) {

    let verbData
    await import(`../../public/data/verbs/${verb}.json`)
    .then(result => {
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

export async function getPageVerbsTexts() {

    let texts
    await import(`../../public/data/texts/textsVerbPage.json`)
    .then(result => {
        texts = result
    })

    // By returning { props: { posts } }, the Blog component
    // will receive `posts` as a prop at build time
    return {
        props: {
            texts,
        },
    }
}

export async function getTextsVerbExercise() {

    let texts
    await import(`../../public/data/texts/textsVerbExercise.json`)
    .then(result => {
        texts = result
    })

    return texts
}

export async function getAllVerbTenses(verb: string) {

    let allTenses
    await import(`../../public/data/verbs/${verb}.json`)
    .then(result => {
        allTenses = result
    })

    return allTenses
}