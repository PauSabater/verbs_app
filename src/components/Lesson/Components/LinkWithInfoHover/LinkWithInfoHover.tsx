import Link from 'next/link'
import styles from './linkWithInfoHover.module.scss'
import { VerbInfoHover } from '../VerbIntoHover/VerbInfoHover'
import { sanitize } from 'isomorphic-dompurify'

interface ILinkWithInfoHover {
    value: string,
    html?: string
}

// verb-link-hover
export const LinkWithInfoHover = (props: ILinkWithInfoHover): JSX.Element => {

    return (
        <>
            <div className={styles.hoveredLinkContainer}>
                <VerbInfoHover verb={props.value}></VerbInfoHover>
                <Link className={styles.link} href={`/verbs/${props.value}`}>
                    {!props.html ? props.value : <span dangerouslySetInnerHTML={{ __html: sanitize(props.html || '') }}></span>}
                </Link>
            </div>
        </>
    )
}
