import { IVerbAllTenses } from '@/components/ExerciseConjugation/ExerciseConjugation.exports'
import { getComaSeparatedStringFromArray } from '@/utils/utils'
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'

export const getApiVerbData = async (verb: string) => {
    // Fetch data from external API
    const res = await fetch(`http://localhost:9090/api/verbs/get/verb/${verb}`)
    const verbData = await res.json()
    // Pass data to the page via props
    return { props: { verbData } }
}

export function getUrlRandomVerb(types?: string[], levels?: string[]) {
    const typesStr = types
        ? `types=${getComaSeparatedStringFromArray(types)}`
        : ''
    const levelsStr = levels
        ? `levels=${getComaSeparatedStringFromArray(levels)}`
        : ''

    const url = [
        `http://localhost:9090/api/verbs/get/random-verb`,
        (typesStr || levelsStr) ? '?' : '',
        typesStr || '',
        typesStr && levelsStr ? '&' : '',
        levelsStr || ''
    ].join('')

    return url
}

export async function getRandomVerb(types?: string[], levels?: string[]) {
    console.log('in get random verb')

    const typesStr = types
        ? `types=${getComaSeparatedStringFromArray(types)}`
        : ''
    const levelsStr = levels
        ? `levels=${getComaSeparatedStringFromArray(levels)}`
        : ''

    const url = [
        `http://localhost:9090/api/verbs/get/random-verb`,
        (typesStr || levelsStr) ? '?' : '',
        typesStr || '',
        typesStr && levelsStr ? '&' : '',
        levelsStr || ''
    ].join('')

    console.log('url us')
    console.log(url)

    const res = await fetch(url)
}

export const adaptTenseForApiUrl = (tense: string) => {
    const tenseToCheck = tense.toLowerCase().replace(/[._]/g, ' ')
    console.log('tense to check')
    console.log(tenseToCheck)
    switch (tenseToCheck) {
        case 'plusquamperfekt':
            return 'plusquam'

        case 'futur i':
            return 'futur_I'

        case 'futur ii':
            return 'futur_II'

        case 'imperativ':
            return 'imperative'

        case 'konj ii präteritum':
            return 'konj_II_präteritum'

        case 'konj ii plusquam':
            return 'konj_II_plusquam'

        case 'konj ii futur i':
            return 'konj_II_futur_I'

        case 'konj ii futur ii':
            return 'konj_II_futur_I'

        case 'konj i präsens':
            return 'konj_I_präsens'

        case 'konj i futur i':
            return 'konj_I_futur_I'

        case 'konj i futur ii':
            return 'konj_I_futur_II'

        case 'konj i perfekt':
            return 'konj_I_perfekt'

        case 'infinitiv i':
            return 'infinitiv_I'

        case 'infinitiv ii':
            return 'infinitiv_I'

        case 'partizip i':
            return 'partizip_I'

        case 'partizip ii':
            return 'partizip_II'

        default:
            return tenseToCheck
        }
}

export const getApiVerbConjugationsFromTenses = async (verb: string, tenses: string[]) => {
    let tensesStr = ''
    tenses.forEach((tense)=> {
        const tenseForStr = adaptTenseForApiUrl(tense)
        tensesStr = tensesStr === '' ? tenseForStr : `${tensesStr},${tenseForStr}`
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
            await import(decodeURI(`../../public/data/lessons/${decodeURI(lesson)}.json`)).then((result) => {
                allLessons.push(result.props)
            })
        }

        return allLessons

}