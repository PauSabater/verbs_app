'use client'

import { Fragment, useState } from 'react'
import styles from './sidebar.module.scss'
import Link from 'next/link'
import { SVGAdd, SVGAddFilled, SVGBookmark, SVGBookmarkFilled, SVGExercise, SVGStar, SVGStarFilled, SVGTheme } from '@/assets/svg/svgExports'

interface ISidebar {
    isOpen: boolean
}

export function Sidebar(props: ISidebar) {
    const [isSignUpOpen, setIsSignUpOpen] = useState(false)

    const closeModal = () => {
        setIsSignUpOpen(false)
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
                    <SVGBookmarkFilled isFilled={true} />
                    <Link href={'/lessons/prasens'}>my lessons</Link>
                </div>
                <div className={styles.linkContainer}>
                    <SVGStarFilled isFilled={true} />
                    <Link href={'/lessons/prasens'}>my verbs</Link>
                </div>
                <div className={`${styles.linkContainer} ${styles.linkAbsolute}`}>
                    <SVGTheme />
                    <Link href={'/lessons/prasens'}>toggle mode</Link>
                </div>
            </nav>
        </Fragment>
    )
}
