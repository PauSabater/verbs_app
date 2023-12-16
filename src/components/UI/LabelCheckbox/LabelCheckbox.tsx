'use client'

import { MouseEventHandler, ReactNode, useState } from 'react'
import styles from './checkboxInput.module.scss'
import { useRef } from 'react'

interface IExerciseCheckboxList {
    choices: string
    actionOnChange: string
}

export function CheckboxInput(props: {text: string, isSelected?: boolean}) {

    const [isSelected, setIsSelected] = useState(false)

    const [selectedItems, setSelectedItems] = useState<string[]>([])

    const updateState = ()=> {

    }

    return (
        <div className={styles.container} onChange={updateState}></div>
    )
}