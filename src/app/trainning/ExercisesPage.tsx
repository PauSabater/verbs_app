import { Fragment } from 'react'
import styles from './exercisesPage.module.scss'
import stylesPage from '../page.module.scss'
import dataExercises from "../../../public/data/trainning/exercises.json"
import { ExerciseCard } from './components/ExerciseCard'


export default function ExercisesPage() {

    return (
        <Fragment>
            <div className={`${stylesPage.content} ${styles.layout}`}>
                <h1>Exercises</h1>
                <div className={styles.cardsContainer}>
                    {
                        dataExercises.exercises.map((exercise)=> {
                            return (
                                <ExerciseCard {...exercise}/>
                            )
                        })
                    }
                </div>
            </div>
        </Fragment>
    )
}