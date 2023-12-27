'use client'

import VerbTable from "@/components/VerbTable/VerbTable"
import { CollapsibleTenses } from "@/components/CollapsibleTenses/CollapsibleTenses"
import Sein from "../../../data/sein.json"
import styles from './verb.module.scss'
import texts from '../../../data/texts.json'
import { ModalExercises } from "@/components/ModalExercises/ModalExercises"
import { Fragment, Reducer, useEffect, useLayoutEffect, useRef, useState } from "react"
import { ExerciseConjugation } from "@/components/ExerciseConjugation/ExerciseConjugation"
import { ISelectorDropdownOptions, Selector } from "@/components/Selector/Selector"
import VerbHeader from "@/components/VerbHeader/VerbHeader"
import { getOptionsDropdown, getUtteraceInstance, setLocalstorageItem, verbsTenseException } from "@/utils/utils"
import { ExerciseCheckboxList } from "@/components/ExerciseCheckboxList/ExerciseCheckboxList"
import { useReducer } from 'react'
import { IPageState, TPageAction, actions, reducer } from "./pageReducer"
import Lesson from "@/components/Lesson/Lesson"
import { getTenseFromTenseName } from "@/components/ExerciseConjugation/ExerciseConjugation.exports"


export default function VerbsPage({ params }: { params: { slug: string } }) {

    const [state, dispatch] = useReducer<Reducer<IPageState, TPageAction>>(reducer, {
        isExerciseConjugationOpen: false,
        isCheckboxListOpen: false,
        exerciseTense: '',
        exerciseTensesCheckboxList: null,
        selectedTensesFromCheckboxList: [],
        isModalLessonOpen: false,
        lesson: ''
    })

    const [utterance, setUtterance] = useState<SpeechSynthesisUtterance | null>(null)

    const refModal = useRef(null)
    const refPageContent = useRef(null)
    const pageVerbData = Sein
    const collapsiblesTense =  verbsTenseException.includes(pageVerbData.verb) ? texts.verbsPage.collapsiblesException : texts.verbsPage.collapsibles

    useLayoutEffect(() => {

        if (refPageContent.current === null) return

        document.addEventListener(
            "openModalExercise", (e) => {
                e.stopPropagation()
                setExerciseTense((e as any).detail.tense)
                setSelectedTensesFromCheckboxList([])
                openConjugationExercise()
            }
        )

        getUtteraceInstance()
            .then((utterance)=> {
                setUtterance(utterance)
            })
    }, [])

    // Action when tenses list selection has been confirmed
    useEffect(()=> {
        if (state.selectedTensesFromCheckboxList.length > 0) {
            openTensesCheckboxList()
        }
    }, [state.selectedTensesFromCheckboxList])


    const openConjugationExercise = ()=> dispatch({
        type: actions.OPEN_CONJUGATION_EXERCISE
    })

    const closeConjugationExercise = ()=> dispatch({
        type: actions.CLOSE_CONJUGATION_EXERCISE
    })

    const openTensesCheckboxList = ()=> dispatch({
        type: actions.OPEN_TENSES_CHECKBOXLIST
    })

    const closeTensesCheckboxList = ()=> dispatch({
        type: actions.CLOSE_TENSES_CHECKBOXLIST
    })

    const openModalLesson = (lesson: string)=> dispatch({
        type: actions.OPEN_MODAL_LESSON,
        payload: lesson
    })

    const closeModalLesson = ()=> dispatch({
        type: actions.CLOSE_MODAL_LESSON
    })

    const setExerciseTense = (tense: string)=> dispatch({
        type: actions.SET_EXERCISE_TENSE,
        payload: tense
    })

    const setExerciseTensesCheckboxList = (options: ISelectorDropdownOptions[] | null)=> dispatch({
        type: actions.SET_TENSES_CHECKBOXLIST,
        payload: options as ISelectorDropdownOptions[]
    })

    const setSelectedTensesFromCheckboxList = (tenses: string[]) => {
        setLocalstorageItem('selectedTenses', tenses)
        dispatch({
            type: actions.SET_SELECTED_TENSES_FROM_CHECKBOXLIST,
            payload: tenses
        })
    }

    const triggerExerciseCheckboxListModal = (itemsList: ISelectorDropdownOptions[])=> {
        setExerciseTensesCheckboxList(itemsList)
        openTensesCheckboxList()
    }

    const btnCollapsiblesAction = ()=> {
        console.log("COLLAPSIBLES ACTION!!")
    }

    const verbHeaderProps = ()=> {
        return {
            button: texts.verbsPage.btnPractice,
            verb: pageVerbData.verb,
            level: pageVerbData.data.properties.level,
            verbHTML: pageVerbData.data.properties.verbHTML,
            stemFormationHTML: pageVerbData.data.properties.stemFormationHTML,
            isIrregular: pageVerbData.data.properties.isIrregular,
            isSeparable: pageVerbData.data.properties.isSeparable,
            description: pageVerbData.descriptions.en,
            listBtnTenses: getOptionsDropdown(collapsiblesTense),
            translation: pageVerbData.data.properties.translations.en,
            callbackOnBtnClick: triggerExerciseCheckboxListModal
        }
    }

    const callbackCloseModal = ()=> {
        closeTensesCheckboxList()
        closeConjugationExercise()
    }

    const callbackOnExerciseCheckboxListConfirm = (selectedTensesList: string[])=> {
        setSelectedTensesFromCheckboxList(selectedTensesList)
        closeTensesCheckboxList()
        openConjugationExercise()
    }

    const ExerciseContent = (): React.JSX.Element => {
        return ( (state.exerciseTense) || state.selectedTensesFromCheckboxList.length > 0
            ?   <ExerciseConjugation
                    verb={pageVerbData.verb}
                    tensesDropdown={collapsiblesTense}
                    texts={texts.verbsPage.exerciseText}
                    tenseExercise={state.exerciseTense}
                    // modeExercise={exerciseMode}
                    allTenses={pageVerbData.data.tenses}
                    selectedTenses={state.selectedTensesFromCheckboxList}
                ></ExerciseConjugation>
            :   <Fragment />
        )
    }

    const ExerciseListCheckboxes = (): React.JSX.Element =>
        state.exerciseTensesCheckboxList
            ?   <ExerciseCheckboxList
                    statement={texts.verbsPage.exerciseConjugation.statement}
                    items={state.exerciseTensesCheckboxList}
                    callbackOnConfirm={callbackOnExerciseCheckboxListConfirm}
                ></ExerciseCheckboxList>
            :   <></>

    const callbackCloseModalLesson = ()=> {

    }

    const onLessonOpen = ()=> {
        openModalLesson('prasens')
    }



    return (
        <div className={styles.pageContent} ref={refPageContent}>
            <div>My Post: {params.slug}</div>
            <VerbHeader {...verbHeaderProps()}></VerbHeader>
            <h1>{`Conjugations`}</h1>
            <div>
                { [1, 2, 3].map((e, i) => {
                    return (
                        <CollapsibleTenses
                            texts={{title: collapsiblesTense[i].title}}
                            action={btnCollapsiblesAction}
                            tenses={collapsiblesTense[i].tenses}
                            examples={pageVerbData.examples}
                            utterance={utterance}
                        >
                            {
                                collapsiblesTense[i].tenses.map((tableTense, i) => {
                                    return (
                                        <VerbTable
                                            key={tableTense}
                                            // mode={"indicative"}
                                            verbData={getTenseFromTenseName(pageVerbData.data.tenses, tableTense)}
                                            callbackLessonOpen={onLessonOpen}
                                            utterance={utterance}
                                        ></VerbTable>
                                    )
                                })
                            }
                        </CollapsibleTenses>
                    )
                })

                }

                <ModalExercises
                    text={""}
                    open={state.isExerciseConjugationOpen === true || state.isCheckboxListOpen === true}
                    ref={refModal}
                    callbackClose={callbackCloseModal}
                >
                    {state.isExerciseConjugationOpen === true
                        ? <ExerciseContent />
                        : state.isCheckboxListOpen ? <ExerciseListCheckboxes/> : ''
                    }
                </ModalExercises>

                <ModalExercises
                    text={""}
                    open={state.isModalLessonOpen}
                    // ref={refModalLesson}
                    callbackClose={closeModalLesson}
                    widerVersion={true}
                    padding={'paddingBase'}
                >
                    <Lesson
                        lesson={"prasens"}
                        utterance={utterance}
                    />
                </ModalExercises>
            </div>
        </div>
    )
}