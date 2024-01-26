import { Button } from '../Button/Button'
import { InputText } from '../UI/InputText/InputText'
import styles from './signUp.module.scss'
import { sanitize } from 'isomorphic-dompurify'


interface ISignUp {
}

export default function SignUp(props: ISignUp) {

    return (
        <div className={styles.container}>
            <h1>Sign up</h1>
            <p>Email</p>
            <InputText
                placeholder={''}
                type={'email'}
                feedbackText={'You must add a correct email'}
                onValidate={() => console.log('hey')}
            ></InputText>
            <p>Or log in to your accound</p>
            <p>Password</p>
            <InputText
                placeholder={''}
                type={'password'}
                lengthReqTxt={'- Between 6 and 15 characters'}
                charReqTxt={'- At least one special character'}
                onValidate={() => console.log('hey')}
            ></InputText>
            <Button
                text={"Sign up"}
                width={'fullWidth'}
            ></Button>
        </div>
    )
}
