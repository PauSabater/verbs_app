import { SVGExercise } from '@/assets/svg/svgExports'
import styles from './Button.module.scss'

export function Button({text, color = "primary"}: {text: string, color?: string}) {
    return (
        <button className={`${styles.Button} ${styles[color]}`}>
            <SVGExercise></SVGExercise>
            {text}
        </button>
    )
}