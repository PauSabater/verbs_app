import { SVGAdd, SVGArrow, SVGExercise, SVGLink, SVGList, SVGNext, SVGRandom, SVGRestart, SVGSearch } from '@/assets/svg/svgExports'
import styles from './Button.module.scss'
import Link from 'next/link'

interface IButton {
    text: string,
    width?: "fullWidth" | "fitContent",
    icon?: "exercise" | "repeat" | "next" | "link" | "random" | "search" | "restart" | "add" | 'list' | '',
    color?: TColor,
    size?: "lg" | "xs" | "xsSquare" | "square"
    callback?: Function
    type?: "submit" | "reset"
    title?: string
    isLink?: boolean
    path?: string
    paramOnClick?: string
    isTextOnHover?: boolean
    dotted?: boolean
}

export type TColor = "primary" | "primaryReverse" | "primaryDarkReverse" | "primaryReverseNoInverse" | "primaryDark" | "primaryDarker" | "secondary" | "secondaryReverse" | "tertiary" | "tertiaryReverse"| "inactive" | "error" | "success" | "transparent" | "greyDark" | "greyReverse"

export function Button(props: IButton) {

    const getIcon = (icon: string)=> {
        if (props.icon === "exercise") return (<SVGExercise />)
        if (props.icon === "repeat") return (<SVGRestart />)
        if (props.icon === "next") return (<SVGArrow />)
        if (props.icon === 'link') return <SVGLink />
        if (props.icon === 'random') return <SVGRandom />
        if (props.icon === 'search') return <SVGSearch />
        if (props.icon === 'restart') return <SVGRestart />
        if (props.icon === 'add') return <SVGAdd />
        if (props.icon === 'list') return <SVGList />
    }

    const handleBtnClick = ()=> {
        if (!props.callback) return
        props.callback(props.paramOnClick || '')
    }

    const getClassNames = ()=> {
        return `${styles.Button} ${styles[props.color || 'primaryDark']} ${styles[props.width || 'fitContent']} ${styles[props.size || '']} ${props.isTextOnHover ? styles.textOnHover : ''} ${props.dotted ? styles.dotted : ''}`
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