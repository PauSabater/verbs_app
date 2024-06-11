import { IVerbAllTenses } from '@/components/ExerciseConjugation/ExerciseConjugation.exports'
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'

export const getApiVerbData = async (verb: string) => {
    // Fetch data from external API
    const res = await fetch(`http://localhost:9090/api/verbs/get/verb/${verb}`)
    const verbData = await res.json()
    // Pass data to the page via props
    return { props: { verbData } }
}

export const getApiVerbConjugationsFromTenses = async (verb: string, tenses: string[]) => {
    let tensesStr = ''
    tenses.forEach((tense)=> {
        tensesStr = tensesStr === '' ? tense : `${tensesStr},${tense}`
    })
    // Fetch data from external API
    const res = await fetch(`http://localhost:9090/api/verbs/get/tenses/${verb}?tenses=${tensesStr}`)
    const verbData = await res.json()
    // Pass data to the page via props
    return { props: { verbData } }
}

export const getVerbsProperties = async (verbs: string[])=> {

    let parametersUrl = '?'
    verbs.forEach(verb => parametersUrl = `${parametersUrl}${verb}&`)
    parametersUrl.slice(0, -1)

    console.log("DATA URI TO FETCH")
    console.log(`http://localhost:9090/api/verbs/get/props/${parametersUrl}`)

      // Fetch data from external API
    const res = await fetch(`http://localhost:9090/api/verbs/get/props/${parametersUrl}`)

    if (res.status >= 400 && res.status < 600) throw new Error('Verb properties could not be fetched')

    const verbData = await res.json()

    // Pass data to the page via props
    return verbData
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

export async function getLessonsData(lessons: string[]) {
        let allLessons: any[] = []

        for (const lesson of lessons) {
            await import(`../../public/data/lessons/${lesson}.json`).then((result) => {
                allLessons.push(result.props)
            })
        }

        return allLessons

}
