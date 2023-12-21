import Image from 'next/image'
import styles from './HoveredWithInfo.module.scss'
import { Fragment, ReactNode } from 'react'
import { sanitize } from 'isomorphic-dompurify'
import { SVGExercise } from '@/assets/svg/svgExports'

interface IHoveredWithInfo {
    text: string,
    children: ReactNode,
    bg: string
}

export function HoverWithInfo(props: IHoveredWithInfo) {

    return  (
        <div className={`${styles.container} ${props.bg ? styles[props.bg] : ''}`} data-info={props.text}>
            {props.children}
        </div>

    )
}