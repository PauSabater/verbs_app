'use client'

import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { ExerciseConjugation } from '@/components/ExerciseConjugation/ExerciseConjugation'
import textsVerbExercise from '@/data/textsVerbExercise.json'
import styles from './exercisePage.module.scss'
import { replaceTenseFromURL } from '@/utils/utils'

export default function Page() {

    const searchParams = useSearchParams()

    const verbs = searchParams.get('verbs')?.split(',')
    const tenses = searchParams.get('tenses')?.split(',').map((tense)=> {
        return replaceTenseFromURL(tense)
    })

    const mode = searchParams.get('mode')


    return (
        <>
            {
                <div className={styles.container}>
                    <div className={styles.layout}>
                        <div className={styles.containerExercise}>
                            {
                                mode ?
                                    <div>
                                        <h1>{mode}</h1>
                                    </div>
                                :
                                    <ExerciseConjugation
                                        verb={verbs ? verbs[0] : ''}
                                        tensesDropdown={['hey', 'eho']}
                                        texts={textsVerbExercise}
                                        tenseExercise={tenses ? tenses[0] : ''}
                                        selectedTenses={['präsens', 'präteritum']}
                                        isSingleTense={false}
                                        // isSingleUse={false}
                                        isEmbedded={true}
                                        verbs={verbs}
                                        tenses={tenses || []}
                                    ></ExerciseConjugation>
                            }
                        </div>
                    </div>
                </div>
            }
        </>
    )
}