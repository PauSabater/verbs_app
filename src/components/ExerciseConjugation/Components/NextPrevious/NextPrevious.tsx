import styles from './nextPrevious.module.scss'
import { useContext } from 'react'
import { Information } from '@/components/Information/Information'
import { ExerciseConjugationContext } from '../../ExerciseConjugation'
import { IExerciseConjugationState } from '../../ExerciseConjugationReducer'
import Link from 'next/link'
import { SVGNextPrev } from '@/assets/svg/svgExports'

interface INextPrevious {
    // callbackOnChange: Function
    // initialValue: boolean
    // isNext: boolean
}

export default function NextPrevious(props: INextPrevious) {

    const context = useContext(ExerciseConjugationContext) as IExerciseConjugationState

    const NextPrevLink = (isNext:{isNext: boolean})=> {
        return (
            <button className={styles.nextPrevBtn}>
                {isNext ? <SVGNextPrev /> : <></>}
                <div className={styles.textContainer}>
                    {/* <p>{'previous:'}</p> */}
                    <p className={styles.linkMainText}>{'haben'}</p>
                </div>
                {!isNext ? <SVGNextPrev /> : <></>}
            </button>
        )
    }

    return (
        <div className={`${styles.container}`}>
            <NextPrevLink isNext={true}/>
        </div>
    )
}