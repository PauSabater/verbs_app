
import Image from 'next/image'
import styles from './inputCheckbox.module.scss'
import { Fragment, ReactNode } from 'react'
import { sanitize } from 'isomorphic-dompurify'
import { SVGExercise } from '@/assets/svg/svgExports'

export default function InputCheckbox(props: {
        label: string,
        actionsOnInputChange: Function
    }) {

    return  (
        <label className={styles.container}>
            <input type="checkbox" onChange={(e) => props.actionsOnInputChange(e)}/>
            <span className={styles.checkmark}></span>
            <span className={styles.label}>{props.label}</span>
        </label>
    )
}



