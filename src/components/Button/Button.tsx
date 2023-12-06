import { SVGExercise } from '@/assets/svg/svgExports'
import styles from './Button.module.scss'

interface IButton {
    text: string,
    width?: "fullWidth" | "fitContent",
    icon?: "exercise" | "redo",
    color?: TColor,
    size?: "lg",
    callback?: Function
}

export type TColor = "primary" | "primaryReverse" | "primaryDarkReverse" | "primaryDark" | "secondary" | "secondaryReverse" | "inactive" | "error" | "success"

export function Button(props: IButton) {

    const getIcon = (icon: string)=> {
        if (props.icon === "exercise") return (<SVGExercise></SVGExercise>)
    }

    const handleBtnClick = ()=> {
        console.log("in button for click")
        if (!props.callback) return
        props.callback()
    }

    return (
        <button className={`
            ${styles.Button}
            ${styles[props.color || "primaryDark"]}
            ${styles[props.width || "fitContent"]}
            ${styles[props.size || ""]}
        `}
            onClick={()=> handleBtnClick()}>
            {props.icon ? getIcon(props.icon) : null}
            {props.text}
        </button>
    )
}