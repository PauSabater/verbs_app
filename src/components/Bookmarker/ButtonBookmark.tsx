import { SVGBookmark } from '@/assets/svg/svgExports'
import styles from './buttonBookmark.module.scss'
import { Fragment, ReactNode } from 'react'

interface IButtonBookmark {
    text: string,
    isReverse?: boolean
}

export function ButtonBookmark(props: IButtonBookmark) {

    return  (
        <div className={styles.container}>
            <div className={styles.bg}></div>
            {
                props.isReverse && props.text
                    ? <p className={styles.text}>{props.text}</p>
                    : <></>
            }
            <SVGBookmark/>
            {
                !props.isReverse && props.text
                    ? <p className={styles.text}>{props.text}</p>
                    : <></>
            }

        </div>

    )
}