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
import { Fragment, useEffect, useLayoutEffect, useRef, useState } from "react"
import { ExerciseConjugation } from "@/components/ExerciseConjugation/ExerciseConjugation"
import { ISelectorDropdownOptions, Selector } from "@/components/Selector/Selector"
import VerbHeader from "@/components/VerbHeader/VerbHeader"
import { getOptionsDropdown } from "@/utils/utils"
import { ExerciseCheckboxList } from "@/components/ExerciseCheckboxList/ExerciseCheckboxList"






export default function Page() {

    const refPageContent = useRef(null)

    const pageVerbData = Sein

    const [modalOpen, setModalOpen] = useState({
        isCheckboxListOpen: false,
        isExerciseConjugationOpen: false
    })

    const [isCheckboxListOpen, setIsCheckboxListOpen] = useState(false)

    const [isExerciseConjugationOpen, setIsExerciseConjugationOpen] = useState(false)

    const [exerciseTense, setExerciseTense] = useState("")

    const [exerciseMode, setExerciseMode] = useState("")

    const [exerciseTensesCheckboxList, setExerciseTensesCheckboxList] = useState<ISelectorDropdownOptions[] | null>(null)

    const [selectedTensesFromCheckboxList, setSelectedTensesFromCheckboxList] = useState<string[]>([])

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
                setIsExerciseConjugationOpen(true)

                if (refModal.current === null) return
                // @ts-ignore
                refModal.current.openModal()
            }
        )
    }, [])

    // Action when tenses list selection has been confirmed
    useEffect(()=> {
        console.log("HEYY MODIFICATION!!")
        console.log(selectedTensesFromCheckboxList)
        setIsCheckboxListOpen(false)

        if (selectedTensesFromCheckboxList.length > 0) {
            console.log("OPEN EXERCISE!!")
            setIsExerciseConjugationOpen(true)
        }

    }, [selectedTensesFromCheckboxList])

    // const openModalExercise = ()=> {

    // }



    // const openModalExercise = (tense?: string, modal?: string, tensesArray?: string[])=> {

    // }

    const triggerExerciseCheckboxListModal = (itemsList: ISelectorDropdownOptions[])=> {
        setExerciseTensesCheckboxList(itemsList)
        setIsCheckboxListOpen(true)
    }

    const btnCollapsiblesAction = ()=> {
        console.log("COLLAPSIBLES ACTION!!")
    }

    const verbHeaderProps = ()=> {
        return {
            button: texts.verbsPage.btnPractice,
            verb: pageVerbData.verb,
            level: pageVerbData.data.level,
            verbHTML: pageVerbData.data.verbHTML,
            stemFormationHTML: pageVerbData.data.stemFormationHTML,
            isIrregular: pageVerbData.data.isIrregular,
            isSeparable: pageVerbData.data.isSeparable,
            description: pageVerbData.description,
            listBtnTenses: getOptionsDropdown(texts.verbsPage.collapsibles),
            translation: pageVerbData.translations.en,
            callbackOnBtnClick: triggerExerciseCheckboxListModal
        }
    }

    const callbackCloseModal = ()=> {
        console.log("MODAL TO NULL!!")
        setExerciseTensesCheckboxList(null)
        setIsCheckboxListOpen(false)
        setIsExerciseConjugationOpen(false)
    }

    const callbackOnExerciseCheckboxListConfirm = (selectedTensesList: string[])=> {
        console.log("heyyy IN PAGE CONFIRM")
        console.log(selectedTensesList)
        setSelectedTensesFromCheckboxList(selectedTensesList)

        setIsCheckboxListOpen(false)
        setIsExerciseConjugationOpen(true)
    }

    const ExerciseContent = (): React.JSX.Element => {
        return ( (exerciseTense && exerciseMode) || selectedTensesFromCheckboxList.length > 0
            ?   <ExerciseConjugation
                    verb={pageVerbData.verb}
                    tensesDropdown={texts.verbsPage.collapsibles}
                    texts={texts.verbsPage.exerciseText}
                    tenseExercise={exerciseTense}
                    modeExercise={exerciseMode}
                    allTenses={pageVerbData.data}
                    selectedTenses={selectedTensesFromCheckboxList}
                ></ExerciseConjugation>
            :   <Fragment />
        )
    }

    const ExerciseListCheckboxes = (): React.JSX.Element =>
        exerciseTensesCheckboxList
            ?   <ExerciseCheckboxList
                    statement={texts.verbsPage.exerciseConjugation.statement}
                    items={exerciseTensesCheckboxList}
                    callbackOnConfirm={callbackOnExerciseCheckboxListConfirm}
                ></ExerciseCheckboxList>
            :   <></>



    return (
        <div className={styles.pageContent} ref={refPageContent}>
            <VerbHeader {...verbHeaderProps()}></VerbHeader>
            <h1>{`Conjugations`}</h1>
            <div>
                <CollapsibleTenses texts={{title: texts.verbsPage.collapsibles[0].title}} action={btnCollapsiblesAction}>
                    {
                        texts.verbsPage.collapsibles[0].tenses.map((tableTense, i) => {
                            return (
                                <VerbTable
                                    key={tableTense} mode={"indicative"}
                                    verbData={pageVerbData.data.indicative.find((tense)=> tense.tense === tableTense)}
                                ></VerbTable>
                            )
                        })
                    }
                </CollapsibleTenses>

                <CollapsibleTenses texts={{title: texts.verbsPage.collapsibles[1].title}} action={btnCollapsiblesAction}>
                    {
                        texts.verbsPage.collapsibles[1].tenses.map((tableTense, i) => {
                            return (
                                <VerbTable
                                    key={tableTense}
                                    mode={"conjunctive"}
                                    verbData={pageVerbData.data.conjunctive.find((tense)=> tense.tense === tableTense)}
                                ></VerbTable>
                            )
                        })
                    }
                </CollapsibleTenses>
                <ModalExercises
                    text={""}
                    open={(isExerciseConjugationOpen === true || isCheckboxListOpen === true) ? true : false}
                    ref={refModal}
                    callbackClose={callbackCloseModal}
                >
                    {isExerciseConjugationOpen === true
                        ? <ExerciseContent />
                        : isCheckboxListOpen ? <ExerciseListCheckboxes/> : ''
                    }
                </ModalExercises>
            </div>
        </div>
    )
}