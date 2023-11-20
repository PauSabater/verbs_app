import { sanitize } from "isomorphic-dompurify";
import styles from './selector.module.scss'


export function Selector(props: {title: string, options: string[], color?: string, weight?: string}) {
    return (
        <select className={styles.selector} name="tenses" id="tenses">
            <option selected disabled>{props.title}</option>
            <option value="volvo">Volvo</option>
            <option value="saab">Saab</option>
            <option value="opel">Opel</option>
            <option value="audi">Audi</option>
      </select>
    )
}