import Image from 'next/image'
import styles from './verbStemFormation.module.scss'
import { sanitize } from 'isomorphic-dompurify'


interface IVerbTitle {
    stemFormationHTML: string
}

export default function VerbStemFormation(props: IVerbTitle) {

    return (
        <div className={styles.container}>
            <p className={styles.formation} dangerouslySetInnerHTML={{__html: sanitize(props.stemFormationHTML)}}></p>
        </div>
    )
}