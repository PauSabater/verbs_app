// 'use server'

import { Fragment, createContext, useContext } from 'react'
import { InferGetStaticPropsType } from 'next/types'
import { headers } from 'next/headers'
import exercisesData from '../../../../public/data/trainning/exercises.json'
import { ExerciseConjugation } from '@/components/ExerciseConjugation/ExerciseConjugation'
import styles from '../../exercise/exercisePage.module.scss'
import textsVerbExercise from '@/data/textsVerbExercise.json'

export default async function Page({ params }: { params: { slug: string } }) {

    const exerciseData = exercisesData.exercises.filter((exercise)=>
        exercise.path === params.slug
    )[0]

    return (
        <Fragment>
        <>
            {
                <div className={styles.container}>
                    <div className={styles.layout}>
                        <div className={styles.containerExercise}>
                            <ExerciseConjugation
                                verb={exerciseData?.verbs[0] || ''}
                                tensesDropdown={['hey', 'eho']}
                                texts={textsVerbExercise}
                                tenseExercise={exerciseData?.tenses[0] || ''}
                                selectedTenses={['präsens', 'präteritum']}
                                isSingleTense={false}
                                // isSingleUse={false}
                                isEmbedded={true}
                                verbs={exerciseData?.verbs || []}
                                tenses={exerciseData?.tenses || []} isRandomMode={false} types={[]} levels={[]}
                            ></ExerciseConjugation>
                        </div>
                    </div>
                </div>
            }
        </>
        </Fragment>
    )
}

export async function generateStaticParams() {

    const exercisePaths = exercisesData.exercises.map((exercise)=> {
        exercise.path
    })

    return exercisePaths.map((path) => ({
        slug: path
    }))
}