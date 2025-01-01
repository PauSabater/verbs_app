import { variablesTextGetProp, extractVarTextGetString, variablesTextGetValue } from "@/utils/utils"
import { sanitize } from "isomorphic-dompurify"
import Link from "next/link"
import styles from './textReplaced.module.scss'
import { VerbInfoHover } from "../VerbIntoHover/VerbInfoHover"
import { useState } from "react"
import InputExerciseText from "@/components/ExerciseText/InputExerciseText/InputExerciseText"

interface ITextReplaced {
    text: string
}

// verb-link-hover
export const TextReplaced = (props: ITextReplaced): JSX.Element => {

    if (!props.text.includes('$__' || '')) return (
        <p dangerouslySetInnerHTML={{ __html: sanitize(props.text || '') }}></p>
    )

    const splitByPattern = (inputString: string) => {
        const regex = /\$__[^$]+__\$/g;
        const parts = inputString.split(regex)
        const splitters: string[] = inputString.match(regex) || []

        const result: string[] = [];
        for (let i = 0; i < parts.length; i++) {
            result.push(parts[i]);
            if (i < splitters.length) {
                result.push(splitters[i]);
            }
        }

        if (splitters.length > 1) {
            // console.log("HEY HEY MORE!")
            // console.log(result)
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

        return (
            <span className={styles.hoveredLinkContainer}>
                {
                    dispayInfoHover
                        ? <VerbInfoHover verb={valuePath}></VerbInfoHover>
                        : <></>
                }
                <Link
                    className={styles.link}
                    href={`/verbs/${valuePath}`}
                    onMouseOver={()=> setDisplayInfoHover(true)}
                    onMouseLeave={()=> setDisplayInfoHover(false)}
                >
                    <span dangerouslySetInnerHTML={{ __html: sanitize(valueText.replaceAll('=', '-').replaceAll('?', ' ') || '') }}></span>
                </Link>
            </span>
        )
    }

    // if (strProp === 'verb-link-hover') {

        return (
            <>
            {
                splitText.map((part: string, i) => {
                    return part.includes('verb-link-hover')
                        ? <VerbWithInfoOnHover text={part} key={'verb-with-info' + i}/>
                        :  part.includes('input-exercise')
                            ?   <InputExerciseText
                                    answer={part.split('[input-exercise]')[0].split('$__')[1]}
                                />
                            : <span key={'span-text-replaced' + i} className={styles.inline} dangerouslySetInnerHTML={{ __html: sanitize(part) }}></span>
                })
            }
            </>
        )

    return <></>
}
