import { sanitize } from 'isomorphic-dompurify'
import { ILessonSection } from '../Lesson/Lesson'
import styles from './indexContent.module.scss'
import { Fragment } from 'react'
import { getAnchorLinkStr } from '@/utils/utils'

interface IIndexContent {
    content: any
}


export function IndexContent(props: IIndexContent) {

    const getTitles = (section: ILessonSection)=> {

        // console.log("HEY IN TITLES. CHECK:" +section.type)

        if (section.type === 'h1-post' || section.type === 'h1') {
            return (
                <li className={styles.h1}>
                    <a className={styles.link} href={getAnchorLinkStr(section.content)}>
                        {section.content}
                    </a>
                </li>
            )
        }
        if (section.type === 'h2-post' || section.type === 'h2') {
            return (
                <li className={styles.h2}>
                    <a className={styles.link} href={getAnchorLinkStr(section.content)}>
                        {section.content}
                    </a>
                </li>
            )
        }
        if (section.type === 'h3') {
            return (
                <li className={styles.h3}>
                    <a className={styles.link} href={getAnchorLinkStr(section.content)}>
                        {section.content}
                    </a>
                </li>
            )
        }

        return <></>
    }




    return (
      <div className={styles.container}>
          <p className={styles.title}>Table of contents</p>
          <ul className={styles.list}>
            {
                props.content ? props.content.sections.map((section: ILessonSection, i: number)=> {
                    return <Fragment key={i}>{getTitles(section)}</Fragment>
                })
            : ''}
          </ul>
          {/* <div className={styles.background}></div>
          <p>THIS IS A HEADER</p> */}
      </div>
    )
}