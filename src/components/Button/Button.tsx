import { SVGArrow, SVGExercise, SVGLink, SVGNext, SVGRandom, SVGRepeat, SVGSearch } from '@/assets/svg/svgExports'
import styles from './Button.module.scss'
import Link from 'next/link'

interface IButton {
    text: string,
    width?: "fullWidth" | "fitContent",
    icon?: "exercise" | "repeat" | "next" | "link" | "random" | "search",
    color?: TColor,
    size?: "lg" | "xs" | "xsSquare" | "square"
    callback?: Function
    type?: "submit" | "reset"
    title?: string
    isLink?: boolean
    path?: string
    paramOnClick?: string
    isTextOnHover?: boolean
}

export type TColor = "primary" | "primaryReverse" | "primaryDarkReverse" | "primaryReverseNoInverse" | "primaryDark" | "primaryDarker" | "secondary" | "secondaryReverse" | "tertiary" | "tertiaryReverse"| "inactive" | "error" | "success" | "transparent" | "greyDark" | "greyReverse"

export function Button(props: IButton) {

    const getIcon = (icon: string)=> {
        if (props.icon === "exercise") return (<SVGExercise></SVGExercise>)
        if (props.icon === "repeat") return (<SVGRepeat></SVGRepeat>)
        if (props.icon === "next") return (<SVGArrow></SVGArrow>)
        if (props.icon === 'link') return <SVGLink></SVGLink>
        if (props.icon === 'random') return <SVGRandom></SVGRandom>
        if (props.icon === 'search') return <SVGSearch />
    }

    const handleBtnClick = ()=> {
        if (!props.callback) return
        props.callback(props.paramOnClick || '')
    }

    const getClassNames = ()=> {
        return `${styles.Button} ${styles[props.color || 'primaryDark']} ${styles[props.width || 'fitContent']} ${styles[props.size || '']} ${props.isTextOnHover ? styles.textOnHover : ''}`
    }

    return (
        <>
            {!props.isLink ? (
                <button
                    title={props.title || ''}
                    className={getClassNames()}
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