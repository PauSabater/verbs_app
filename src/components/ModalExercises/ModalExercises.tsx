'use client'

import { MouseEvent, ReactNode, forwardRef, useEffect, useImperativeHandle, useLayoutEffect, useState } from 'react'
import styles from './modalExercises.module.scss'
import stylesBtnClose from '../ButtonClose/ButtonClose.module.scss'
import { ButtonClose } from '../ButtonClose/ButtonClose'
import { SVGCross, SVGDoc } from '@/assets/svg/svgExports'
import { disableScroll, enableScroll } from '@/utils/utils'

const ModalExercises = forwardRef(
    (
        props: {
            text: string
            children: ReactNode
            open: boolean
            background?: 'dark' | 'blurred'
            callbackClose?: Function
            widerVersion?: boolean
            isSignUp?: boolean
            padding?: 'paddingBase'
        },
        ref
    ) => {
        const text = props.text
        const children = props.children
        const open = props.open

        // export function ModalExercises({text, open = false, children}: {text: string, open?: boolean, children: ReactNode}) {

        const [isOpen, setIsOpen] = useState<boolean>(open as boolean)

        useImperativeHandle(ref, () => ({
            openModal
        }))

        useEffect(() => {
            if (open === true) openModal()
            else closeModal()
        }, [open])

        const openModal = () => {
            disableScroll()
            setIsOpen(true)
        }

        const closeModal = () => {
            enableScroll()
            setIsOpen(false)
        }

        const handleBackgroundClick = (e: React.MouseEvent<HTMLDivElement>) => {
            e.stopPropagation()
            enableScroll()
            setIsOpen(false)

            if (props.callbackClose) props.callbackClose()
        }

        return (
            <div className={`${styles.containerModal} ${styles[isOpen ? 'open' : 'closed']}`}>
                <div
                    className={`${styles.background} ${props.background ? styles[props.background] : ''}`}
                    onClick={(e) => {
                        handleBackgroundClick(e)
                    }}
                ></div>
                {/* <p>{text}</p> */}
                <div className={`${styles.container} ${styles[props.widerVersion ? 'widerVersion' : '']} ${styles[props.padding || '']}`}>
                    <div
                        className={`${stylesBtnClose.container} ${styles.btnClose}`}
                        onClick={(e) => {
                            handleBackgroundClick(e)
                        }}
                    >
                        <SVGCross color={'var(--c-grey-dark)'}></SVGCross>
                    </div>
                    {children}
                </div>
            </div>
        )
    }
)

ModalExercises.displayName = 'ModalExercises'

export default ModalExercises
