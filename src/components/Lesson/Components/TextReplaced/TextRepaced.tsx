import { variablesTextGetProp, extractVarTextGetString, variablesTextGetValue } from "@/utils/utils"
import { sanitize } from "isomorphic-dompurify"
import Link from "next/link"
import styles from './textReplaced.module.scss'
import { VerbInfoHover } from "../VerbIntoHover/VerbInfoHover"

interface ITextReplaced {
    text: string
}

// verb-link-hover
export const TextReplaced = (props: ITextReplaced): JSX.Element => {

    if (!props.text.includes('$__' || '')) return (
        <p dangerouslySetInnerHTML={{ __html: sanitize(props.text || '') }}></p>
    )

    const variableExtracted = extractVarTextGetString(props.text)
    if (!variableExtracted) return <></>

    // Get property
    const strProp = variablesTextGetProp(variableExtracted)

    // Get value
    let value = variablesTextGetValue(variableExtracted, strProp)

    const valuePath = value.includes('-') ? value.split('-')[1] : value
    const valueText = value.includes('-') ? value.split('-')[0] : value

    if (strProp === 'verb-link-hover') {
        const htmlEl: JSX.Element = <Link href={`/verbs/${value}`}>{value}</Link>

        const textWithoutVar = props.text.split(variableExtracted)
        const previousStr = textWithoutVar[0].replaceAll('$', '').replaceAll('_', '')
        const nextStr = textWithoutVar[1].replaceAll('$', '').replaceAll('_', '')

        return (
            <>
                <p className={styles.inline} dangerouslySetInnerHTML={{ __html: sanitize(previousStr) }}></p>
                <div className={styles.hoveredLinkContainer}>
                    <VerbInfoHover verb={valuePath}></VerbInfoHover>
                    <Link className={styles.link} href={`/verbs/${valuePath}`}>
                        {valueText}
                    </Link>
                </div>
                <p className={styles.inline} dangerouslySetInnerHTML={{ __html: sanitize(nextStr) }}></p>
            </>
        )
    }

    return <></>
}
