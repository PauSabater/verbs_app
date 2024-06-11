import InfoInCircle from '@/elements/InfoInCircle/InfoInCircle'
import styles from './verbDetails.module.scss'
import { Fragment } from 'react'


interface IVerbHeader {
    number: number,
    level: string,
    isIrregular: boolean,
    isSeparable: boolean,
    isAuxiliary: boolean,
    prefixed?: boolean,
    reflexive?: boolean,
}

export default function VerbDetails(props: IVerbHeader) {

    return (
        <div className={styles.container}>
            <InfoInCircle text={props.level} />
            <p>#{props.number}</p>
            <p className={styles.separator}>|</p><p>{props.isIrregular ? "irregular" : "regular"}</p>
            {
                props.isSeparable === true
                    ? <><p className={styles.separator}>|</p><p>{"separable"}</p></>
                    : <></>
            }
            {
                props.prefixed && props.prefixed === true
                    ? <><p className={styles.separator}>|</p><p>{"prefixed"}</p></>
                    : <></>
            }
            <p>{props.reflexive ? "yeees" : "nooo"}</p>
            {
                props.reflexive
                    ? <><p className={styles.separator}>|</p><p>{"reflexive"}</p></>
                    : <></>
            }
        </div>
    )
}