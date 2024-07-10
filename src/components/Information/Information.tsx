import Image from 'next/image'
import styles from './information.module.scss'
import { Fragment, ReactNode } from 'react'
import { sanitize } from 'isomorphic-dompurify'
import { SVGExercise, SVGInformation } from '@/assets/svg/svgExports'

interface IHoveredWithInfo {
    text: string,
}

export function Information(props: IHoveredWithInfo) {

    return  (
        <div className={styles.container} data-info={props.text}>
            <SVGInformation color={'var(--c-grey)'}/>
            <div className={styles.infoOnHover}>
                <p dangerouslySetInnerHTML={{__html: sanitize(props.text)}}></p>
            </div>
        </div>

    )
}