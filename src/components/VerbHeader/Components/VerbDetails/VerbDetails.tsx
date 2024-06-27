import InfoInCircle from '@/elements/InfoInCircle/InfoInCircle'
import styles from './verbDetails.module.scss'
import { Fragment } from 'react'


interface IVerbHeader {
    number: number,
    level: string,
    isIrregular: boolean,
    isSeparable: boolean,
    isAuxiliary: boolean,
    isModal: boolean,
    prefixed?: boolean,
    reflexive?: boolean,
}

export default function VerbDetails(props: IVerbHeader) {

    return (
        <div className={styles.container}>
            <InfoInCircle text={props.level} />
            <p className={styles.detail}>#{props.number}</p>
            <p className={styles.detail}>{props.isIrregular ? "irregular" : "regular"}</p>
            {
                props.isModal
                    ? <p className={styles.detail}>{"modal verb"}</p>
                    : <></>
            }
            {
                props.isAuxiliary
                    ? <p className={styles.detail}>{"auxiliary verb"}</p>
                    : <></>
            }
            {
                props.isSeparable
                    ? <p className={styles.detail}>{"separable"}</p>
                    : <p className={styles.detail}>{"non-separable"}</p>
            }
            {
                props.prefixed && props.prefixed === true
                    ? <p className={styles.detail}>{"prefixed"}</p>
                    : <></>
            }
            {
                props.reflexive ? <p>reflexive</p> : <></>
            }
            {
                props.reflexive
                    ? <p className={styles.detail}>{"reflexive"}</p>
                    : <></>
            }
        </div>
    )
}