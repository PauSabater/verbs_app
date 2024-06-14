import { Button } from "@/components/Button/Button";
import { ExerciseConjugation } from "@/components/ExerciseConjugation/ExerciseConjugation";
import { IExerciseConjugationTexts } from "@/components/ExerciseConjugation/ExerciseConjugation.exports";
import { useLayoutEffect, useState } from "react";
import styles from './buttonWithExercise.module.scss'


interface IButtonWithExercise {
    buttonText: string,
    verb: string,
    exerciseTexts: IExerciseConjugationTexts,
    exerciseTense: string,
}


export default function ButtonWithExercise(props: IButtonWithExercise): React.JSX.Element {

    const [showExercise, setShowExercise] = useState<boolean>(false)

    const onBtnExerciseClick = ()=> {
        setShowExercise(true)
    }

    const onCloseExercise = ()=> {
        setShowExercise(false)
    }

    return <>
        {
            !showExercise ?
                <>
                <a href={`#exercise-${props.verb}`}>
                    <Button
                        icon={'exercise'}
                        text={props.buttonText}
                        callback={onBtnExerciseClick}
                    ></Button>
                </a>
                </>
                : <></>
        }
            <div id={`exercise-${props.verb}`} className={styles.scrollTrigger} >
            {
                showExercise ?
                    <ExerciseConjugation
                        verb={props.verb}
                        // tensesDropdown={['hey', 'eho']}
                        texts={props.exerciseTexts}
                        tenseExercise={props.exerciseTense || ''}
                        // selectedTenses={['präsens', 'präteritum']}
                        isSingleTense={true}
                        // isSingleUse={false}
                        isEmbedded={true}
                        verbs={[props.verb || '']}
                        tenses={[props.exerciseTense || '']}
                        isLessonExercise={true}
                        actionOnBtnClose={onCloseExercise}
                    ></ExerciseConjugation>
                :<></>
            }
            </div>


    </>



}