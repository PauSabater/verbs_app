import { sanitize } from 'isomorphic-dompurify'
import styles from './callout.module.scss'
import { SVGInformation } from '@/assets/svg/svgExports'

interface ICallout {
    text: string,
    type?: string
}

export default function Callout(props: ICallout) {

    const getCalloutIcon = (type: string)=> {
        if (!type) return <SVGInformation color={'var(--c-grey-dark)'}/>
        else if (type === 'idea') return <p className={styles.emoji}>&#128161;</p>
        return <></>

    }

    return (
        <div className={styles.container}>
            <p className={styles.content} dangerouslySetInnerHTML={{__html: sanitize(props.text)}}></p>
            {
                getCalloutIcon(props.type || '')
            }
            {/* <SVGInformation color={'var(--c-grey-dark)'}/> */}
        </div>
    )
}