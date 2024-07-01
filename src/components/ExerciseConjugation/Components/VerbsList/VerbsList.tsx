import { useContext } from 'react'
import styles from './verbsList.module.scss'
import { ExerciseConjugationContext } from '../../ExerciseConjugation'


export const VerbsList = ()=> {

    const context = useContext(ExerciseConjugationContext)

    return (
        <div className={styles.container}>
            <p className={styles.title}>Verbs</p>
            {
                context && context.verbsState ? context.verbsState.map((verb, i)=> {
                    return (
                        <div className={styles.verbContainer}>
                            <p className={verb.verb === context.currentVerb && !verb.isCompleted ? styles.underlined : verb.isCompleted ? styles.completed : styles.verb}>{verb.verb}</p>
                            {/* <div className={} */}
                            {/* <svg className={styles.progress} width="13" height="62" viewBox="0 0 13 62" fill="none" xmlns="http://www.w3.org/2000/svg">

                                {
                                    i < (context.verbs.length - 1) ? <path d="M6.5 6L6.5 62" stroke="black" strokeWidth="2"/> : <></>
                                }
                                <circle cx="6.5" cy="6.5" r="5.5" fill="black" stroke="black" strokeWidth="2"/>
                            </svg> */}

                        </div>
                    )
                })

                : <></>
            }

        </div>
    )
}