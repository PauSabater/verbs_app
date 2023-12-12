
import Image from 'next/image'
import styles from './inputCheckbox.module.scss'
import { Fragment, ReactNode } from 'react'
import { sanitize } from 'isomorphic-dompurify'
import { SVGExercise } from '@/assets/svg/svgExports'

export default function InputCheckbox(props: {
        label: string,
        callbackOnChange: Function,
        isOnlyLabel?: boolean
    }) {

    return  (
        <label className={`${styles.container} ${props.isOnlyLabel ? styles.onlyLabel : ''}`}>
            <input
                type="checkbox"
                data-value={props.label}
                onChange={(e) => props.callbackOnChange(e)}
            />
            {!props.isOnlyLabel ? <span className={styles.checkmark}></span> : <></>}
            <span className={styles.label}>{props.label}</span>
        </label>
    )
}



