import styles from './infoInCircle.module.scss'


export default function InfoInCircle({text}: {text: string}) {

    return (
        <div className={styles.container}>
            <p className={styles.text}>{text}</p>
        </div>
    )
}