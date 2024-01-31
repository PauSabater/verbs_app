import { sanitize } from 'isomorphic-dompurify'
import Link from 'next/link'
import styles from './verbInfoHover.module.scss'
import { useContext } from 'react'
import { LessonPageContext } from '@/app/lessons/[slug]/LessonPage'
import { AudioIcon } from '@/components/AudioIcon/AudioIcon'
import InfoInCircle from '@/elements/InfoInCircle/InfoInCircle'
import { Button } from '@/components/Button/Button'

interface IVerbInfoHover {
    verb: string
}

// verb-link-hover
export const VerbInfoHover = (props: IVerbInfoHover): JSX.Element => {

    console.log("INFO HOVER")
    console.log(props)

    const lessonPageContext = useContext(LessonPageContext)
    if (!lessonPageContext.dataVerbsInText) return <></>

    const dataVerb = lessonPageContext.dataVerbsInText.find((verb)=> verb.verb === props.verb)

    if (!dataVerb) return <></>

    return dataVerb ? (
        <div className={styles.container}>
            <div className={styles.verbInfoContainer}>
                <div className={styles.infoOnLeft}>
                    <p className={styles.verb}>{dataVerb.verb}</p>
                    {lessonPageContext.utterance
                        ? <AudioIcon text={props.verb} utterance={lessonPageContext.utterance}></AudioIcon>
                        : <></>
                    }
                </div>
                <div className={styles.infoOnRight}>
                    <InfoInCircle text={dataVerb.properties.level}></InfoInCircle>
                    <p>&nbsp;&nbsp;|&nbsp;</p>
                    <p>{dataVerb.properties.isIrregular ? 'irregular' : 'regular'}</p>
                    <p>&nbsp;|&nbsp;</p>
                    <p>{dataVerb.properties.isSeparable ? 'separable' : 'non-separable'}</p>
                </div>
            </div>
            <p className={styles.trans}>{dataVerb.properties.translations.en.trim()}</p>
            <div className={styles.btnsContainer}>
                <Button
                    title={`open exercise for ${props.verb}`}
                    text={''}
                    icon={'exercise'}
                    size={'xsSquare'}
                    callback={lessonPageContext.callbackOnExerciseOpen}
                ></Button>
                <Button
                    title={`open verb page for ${props.verb}`}
                    text={''}
                    icon={'link'}
                    size={'xsSquare'}
                    color={'primaryReverse'}
                    isLink={true}
                    path={`/verbs/${props.verb}`}
                ></Button>
            </div>
            {/* <Button text={''} icon={'exercise'}></Button> */}
        </div>
    ) : (
        <></>
    )
}
