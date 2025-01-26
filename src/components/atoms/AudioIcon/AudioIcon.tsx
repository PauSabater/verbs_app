'use client'

import { SVGAudio } from '@/assets/svg/svgExports'
import styles from './audioIcon.module.scss'
import { speak } from '@/utils/utils'

interface IAudioIcon {
    text: string,
    utterance: SpeechSynthesisUtterance,
    color?: string
}

export function AudioIcon(props: IAudioIcon) {

    const onClick = ()=> {
        console.log("IEEE CLICL")
        speak(props.utterance, props.text)
    }

    return (
        <div className={styles.container} onClick={()=> speak(props.utterance, props.text)}>
            <SVGAudio color={props.color || "currentColor"}></SVGAudio>
        </div>
    )
}