import { useContext } from 'react'
import styles from './tensesList.module.scss'
import { ExerciseConjugationContext } from '../../ExerciseConjugation'


export const TensesList = ()=> {

    const context = useContext(ExerciseConjugationContext)

    return (
        <div
            className={styles.container}
        >
            <p className={styles.title}>Tenses</p>
            {
                context && context.tensesState ? context.tensesState.map((tense, i)=> {
                    return (
                        <p
                            key={`tense-${i}`}
                            className={`${styles.tense}
                            ${styles[tense.tenseState]}`}
                        >
                            {tense.tense}
                        </p>
                    )
                })

                : <></>
            }

        </div>
    )
}