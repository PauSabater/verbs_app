// 'use client'

// import dynamic from 'next/dynamic'
import { Fragment, useLayoutEffect, useState } from 'react'
import styles from './lesson.module.scss'
import { sanitize } from 'isomorphic-dompurify'
import Callout from '../UI/Callout/Callout'
import { SVGAudio } from '@/assets/svg/svgExports'
import { replaceWithCurrentUrl } from '@/utils/utils'

interface ILessonSection {
    type: string,
    content?: string,
    itemsList?: any,
    table?: any
}

interface ITable {
    headings: string[]
    rows: string[][]
}

interface IItemsList {
        items: [
            {
                text: string,
                example: {
                    intro: string,
                    text: string,
                    translation: string
                }
            }
        ]
}

interface ILessonSections {
    sections: ILessonSection[]
}

// const DynamicData = dynamic(() => import('../components/CodeSampleModal'), {
//     ssr: false,
//   });

export default function Lesson(props: {lesson: string}): React.JSX.Element {

    const [data, setData] = useState<ILessonSections | null>(null)

    useLayoutEffect(()=> {
        let data
        import(`../../../public/data/lessons/prasens.json`)
        .then(result => setData(result))
    },[])

    const getTemplateSection = (section: ILessonSection)=> {
        if (section.type === 'h1') {
            return (
                <h1 dangerouslySetInnerHTML={{__html: sanitize(section.content || '')}}></h1>
            )
        }
        if (section.type === 'h2') {
            return (
                <h2 dangerouslySetInnerHTML={{__html: sanitize(section.content || '')}}></h2>
            )
        }
        if (section.type === 'h3') {
            return (
                <h3 dangerouslySetInnerHTML={{__html: sanitize(section.content || '')}}></h3>
            )
        }
        if (section.type === 'paragraph') {
            return (
                <div dangerouslySetInnerHTML={{__html: sanitize(section.content || '')}}></div>
            )
        }
        if (section.type === 'callout') {
            return (
                <Callout text={section.content || ''}></Callout>
            )
        }
        if (section.type === 'list') {
            return (
                <>{getListTemplate(section.itemsList)}</>
            )
        }
        if (section.type === 'table') {
            return (
                <>{getTableTemplate(section.table)}</>
            )
        }
    }

    const getTableTemplate = (table: ITable)=> {
        return (
            <Fragment>
            <table className={styles.table}>
                <tr className={styles.headings}>
                {
                    table.headings.map((heading)=> {return (
                        <th className={styles.heading}>{heading}</th>
                    )})
                }
                </tr>
                {
                    table.rows.map((row)=> {return (
                        <tr className={styles.row}>
                        {
                           row.map((value)=> {return (
                            <td className={`${styles.value} ${value.startsWith('-') ? styles.prefix : ''}`} dangerouslySetInnerHTML={{__html: sanitize(value || '')}}></td>
                        )})
                        }
                        </tr>
                    )})
                }
            </table>
</Fragment>

            )

    }

    const getExampleWithAudio = (example: {
        intro: string,
        text: string,
        translation: string
    })=> {
        return (
            <div className={styles.containerExampleAndTranslation}>
                <div className={styles.containerExample}>
                    <p>{example.intro || ''}
                        <span dangerouslySetInnerHTML={{__html: sanitize(replaceWithCurrentUrl(example.text) || '')}}>
                        </span>
                    </p>
                    <SVGAudio></SVGAudio>
                </div>
                <i>{example.translation}</i>
            </div>
        )
    }

    const getListTemplate = (section: IItemsList)=> {
        return (
            <ul className={styles.list}>{
                section.items.map(item => (
                    <>
                        <li className={styles.item}>
                            <p dangerouslySetInnerHTML={{__html: sanitize(item.text || '')}}></p>
                            {item.example
                                ? getExampleWithAudio(item.example)
                                : <></>
                            }
                        </li>
                    </>
                ))
            }</ul>
        )
    }

    return (
        data ?
            <div className={styles.container}>{
                data.sections.map((section: ILessonSection)=> {
                    return getTemplateSection(section)
                })
            }</div>


        // <nav className={styles.header}>
        //     <pre>{JSON.stringify(data)}</pre>
        // </nav>
        : <></>
    )
}