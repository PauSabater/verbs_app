'use client'

import VerbTable from '@/components/VerbTable/VerbTable'
import { CollapsibleTenses } from '@/components/CollapsibleTenses/CollapsibleTenses'
import styles from './verb.module.scss'
import { createContext, useLayoutEffect, useRef, useState } from 'react'
import VerbHeader from '@/components/VerbHeader/VerbHeader'
import { getUtteraceInstance, isAuxliaryVerb, isModalVerb } from '@/utils/utils'
import { getTenseFromTenseName } from '@/components/ExerciseConjugation/ExerciseConjugation.exports'

interface IVerbsPage {
    slug: string
    nextVerb: string
    prevVerb: string
    data: any
    texts: any
    verbNum: number
}

export interface IVerbsPageContext {
    verb: string,
    nextVerb: string,
    prevVerb: string,
    level: string,
    verbHTML: string,
    verbNum: number,
    stemFormationHTML: string,
    isIrregular: boolean,
    isSeparable: boolean,
    isModal: boolean,
    isAuxiliary: boolean,
    description: string,
    prefixed: boolean
    reflexive: boolean,
    translation: string,
    button: string,
}

export const ContextVerbPage = createContext<IVerbsPageContext | null>(null)

export default function VerbsPage(props: IVerbsPage) {

    const pageVerbsTexts = JSON.parse(props.texts).props.texts.verbsPage
    const [utterance, setUtterance] = useState<SpeechSynthesisUtterance | null>(null)
    const refPageContent = useRef(null)
    const pageVerbData = JSON.parse(props.data).props.verbData.verb
    const collapsiblesTense = pageVerbsTexts.collapsibles

    useLayoutEffect(() => {
        if (refPageContent.current === null) return

        const verbLocalStorage = localStorage.getItem('verb-current')
        let objLocalStorage

        if (verbLocalStorage) {
            objLocalStorage = JSON.parse(verbLocalStorage)
        }

        if (!objLocalStorage || objLocalStorage.verb !== props.slug) {
            const verbLocalStorageNew = {
                verb: pageVerbData.verb,
                tenses: pageVerbData.data.tenses
            }

            localStorage.setItem('verb-current', JSON.stringify(verbLocalStorageNew))
        }

        getUtteraceInstance().then((utterance) => {
            setUtterance(utterance)
        })
    }, [])


    const btnCollapsiblesAction = () => {
        console.log('COLLAPSIBLES ACTION!!')
    }

    const contextData: IVerbsPageContext = {
        verb: pageVerbData.verb,
            nextVerb: props.nextVerb,
            prevVerb: props.prevVerb,
            level: pageVerbData.data.properties.level,
            verbHTML: pageVerbData.data.properties.verbHTML,
            verbNum: props.verbNum,
            stemFormationHTML: pageVerbData.data.properties.stemFormationHTML,
            isIrregular: pageVerbData.data.properties.isIrregular,
            isSeparable: pageVerbData.data.properties.isSeparable,
            isModal: isModalVerb(pageVerbData.verb),
            isAuxiliary: isAuxliaryVerb(pageVerbData.verb),
            description: pageVerbData.descriptions?.en || '',
            prefixed: pageVerbData.data.properties.prefixed ? true : false,
            reflexive: JSON.stringify(pageVerbData.data.properties.reflexive) === "true" ? true : false,
            translation: pageVerbData.data.properties.translations.en,
            button: pageVerbsTexts.btnPractice,
    }

    return pageVerbData ? (
        <>
            <ContextVerbPage.Provider value={contextData}>
            <div className={styles.pageContent} ref={refPageContent}>
                {/* <div>My Post: {props.slug}</div> */}
                <VerbHeader></VerbHeader>
                <h1>{`Conjugations`}</h1>
                <div>
                    {[1, 2, 3, 4, 5, 6].map((e, i) => {
                        return (
                            <CollapsibleTenses
                                texts={{ title: collapsiblesTense[i].title, description: collapsiblesTense[i].description }}
                                action={btnCollapsiblesAction}
                                tenses={collapsiblesTense[i].tenses}
                                examples={pageVerbData.examples}
                                utterance={utterance}
                                key={`tenses-table-${i}`}
                                verb={pageVerbData.verb}
                                mode={collapsiblesTense[i].mode}
                            >
                                {(collapsiblesTense[i].tenses as string[]).map((tableTense, j) => {
                                    return (
                                        <VerbTable
                                            title={collapsiblesTense[i].tensesTitles[j]}
                                            verb={pageVerbData.verb}
                                            key={tableTense}
                                            tense={tableTense}
                                            verbData={getTenseFromTenseName(pageVerbData.data.tenses, tableTense)}
                                            utterance={utterance}
                                            isSeparable={pageVerbData.data.properties.isSeparable}
                                        ></VerbTable>
                                    )
                                })}
                            </CollapsibleTenses>
                        )
                    })}
                    <div className={styles.sourceContainer}>
                        <p>Source</p>
                    </div>


                </div>
            </div>
        </ContextVerbPage.Provider>
        </>
    ) : (
        <></>
    )
}

