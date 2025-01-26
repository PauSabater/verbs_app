import { FormEvent, useState } from 'react'
import { Button } from '../../atoms/Button/Button'
import { InputText } from '../../../elements/InputText/InputText'
import styles from './signUp.module.scss'
import { sanitize } from 'isomorphic-dompurify'

import { App, Credentials } from 'realm-web'
// import { APP_ID } from '../realm/constants'


interface ISignUp {
}


// export const APP_ID = 'konjug-users-awatt'
// const app = new App(APP_ID)


export default function SignUp(props: ISignUp) {

    const [userEmail, setUserEmail] = useState('')
    const [userPassword, setUserPassword] = useState('')


    const onSubmitSignUpForm = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        console.log('CLICK BUTTON ' + userEmail)

        if (userEmail) {
            console.log('lets submit')

            // await app.emailPasswordAuth.registerUser({email: userEmail, password: userPassword})

            const headers = {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                // 'Access-Control-Allow-Credentials': true
            }

            //user

            // // fetch('http://localhost:9090/users/create', {
            fetch('http://localhost:9090/users/login', {
                method: 'POST',
                headers: headers,
                body: JSON.stringify({
                    // _id: userEmail,
                    email: userEmail,
                    password: 'hey'
                    // creationDate: Date.now()
                    // isVerified: false
                })
            })
                        // fetch('http://localhost:9090/users/user', {
                        //     method: 'GET',
                        //     credentials: 'include',
                        //     headers: headers
                        // })
                            .then(async (response) => {
                                if (!response.ok) {
                                    const text = await response.text()
                                    throw Error(text)
                                    return Promise.reject(response)
                                } else return response.json()
                            })
                            .then((data) => {
                                console.log('success')
                                console.log(data)
                            })
                            .catch((error) => {
                                if (typeof error.json === 'function') {
                                    error
                                        .json()
                                        .then((jsonError: any) => {
                                            console.log('Json error from API')
                                            console.log(jsonError)
                                        })
                                        .catch((genericError: any) => {
                                            console.log('Generic error from API')
                                            console.log(error.statusText)
                                        })
                                } else {
                                    console.log('Fetch error')
                                    console.log(error)
                                }
                            })
        }
    }

    const onInputValidate = (input: string, value: string)=> {
        console.log("ON INPUT VALIDATE")

        if (input === 'email') {
            console.log("LETS SET USER EMAIL!!")
            setUserEmail(value.toLowerCase())
        }
        if (input === 'password') setUserEmail(value)
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Unlock all functionalities by signing up</h1>
            <form onSubmit={(e) => onSubmitSignUpForm(e)}>
                <InputText label={'Email'} placeholder={''} validationType={'email'} errorText={'You must add a correct email'} onValidate={onInputValidate}></InputText>
                <InputText
                    label={'Password'}
                    placeholder={''}
                    validationType={'password'}
                    lengthReqTxt={'- Between 6 and 15 characters'}
                    charReqTxt={'- At least one special character'}
                    onValidate={onInputValidate}
                ></InputText>
                <Button text={'Sign up'} width={'fullWidth'} type={'submit'}></Button>
                <div className={styles.switch}>
                    <p>
                        Already an account?
                        <span> Sign up.</span>
                    </p>
                </div>
            </form>
        </div>
    )
}
