import styles from './verbHeader.module.scss'
import VerbTitle from './Components/VerbTitle/VerbTitle'
import VerbStemFormation from './Components/VerbStemFormation/VerbStemFormation'
import VerbDetails from './Components/VerbDetails/VerbDetails'
import { Button } from '../Button/Button'
import { VerbDescription } from './Components/VerbDescription/VerbDescription'
import Link from 'next/link'
import { SVGNextPrev } from '@/assets/svg/svgExports'
import { ContextVerbPage, IVerbsPageContext } from '@/app/verbs/[slug]/VerbPage'
import { useContext } from 'react'

export default function VerbHeader() {

    const context = useContext(ContextVerbPage) as IVerbsPageContext

    interface INextPrevLink {
        text: string,
        path: string,
        prevText: string
        isNext: boolean
    }

    const NextPrevLink = (props: INextPrevLink)=> {
        return (
            <Link className={styles.nextPrevLink} href={`${props.path}`}>
                {props.isNext ? <SVGNextPrev /> : <></>}
                <span>{props.prevText}</span>
                <span className={styles.linkMainText}>{props.text}</span>
                {!props.isNext ? <SVGNextPrev /> : <></>}
            </Link>
        )
    }

    return (
        <div className={styles.container}>
            <div className={styles.containerTitle}>
                <VerbTitle verbHTML={context.verbHTML} />
            </div>
            <VerbDetails/>
            <VerbStemFormation />
            <p className={styles.translation}>{context.translation}</p>
            <VerbDescription text={context.description}></VerbDescription>
            <Button
                text={context.button.replace("&", context.verb)}
                icon={"exercise"}
                // callback={handleBtnClick}
            ></Button>

            <div className={styles.navContainer}>
                {
                    context.prevVerb ?
                        <NextPrevLink
                            text={context.prevVerb}
                            path={`/verbs/${context.prevVerb}`}
                            prevText={'previous: '}
                            isNext={true}
                        /> : <></>
                }
                {
                    context.nextVerb ?
                        <NextPrevLink
                            text={context.nextVerb}
                            path={`/verbs/${context.nextVerb}`}
                            prevText={'next: '}
                            isNext={false}
                        /> : <></>
                }

            </div>
        </div>
    )
}