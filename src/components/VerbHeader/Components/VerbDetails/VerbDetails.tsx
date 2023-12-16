import InfoInCircle from '@/components/UI/InfoInCircle/InfoInCircle'
import styles from './verbDetails.module.scss'
import { Fragment } from 'react'


interface IVerbHeader {
    number: number,
    level: string,
    isIrregular: boolean,
    isSeparable: boolean,
    isAuxiliary: boolean
}

export default function VerbDetails(props: IVerbHeader) {

    return (
        <div className={styles.container}>
            <InfoInCircle text={props.level} />
            <p>#{props.number}</p>
            {
                props.isIrregular
                    ? <><p className={styles.separator}>|</p><p>{"irregular"}</p></>
                    : <Fragment/>
            }
        </div>
    )
}