import { useContext } from 'react'
import styles from './tensesList.module.scss'
import { ExerciseConjugationContext } from '../../ExerciseConjugation'


export const TensesList = ()=> {

    const context = useContext(ExerciseConjugationContext)

    return (
        <div
            className={styles.container}
        >
            <p>Tenses</p>
            {
                context && context.tenses ? context.tenses.map((tense)=> {
                    return (
                        <p className={tense.tense === context.currentTense ? styles.underlined : styles.verb}>{tense.tense}</p>
                    )
                })

                : <></>
            }

        </div>
    )
}