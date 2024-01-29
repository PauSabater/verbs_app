import { FormEvent, useState } from 'react'
import styles from './logging.module.scss'
import { sanitize } from 'isomorphic-dompurify'

import SignUp from './SignUp/SignUp'
// import { APP_ID } from '../realm/constants'

interface ISignUp {}

// export const APP_ID = 'konjug-users-awatt'
// const app = new App(APP_ID)

export default function Logging(props: ISignUp) {

    const [isSignUp, setIsSignUp] = useState<boolean>(true)

    return (
        <div className={styles.container}>
            {
                isSignUp ? <SignUp></SignUp> : ''
            }
        </div>
    )
}
