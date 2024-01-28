'use client'

import { Fragment, useState } from 'react'
import { Button } from '../Button/Button'
import SearchBar from '../SearchBar/SearchBar'
import styles from './header.module.scss'
import ModalExercises from '../ModalExercises/ModalExercises'
import SignUp from '../Logging/SignUp/SignUp'
import Link from 'next/link'
import { Sidebar } from './Sidebar/Sidebar'

export default function Header() {

    const [isSignUpOpen, setIsSignUpOpen] = useState(false)
    const [isSidebarOpen, setIsSidebarOpen] = useState(true)


    const closeModal = ()=> {
        setIsSignUpOpen(false)
    }

    const toggleSideBar = ()=> {
        setIsSidebarOpen(!isSidebarOpen)

    }


    return (
        <Fragment>
            <nav className={styles.header}>
                <div className={styles.background}></div>
                <div className={styles.burgerContainer} onClick={()=> toggleSideBar()}>
                    <svg viewBox="0 0 44 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M41.5 2H2.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
                        <path d="M42 15H3" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
                        <path d="M41.5 28H2.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
                    </svg>
                </div>
                <div className={styles.searchBarContainer}>
                    <SearchBar />
                </div>

                <div className={styles.authenticationContainer}>
                    <Button text={'log in'} color={'transparent'} callback={() => setIsSignUpOpen(true)}></Button>
                    <Button text={'Sign up'} callback={() => setIsSignUpOpen(true)}></Button>
                </div>
                <div className={styles.linksContainer}>
                    <Link href={'/lessons'}>exercises</Link>
                    <Link href={'/lessons'}>lessons</Link>
                </div>
            </nav>
            <Sidebar isOpen={isSidebarOpen}/>
            <ModalExercises
                text={''}
                open={isSignUpOpen}
                background={'dark'}
                // ref={refModalLesson}
                callbackClose={closeModal}
                isSignUp={true}
                padding={'paddingBase'}
            >
                <SignUp></SignUp>
            </ModalExercises>
        </Fragment>
    )
}