import { FormEvent, useState } from 'react'
import styles from './lessonsLink.module.scss'


interface ILessonsLink {}

// export const APP_ID = 'konjug-users-awatt'
// const app = new App(APP_ID)

export default function Logging(props: ILessonsLink) {
    const [isSignUp, setIsSignUp] = useState<boolean>(true)

    return (
        <div className={styles.container}>

        </div>
    )
}
