import InfoInCircle from '@/elements/InfoInCircle/InfoInCircle'
import styles from './verbDetails.module.scss'
import { Fragment, useContext } from 'react'
import { ContextVerbPage, IVerbsPageContext } from '@/app/verbs/[slug]/VerbPage'
import VerbStemFormation from '../VerbStemFormation/VerbStemFormation'


export default function VerbDetails() {

    const context = useContext(ContextVerbPage) as IVerbsPageContext

    return (
        <div className={styles.container}>
            <InfoInCircle text={context.level} />
            <p className={styles.detail}>{context.isIrregular ? "irregular" : "regular"}</p>
            {
                context.isModal
                    ?   <><p className={styles.detail}>{"modal verb"}</p>
                        <div className={styles.separator}/></>
                    :   <></>
            }
            {
                context.isAuxiliary
                    ?   <><p className={styles.detail}>{"auxiliary verb"}</p>
                        <div className={styles.separator}/></>
                    :   <></>
            }
            {
                context.isSeparable
                    ?   <><p className={styles.detail}>{"separable"}</p>
                        <div className={styles.separator}/></>
                    :   <></>
            }
            {
                context.prefixed
                    ?   <><p className={styles.detail}>{"prefixed"}</p>
                        <div className={styles.separator}/></>
                    :   <></>
            }
            {
                context.reflexive
                    ?   <><p>reflexive</p>
                        <div className={styles.separator}/></>
                    :   <></>
            }
            {
                context.reflexive
                    ?   <><p className={styles.detail}>{"reflexive"}</p>
                        <div className={styles.separator}/></>
                    :   <></>
            }
            {/* {
                <><VerbStemFormation/></>
            } */}
            <p className={styles.detail}>#{context.verbNum}</p>
        </div>
    )
}