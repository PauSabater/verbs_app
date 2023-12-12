import { sanitize } from "isomorphic-dompurify";
import styles from './verbDescription.module.scss'

export function VerbDescription({text}: {text: string}) {
    return (
        <div dangerouslySetInnerHTML={{__html: sanitize(text)}} className={styles.container}>
            {/* <p>{text}</p> */}
        </div>
    )
}