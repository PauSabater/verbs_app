import { SVGAudio } from '@/assets/svg/svgExports'
import styles from './tensesExamples.module.scss'
import { sanitize } from 'isomorphic-dompurify'
import { AudioIcon } from '@/components/AudioIcon/AudioIcon'
import { removeTags } from '@/utils/utils'


type TModes = 'indicative' | 'präteritum' | 'perfekt' | 'plusquamperfekt' | 'futur I' | 'futur I'
type TLangs = 'de' | 'en' | 'es' | 'fr'

export interface IExamples {
    [key: string]: {
        [key: string]: {
            de: string,
            en: string,
            es: string,
            fr: string
        }
    }
}

interface ITensesExamples {
    title: string,
    tenses: string[],
    examples: IExamples,
    utterance: SpeechSynthesisUtterance | null
}

export function TensesExamples(props: ITensesExamples) {

    const getExamples = (tense: string, lang: TLangs)=> {

        for(const mode of Object.values(props.examples)) {

            for (const [tenseName, langs] of (Object.entries(mode))) {
                if (tenseName.toLowerCase() === tense.toLowerCase()) {
                    return (
                        <div className={styles.examplesContainer}>
                            <div className={styles.audioAndSentence}>
                                <p dangerouslySetInnerHTML={{__html: sanitize(langs.de)}}></p>
                                <AudioIcon
                                    text={removeTags(langs.de)}
                                    utterance={props.utterance as SpeechSynthesisUtterance}
                                />
                            </div>
                            <p className={styles.translation}>{langs[lang]}</p>
                        </div>
                    )
                }
            }
        }

        return <></>
    }

    return (
        <div className={styles.container}>
            <div className={styles.titleContainer}>
                <p className={styles.title}>Examples</p>
            </div>
            {
                props.tenses.map((tense)=> {
                    return getExamples(tense, "en")
                })
            }
        </div>
    )
}