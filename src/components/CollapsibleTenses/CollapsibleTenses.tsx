'use client'

import { MouseEventHandler, ReactNode, useState } from 'react'
import styles from './CollapsibleTenses.module.scss'
import { useRef } from 'react'
import { Button } from '../Button/Button'
import { IExamples, TensesExamples } from '../TensesExamples/TensesExamples'
import { fontTitles } from '@/app/fonts'

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
        <div className={styles.container}>
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
                <div className={styles.collapsibleContent} ref={refCollapsibleContent}>
                    {props.children}
                    <Button
                        callback={buttonAction}
                        text={`Practise ${props.texts.title}`}
                        color={'primary'}
                        icon={'exercise'}
                    />
                </div>
            </div>
            {props.examples ?
                <div className={styles.containerExamples}>
                    <TensesExamples
                        title={'Examples'}
                        tenses={props.tenses}
                        examples={props.examples}
                        utterance={props.utterance}
                    />
                </div>
                : ''
            }
        </div>
    )
}
