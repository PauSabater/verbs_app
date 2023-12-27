// 'use client'

// import dynamic from 'next/dynamic'
import { Fragment, useEffect, useLayoutEffect, useRef, useState } from 'react'
import styles from './lesson.module.scss'
import { sanitize } from 'isomorphic-dompurify'
import Callout from '../UI/Callout/Callout'
import { SVGAudio } from '@/assets/svg/svgExports'
import { getAnchorId, removeTags, replaceWithCurrentUrl } from '@/utils/utils'
import { AudioIcon } from '../AudioIcon/AudioIcon'
import { Button } from '../Button/Button'

export interface ILessonSection {
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

interface ILesson {
    lesson: string,
    utterance: SpeechSynthesisUtterance | null,
    isPost?: boolean
    data?: any
}

// const DynamicData = dynamic(() => import('../components/CodeSampleModal'), {
//     ssr: false,
//   });

export default function Lesson(props: ILesson): React.JSX.Element {

    const [data, setData] = useState<ILessonSections | null>(props.data || null)
    const refLessonContainer = useRef(null)

    useLayoutEffect(()=> {

        if (!props.data) {
            let data
            import(`../../../public/data/lessons/prasens.json`)
            .then(result => setData(result))

            console.log("TEEEST")
            const elsHeader = document.querySelectorAll('[data-is-heading="true"]')

            console.log(elsHeader)
        }



        // console.log(refLessonContainer.current)
        // if (refLessonContainer.current !== null) {
        //     const elsHeader = (refLessonContainer.current as HTMLElement).querySelector('[data-is-heading="true"]')
        //     console.log(elsHeader)
        // }

    },[])

    useEffect(()=> {
        console.log("TEST TEST ")
        console.log(refLessonContainer.current)
        if (refLessonContainer.current !== null) {
            const elsHeader = (refLessonContainer.current as HTMLElement).querySelector('[data-is-heading="true"]')
            console.log(elsHeader)
        }
    }, [refLessonContainer])

    const getTemplateSection = (section: ILessonSection)=> {

        if (!props.isPost && section.type === 'h1-lesson' || section.type === 'h1' || props.isPost && section.type === 'h1-post') {
            return (
                <h1
                    id={getAnchorId(section.content)}
                    data-is-heading="true"
                    dangerouslySetInnerHTML={{__html: sanitize(section.content || '')}}
                ></h1>
            )
        }
        if (!props.isPost && section.type === 'h2-lesson' || section.type === 'h2' || props.isPost && section.type === 'h2-post') {
            return (
                <h2
                    id={getAnchorId(section.content)}
                    data-is-heading="true"
                    dangerouslySetInnerHTML={{__html: sanitize(section.content || '')}}
                ></h2>
            )
        }
        if (section.type === 'h3') {
            return (
                <h3
                    id={getAnchorId(section.content)}
                    data-is-header="true"
                    dangerouslySetInnerHTML={{__html: sanitize(section.content || '')}}
                ></h3>
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
        if (props.isPost && section.type === 'exercise-btn') {
            return (
                <Button
                    icon={'exercise'}
                    text={section.content || ''}
                ></Button>
            )
        }
        if (section.type.includes('table')) {
            return (
                <>{getTableTemplate(section.table, section.type)}</>
            )
        }

        return <></>
    }

    const getTableAudioText = (table: ITable)=> {
        let string = ''

        const columnsNum = table.rows.length - 1

        for(const row of table.rows) {
            string = string + row[0] + removeTags(row[columnsNum]) + ', '
        }

        return string
    }

    const getTableTemplate = (table: ITable, type?: string)=> {
        return (
            <div className={styles.tableContainer}>
                <AudioIcon utterance={props.utterance as SpeechSynthesisUtterance} text={getTableAudioText(table)}/>
                <table className={styles.table}>
                    {table.headings ?
                    <thead>
                    <tr className={styles.headings}>
                    {
                        table.headings.map((heading, i)=> {return (
                            <th key={`head=${i}`} className={styles.heading}>{heading}</th>
                        )})
                    }
                    </tr>
                </thead>
                : ''

                    }

                    <tbody>
                        {
                            table.rows.map((row, i)=> {return (
                                <tr key={`row-${i}`} className={`${styles.row} ${type?.includes((i + 1).toString()) ? styles.rowBackground : ''}`}>
                                {
                                    row.map((value, i)=> {return (
                                        <td key={`row-value-${i}`}
                                            className={`${styles.value} ${value.startsWith('-') ? styles.prefix : ''}`}
                                            dangerouslySetInnerHTML={{__html: sanitize(value || '')}}
                                        ></td>
                                    )})
                                }
                                </tr>
                            )})
                        }
                    </tbody>
                </table>
            </div>
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
                    <AudioIcon
                        utterance={props.utterance as SpeechSynthesisUtterance}
                        text={removeTags(example.text)}
                    ></AudioIcon>
                </div>
                <i>{example.translation}</i>
            </div>
        )
    }

    const getListTemplate = (section: IItemsList)=> {
        return (
            <ul className={styles.list}>{
                section.items.map((item, i) => (
                    <li className={styles.item} key={`item=${i}`}>
                        <p key={`p=${i}`} dangerouslySetInnerHTML={{__html: sanitize(item.text || '')}}></p>
                        {item.example
                            ? getExampleWithAudio(item.example)
                            : <></>
                        }
                    </li>
                ))
            }</ul>
        )
    }

    return (
        data ?
            <div
                ref={refLessonContainer}
                className={`${styles.container} ${props.isPost ? styles.isPost : ''}`}
            >
                {
                    data.sections ? data.sections.map((section: ILessonSection, i)=> {
                        return <Fragment key={i}>{getTemplateSection(section)}</Fragment>
                    })
                    : <></>
                }
            </div>


        // <nav className={styles.header}>
        //     <pre>{JSON.stringify(data)}</pre>
        // </nav>
        : <></>
    )
}