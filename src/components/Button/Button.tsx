import { SVGArrow, SVGExercise, SVGNext, SVGRepeat } from '@/assets/svg/svgExports'
import styles from './Button.module.scss'

interface IButton {
    text: string,
    width?: "fullWidth" | "fitContent",
    icon?: "exercise" | "repeat" | "next",
    color?: TColor,
    size?: "lg",
    callback?: Function
    type?: "submit" | "reset"
}

export type TColor = "primary" | "primaryReverse" | "primaryDarkReverse" | "primaryReverseNoInverse" | "primaryDark" | "secondary" | "secondaryReverse" | "tertiary" | "tertiaryReverse"| "inactive" | "error" | "success" | "transparent"

export function Button(props: IButton) {

    const getIcon = (icon: string)=> {
        if (props.icon === "exercise") return (<SVGExercise></SVGExercise>)
        if (props.icon === "repeat") return (<SVGRepeat></SVGRepeat>)
        if (props.icon === "next") return (<SVGArrow></SVGArrow>)
    }

    const handleBtnClick = ()=> {
        if (!props.callback) return
        props.callback()
    }

    return (
        <button
            className={`
            ${styles.Button}
            ${styles[props.color || 'primaryDark']}
            ${styles[props.width || 'fitContent']}
            ${styles[props.size || '']}
        `}
            type={props.type}
            onClick={() => handleBtnClick()}
        >
            {props.icon ? getIcon(props.icon) : null}
            {props.text}
        </button>
    )
}