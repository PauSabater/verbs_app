'use client'

import styles from './ButtonClose.module.scss'

interface ICollapsibleTexts {
    title: string
}

export function ButtonClose(props: {closeAction: Function}) {

    return (
        <div className={styles.container} onClick={props.closeAction()}></div>
    )
}