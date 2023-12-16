import { sanitize } from 'isomorphic-dompurify'
import styles from './callout.module.scss'
import { SVGInformation } from '@/assets/svg/svgExports'


export default function Callout(props: {text: string}) {

    return (
        <div className={styles.container}>
            <div className={styles.content} dangerouslySetInnerHTML={{__html: sanitize(props.text)}}></div>
            <SVGInformation color={'var(--c-grey-dark)'}/>
        </div>
    )
}