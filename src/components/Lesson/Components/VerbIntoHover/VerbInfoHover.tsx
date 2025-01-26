import { sanitize } from 'isomorphic-dompurify'
import Link from 'next/link'
import styles from './verbInfoHover.module.scss'
import { useContext } from 'react'
import { LessonPageContext } from '@/app/lessons/[slug]/LessonPage'
import { ExercisePageContext } from '@/app/exercises/[slug]/ExercisePage'
import { AudioIcon } from '@/components/atoms/AudioIcon/AudioIcon'
import InfoInCircle from '@/elements/InfoInCircle/InfoInCircle'
import { Button } from '@/components/atoms/Button/Button'

interface IVerbInfoHover {
    verb: string
}

// verb-link-hover
export const VerbInfoHover = (props: IVerbInfoHover): JSX.Element => {

    const lessonPageContext = useContext(LessonPageContext)
    const exercisePageContext = useContext(ExercisePageContext)

    console.log("exercise page context is", exercisePageContext)

    const dataContext = lessonPageContext.dataVerbsInText
        ? lessonPageContext
        : exercisePageContext.dataVerbsInText ? exercisePageContext : null

    console.log("verb is", props.verb)
    console.log("ieee context is")
    console.log(dataContext)

    if (!dataContext?.dataVerbsInText) return <></>

    const dataVerb = dataContext.dataVerbsInText.find((verb)=> verb.verb === props.verb)

    console.log("data verb is")
    console.log(dataVerb)

    if (!dataVerb) return <></>

    const onClick = ()=> {
        lessonPageContext.callbackOnExerciseOpen(props.verb)
    }

    return dataVerb ? (
        <div className={styles.container}>
            <div className={styles.verbInfoContainer}>
                <div className={styles.infoOnLeft}>
                    <p className={styles.verb}>{dataVerb.verb}</p>
                    {dataContext.utterance
                        ? <AudioIcon text={props.verb} utterance={dataContext.utterance}></AudioIcon>
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
                    color={'primaryDark'}
                    isLink={true}
                    path={`/exercise?tenses=präsens&verbs=${props.verb}`}
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
