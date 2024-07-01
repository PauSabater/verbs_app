import Link from 'next/link'
import styles from './linkWithInfoHover.module.scss'
import { VerbInfoHover } from '../VerbIntoHover/VerbInfoHover'
import { sanitize } from 'isomorphic-dompurify'
import { useState } from 'react'

interface ILinkWithInfoHover {
    value: string,
    html?: string
}

// verb-link-hover
export const LinkWithInfoHover = (props: ILinkWithInfoHover): JSX.Element => {

    const [displayInfo, setDisplayInfo] = useState(false)

    return (
        <>
            <span
                className={styles.hoveredLinkContainer}
                onMouseEnter={()=> setDisplayInfo(true)}
                onMouseLeave={()=> setDisplayInfo(false)}
            >
                {/* {displayInfo ? <VerbInfoHover verb={props.value}></VerbInfoHover> : <></>} */}
                <Link className={styles.link} href={`/verbs/${props.value}`}>
                    {!props.html ? props.value : <span dangerouslySetInnerHTML={{ __html: sanitize(props.html || '') }}></span>}
                </Link>
            </span>
        </>
    )
}
