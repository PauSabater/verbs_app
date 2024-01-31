import { sanitize } from 'isomorphic-dompurify'
import { ILessonSection } from '../Lesson/Lesson'
import styles from './indexContent.module.scss'
import { Fragment, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { getAnchorLinkStr } from '@/utils/utils'
import { SVGArrow } from '@/assets/svg/svgExports'
import { ButtonBookmark } from '../Bookmarker/ButtonBookmark'
import { ButtonShare } from '../ButtonShare/ButtonShare'
import { Selector } from '../Selector/Selector'
import { fontTitles } from '@/app/fonts'

interface IIndexContent {
    content: any,
    intersectedIndex: string
}


export function IndexContent(props: IIndexContent) {

    const lessonData = JSON.parse(props.content)

    const [elsIndex, setElsIndex] = useState<HTMLElement[] | null>(null)
    const [isExpanded, setIsExpanded] = useState<boolean>(true)
    const [heightExpandable, setHeightExpandable] = useState<string>('auto')

    const refContainer = useRef<HTMLDivElement | null>(null)
    const refListContainer = useRef<HTMLUListElement | null>(null)

    useEffect(()=> {

        const idElIntersected = `#${props.intersectedIndex}`
        const elIndexIntersected = document.getElementById(`#${props.intersectedIndex}`)

        removeAllBackgrounds()
        addBackground(idElIntersected)

    }, [props.intersectedIndex])

    useLayoutEffect(()=> {
        if (refContainer.current) {
            setElsIndex(Array.from((refContainer.current as HTMLElement).querySelectorAll("a")))

            if (refListContainer.current) {
                setHeightExpandable(`${refListContainer.current.scrollHeight}px`)
                setListHeight()
            }
        }
    }, [])

    const removeAllBackgrounds = ()=> {
        if (!elsIndex) return

        for (const elIndex of elsIndex) {
            if (elIndex.getAttribute('data-is-intersected') === 'true') {
                elIndex.setAttribute('data-is-intersected', 'false')
            }
        }
    }

    const addBackground = (id: string)=> {
        if (!elsIndex) return

        for (const elIndex of elsIndex) {
            if (elIndex.id !== id) continue
            if (elIndex.getAttribute('data-is-intersected') === 'false') {
                elIndex.setAttribute('data-is-intersected', 'true')
            }
        }
    }

    const setListHeight = ()=> {
        if (!refListContainer.current) return
        refListContainer.current.style.height = refListContainer.current.scrollHeight + 'px'

        // el.scrollHeight
    }

    const getTitles = (section: ILessonSection)=> {

        const anchorLink = getAnchorLinkStr(section.content)

        if (section.type === 'h1-post' || section.type === 'h1') {

            return (
                <li className={styles.h1}>
                    <a
                        className={styles.link}
                        id={anchorLink}
                        href={anchorLink}
                        data-is-intersected={"false"}
                    >
                        {section.content}
                    </a>
                </li>
            )
        }
        if (section.type === 'h2-post' || section.type === 'h2') {
            return (
                <li className={styles.h2}>
                    <a
                        className={styles.link}
                        id={anchorLink}
                        href={getAnchorLinkStr(section.content)}
                        data-is-intersected={"false"}
                    >
                        {section.content}
                    </a>
                </li>
            )
        }
        if (section.type === 'h3') {
            return (
                <li className={styles.h3}>
                    <a
                        className={styles.link}
                        id={anchorLink}
                        href={getAnchorLinkStr(section.content)}
                        data-is-intersected={"false"}
                    >
                        {section.content}
                    </a>
                </li>
            )
        }

        return <></>
    }

    const handleTitleListClick = ()=> {
        setListHeight()
        setIsExpanded(!isExpanded)
    }

    return (
        <div className={styles.container} ref={refContainer}>
            <Selector
                isLinksList={true}
                isFullwidth={true}
                options={[{options: ['prateritum', 'prateritum test']}]}
            ></Selector>
            <div
                className={`${styles.titleContainer} ${!isExpanded ? styles.isRetracted : ''}`}
                onClick={()=> handleTitleListClick()}
            >
                <p className={`${styles.title} ${fontTitles.className}`}>Table of contents</p>
                <SVGArrow></SVGArrow>
            </div>
            <ul
                className={`${styles.list} ${!isExpanded ? styles.isRetracted : ''}`}
                // data-height={heightExpandable}
                // style={{height: `"${isExpanded ? heightExpandable : heightExpandable};"`}}
                ref={refListContainer}
                // style={`${heightExpandable ? `height: ${heightExpandable.toString()}px;` : ''}`}
            >
                {
                    lessonData ? lessonData.sections.map((section: ILessonSection, i: number)=> {
                        return <Fragment key={i}>{getTitles(section)}</Fragment>
                    })
                : ''}
            </ul>
            <div className={styles.iconsContainer}>
                <div className={styles.bookmarkContainer}>
                    <ButtonBookmark
                        text={'Bookmark lesson'}
                        isReverse={false}
                    />
                </div>
                <div className={styles.shareIconsContainer}>
                    <p>Share on</p>
                    <ButtonShare icon={'facebook'} />
                    <ButtonShare icon={'whatsapp'} />
                    <ButtonShare icon={'mail'} />
                    <ButtonShare icon={'x'} />
                    <ButtonShare icon={'linkedIn'} />
                </div>
            </div>
        </div>
    )
}