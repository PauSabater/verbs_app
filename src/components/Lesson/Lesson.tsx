// 'use client'

// import dynamic from 'next/dynamic'
import { Context, Fragment, useContext, useEffect, useLayoutEffect, useRef, useState } from 'react'
import styles from './lesson.module.scss'
import { sanitize } from 'isomorphic-dompurify'
import Callout from '../Callout/Callout'
import { SVGAudio } from '@/assets/svg/svgExports'
import { getAnchorId, removeTags, replaceWithCurrentUrl } from '@/utils/utils'
import { AudioIcon } from '../AudioIcon/AudioIcon'
import { Button } from '../Button/Button'
import { TextReplaced } from './Components/TextReplaced/TextRepaced'
import { LinkWithInfoHover } from './Components/LinkWithInfoHover/LinkWithInfoHover'
import { fontTitles } from '@/app/fonts'
import { fontSerif } from '@/app/fonts'
import { LessonPageContext } from '@/app/lessons/[slug]/LessonPage'
import { ExerciseConjugation } from '../ExerciseConjugation/ExerciseConjugation'
import textsVerbExercise from '@/data/textsVerbExercise.json'
import { getApiVerbConjugationsFromTenses } from '@/lib/getApiData'
import ButtonWithExercise from './Components/ButtonWithExercise/ButtonWithExercise'
import Image from 'next/image'

interface ILessonExample {
    audio: string,
    text: string,
    translation: string
}

export interface ILessonSection {
    type: string
    content?: string
    parts?: { type: string; content: string; contentHtml?: string }[]
    itemsList?: any
    table?: any
    marginList?: boolean
    param?: string
    example?: ILessonExample
    exercise?: {
        verb: string,
        tense: string
    },
    path?: string,
    image?: ILessonImage,
    classes?: string
}

interface ILessonImage {
    src: string,
    alt: string,
    height: number,
    width: number
}

interface ITable {
    audio?: string | string[]
    headings: string[]
    rows: string[][]
}

interface IItemsList {
        items: [
            {
                text: string,
                example: ILessonExample
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
    exerciseTexts?: any
}

export default function Lesson(props: ILesson): React.JSX.Element {

    const lessonPageContext = useContext(LessonPageContext)

    const [data, setData] = useState<ILessonSections | null>(props.data || null)
    const refLessonContainer = useRef(null)
    const [headings, setHeadings] = useState<string[] | null>(null)
    // If a post, data will be substracted from the page component in order to allow SSR
    const [lessonData, setLessonData] = useState<ILessonSections | null>(props.isPost ? JSON.parse(props.data) : null)

    useEffect(() => {
        if (!props.isPost) {
            import(`../../../public/data/lessons/${props.lesson}.json`, { assert: { type: 'json' } }).then((result) => {
                setLessonData(result)
            })
        }
    }, [])

    useLayoutEffect(() => {
        if (refLessonContainer.current !== null) {
            const elsHeader = (refLessonContainer.current as HTMLElement).querySelectorAll('[data-is-heading="true"]')

            for (const elHeader of Array.from(elsHeader)) {
                addHeadingIntersectionObserver(elHeader as HTMLElement)
            }
        }
    })

    const addHeadingIntersectionObserver = (elHeading: HTMLElement) => {
        if (!props.onHeadingIntersection) return

        const options = {
            // root: refLessonContainer.current,
            rootMargin: `0px 0px -60% 0px`,
            threshold: 1
        }

        const intersectionObserver = new IntersectionObserver((entries) => {
            // If intersectionRatio is 0, the target is out of view
            // and we do not need to do anything.
            if (entries[0].intersectionRatio <= 0) return

            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    // Add logic for nav item that maps to the visible section.
                    if (props.onHeadingIntersection) {
                        props.onHeadingIntersection(entries[0].target.id)
                    }
                } else {
                    // Add logic for nav item that maps to the invisible section.
                }
            })
        }, options)

        // start observing
        intersectionObserver.observe(elHeading)
    }

    const getTemplateSection = (section: ILessonSection) => {

        if (section.type === 'paragraph-components') {

            if (!section.parts) return <></>

            const paragraphComponents = []

            for (const part of section.parts) {
                if (part.type === 'text') {
                    paragraphComponents.push(
                        <p
                            className={styles.inlineParagraph}
                            dangerouslySetInnerHTML={{ __html: sanitize(part.content || '') }}
                        ></p>
                    )

                } else if (part.type.includes('link-verb-hover')) {
                    paragraphComponents.push(
                        <LinkWithInfoHover
                            value={part.content}
                            html={part.type.includes('html') ? part.contentHtml : ''}
                        ></LinkWithInfoHover>
                    )
                }
            }

            return (
                <p
                    className={`${styles.inlineParagraph} ${section.marginList && section.marginList === true ? styles.listMargin : ''}`}
                >
                    {paragraphComponents}
                </p>
            )

        }

        if (section.type === 'example') {
            if (section.example) {
                return <>{getExampleWithAudio(section.example, section.marginList && section.marginList === true ? true : false)}</>
            }
        }

        if (section.type === 'image') {

            return section.image ? (
                <Image
                    src={section.image.src}
                    height={section.image.height}
                    width={section.image.width}
                    alt={section.image.alt}
                />
            )
            : <></>
        }


        if ((!props.isPost && section.type === 'h1-lesson') || section.type === 'h1' || (props.isPost && section.type === 'h1-post')) {
            return <h1 id={getAnchorId(section.content)} data-is-heading="true" dangerouslySetInnerHTML={{ __html: sanitize(section.content || '') }}></h1>
        }
        if ((!props.isPost && section.type === 'h2-lesson') || section.type === 'h2' || (props.isPost && section.type === 'h2-post')) {
            return (
                <h2
                    className={fontTitles.className}
                    id={getAnchorId(section.content)}
                    data-is-heading="true"
                    dangerouslySetInnerHTML={{ __html: sanitize(section.content || '') }}
                ></h2>
            )
        }
        if (section.type === 'h3') {
            return (
                <h3
                    className={fontTitles.className}
                    id={getAnchorId(section.content)}
                    data-is-heading="true"
                    dangerouslySetInnerHTML={{ __html: sanitize(section.content || '') }}
                ></h3>
            )
        }
        if (section.type === 'h4') {
            return (
                <h4
                    className={fontTitles.className}
                    id={getAnchorId(section.content)}
                    data-is-heading="true"
                    dangerouslySetInnerHTML={{ __html: sanitize(section.content || '') }}
                ></h4>
            )
        }
        if (section.type === 'paragraph') {
            return (
                // <p
                //     className={section.marginList ? styles.listMargin : ''}
                //     dangerouslySetInnerHTML={{ __html: sanitize(section.content || '') }}
                // ></p>
                <>
                    <p><TextReplaced text={section.content || ''}></TextReplaced></p>
                </>
            )
        }
        if (section.type === 'callout') {
            return <Callout text={section.content || ''}></Callout>
        }
        if (section.type === 'html') {
            return <div><TextReplaced text={section.content || ''}></TextReplaced></div>
        }
        if (section.type === 'list') {
            return <>{getListTemplate(section.itemsList)}</>
        }
        if (props.isPost && section.type === 'exercise-btn') {

            if(!section.exercise?.verb) return

            return (
                <div className={section.marginList ? styles.listMargin : ''}>
                    <ButtonWithExercise
                        buttonText={section.content || ''}
                        verb={section.exercise?.verb || ''}
                        exerciseTexts={textsVerbExercise}
                        exerciseTense={section.exercise?.tense}
                    />
                </div>
            )
        }
        if (props.isPost && section.type === 'exercise-btn-link') {

            return (
                <div className={section.marginList ? styles.listMargin : ''}>
                    <Button
                        icon={'exercise'}
                        text={section.content || ''}
                        isLink={true}
                        path={section.path}
                    ></Button>
                </div>
            )
        }
        if (section.type.includes('table')) {
            return <>{getTableTemplate(section.table, section.marginList ? true : false, section.type, section.classes || '')}</>
        }

        return <></>
    }

    const onBtnExerciseClick = (verb: string)=> {
        console.log("HEY ON BTN CLICK")
        lessonPageContext.callbackOnExerciseOpen(verb)
    }

    const getTableAudioText = (table: ITable) => {
        let string = ''

        const columnsNum = table.rows.length - 1

        for (const row of table.rows) {
            string = string + row[0] + removeTags(row[columnsNum]) + ', '
        }

        return string
    }

    const getTableTemplate = (table: ITable, hasMargin: boolean, type: string, classes = '') => {
        return (
            <div className={`${styles.tableContainer} ${hasMargin ? styles.listMargin : ''} ${classes ? styles[classes] : ''}`}>
                {table.audio && !Array.isArray(table.audio) ? <AudioIcon utterance={props.utterance as SpeechSynthesisUtterance} text={table.audio} /> : <></>}
                <table className={styles.table}>
                    {table.headings ? (
                        <thead>
                            <tr className={styles.headings}>
                                {table.headings.map((heading, i) => {
                                    return (
                                        <th key={`head=${i}`} className={styles.heading}>
                                            <span>
                                                {heading}
                                                {table.audio && Array.isArray(table.audio) && table.audio[i]
                                                    ? <AudioIcon utterance={props.utterance as SpeechSynthesisUtterance} text={table.audio[i]} />
                                                    : <></>
                                                }
                                            </span>
                                        </th>
                                    )
                                })}
                            </tr>
                        </thead>
                    ) : (
                        ''
                    )}

                    <tbody>
                        {table.rows.map((row, i) => {
                            return (
                                <tr key={`row-${i}`} className={`${styles.row} ${type?.includes((i + 1).toString()) ? styles.rowBackground : ''}`}>
                                    {row.map((value, i) => {
                                        return (
                                            <td
                                                key={`row-value-${i}`}
                                                className={`${styles.value} ${value.startsWith('-') ? styles.prefix : ''}`}
                                                dangerouslySetInnerHTML={{ __html: sanitize(value || '') }}
                                            ></td>
                                        )
                                    })}
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        )
    }

    const getExampleWithAudio = (example: { audio: string; text: string; translation: string }, hasMargin?: boolean) => {
        return (
            <div className={`${styles.containerExampleAndTranslation} ${hasMargin ? styles.listMargin : ''}`}>
                <div className={styles.containerExample}>
                    <p className={styles.example}>
                        <TextReplaced text={example.text}></TextReplaced>
                        {/* <span dangerouslySetInnerHTML={{ __html: sanitize(replaceWithCurrentUrl(example.text) || '') }}></span> */}
                    </p>
                    <AudioIcon utterance={props.utterance as SpeechSynthesisUtterance} text={example.audio}></AudioIcon>
                </div>
                <i>{example.translation}</i>
            </div>
        )
    }

    const getListTemplate = (section: IItemsList) => {
        return (
            <ul className={styles.list}>
                {section.items.map((item, i) => (
                    <li className={styles.item} key={`item=${i}`}>
                        <TextReplaced text={item.text}></TextReplaced>
                        {item.example ? getExampleWithAudio(item.example) : <></>}
                    </li>
                ))}
            </ul>
        )
    }

    const getLessonTemplate = () => {
        if (lessonData === null) return
        const lessonSections = lessonData.sections

        return lessonSections ? (
            lessonSections.map((section: ILessonSection, i: Number) => {
                return <Fragment key={i.toString()}>{getTemplateSection(section)}</Fragment>
            })
        ) : (
            <></>
        )
    }

    return lessonData ? (
        <div ref={refLessonContainer} className={`${styles.container} ${props.isPost ? styles.isPost : ''}`}>
            {getLessonTemplate()}
        </div>
    ) : (
        // <nav className={styles.header}>
        //     <pre>{JSON.stringify(data)}</pre>
        // </nav>
        <></>
    )
}