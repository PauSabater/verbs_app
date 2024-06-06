import { useContext } from 'react'
import styles from './verbsList.module.scss'
import { ExerciseConjugationContext } from '../../ExerciseConjugation'


export const VerbsList = ()=> {

    const context = useContext(ExerciseConjugationContext)

    return (
        <div
            className={styles.container}
        >
            <p>Verbs</p>
            {
                context && context.verbs ? context.verbs.map((verb)=> {
                    return (
                        <p className={verb.verb === context.currentVerb ? styles.underlined : styles.verb}>{verb.verb}</p>
                    )
                })

                : <></>
            }

        </div>
    )
}