
import Image from 'next/image'
import styles from './inputCheckbox.module.scss'
import { Fragment, ReactNode } from 'react'
import { sanitize } from 'isomorphic-dompurify'
import { SVGExercise } from '@/assets/svg/svgExports'
import { checkLocalstorageItem } from '@/utils/utils'

export default function InputCheckbox(props: {
        label: string,
        callbackOnChange: Function,
        callbackOnChecked?: Function,
        isOnlyLabel?: boolean,
        localstorageValue?: string,
        localstorageKey?: string
    }) {

    const shouldInputBeChecked = ()=> {
        if (props.localstorageKey && props.localstorageValue) {
            console.log("lets go!!")
            const isChecked = checkLocalstorageItem(props.localstorageKey, props.localstorageValue)
            if (props.callbackOnChecked) props.callbackOnChecked(props.label, isChecked)
            return isChecked
        }
        return false
    }


    return  (
        <label className={`${styles.container} ${props.isOnlyLabel ? styles.onlyLabel : ''}`}>
            <input
                type="checkbox"
                defaultChecked={shouldInputBeChecked()}
                data-value={props.label}
                onChange={(e) => props.callbackOnChange(e)}
            />
            {!props.isOnlyLabel ? <span className={styles.checkmark}></span> : <></>}
            <span className={styles.label}>{props.label}</span>
        </label>
    )
}



