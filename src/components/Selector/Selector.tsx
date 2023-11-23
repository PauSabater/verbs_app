import { sanitize } from "isomorphic-dompurify"
import styles from './selector.module.scss'
import { SVGArrow } from "@/assets/svg/svgExports"
import { useState } from "react"

interface ISelector {
    title: string,
    options: {isTitle?: boolean, str: string}[],
    color?: string,
    weight?: string
}


export function Selector(props: ISelector) {

    const [isExpanded, setIsExpanded] = useState<boolean>(false)
    // const []


    const handleButtonClick = ()=> {
        console.log("CLIIIICK now it is "+isExpanded)
        setIsExpanded(!isExpanded)

    }


    return (
        <div className={styles.container}>
            <button
                className={`${styles.selector} ${props.color ? styles[props.color] : ''} ${props.weight ? styles[props.weight] : ''}`}
                role="combobox"
                aria-labelledby="select button"
                aria-haspopup="listbox"
                aria-expanded={isExpanded}
                aria-controls="select-dropdown"
                onClick={()=> handleButtonClick()}
            >
                <span className="selected-value">{props.title}</span>
                <SVGArrow></SVGArrow>
                {/* <span className="arrow"></span> */}
            </button>
            <ul className={`select-dropdown ${styles.dropdown} ${isExpanded ? styles.expanded : ''}`}>
                <li>
                <input type="radio" id="github" name="social-account" className={styles.input} />
                <label htmlFor="github" className={styles.label}>GitHub</label>
                </li>
                <li>
                <input type="radio" id="instagram" name="instagram"  className={styles.input} />
                <label htmlFor="instagram" className={styles.label}>Instagram</label>
                </li>
            </ul>
        </div>
    )
}