'use client'

import { MouseEvent, ReactNode, forwardRef, useEffect, useImperativeHandle, useLayoutEffect, useState } from 'react'
import styles from './ModalExercises.module.scss'
import stylesBtnClose from '../ButtonClose/ButtonClose.module.scss'
import { ButtonClose } from '../ButtonClose/ButtonClose'
import { SVGCross, SVGDoc } from '@/assets/svg/svgExports'


export const ModalExercises = forwardRef((props: {
    text: string,
    children: ReactNode,
    open: boolean
    }, ref)=> {

    const text = props.text
    const children = props.children
    const open = props.open


    // export function ModalExercises({text, open = false, children}: {text: string, open?: boolean, children: ReactNode}) {

    const [isOpen, setIsOpen] = useState<boolean>(open as boolean)

    useImperativeHandle(ref, () => ({
        openModal
    }))

    useEffect(() => {setIsOpen(open)}, [open])

    const openModal = ()=> {setIsOpen(true)}

    const closeModal = ()=> {
        setIsOpen(false)
    }

    const handleBackgroundClick = (e: React.MouseEvent<HTMLDivElement>)=> {
        e.stopPropagation()
        setIsOpen(false)
    }


    return (
        <div className={`${styles.containerModal} ${styles[isOpen ? "open" : "closed"]}`}>
            <div className={styles.background} onClick={(e)=> {handleBackgroundClick(e)}}></div>
            {/* <p>{text}</p> */}
            <div className={styles.container}>
                <div className={`${stylesBtnClose.container} ${styles.btnClose}`}>
                    <SVGCross color={"var(--c-grey-dark)"}></SVGCross>
                </div>
                {children}
            </div>
        </div>
    )

})