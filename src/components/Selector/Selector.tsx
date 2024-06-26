import { sanitize } from "isomorphic-dompurify"
import styles from './selector.module.scss'
import { SVGArrow } from "@/assets/svg/svgExports"
import { ChangeEvent, Fragment, ReactNode, useContext, useEffect, useRef, useState } from "react"
import { LessonPageContext } from "@/app/lessons/[slug]/LessonPage"
import { replaceSpacesForURL } from "@/utils/utils"

export interface ISelectorDropdownOptions {
    title?: string,
    options: string[]
}

interface ISelector {
    isLinksList?:boolean,
    linkPath?: string,
    isFullwidth?: boolean
    selectedOption?: string
    options: ISelectorDropdownOptions[]
    color?: string
    weight?: string
    // handleSelectInputChangeEvent: Function,
    callbackOnChange?: Function,
    isExerciseGenerate?: boolean,
    type?: 'checkbox' | 'radio',
    columns?: number;
    selectAllOption?: string
    updatedSelectedOptions?: string[]
}

export function Selector(props: ISelector) {

    const lessonPageContext = useContext(LessonPageContext)
    const [isEventAdded, setIsEventAdded] = useState(false)

    // if (!props.selectedOption) props.selectedOption = 'hey'

    const [isExpanded, setIsExpanded] = useState<boolean>(false)
    // const []
    const [selectedOption, setSelectedOption] = useState<string>(props.selectedOption || '')
    const refContainer = useRef(null)
    const refBtn = useRef(null)

    useEffect(()=> {
        if (!props.isExerciseGenerate) {
            setSelectedOption(props.selectedOption || 'More lessons')
        }

        if (isEventAdded === false) {
            setIsEventAdded(true)
            document.addEventListener('click', outsideListListener)
        }
    }, [props.selectedOption])

    // Update checked inputs depending on updated from outside the Select component:
    useEffect(()=> {
        const elContainer: HTMLElement | null = refContainer.current

        if (elContainer === null) return
        const elsInput = (elContainer as HTMLElement).querySelectorAll('input')

        for (const elInput of Array.from(elsInput)) {
            if (!props.updatedSelectedOptions?.includes(elInput.value) && elInput.checked) {
                elInput.checked = false
            }
        }

    }, [props.updatedSelectedOptions])

    const handleButtonClick = ()=> {
        setIsExpanded(!isExpanded)
    }

    const outsideListListener = (e: Event)=> {
        if (e.target === refBtn.current) return
        if (!(refContainer.current && (refContainer.current as HTMLElement).contains(e.target as Node))) {
            setIsExpanded(false)
        }
    }

    const handleInputChangeEvent = (e: ChangeEvent<HTMLInputElement>)=> {
        if (!props.isExerciseGenerate) {
            setTimeout(()=> setIsExpanded(false), 75)
        }
        if (props.callbackOnChange) {
            props.callbackOnChange(e.target.name, e.target.getAttribute("data-group"), e.target.checked)
        }
    }

    const handleSelectAllEvent = (e: ChangeEvent<HTMLInputElement>) => {
        const isInputChecked = e.target.checked
        const elContainer: HTMLElement | null = refContainer.current

        if (elContainer === null) return
        const elsInput = (elContainer as HTMLElement).querySelectorAll('input')

        for (const elInput of Array.from(elsInput)) {
            elInput.checked = isInputChecked

            if (props.callbackOnChange) {
                props.callbackOnChange(elInput.name, elInput.getAttribute("data-group"), isInputChecked)
            }
        }
    }


    const getOptionsTemplate = (options: string[], group: string): ReactNode => {
        return (
            options.map((option, index)=> {
                return (
                    <li key={`li-${index}`}>
                        {!props.isLinksList ? (
                            <>
                                <input
                                    key={`input-${index}`}
                                    type={props.type || 'radio'}
                                    id={`${index}-${option}`}
                                    name={option}
                                    data-group={group}
                                    className={`${styles.input}`}
                                    value={option}
                                    // checked={!props.isExerciseGenerate ? option === props.selectedOption}
                                    data-checked={option === props.selectedOption}
                                    onChange={(e) => handleInputChangeEvent(e)}
                                />
                                <label key={`label-${index}`} htmlFor={`${index}-${option}`} className={styles.label}>
                                    {option}
                                </label>
                            </>
                        ) : (
                            <a
                                className={styles.label}
                                href={`http://${lessonPageContext.url}${lessonPageContext.selectorLinksPath || ''}/${replaceSpacesForURL(option)}`}
                            >{option}
                            </a>
                        )}
                    </li>
                )

            })
        )
    }


    return (
        <div className={`${styles.container} ${props.isFullwidth ? styles.fullwidth : ''}`}>
            <button
                className={`${styles.selector} ${props.isFullwidth ? styles.fullwidth : ''} ${isExpanded ? styles.btnExpanded : ''} ${props.color ? styles[props.color] : ''} ${
                    props.weight ? styles[props.weight] : ''
                }`}
                role="combobox"
                aria-labelledby="select button"
                aria-haspopup="listbox"
                aria-expanded={isExpanded}
                aria-controls="select-dropdown"
                onClick={() => handleButtonClick()}
                ref={refBtn}
            >
                <span className={styles.selectedValue}>{selectedOption || props.selectedOption}</span>
                <SVGArrow></SVGArrow>
                {/* <span className="arrow"></span> */}
            </button>

            <ul
                ref={refContainer}
                className={`select-dropdown ${styles.dropdown} ${isExpanded ? styles.expanded : ''} ${props.isFullwidth ? styles.fullwidth : ''} ${styles[`columns-${props.columns}`]} ${props.isExerciseGenerate ? styles.exerciseGenerate : ''}`}
            >
                {props.options.map((optionGroup, index) => {
                    return (
                        <Fragment key={`fr-${index}`}>
                            {
                                optionGroup.title ?
                                    <label key={`title-${index}`} className={styles.labelTitle}>
                                    {optionGroup.title}
                                    </label>
                                    : <></>
                            }

                            {
                                props.selectAllOption ?
                                <li className={styles.selectAllItem} key={`li-select-all`}>
                                    <input
                                        key={`input-${index}`}
                                        type={props.type || 'radio'}
                                        id={`${index}-${props.selectAllOption}`}
                                        name={props.selectAllOption}
                                        className={`${styles.inputSelectAll}`}
                                        data-checked={false}
                                        data-select-all={"true"}
                                        onChange={(e) => handleSelectAllEvent(e)}
                                    />
                                    <label key={`label-${index}`} htmlFor={`${index}-${props.selectAllOption}`} className={styles.label}>
                                        {props.selectAllOption.split('#')[0]}
                                    </label>
                                </li>

                                : <></>
                            }

                            {getOptionsTemplate(optionGroup.options, optionGroup.title || '')}
                        </Fragment>
                    )
                })}
            </ul>
        </div>
    )
}