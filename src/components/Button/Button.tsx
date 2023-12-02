import { SVGExercise } from '@/assets/svg/svgExports'
import styles from './Button.module.scss'

interface IButton {
    text: string,
    width?: "fullWidth" | "fitContent",
    icon?: "exercise" | "redo",
    color?: TColor,
    size?: "lg"
}

export type TColor = "primary" | "primaryReverse" | "primaryDarkReverse" | "primaryDark" | "secondary" | "secondaryReverse" | "inactive" | "error" | "success"

export function Button(props: IButton) {

    const getIcon = (icon: string)=> {
        if (props.icon === "exercise") return (<SVGExercise></SVGExercise>)
    }

    return (
        <button className={`
            ${styles.Button}
            ${styles[props.color || "primaryDark"]}
            ${styles[props.width || "fitContent"]}
            ${styles[props.size || ""]}

        `}>
            {props.icon ? getIcon(props.icon) : null}
            {props.text}
        </button>
    )
}