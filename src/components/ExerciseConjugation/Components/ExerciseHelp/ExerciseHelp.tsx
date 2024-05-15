// import Image from 'next/image'
import Callout from '@/components/Callout/Callout'
import { IConjugation } from '../../ExerciseConjugation.exports'
import styles from './ExerciseHelp.module.scss'
import { ButtonBack } from '@/components/ButtonBack/ButtonBack'
import { useEffect, useState } from 'react'
import { sanitize } from 'isomorphic-dompurify'
// import { Fragment, ReactNode } from 'react'
// import { sanitize } from 'isomorphic-dompurify'
// import { SVGExercise } from '@/assets/svg/svgExports'

interface IExerciseHelp {
    text: string,
    textBtn: string,
    callout: string,
    title: string,
    tense: string,
    isOpen: boolean,
    conjugation: IConjugation[] | undefined,
    actionClose: Function,
    isEmbedded?: boolean
}

export function ExerciseHelp(props: IExerciseHelp) {

    const [isHelpOpen, setIsHelpOpen] = useState<boolean | null>(null)

    useEffect(()=> {
        setIsHelpOpen(props.isOpen)
    }, [props.isOpen])

    const handleBtnCloseClick = ()=> {
        props.actionClose()
    }

    return (
        <div date-state={isHelpOpen ? 'true' : 'false'} className={`${styles.container} ${isHelpOpen ? styles.isOpen : ''} ${props.isEmbedded ? styles.isEmbedded : ''}`}>
            <div className={styles.content}>
                <ButtonBack text={props.textBtn} action={() => handleBtnCloseClick} sense={'right'}></ButtonBack>
                {/* <p className={`${styles.title}`}>{`${props.tense}`}</p> */}
                {/* <p>{props.text}</p> */}
                {/* {props.children} */}
                {/* {!props.isEmbedded ? <Callout text={props.callout} type={'idea'}></Callout> : <></>} */}

                <div className={styles.table}>
                    {props.conjugation &&
                        props.conjugation.map((conj, i) => {
                            return (
                                <div key={`help-row-${i}`} className={styles.row}>
                                    <p className={styles.val}>{conj.person}</p>
                                    <div className={styles.val} dangerouslySetInnerHTML={{ __html: sanitize(conj.conjugationHTML || '') }}></div>
                                </div>
                            )
                        })}
                </div>
            </div>
        </div>
    )
}