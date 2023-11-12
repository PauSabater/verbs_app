'use client'

import { MouseEventHandler, ReactNode, useState } from 'react'
import styles from './CollapsibleTenses.module.scss'
import { useRef } from 'react'
import { Button } from '../Button/Button'

interface ICollapsibleTexts {
    title: string
}

export function CollapsibleTenses({texts, children}: {texts: ICollapsibleTexts, children: ReactNode}) {

    const [setIsCollapsed, isCollapsed] = useState(false)

    let refCollapsibleContent = useRef(null)
    let refCollapsibleTrigger = useRef(null)

    const handleCollapsibleClick = ()=> {
        console.log("HEY CLICK!!")

    }

    return (
        <div className={styles.container}>
            <div className={styles.clickableOpener} ref={refCollapsibleTrigger} onClick={()=>{handleCollapsibleClick()}}>
                <h2>{texts.title}</h2>
            </div>
            <div className={styles.collapsibleContent} ref={refCollapsibleContent}>
                {children}
                <Button text={`Practise ${texts.title}`} color={"primary"}></Button>
            </div>
            {/* <div className={styles.containerExamples}></div> */}
        </div>
    )
}