'use client'

import { MouseEventHandler, ReactNode, useState } from 'react'
import styles from './ButtonClose.module.scss'
import { useRef } from 'react'
import { Button } from '../Button/Button'

interface ICollapsibleTexts {
    title: string
}

export function ButtonClose(props: {closeAction: any}) {

    return (
        <div className={styles.container} onClick={props.closeAction()}></div>
    )
}