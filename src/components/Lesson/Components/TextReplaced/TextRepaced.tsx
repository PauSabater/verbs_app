import { variablesTextGetProp, extractVarTextGetString, variablesTextGetValue } from "@/utils/utils"
import { sanitize } from "isomorphic-dompurify"
import Link from "next/link"
import styles from './textReplaced.module.scss'
import { VerbInfoHover } from "../VerbIntoHover/VerbInfoHover"
import { useState } from "react"

interface ITextReplaced {
    text: string
}

// verb-link-hover
export const TextReplaced = (props: ITextReplaced): JSX.Element => {

    if (!props.text.includes('$__' || '')) return (
        <p dangerouslySetInnerHTML={{ __html: sanitize(props.text || '') }}></p>
    )

    const splitByPattern = (inputString: string) => {
        // Define the regular expression pattern to match $__ANY-STRING-HERE__$
        const regex = /\$__[^$]+__\$/g;

        // Split the input string using the defined pattern
        const parts = inputString.split(regex)

        // Find all the splitters in the input string
        const splitters: string[] = inputString.match(regex) || []

        // console.log("HEY SPLIT HERE!")
        // console.log(result)
        // console.log(splitters)

        // Combine parts and splitters
        const result: string[] = [];
        for (let i = 0; i < parts.length; i++) {
            result.push(parts[i]);
            if (i < splitters.length) {
                result.push(splitters[i]);
            }
        }

        if (splitters.length > 1) {
            console.log("HEY HEY MORE!")
            console.log(result)
        }

        return result
    }

    const splitText: string[] = splitByPattern(props.text)


    const VerbWithInfoOnHover = (props: {text: string})=> {

        const [dispayInfoHover, setDisplayInfoHover] = useState(false)

        const variableExtracted = extractVarTextGetString(props.text)

        if (!variableExtracted) return <></>

        // Get property
        const strProp = variablesTextGetProp(variableExtracted)

        // Get value
        let value = variablesTextGetValue(variableExtracted, strProp)

        const valuePath = value.includes('-') ? value.split('-')[1] : value
        const valueText = value.includes('-') ? value.split('-')[0] : value

        const onMouseOver = ()=> {
            console.log("HEY MOUSE OVER")
            setDisplayInfoHover(true)
        }

        return (
            <span className={styles.hoveredLinkContainer}>
                {
                    dispayInfoHover
                        ? <VerbInfoHover verb={valuePath}></VerbInfoHover>
                        : <></>
                }
                <Link className={styles.link} href={`/verbs/${valuePath}`} onMouseOver={onMouseOver}>
                    <span dangerouslySetInnerHTML={{ __html: sanitize(valueText.replaceAll('=', '-').replaceAll('?', ' ') || '') }}></span>
                </Link>
            </span>
        )
    }

    // if (strProp === 'verb-link-hover') {

        return (
            <>
            {
                splitText.map((part: string) => {
                    return part.includes('verb-link-hover')
                        ? <VerbWithInfoOnHover text={part}/>
                        : <span className={styles.inline} dangerouslySetInnerHTML={{ __html: sanitize(part) }}></span>
                })
            }
            </>
        )

    return <></>
}
