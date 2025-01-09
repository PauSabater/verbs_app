'use client'

import styles from './ButtonClose.module.scss'

interface ICollapsibleTexts {
    title: string
}

export function ButtonClose(props: {closeAction: Function}) {

    const onButtonClick = (e: React.MouseEvent<HTMLElement>)=> {
        e.stopPropagation()
        props.closeAction()

    }

    return (
        <button className={styles.container} onClick={(e)=> props.closeAction(e)}>
            <img src={"/img/icons/close.svg"} alt="close" width="20" height="20"/>
        </button>
    )
}