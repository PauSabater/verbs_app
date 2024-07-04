import Image from 'next/image'
import styles from './verbStemFormation.module.scss'
import { sanitize } from 'isomorphic-dompurify'
import { useContext } from 'react'
import { ContextVerbPage, IVerbsPageContext } from '@/app/verbs/[slug]/VerbPage'


export default function VerbStemFormation() {

    const context = useContext(ContextVerbPage) as IVerbsPageContext

    return (
        <div className={styles.container}>
            <p className={styles.formation} dangerouslySetInnerHTML={{__html: sanitize(context.stemFormationHTML)}}></p>
        </div>
    )
}