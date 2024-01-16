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
    table?: any,
    marginList?: boolean
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
    onHeadingIntersection?: Function,
    callbackOnExerciseOpen?: Function
}

export default function Lesson(props: ILesson): React.JSX.Element {

    const [data, setData] = useState<ILessonSections | null>(props.data || null)
    const refLessonContainer = useRef(null)
    const [headings, setHeadings] = useState<string[] | null>(null)
    // If a post, data will be substracted from the page component in order to allow SSR
    const [lessonData, setLessonData] = useState<ILessonSections | null>(props.isPost ? JSON.parse(props.data) : null)

    useEffect(()=> {

        if (!props.isPost) {
            import(`../../../public/data/lessons/${props.lesson}.json`, { assert: { type: "json" } })
            .then(result => {
                setLessonData(result)
            })
        }
    },[])

    useLayoutEffect(()=> {

        if (refLessonContainer.current !== null) {
            const elsHeader = (refLessonContainer.current as HTMLElement).querySelectorAll('[data-is-heading="true"]')

            for (const elHeader of Array.from(elsHeader)) {
                addHeadingIntersectionObserver(elHeader as HTMLElement)
            }
        }
    })


    const addHeadingIntersectionObserver = (elHeading: HTMLElement)=> {

        if (!props.onHeadingIntersection) return

        const options = {
            // root: refLessonContainer.current,
            rootMargin: `0px 0px -60% 0px`,
            threshold: 1
      }

        const intersectionObserver = new IntersectionObserver((entries) => {
            // If intersectionRatio is 0, the target is out of view
            // and we do not need to do anything.
            if (entries[0].intersectionRatio <= 0) return;

            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    // Add logic for nav item that maps to the visible section.
                    if (props.onHeadingIntersection) {
                        props.onHeadingIntersection(entries[0].target.id)
                    }
                } else {
                  // Add logic for nav item that maps to the invisible section.
                }
              });

          }, options);

          // start observing
          intersectionObserver.observe(elHeading);

    }

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
                    data-is-heading="true"
                    dangerouslySetInnerHTML={{__html: sanitize(section.content || '')}}
                ></h3>
            )
        }
        if (section.type === 'paragraph') {
            return (
                <div
                    className={section.marginList ? styles.listMargin : ''}
                    dangerouslySetInnerHTML={{__html: sanitize(section.content || '')}}
                ></div>
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
                <div className={section.marginList ? styles.listMargin : ''}>
                    <Button
                        icon={'exercise'}
                        text={section.content || ''}
                        callback={props.callbackOnExerciseOpen}
                    ></Button>
                </div>
            )
        }
        if (section.type.includes('table')) {
            return (
                <>{getTableTemplate(section.table, section.marginList ? true : false, section.type)}</>
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

    const getTableTemplate = (table: ITable, hasMargin: boolean, type?: string)=> {
        return (
            <div className={`${styles.tableContainer} ${hasMargin ? styles.listMargin : ''}`}>
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

    const getLessonTemplate = ()=> {

        if (lessonData === null) return
        const lessonSections = lessonData.sections

        return (
            lessonSections
                ? lessonSections.map((section: ILessonSection, i: Number)=> {
                    return <Fragment key={i.toString()}>{getTemplateSection(section)}</Fragment>
                })
                : <></>
            )
    }

    return (
        lessonData ?
            <div
                ref={refLessonContainer}
                className={`${styles.container} ${props.isPost ? styles.isPost : ''}`}
            >
                {getLessonTemplate()}
            </div>


        // <nav className={styles.header}>
        //     <pre>{JSON.stringify(data)}</pre>
        // </nav>
        : <></>
    )
}