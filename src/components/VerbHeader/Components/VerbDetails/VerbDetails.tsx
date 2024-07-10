import InfoInCircle from '@/elements/InfoInCircle/InfoInCircle'
import styles from './verbDetails.module.scss'
import { Fragment, useContext } from 'react'
import { ContextVerbPage, IVerbsPageContext } from '@/app/verbs/[slug]/VerbPage'
import VerbStemFormation from '../VerbStemFormation/VerbStemFormation'

interface IVerbDetails {
    level?: string
    isModal?: boolean
    isIrregular?: boolean
    isAuxiliary?: boolean
    isSeparable?: boolean
    prefixed?: boolean
    reflexive?: boolean
    verbNum?: number
    smallFormat?: boolean
}

export default function VerbDetails(props: IVerbDetails) {

    const context = useContext(ContextVerbPage) as IVerbsPageContext

    return (
        <div data-verb-details className={`${styles.container} ${props.smallFormat ? styles.smallFormat : ''}`}>
            {
                context?.level || props.level
                    ? <InfoInCircle text={context?.level || props?.level || ''} />
                    : <></>
            }
            <p className={styles.detail}>
                {context?.isIrregular || props?.isIrregular ? "irregular" : "regular"}
            </p>
            {
                context?.isModal || props?.isModal
                    ?   <><p className={styles.detail}>{"modal verb"}</p>
                        <div className={styles.separator}/></>
                    :   <></>
            }
            {
                context?.isAuxiliary || props?.isAuxiliary
                    ?   <><p className={styles.detail}>{"auxiliary verb"}</p>
                        <div className={styles.separator}/></>
                    :   <></>
            }
            {
                context?.isSeparable || props?.isSeparable
                    ?   <><p className={styles.detail}>{"separable"}</p>
                        <div className={styles.separator}/></>
                    :   <></>
            }
            {
                context?.prefixed || props?.prefixed
                    ?   <><p className={styles.detail}>{"prefixed"}</p>
                        <div className={styles.separator}/></>
                    :   <></>
            }
            {
                context?.reflexive || props?.reflexive
                    ?   <><p>reflexive</p>
                        <div className={styles.separator}/></>
                    :   <></>
            }
            {
                context?.reflexive || props?.reflexive
                    ?   <><p className={styles.detail}>{"reflexive"}</p>
                        <div className={styles.separator}/></>
                    :   <></>
            }
            {/* {
                <><VerbStemFormation/></>
            } */}
            {
                context?.verbNum
                    ? <p className={styles.detail}>#{context.verbNum}</p>
                    : <></>
            }

        </div>
    )
}