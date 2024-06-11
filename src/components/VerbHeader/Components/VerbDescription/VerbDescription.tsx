import { sanitize } from "isomorphic-dompurify";
import styles from './verbDescription.module.scss'
import { Fragment, useEffect, useRef, useState } from "react";
import { SVGArrow } from "@/assets/svg/svgExports";
import { fontTitles } from "@/app/fonts";

export function VerbDescription({text}: {text: string}) {

    const [isExpanded, setIsExpanded] = useState<boolean>(true)
    const refCollapsible = useRef(null)

    useEffect(()=> {


    }, [isExpanded])

    return (
        <Fragment>
            {/* <div className={styles.triggerExpand} onClick={()=> setIsExpanded(!isExpanded)}>
                <p>Meaning</p>
                <SVGArrow></SVGArrow>
            </div> */}
            <div ref={refCollapsible} className={styles.collapsibleContent}>
                <p dangerouslySetInnerHTML={{__html: sanitize(text)}} className={`${styles.description}`}></p>
            </div>
        </Fragment>
    )
}