import { SVGCross, SVGHelp } from '@/assets/svg/svgExports'
import styles from './exerciseHelpTrigger.module.scss'
import { TExerciseState } from '../../ExerciseConjugation.exports'


interface IExerciseHelpTriggerInterface {
    isOpen: boolean,
    openTxt: string,
    closeTxt: string
    exerciseState: TExerciseState
    action: Function
}

export const ExerciseHelpTrigger = (props: IExerciseHelpTriggerInterface)=> {
    return (
        <div
            className={`${styles.container} ${props.exerciseState === "success" ? styles.hidden : ''}`}
            onClick={()=> props.action()}
        >
            {props.isOpen ? <SVGCross/> : <SVGHelp/>}
            <p data-trigger-text>{!props.isOpen ? props.openTxt : props.closeTxt}</p>
        </div>
    )
}