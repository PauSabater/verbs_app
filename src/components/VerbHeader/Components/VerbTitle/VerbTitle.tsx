import { SVGAudio } from '@/assets/svg/svgExports'
import styles from './verbTitle.module.scss'
import { sanitize } from 'isomorphic-dompurify'


interface IVerbTitle {
    verbHTML: string
}

export default function VerbTitle(props: IVerbTitle) {

    return (
        <div className={styles.container}>
            <p className={styles.verb} dangerouslySetInnerHTML={{__html: sanitize(props.verbHTML)}}></p>
            <SVGAudio></SVGAudio>
        </div>
    )
}