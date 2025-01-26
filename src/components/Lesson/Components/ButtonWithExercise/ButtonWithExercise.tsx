import { Button } from "@/components/atoms/Button/Button";
import { ExerciseConjugation } from "@/components/ExerciseConjugation/ExerciseConjugation";
import { IExerciseConjugationTexts } from "@/components/ExerciseConjugation/ExerciseConjugation.exports";
import { useContext, useLayoutEffect, useState } from "react";
import styles from './buttonWithExercise.module.scss'
import { LessonPageContext } from "@/app/lessons/[slug]/LessonPage";


interface IButtonWithExercise {
    buttonText: string,
    verb: string,
    exerciseTexts: IExerciseConjugationTexts,
    exerciseTense: string,
}


export default function ButtonWithExercise(props: IButtonWithExercise): React.JSX.Element {

    const lessonPageContext = useContext(LessonPageContext)
    const [showExercise, setShowExercise] = useState<boolean>(false)

    const verbConjugation = lessonPageContext.verbsConjugations.find((conj: any)=> {
        return conj.verb == props.verb
    })

    // for (const conj of lessonPageContext.verbsConjugations) {
    //     console.log('ieie')
    //     console.log(conj)

    // }

    const onBtnExerciseClick = ()=> {
        setShowExercise(true)
    }

    const onCloseExercise = ()=> {
        setShowExercise(false)
    }

    return <>
                <a href={`#exercise-${props.verb}`}>
                    <Button
                        icon={'exercise'}
                        text={props.buttonText}
                        callback={onBtnExerciseClick}
                    ></Button>
                </a>
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
                        conjugationCurrentVerb={verbConjugation.conjugations || undefined}
                        isRandomMode={false}
                        types={[]}
                        levels={[]}
                        ></ExerciseConjugation>
                :<></>
            }
            </div>


    </>



}