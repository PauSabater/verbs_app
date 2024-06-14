'use client'

import VerbTable from '@/components/VerbTable/VerbTable'
import { CollapsibleTenses } from '@/components/CollapsibleTenses/CollapsibleTenses'
import styles from './verb.module.scss'
import ModalExercises from '@/components/ModalExercises/ModalExercises'
import { Fragment, Reducer, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { ExerciseConjugation } from '@/components/ExerciseConjugation/ExerciseConjugation'
import { ISelectorDropdownOptions, Selector } from '@/components/Selector/Selector'
import VerbHeader from '@/components/VerbHeader/VerbHeader'
import { getOptionsDropdown, getUtteraceInstance, setLocalstorageItem, verbsTenseException } from '@/utils/utils'
import { ExerciseCheckboxList } from '@/components/ExerciseCheckboxList/ExerciseCheckboxList'
import { useReducer } from 'react'
import { IPageState, TPageAction, actions, reducer } from './pageReducer'
import Lesson from '@/components/Lesson/Lesson'
import { getTenseFromTenseName } from '@/components/ExerciseConjugation/ExerciseConjugation.exports'
import EmbeddedExercise from '@/components/EmbeddedExercise/EmbeddedExercise'
// import { createContext, useContext } from 'react'

interface IVerbsPage {
    slug: string
    nextSlug: string
    data: any
    texts: any
}

export default function VerbsPage(params: IVerbsPage) {

    const [state, dispatch] = useReducer<Reducer<IPageState, TPageAction>>(reducer, {
        isExerciseConjugationOpen: false,
        isCheckboxListOpen: false,
        exerciseTense: '',
        exerciseTensesCheckboxList: null,
        selectedTensesFromCheckboxList: [],
        isModalLessonOpen: false,
        lesson: ''
    })

    const pageVerbsTexts = JSON.parse(params.texts).props.texts.verbsPage
    const [utterance, setUtterance] = useState<SpeechSynthesisUtterance | null>(null)
    const refModal = useRef(null)
    const refPageContent = useRef(null)
    const pageVerbData = JSON.parse(params.data).props.verbData.verb
    const collapsiblesTense = pageVerbsTexts.collapsibles


    useLayoutEffect(() => {
        if (refPageContent.current === null) return

        const verbLocalStorage = localStorage.getItem('verb-current')
        let objLocalStorage

        if (verbLocalStorage) {
            objLocalStorage = JSON.parse(verbLocalStorage)
        }

        console.log("IAAA")
        console.log(objLocalStorage)

        if (!objLocalStorage || objLocalStorage.verb !== params.slug) {
            const verbLocalStorageNew = {
                verb: pageVerbData.verb,
                tenses: pageVerbData.data.tenses
            }

            localStorage.setItem('verb-current', JSON.stringify(verbLocalStorageNew))
        }


        document.addEventListener('openModalExercise', (e) => {
            e.stopPropagation()
            setExerciseTense((e as any).detail.tense)
            setSelectedTensesFromCheckboxList([])
            openConjugationExercise()
        })

        getUtteraceInstance().then((utterance) => {
            setUtterance(utterance)
        })
    }, [])

    // Action when tenses list selection has been confirmed
    useEffect(() => {
        if (state.selectedTensesFromCheckboxList.length > 0) {
            openTensesCheckboxList()
        }
    }, [state.selectedTensesFromCheckboxList])

    const openConjugationExercise = () =>
        dispatch({
            type: actions.OPEN_CONJUGATION_EXERCISE
        })

    const closeConjugationExercise = () =>
        dispatch({
            type: actions.CLOSE_CONJUGATION_EXERCISE
        })

    const openTensesCheckboxList = () =>
        dispatch({
            type: actions.OPEN_TENSES_CHECKBOXLIST
        })

    const closeTensesCheckboxList = () =>
        dispatch({
            type: actions.CLOSE_TENSES_CHECKBOXLIST
        })

    const openModalLesson = (lesson: string) =>
        dispatch({
            type: actions.OPEN_MODAL_LESSON,
            payload: lesson
        })

    const closeModalLesson = () =>
        dispatch({
            type: actions.CLOSE_MODAL_LESSON
        })

    const setExerciseTense = (tense: string) =>
        dispatch({
            type: actions.SET_EXERCISE_TENSE,
            payload: tense
        })

    const setExerciseTensesCheckboxList = (options: ISelectorDropdownOptions[] | null) =>
        dispatch({
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

    const triggerExerciseCheckboxListModal = (itemsList: ISelectorDropdownOptions[]) => {
        setExerciseTensesCheckboxList(itemsList)
        openTensesCheckboxList()
    }

    const btnCollapsiblesAction = () => {
        console.log('COLLAPSIBLES ACTION!!')
    }

    const verbHeaderProps = () => {
        return {
            button: pageVerbsTexts.btnPractice,
            verb: pageVerbData.verb,
            level: pageVerbData.data.properties.level,
            verbHTML: pageVerbData.data.properties.verbHTML,
            stemFormationHTML: pageVerbData.data.properties.stemFormationHTML,
            isIrregular: pageVerbData.data.properties.isIrregular,
            isSeparable: pageVerbData.data.properties.isSeparable,
            description: pageVerbData.descriptions?.en || '',
            prefixed: pageVerbData.data.properties.prefixed ? true : false,
            reflexive: JSON.stringify(pageVerbData.data.properties.reflexive) === "true" ? true : false,
            listBtnTenses: getOptionsDropdown(collapsiblesTense),
            translation: pageVerbData.data.properties.translations.en,
            callbackOnBtnClick: triggerExerciseCheckboxListModal
        }
    }

    const callbackCloseModal = () => {
        closeTensesCheckboxList()
        closeConjugationExercise()
    }

    const callbackOnExerciseCheckboxListConfirm = (selectedTensesList: string[]) => {
        setSelectedTensesFromCheckboxList(selectedTensesList)
        closeTensesCheckboxList()
        openConjugationExercise()
    }

    const ExerciseListCheckboxes = (): React.JSX.Element =>

        state.exerciseTensesCheckboxList ? (
            <ExerciseCheckboxList
                statement={pageVerbsTexts.exerciseConjugation.statement}
                items={state.exerciseTensesCheckboxList}
                callbackOnConfirm={callbackOnExerciseCheckboxListConfirm}
            ></ExerciseCheckboxList>
        ) : (
            <></>
        )

    const callbackCloseModalLesson = () => {}

    const onLessonOpen = () => {
        openModalLesson('präsens')
    }

    return pageVerbData ? (
        <div className={styles.pageContent} ref={refPageContent}>
            {/* <div>My Post: {params.slug}</div> */}
            <h1>{JSON.stringify(pageVerbData.data.properties.reflexive) === "true" ? "YESYES" : "nono"}</h1>
            <VerbHeader {...verbHeaderProps()}></VerbHeader>
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
                            {(collapsiblesTense[i].tenses as string[]).map((tableTense, i) => {
                                return (
                                    <VerbTable
                                        verb={pageVerbData.verb}
                                        key={tableTense}
                                        tense={tableTense}
                                        // mode={"indicative"}
                                        verbData={getTenseFromTenseName(pageVerbData.data.tenses, tableTense, collapsiblesTense[i]?.mode || false)}
                                        callbackLessonOpen={onLessonOpen}
                                        utterance={utterance}
                                        isSeparable={pageVerbData.data.properties.isSeparable}
                                    ></VerbTable>
                                )
                            })}
                        </CollapsibleTenses>
                    )
                })}

                <ModalExercises
                    text={''}
                    open={state.isExerciseConjugationOpen === true || state.isCheckboxListOpen === true}
                    ref={refModal}
                    callbackClose={callbackCloseModal}
                >
                    {state.isExerciseConjugationOpen === true
                        ? <ExerciseContent /> : state.isCheckboxListOpen
                        ? <ExerciseListCheckboxes /> : ''
                    }
                </ModalExercises>
{/*
                <h1>{`Practise`}</h1>

                <ExerciseContent /> */}

                <ModalExercises
                    text={''}
                    open={state.isModalLessonOpen}
                    callbackClose={closeModalLesson}
                    widerVersion={true}
                    padding={'paddingBase'}
                >
                    <Lesson lesson={'präsens'} utterance={utterance} />
                </ModalExercises>

                {/* <EmbeddedExercise text={''} open={true} ref={refModal} callbackClose={callbackCloseModal}>
                    <ExerciseConjugation
                        verb={'sein'}
                        tensesDropdown={props.exercisesTense}
                        texts={textsExercise}
                        tenseExercise={'präsens'}
                        selectedTenses={[props.exercisesTense]}
                        isSingleTense={true}
                        isEmbedded={true}
                    ></ExerciseConjugation>
                </EmbeddedExercise> */}
            </div>
        </div>
    ) : (
        <></>
    )
}
