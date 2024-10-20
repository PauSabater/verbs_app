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
    // isRandomMode: boolean,
    // currentVerbIndex: number
    updateVerb: Function
}

export default function NextPrevious(props: INextPrevious) {

    const context = useContext(ExerciseConjugationContext) as IExerciseConjugationState

    // const getCurrentVerbIndex = ()=> {
    //     if (props.isRandomMode) {
    //         return context.randomVerbsResults.indexOf(context.currentVerb)
    //     }
    //     return context.verbsNotRandom.indexOf(context.currentVerb)
    // }

    // const getPreviousVerb = ()=> {

    // }

    const NextPrevLink = (isNext:{isNext: boolean})=> {
        return (
            <button className={styles.buttonTrigger}>
                {isNext ? <SVGNextPrev /> : <></>}
                <div className={styles.textContainer}>
                    {/* <p>{'previous:'}</p> */}
                    <p className={styles.linkMainText}>{context.randomVerbsResults}</p>
                </div>
                {!isNext ? <SVGNextPrev /> : <></>}
            </button>
        )
    }

    const onButtonClick = (isNext: boolean)=> {
        console.log('update verb')
        const verbToUpdate = isNext ? context.randomVerbsResults[context.currentVerbIndex + 1] : context.randomVerbsResults[context.currentVerbIndex - 1]
        console.log(verbToUpdate)
        props.updateVerb(verbToUpdate)
    }

    return (
        <div className={`${styles.container}`}>
            <div className={styles.btnContainer}>
                {
                    context.currentVerbIndex > 0 ?
                        <button
                            className={styles.buttonTrigger}
                            onClick={()=> onButtonClick(false)}
                        >
                            <SVGNextPrev />
                            <div className={styles.textContainer}>
                                <p className={styles.linkMainText}>{context.randomVerbsResults[context.currentVerbIndex - 1]}</p>
                            </div>
                        </button> : <></>
                }
            </div>
            <div className={styles.btnContainer}>
                {
                    context.currentVerbIndex < context.randomVerbsResults.length ?
                        <button
                            className={styles.buttonTrigger}
                            onClick={()=> onButtonClick(true)}
                        >
                            <div className={styles.textContainer}>
                                <p className={styles.linkMainText}>{context.randomVerbsResults[context.currentVerbIndex + 1]}</p>
                            </div>
                            <SVGNextPrev />
                        </button> : <></>
                }
            </div>
        </div>
    )
}