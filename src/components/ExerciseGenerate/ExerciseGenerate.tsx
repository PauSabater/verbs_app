'use client'

import { useRouter } from 'next/navigation'
import styles from './exerciseGenerate.module.scss'
import SearchBar from '../SearchBar/SearchBar'
import { Selector } from '../Selector/Selector'
import { Button } from '../Button/Button'
import { useEffect, useState } from 'react'
import { SVGCross } from '@/assets/svg/svgExports'
import { replaceTensesFromStringForUrl } from '@/utils/utils'


interface IHero {
    // title: string,
    // children: ReactNode,
    // bg: string
}

const SelectorTenses = [
    "Präsens",
    "Präteritum",
    "Perfekt",
    "Plusquamperfekt",
    "Futur I",
    "Futur II",
    "Imperativ",
    "Konj II Präteritum",
    "Konj II Plusquam.",
    "Konj II Futur I",
    "Konj II Futur II",
    "Konj I Präsens",
    "Konj I Futur I",
    "Konj I Futur II",
    "Konj I Perfekt",
    "Partizip II"
]

export function ExerciseGenerate() {

    const router = useRouter()
    const [selectedTenses, setSelectedTenses] = useState<string[]>([])
    const [selectedVerbs, setSelectedVerbs] = useState<string[]>([])

    useEffect(()=> {
        console.log("USE EFFECT UPDATED")
        console.log(selectedTenses)

    },[selectedTenses])

    const onTensesSelect = (value: string, group: string, isChecked: boolean)=> {

        if (isChecked) {
            const newTensesState: string[] = selectedTenses || []
            newTensesState.push(value)
            console.log(newTensesState)
            // const newCurrentState: string[] = currentState.push('hello')
            setSelectedTenses([...newTensesState])
        }
    }

    const onVerbSelect = (value: string)=> {
        if (selectedVerbs.includes(value)) return

        const newVerbsState: string[] = selectedVerbs || []
        newVerbsState.push(value)
        console.log(value)
        setSelectedVerbs([...newVerbsState])
    }

    const onBtnStartClick = ()=> {
        if (selectedVerbs.length > 0 && selectedTenses.length > 0) {

            let tensesString = ''
            selectedTenses.forEach((tense, i)=> {
                const tenseForUrl = replaceTensesFromStringForUrl(tense)
                if (i === 0) tensesString = `${tenseForUrl}`
                else tensesString = `${tensesString},${tenseForUrl}`
            })

            let verbsString = ''
            selectedVerbs.forEach((verb, i)=> {
                if (i === 0) verbsString = `${verb}`
                else verbsString = `${verbsString},${verb}`
            })

            router.push(`/exercise?tenses=${tensesString}&verbs=${verbsString}`)
        }
    }

    return  (
        <div className={`${styles.container}`}>
            <div className={`${styles.searchBarContainer}`}>
                <div className={`${styles.selectedTensesContainer}`}>
                    {
                        selectedVerbs ? selectedVerbs.map((verb, i)=> {
                            return (
                                <div className={`${styles.selectedTenseContainer} ${styles.animated}`}>
                                    <p className={styles.selectedTense} key={`verb-${i}`}>{verb}</p>
                                    <div className={styles.crossContainer} data-value={verb}>
                                        <SVGCross />
                                    </div>
                                </div>
                            )
                        })
                        : <></>
                    }
                </div>
                <SearchBar
                    isExerciseGenerate={true}
                    callbackOnSelect={onVerbSelect}
                    placeholder={'Add verb(s)'}
                />
            </div>
            <div className={`${styles.selectorContainer}`}>
                <Selector
                    isExerciseGenerate={true}
                    type={'checkbox'}
                    options={[{options: SelectorTenses}]}
                    columns={3}
                    selectedOption={'Select tense(s)'}
                    callbackOnChange={onTensesSelect}
                />
                    <div className={`${styles.selectedTensesContainer}`}>
                        {
                            selectedTenses ? selectedTenses.map((tense, i)=> {
                                return (
                                    <div className={styles.selectedTenseContainer}>
                                        <p className={styles.selectedTense} key={`tense-${i}`}>{tense}</p>
                                        <div className={styles.crossContainer} data-value={tense}>
                                            <SVGCross />
                                        </div>
                                    </div>
                                )
                            })
                            : <></>
                        }
                    </div>
            </div>
            <Button
                text={'Start'}
                color={'primaryDark'}
                callback={onBtnStartClick}
            />
        </div>

    )
}