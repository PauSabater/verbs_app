import Link from 'next/link'
import styles from './exerciseCard.module.scss'

interface IExerciseCard {
    title: string,
    description: string,
    path: string,
    level: string,
    verbs: string[],
    tenses: string[]
}


export const ExerciseCard = (props: IExerciseCard)=> {

    return (
        <Link className={styles.cardLink} href={`/trainning/${props.path}`}>
            <div className={styles.card}>
                <h2 className={styles.title}>{props.title}</h2>
                <p>{props.description}</p>
                <p>Level: {props.level}</p>
                <p><span className={styles.intro}>verbs:</span> {
                    props.verbs.map((verb)=> {
                        return (
                            <span className={styles.verb}>{verb}</span>
                        )
                    })}
                </p>
                <p><span className={styles.intro}>tenses:</span> {
                    props.tenses.map((tense)=> {
                        return (
                            <span className={styles.tense}>{tense}</span>
                        )
                    })}
                </p>
            </div>
        </Link>
    )
}