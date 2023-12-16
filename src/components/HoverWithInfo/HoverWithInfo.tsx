import Image from 'next/image'
import styles from './HoveredWithInfo.module.scss'
import { Fragment, ReactNode } from 'react'
import { sanitize } from 'isomorphic-dompurify'
import { SVGExercise } from '@/assets/svg/svgExports'

export default function HoveredWithInfo({text, children}: {text: string, children: ReactNode}) {

    return  (
        <div className={styles.container} data-info={text}>
            {children}
        </div>

    )
}