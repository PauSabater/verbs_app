import { IVerbAllTenses } from '@/components/ExerciseConjugation/ExerciseConjugation.exports'
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'


export async function getApiVerbDataz(verb: string) {
    let verbData
    const response = await fetch(`http://localhost:9090/verbs/get/verb/sein`).then((result) => {
        verbData = result
        console.log(verbData)
    })

    fetch('http://localhost:9090/verbs/get/verb/sein', {
        method: 'GET',
        headers: {
            Accept: 'application/json'
        }
    })
    .then((response) => response.json())
    .then((response) => verbData = response)

    // By returning { props: { posts } }, the Blog component
    // will receive `posts` as a prop at build time
    return verbData
}

export const getApiVerbData = async (verb: string) => {
    // Fetch data from external API
    const res = await fetch(`http://localhost:9090/verbs/get/verb/${verb}`)
    const verbData = await res.json()
    // Pass data to the page via props
    return { props: { verbData } }
}

export async function getPageVerbsTexts() {
    let texts
    await import(`../../public/data/texts/textsVerbPage.json`).then((result) => {
        texts = result
    })

    // By returning { props: { posts } }, the Blog component
    // will receive `posts` as a prop at build time
    return {
        props: {
            texts
        }
    }
}

export async function getTextsVerbExercise() {
    let texts
    await import(`../../public/data/texts/textsVerbExercise.json`).then((result) => {
        texts = result
    })

    return texts
}

export async function getAllVerbTenses(verb: string) {
    let allTenses
    await import(`../../public/data/verbs/${verb}.json`).then((result) => {
        allTenses = result
    })

    return allTenses
}
