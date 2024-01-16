'use client'

import { SVGTailedArrow } from '@/assets/svg/svgExports'
import styles from './ButtonBack.module.scss'

interface IButtonBack {
    text?: string,
    sense: "right" | "left" | "top" | "down"
    action: Function
}

export function ButtonBack(props: IButtonBack) {

    return (
        <div
            data-btn-back={""}
            className={`${styles.container} ${styles.sense ? styles.sense : styles.right}`}
            onClick={props.action()}
        >
            {   props.text
                    ? <p className={styles.text}>{props.text}</p>
                    : ''
            }
            <SVGTailedArrow
            ></SVGTailedArrow>
        </div>
    )
}