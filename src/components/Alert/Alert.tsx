import { Fragment, useEffect, useState } from 'react'
import styles from './alert.module.scss'
import { Button } from '../atoms/Button/Button'
import InputCheckbox from '../UI/InputCheckbox/InputCheckbox'

interface IAlertProps {
    texts: {
        text: string
        textConfirm: string
        textNegate: string
        textCheckbox?: string
    }
    isOpen: boolean
    textCheckbox?: string
    actionsOnAlertConfirm: Function
    actionsOnAlertNegate: Function
}

export default function Alert(props: IAlertProps) {
    const [isOpen, setIsOpen] = useState<boolean>(false)

    const [isCheckboxChecked, setIsCheckboxChecked] = useState<boolean>(false)

    useEffect(() => setIsOpen(props.isOpen), [props.isOpen])

    const handleClickNegate = () => {
        props.actionsOnAlertNegate(isCheckboxChecked)
    }

    const handleClickConfirm = () => {
        props.actionsOnAlertConfirm(isCheckboxChecked)
    }

    const handleCheckboxChange = (e: Event) => {
        setIsCheckboxChecked((e.target as HTMLInputElement).checked)
    }

    return (
        <Fragment>
            <div className={`${styles.alert} ${isOpen ? styles.open : styles.closed}`}>
                <div className={styles.background}></div>
                <div className={styles.container}>
                    <p className={styles.message}>{props.texts.text}</p>
                    {props.texts.textCheckbox ? <InputCheckbox label={props.texts.textCheckbox} callbackOnChange={handleCheckboxChange} /> : ''}
                    <div className={styles.buttonsContainer}>
                        <div onClick={() => handleClickConfirm()}>
                            <Button text={props.texts.textConfirm} />
                        </div>
                        <div onClick={() => handleClickNegate()}>
                            <Button text={props.texts.textNegate} color={'primaryDarkReverse'} />
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
