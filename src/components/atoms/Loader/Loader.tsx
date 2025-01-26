'use client'

import styles from './loader.module.scss'

interface ILoader {
    display: boolean,
    type: "linear-dots",
    animate: boolean
}

export function Loader({
    display,
    type,
    animate
}: ILoader) {

    return (
        <div className={styles.loader} data-type={type} data-loader>
            <div></div>
            <div></div>
            <div></div>
        </div>
    )
}