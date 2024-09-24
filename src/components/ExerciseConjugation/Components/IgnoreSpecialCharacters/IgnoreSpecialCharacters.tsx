import InfoInCircle from '@/elements/InfoInCircle/InfoInCircle'
import styles from './ignoreSpecialCharacters.module.scss'
import { Fragment, useContext, useState } from 'react'
import { ContextVerbPage, IVerbsPageContext } from '@/app/verbs/[slug]/VerbPage'
import VerbStemFormation from '../../../VerbHeader/Components/VerbStemFormation/VerbStemFormation'
import { Information } from '@/components/Information/Information'
import { ExerciseConjugationContext } from '../../ExerciseConjugation'
import { IExerciseConjugationState } from '../../ExerciseConjugationReducer'
import Image from 'next/image'
import svgSettings from '../../../../assets/svgFiles/settings.svg'
import { iconImgSize } from '@/utils/constants'


interface IIgnoreSpecialChars {
    callbackOnChange: Function
    initialValue: boolean
}

export default function IgnoreSpecialCharacters(props: IIgnoreSpecialChars) {

    const context = useContext(ExerciseConjugationContext) as IExerciseConjugationState
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className={`${styles.container}`}>
            <button className={styles.buttonTrigger} onClick={() => setIsOpen(!isOpen)}>
                <p>Settings</p>
                <Image
                    src={svgSettings}
                    width={iconImgSize}
                    height={iconImgSize}
                    alt="settings"
                />
            </button>
            <div className={styles.toggledContainer} data-is-open={isOpen}>
                <div className={styles.textContainer}>
                    <p className={styles.title}>Ignore special characters?</p>
                    <Information
                        text={'<span>if ignored, you can use </br>these characters  instead:</span></br>ä → a</br>ö → o</br>ü → u</br>ß → ss'}
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

        </div>
    )
}