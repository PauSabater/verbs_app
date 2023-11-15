'use client'

// import { VerbLayout} from '../layout'
import { VerbDescription } from "@/components/VerbDescription/VerbDescription"
import VerbTable from "@/components/VerbTable/VerbTable"
import { CollapsibleTenses } from "@/components/CollapsibleTenses/CollapsibleTenses"
import Sein from "../../../dummyData/sein.json"
import styles from './verb.module.scss'
// import '../../../styles/variables.scss'
import texts from '../../../dummyData/texts.json'
import { ModalExercises } from "@/components/ModalExercises/ModalExercises"
import { useLayoutEffect, useRef, useState } from "react"
import { ExerciseConjugation } from "@/components/ExerciseConjugation/ExerciseConjugation"

export default function Page() {

    const refPageContent = useRef(null)

    const pageVerbData = Sein

    const [exerciseTenses, setExerciseTenses] = useState("")

    const refModal = useRef(null)

    useLayoutEffect(() => {

        if (refPageContent.current === null) {
            return
        }

        console.log("add eveeent");
        console.log(refPageContent.current as HTMLElement);

        document.addEventListener(
            "openModalExercise",
            (e) => {
                e.stopPropagation()
                console.log("HEYYY CUSTOM EVENT")
                console.log((e as any).detail);
                setExerciseTenses((e as any).detail.tenses)
                if (refModal.current === null) return
                // @ts-ignore
                refModal.current.openModal()
            }
        )
    }, [])




    return (
        <div className={styles.pageContent} ref={refPageContent}>
            <h1>{`hello tense: ${exerciseTenses}`}</h1>
            <div>
                <CollapsibleTenses texts={{title: texts.verbsPage.collapsibles[0].title}}>
                    {
                        texts.verbsPage.collapsibles[0].tenses.map((tableTense, i) => {
                            return (
                                <VerbTable key={tableTense} data={pageVerbData.data.indicative.find((tense)=> tense.tense === tableTense)}></VerbTable>
                            )
                        })
                    }
                </CollapsibleTenses>

                <CollapsibleTenses texts={{title: texts.verbsPage.collapsibles[1].title}}>
                    {
                        texts.verbsPage.collapsibles[1].tenses.map((tableTense, i) => {
                            return (
                                <VerbTable key={tableTense} data={pageVerbData.data.indicative.find((tense)=> tense.tense === tableTense)}></VerbTable>
                            )
                        })
                    }
                </CollapsibleTenses>
                <ModalExercises text={""} open={exerciseTenses !== "" ? true : false} ref={refModal}>
                    <ExerciseConjugation
                        text={`Fill the corresponding conjugations for the tense <span>${exerciseTenses}</span> of the verb <span>${pageVerbData.verb}</span>`}
                        conjugation={pageVerbData.data.indicative.find((tense)=> tense.tense === exerciseTenses)?.conjugations}
                    ></ExerciseConjugation>
                </ModalExercises>
            </div>
        </div>
    )
}


// return (
//     <div className={styles.pageContent}>
//         <h1>Hello, Next.js!</h1>
//         <div>
//             { texts.verbsPage.collapsibles.map((collapsible, i) => {
//                 return (
//                     collapsible.tenses.map((tableTense, i) => {
//                         return (
//                             <VerbTable key={tableTense} data={Sein.data.indicative.find((tense)=> tense.tense === tableTense)}></VerbTable>
//                         )
//                     })
//                 )
//             })
//         }
//         </div>
//     </div>
// )