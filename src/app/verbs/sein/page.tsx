'use client'

// import { VerbLayout} from '../layout'
import { VerbDescription } from "@/components/VerbHeader/Components/VerbDescription/VerbDescription"
import VerbTable from "@/components/VerbTable/VerbTable"
import { CollapsibleTenses } from "@/components/CollapsibleTenses/CollapsibleTenses"
import Sein from "../../../dummyData/sein.json"
import styles from './verb.module.scss'
// import '../../../styles/variables.scss'
import texts from '../../../dummyData/texts.json'
import { ModalExercises } from "@/components/ModalExercises/ModalExercises"
import { Fragment, useLayoutEffect, useRef, useState } from "react"
import { ExerciseConjugation } from "@/components/ExerciseConjugation/ExerciseConjugation"
import { Selector } from "@/components/Selector/Selector"
import VerbHeader from "@/components/VerbHeader/VerbHeader"

export default function Page() {

    const refPageContent = useRef(null)

    const pageVerbData = Sein

    const [exerciseTense, setExerciseTense] = useState("")

    const [exerciseMode, setExerciseMode] = useState("")

    const refModal = useRef(null)

    useLayoutEffect(() => {

        if (refPageContent.current === null) {
            return
        }

        document.addEventListener(
            "openModalExercise",
            (e) => {
                e.stopPropagation()
                setExerciseTense((e as any).detail.tense)
                setExerciseMode((e as any).detail.mode)

                if (refModal.current === null) return
                // @ts-ignore
                refModal.current.openModal()
            }
        )
    }, [])

    const verbHeaderProps = ()=> {
        return {
            button: texts.verbsPage.btnPractice,
            verb: pageVerbData.verb,
            level: pageVerbData.data.level,
            verbHTML: pageVerbData.data.verbHTML,
            stemFormationHTML: pageVerbData.data.stemFormationHTML,
            isIrregular: pageVerbData.data.isIrregular,
            isSeparable: pageVerbData.data.isSeparable,
            description: pageVerbData.description
        }
    }


    return (
        <div className={styles.pageContent} ref={refPageContent}>
            <VerbHeader {...verbHeaderProps()}></VerbHeader>
            <h1>{`Conjugations`}</h1>
            <div>
                <CollapsibleTenses texts={{title: texts.verbsPage.collapsibles[0].title}}>
                    {
                        texts.verbsPage.collapsibles[0].tenses.map((tableTense, i) => {
                            return (
                                <VerbTable key={tableTense} mode={"indicative"} verbData={pageVerbData.data.indicative.find((tense)=> tense.tense === tableTense)}></VerbTable>
                            )
                        })
                    }
                </CollapsibleTenses>

                <CollapsibleTenses texts={{title: texts.verbsPage.collapsibles[1].title}}>
                    {
                        texts.verbsPage.collapsibles[1].tenses.map((tableTense, i) => {
                            return (
                                <VerbTable key={tableTense} mode={"conjunctive"} verbData={pageVerbData.data.conjunctive.find((tense)=> tense.tense === tableTense)}></VerbTable>
                            )
                        })
                    }
                </CollapsibleTenses>
                <ModalExercises text={""} open={exerciseTense !== "" ? true : false} ref={refModal}>
                    {exerciseTense && exerciseMode ?
                        <ExerciseConjugation
                            verb={pageVerbData.verb}
                            tensesDropdown={texts.verbsPage.collapsibles}
                            texts={texts.verbsPage.exerciseText}
                            tenseExercise={exerciseTense}
                            modeExercise={exerciseMode}
                            allTenses={pageVerbData.data}
                        ></ExerciseConjugation>
                        : <Fragment />
                    }
                </ModalExercises>
            </div>
        </div>
    )
}