import { sanitize } from "isomorphic-dompurify"
import styles from './selector.module.scss'
import { SVGArrow } from "@/assets/svg/svgExports"
import { ChangeEvent, Fragment, ReactNode, useEffect, useState } from "react"


export interface ISelectorDropdownOptions {
    title?: string,
    options: string[]
}

interface ISelector {
    isFullwidth?: boolean,
    selectedOption?: string
    options: ISelectorDropdownOptions[]
    color?: string
    weight?: string
    // handleSelectInputChangeEvent: Function,
    callbackOnChange?: Function
}

export function Selector(props: ISelector) {

    // if (!props.selectedOption) props.selectedOption = 'hey'

    const [isExpanded, setIsExpanded] = useState<boolean>(false)
    // const []
    const [selectedOption, setSelectedOption] = useState<string>(props.selectedOption || '')

    useEffect(()=> {
        setSelectedOption(props.selectedOption || 'More lessons')
    }, [props.selectedOption])

    const handleButtonClick = ()=> {
        setIsExpanded(!isExpanded)
    }

    const handleInputChangeEvent = (e: ChangeEvent<HTMLInputElement>)=> {
        // setSelectedOption(e.target.name)
        // props.handleSelectInputChangeEvent(e)
        setTimeout(()=> setIsExpanded(false), 75)
        if (props.callbackOnChange) props.callbackOnChange(e.target.name, e.target.getAttribute("data-group"))
    }


    const getOptionsTemplate = (options: string[], group: string): ReactNode => {
        return (
            options.map((option, index)=> {
                return (
                    <li key={`li-${index}`}>
                        <input
                            key={`input-${index}`}
                            type="radio"
                            id={`${index}-${option}`}
                            name={option}
                            data-group={group}
                            className={`${styles.input}`}
                            checked={option === props.selectedOption}
                            data-checked={option === props.selectedOption}
                            onChange={(e)=> handleInputChangeEvent(e)}
                        />
                        <label
                            key={`label-${index}`}
                            htmlFor={`${index}-${option}`}
                            className={styles.label}
                        >{option}
                        </label>
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
            >
                <span className={styles.selectedValue}>{selectedOption || props.selectedOption}</span>
                <SVGArrow></SVGArrow>
                {/* <span className="arrow"></span> */}
            </button>
            <ul className={`select-dropdown ${styles.dropdown} ${isExpanded ? styles.expanded : ''}`}>
                {props.options.map((optionGroup, index) => {
                    return (
                        <Fragment key={`fr-${index}`}>
                            <label key={`title-${index}`} className={styles.labelTitle}>
                                {optionGroup.title}
                            </label>
                            {getOptionsTemplate(optionGroup.options, optionGroup.title || '')}
                        </Fragment>
                    )
                })}
            </ul>
        </div>
    )
}