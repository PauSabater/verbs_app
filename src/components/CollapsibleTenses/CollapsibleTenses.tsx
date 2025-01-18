'use client'

import { MouseEventHandler, ReactNode, useState } from 'react'
import styles from './CollapsibleTenses.module.scss'
import { useRef } from 'react'
import { Button } from '../atoms/Button/Button'
import { IExamples, TensesExamples } from '../TensesExamples/TensesExamples'
import { fontTitles } from '@/app/fonts'
import Link from 'next/link'

interface ICollapsibleTexts {
    title: string,
    description?: string,
}

interface ICollapsibleTenses {
    texts: ICollapsibleTexts
    tenses: string[]
    examples: IExamples
    children: ReactNode
    action: Function
    utterance: SpeechSynthesisUtterance | null
    verb: string
    mode: string
    columns: number
}

export function CollapsibleTenses(props: ICollapsibleTenses) {
    const [setIsCollapsed, isCollapsed] = useState(false)

    let refCollapsibleContent = useRef(null)
    let refCollapsibleTrigger = useRef(null)

    const handleCollapsibleClick = () => {
        console.log('HEY CLICK!!')
    }

    const buttonAction = () => {
        console.log('HELLOOOO')
        props.action()
    }

    return (
        <div className={`${styles.container} ${styles.noExamples}`}>
            <div className={styles.tablesContainer}>
                <div
                    className={styles.clickableOpener}
                    ref={refCollapsibleTrigger}
                    onClick={() => {
                        handleCollapsibleClick()
                    }}
                >
                    <h2 className={`${styles.title}`}>{props.texts.title}</h2>
                    <p className={styles.description}>{props.texts.description?.replace('-verb-', props.verb)}</p>
                </div>
                <div
                    data-columns={props.columns}
                    className={`${styles.collapsibleContent}`}
                    ref={refCollapsibleContent}
                >
                    {props.children}

                    <Link
                        className={styles.btnPractise}
                        href={`/exercise?mode=${props.mode}&verbs=${props.verb}`}
                    >
                        <Button
                            text={`Practise ${props.texts.title}`}
                            color={'primaryDark'}
                            icon={'exercise'}
                        />
                    </Link>
                </div>
            </div>
        </div>
    )
}
