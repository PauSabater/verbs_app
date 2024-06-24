'use client'

import { Suspense, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { ExerciseConjugation } from '@/components/ExerciseConjugation/ExerciseConjugation'
import textsVerbExercise from '@/data/textsVerbExercise.json'
import styles from './exercisePage.module.scss'
import { replaceTenseFromURL } from '@/utils/utils'
import TensesSelector from '@/components/TensesSelector/TensesSelector'
import { ExerciseCheckboxList } from '@/components/ExerciseCheckboxList/ExerciseCheckboxList'

export default function Page() {

    const searchParams = useSearchParams()

    // const verbs = searchParams.get('verbs')?.split(',')
    // const tenses =


    const [verbs, setVerbs] = useState(searchParams.get('verbs')?.split(','))
    const [tenses, setTenses] = useState(searchParams.get('tenses')?.split(',').map((tense)=> {
        return replaceTenseFromURL(tense)
    }))
    const [mode, setMode] = useState(searchParams.get('mode'))
    const [isExerciseSetOpen, setIsExerciseSetOpen] = useState((!verbs || verbs.length === 0 || !tenses || tenses.length === 0) && !mode)

    useEffect(() => {
        console.log("helo SEARCH PARAMS")
        const updatedVerbs = searchParams.get('verbs')?.split(',')
        const updatedTenses = searchParams.get('tenses')?.split(',').map((tense)=> {
            return replaceTenseFromURL(tense)
        })
        const updatedMode = searchParams.get('mode')

        setVerbs(updatedVerbs)
        setTenses(updatedTenses)
        setMode(updatedMode)

        console.log('new verbs')
        console.log(updatedVerbs)

        console.log('new tenses')
        console.log(updatedTenses)

        setIsExerciseSetOpen((!updatedVerbs || updatedVerbs.length === 0 || !updatedTenses || updatedTenses.length === 0) && !mode)

        console.log('display is')
        console.log((!updatedVerbs || updatedVerbs.length === 0 || !updatedTenses || updatedTenses.length === 0) && !mode)

    },[searchParams])




    const items = [
            {
                "title": "Indicative",
                "options": ["präsens", "präteritum", "perfekt", "plusquam", "futur_I", "futur_II"]
            },{
                "title": "Imperative",
                "options": ["imperative"]
            },{
                "title": "Subjunctive I",
                "options": ["konj_perfekt", "konjunktiv_I", "konjunktiv_II", "konj_plusquam", "konj_futur_I", "konj_futur_II"]
            },
            {
                "title": "Subjunctive II",
                // "mode": "subjunctive_II",
                "options": ["konjunktiv_II", "konj_plusquam"]
            },{
                "title": "Infinitive",
                "options": ["infinitiv_I", "infinitiv_II"]
            },{
                "title": "Participle",
                "options": ["partizip_I", "partizip_II"]
            }
        ]

    const getSelectorItems = (mode: string)=> {
        switch (mode) {
            case 'indicative':
                return [
                    {
                        "title": "Indicative",
                        "options": ['präsens', 'präteritum', 'prasens', 'prateritum', 'perfekt', 'plusquam', 'futur_I', 'futur_II']
                    }
                ]
            case 'konjunktiv_I':
                return [
                    {
                        "title": "Konjunctiv I",
                        "options": ['konjunktiv_I', 'konj_futur_I', 'konj_perfekt', 'konj_futur_II', 'konjunktiv_II', 'konj_plusquam']
                    }
                ]
            case 'konjunktiv_II':
                return [
                    {
                        "title": "Konjunctiv II",
                        "options": ['konjunktiv_II', 'konj_futur_I', 'konj_perfekt', 'konj_futur_II', 'konjunktiv_II', 'konj_plusquam']
                    }
                ]
            case 'imperative':
                return [
                    {
                        "title": "Imperative",
                        "options": ['imperative']
                    }
                ]
            case 'partizip':
                return [
                    {
                        "title": "Partizip",
                        "options": ['partizip_I', 'partizip_II']
                    }
                ]
            default:
                return []
        }
    }

    const onSetExerciseOpenChange = (isOpen: boolean)=> {
        setIsExerciseSetOpen(isOpen)
    }


    return (
        <>
            {
                <div className={styles.container}>
                    <div className={styles.layout}>
                        <div className={styles.containerExercise}>
                            {
                                mode ?
                                    <ExerciseCheckboxList
                                        statement={`Select the tenses to practise of the ${mode} mode:`}
                                        items={getSelectorItems(mode)}
                                        callbackOnConfirm={()=> {console.log('hey confirm')}}
                                        isExerciseLayout={true}
                                        verbs={verbs || []}
                                    />
                                :
                                    <ExerciseConjugation
                                        verb={verbs ? verbs[0] : ''}
                                        tensesDropdown={['hey', 'eho']}
                                        texts={textsVerbExercise}
                                        tenseExercise={tenses ? tenses[0] : ''}
                                        selectedTenses={['präsens', 'präteritum']}
                                        isSingleTense={false}
                                        // isSingleUse={false}
                                        isEmbedded={true}
                                        verbs={verbs}
                                        tenses={tenses || []}
                                        isSetNewExerciseOpen={isExerciseSetOpen}
                                        callbackOnSetExerciseChange={onSetExerciseOpenChange}
                                    ></ExerciseConjugation>
                            }
                        </div>
                    </div>
                </div>
            }
        </>
    )
}