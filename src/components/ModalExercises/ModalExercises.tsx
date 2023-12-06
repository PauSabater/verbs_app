'use client'

import { MouseEvent, ReactNode, forwardRef, useEffect, useImperativeHandle, useLayoutEffect, useState } from 'react'
import styles from './modalExercises.module.scss'
import stylesBtnClose from '../ButtonClose/ButtonClose.module.scss'
import { ButtonClose } from '../ButtonClose/ButtonClose'
import { SVGCross, SVGDoc } from '@/assets/svg/svgExports'
import { disableScroll, enableScroll } from '@/utils/utils'


export const ModalExercises = forwardRef((props: {
        text: string,
        children: ReactNode,
        open: boolean
        callbackClose?: Function
    }, ref)=> {

    const text = props.text
    const children = props.children
    const open = props.open

    // export function ModalExercises({text, open = false, children}: {text: string, open?: boolean, children: ReactNode}) {

    const [isOpen, setIsOpen] = useState<boolean>(open as boolean)

    useImperativeHandle(ref, () => ({
        openModal
    }))

    useEffect(() => {
        console.log(window.innerHeight)
        setIsOpen(open)},
    [open])

    const openModal = ()=> {
        disableScroll()
        setIsOpen(true)
    }

    const handleBackgroundClick = (e: React.MouseEvent<HTMLDivElement>)=> {
        e.stopPropagation()
        enableScroll()
        setIsOpen(false)

        if (props.callbackClose) props.callbackClose()

    }

    return (
        <div className={`${styles.containerModal} ${styles[isOpen ? "open" : "closed"]}`}>
            <div
                className={styles.background}
                onClick={(e)=> {handleBackgroundClick(e)}}
            ></div>
            {/* <p>{text}</p> */}
            <div className={styles.container}>
                <div
                    className={`${stylesBtnClose.container} ${styles.btnClose}`}
                    onClick={(e)=> {handleBackgroundClick(e)}}
                >
                    <SVGCross color={"var(--c-grey-dark)"}></SVGCross>
                </div>
                {children}
            </div>
        </div>
    )

})