import { SVGAudio } from '@/assets/svg/svgExports'
import styles from './verbTitle.module.scss'
import { sanitize } from 'isomorphic-dompurify'
import { fontTitles } from '@/app/fonts'



interface IVerbTitle {
    verbHTML: string
}

export default function VerbTitle(props: IVerbTitle) {

    return (
        <div className={styles.container}>
            <p className={`${styles.verb} ${fontTitles.className}`} dangerouslySetInnerHTML={{__html: sanitize(props.verbHTML.replace('·', '<u>|</u>'))}}></p>
            <SVGAudio></SVGAudio>
        </div>
    )
}