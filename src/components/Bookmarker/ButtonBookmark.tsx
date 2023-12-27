import { SVGBookmark } from '@/assets/svg/svgExports'
import styles from './buttonBookmark.module.scss'
import { Fragment, ReactNode } from 'react'

interface IButtonBookmark {
    text: string
}

export function ButtonBookmark(props: IButtonBookmark) {

    return  (
        <div className={styles.container}>
            <div className={styles.bg}></div>
            <SVGBookmark/>
            <p className={styles.text}>{props.text}</p>
        </div>

    )
}