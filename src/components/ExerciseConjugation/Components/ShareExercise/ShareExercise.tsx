import { useContext } from 'react'
import styles from './shareExercise.module.scss'
import { ExerciseConjugationContext } from '../../ExerciseConjugation'
import { ButtonShare } from '@/components/ButtonShare/ButtonShare'


export const ShareExercise = ()=> {

    const context = useContext(ExerciseConjugationContext)

    return (
        <div
            className={styles.container}
        >
            <p>Share exercise on</p>

            <div className={styles.iconContainer}>

                <ButtonShare icon={'mail'}/>
                <ButtonShare icon={'facebook'}/>
                <ButtonShare icon={'whatsapp'}/>
                <ButtonShare icon={'x'}/>
                <ButtonShare icon={'linkedIn'}/>

            </div>

        </div>
    )
}