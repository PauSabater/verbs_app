import { SVGArrow, SVGExercise, SVGLink, SVGNext, SVGRepeat } from '@/assets/svg/svgExports'
import styles from './Button.module.scss'
import Link from 'next/link'

interface IButton {
    text: string,
    width?: "fullWidth" | "fitContent",
    icon?: "exercise" | "repeat" | "next" | "link",
    color?: TColor,
    size?: "lg" | "xs" | "xsSquare",
    callback?: Function
    type?: "submit" | "reset"
    title?: string
    isLink?: boolean
    path?: string
}

export type TColor = "primary" | "primaryReverse" | "primaryDarkReverse" | "primaryReverseNoInverse" | "primaryDark" | "secondary" | "secondaryReverse" | "tertiary" | "tertiaryReverse"| "inactive" | "error" | "success" | "transparent"

export function Button(props: IButton) {

    const getIcon = (icon: string)=> {
        if (props.icon === "exercise") return (<SVGExercise></SVGExercise>)
        if (props.icon === "repeat") return (<SVGRepeat></SVGRepeat>)
        if (props.icon === "next") return (<SVGArrow></SVGArrow>)
        if (props.icon === 'link') return <SVGLink></SVGLink>
    }

    const handleBtnClick = ()=> {
        if (!props.callback) return
        props.callback()
    }

    return (
        <>
            {!props.isLink ? (
                <button
                    title={props.title || ''}
                    className={`${styles.Button} ${styles[props.color || 'primaryDark']} ${styles[props.width || 'fitContent']} ${styles[props.size || '']}`}
                    type={props.type}
                    onClick={() => handleBtnClick()}
                >
                    {props.icon ? getIcon(props.icon) : null}
                    {props.text}
                </button>
            ) : (
                <Link
                    href={props.path || ''}
                    title={props.title || ''}
                    className={`${styles.Button} ${styles[props.color || 'primaryDark']} ${styles[props.width || 'fitContent']} ${styles[props.size || '']}`}
                    type={props.type}
                    onClick={() => handleBtnClick()}
                >
                    {props.icon ? getIcon(props.icon) : null}
                    {props.text}
                </Link>
            )}
        </>
    )
}