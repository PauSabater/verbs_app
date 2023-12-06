'use client'

import { MouseEventHandler, ReactNode, useState } from 'react'
import styles from './CollapsibleTenses.module.scss'
import { useRef } from 'react'
import { Button } from '../Button/Button'

interface ICollapsibleTexts {
    title: string
}

interface ICollapsibleTenses {
    texts: ICollapsibleTexts,
    children: ReactNode,
    action: Function
}

export function CollapsibleTenses(props: ICollapsibleTenses) {

    const [setIsCollapsed, isCollapsed] = useState(false)

    let refCollapsibleContent = useRef(null)
    let refCollapsibleTrigger = useRef(null)

    const handleCollapsibleClick = ()=> {
        console.log("HEY CLICK!!")

    }

    const buttonAction = ()=> {
        console.log("HELLOOOO")
        props.action()
    }

    return (
        <div className={styles.container}>
            <div className={styles.clickableOpener} ref={refCollapsibleTrigger} onClick={()=>{handleCollapsibleClick()}}>
                <h2>{props.texts.title}</h2>
            </div>
            <div className={styles.collapsibleContent} ref={refCollapsibleContent}>
                {props.children}
                <Button
                    action={buttonAction}
                    text={`Practise ${props.texts.title}`}
                    color={"primary"}
                    icon={"exercise"}
                ></Button>
            </div>
            <div className={styles.containerExamples}></div>
        </div>
    )
}