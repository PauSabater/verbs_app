'use client'

import { Fragment, useEffect, useState } from 'react'
import styles from './sidebar.module.scss'
import Link from 'next/link'
import { SVGAdd, SVGAddFilled, SVGBookmark, SVGBookmarkFilled, SVGExercise, SVGStar, SVGStarFilled, SVGTheme } from '@/assets/svg/svgExports'

interface ISidebar {
    isOpen: boolean
}

export function Sidebar(props: ISidebar) {
    const [isSignUpOpen, setIsSignUpOpen] = useState(false)

    // Create the event.
    const eventAwesome = new CustomEvent('toggleMode', {
        bubbles: true,
        detail: { text: () => 'hello' }
    })

    useEffect(() => {
        window.addEventListener(
            'toggleMode',
            (e) => {
                console.log("EVENT RECEIVED")
                document.documentElement.classList.add('mode-dark')
            },
            false
        )
    }, [])

    const closeModal = () => {
        setIsSignUpOpen(false)
    }

    const toggleMode = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        console.log('click toggle')
        e.target.dispatchEvent(eventAwesome)
    }

    return (
        <Fragment>
            <nav className={`${styles.sideBar} ${props.isOpen ? styles.isOpen : styles.isClosed}`}>
                <div className={styles.linkContainer}>
                    <SVGAdd />
                    <Link href={'/lessons/prasens'}>add exercise</Link>
                </div>
                <div className={styles.linkContainer}>
                    <SVGExercise />
                    <Link href={'/lessons/prasens'}>my exercises</Link>
                </div>
                <div className={styles.linkContainer}>
                    <SVGBookmarkFilled isFilled={false} />
                    <Link href={'/lessons/prasens'}>my lessons</Link>
                </div>
                <div className={styles.linkContainer}>
                    <SVGStarFilled isFilled={false} />
                    <Link href={'/lessons/prasens'}>my verbs</Link>
                </div>
                <div className={`${styles.linkContainer} ${styles.linkAbsolute}`} onClick={(e)=> toggleMode(e)}>
                    <SVGTheme />
                    <Link href={'/lessons/prasens'}>toggle mode</Link>
                </div>
            </nav>
        </Fragment>
    )
}
