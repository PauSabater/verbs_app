import InfoInCircle from '@/elements/InfoInCircle/InfoInCircle'
import styles from './ignoreSpecialCharacters.module.scss'
import { Fragment, useContext } from 'react'
import { ContextVerbPage, IVerbsPageContext } from '@/app/verbs/[slug]/VerbPage'
import VerbStemFormation from '../../../VerbHeader/Components/VerbStemFormation/VerbStemFormation'
import { Information } from '@/components/Information/Information'
import { ExerciseConjugationContext } from '../../ExerciseConjugation'
import { IExerciseConjugationState } from '../../ExerciseConjugationReducer'

interface IIgnoreSpecialChars {
    callbackOnChange: Function
    initialValue: boolean
}

export default function IgnoreSpecialCharacters(props: IIgnoreSpecialChars) {

    const context = useContext(ExerciseConjugationContext) as IExerciseConjugationState

    return (
        <div className={`${styles.container}`}>
            <div className={styles.textContainer}>
                <p className={styles.title}>Ignore special characters?</p>
                <Information
                    text={'<span>you can use instead:</span></br>ä → a</br>ö → o</br>ü → u</br>ß → ss'}
                />
            </div>

            <div className={styles.inputsContainer}>
                <input
                    checked={context.ignoreSpecialChars === null || context.ignoreSpecialChars === true || props.initialValue === true}
                    onClick={(e)=> props.callbackOnChange(e)}
                    type="radio"
                    id="yes-special-chars"
                    name="special-chars"
                    value="yes"
                />
                <label htmlFor="yes-special-chars">yes</label>

                <input
                    checked={props.initialValue === false}
                    onClick={(e)=> props.callbackOnChange(e)}
                    type="radio"
                    id="no-special-chars"
                    name="special-chars"
                    value="no"
                />
                <label htmlFor="no-special-chars">no</label>
            </div>

        </div>
    )
}