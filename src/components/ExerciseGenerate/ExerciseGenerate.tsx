'use client'

import { useRouter } from 'next/navigation'
import styles from './exerciseGenerate.module.scss'
import SearchBar from '../SearchBar/SearchBar'
import { Selector } from '../Selector/Selector'
import { Button } from '../Button/Button'
import { Reducer, useEffect, useReducer, useState } from 'react'
import { SVGCross, SVGRestart } from '@/assets/svg/svgExports'
import { getComaSeparatedStringFromArray, replaceTenseFromStringForUrl, replaceTensesArrayForUrl } from '@/utils/utils'
import { HoverWithInfo } from '../HoverWithInfo/HoverWithInfo'
import texts from '../../data/exerciseGenerate.json'
import { IExerciseGenerateState, TExerciseGenerateAction, TExerciseMode, actions, reducer } from './exerciseGenerateReducer'
import { sanitize } from 'isomorphic-dompurify'
import ButtonExercise from './ButtonExercise/ButtonExercise'
import ModalExercises from '../ModalExercises/ModalExercises'
import { RandomExerciseForm } from './RandomExerciseForm/RandomExerciseForm'


interface IHero {
    // title: string,
    // children: ReactNode,
    // bg: string
}


interface IExerciseGenerate {
    isSearchBarOption: boolean,
    component: 'hero' | 'exercise-page'
}

export function ExerciseGenerate(props: IExerciseGenerate) {

    const sessionStorageKey = `state-${props.component}-exercise-set`

    const stateStored = sessionStorage.getItem(sessionStorageKey)
    let objStateStored: IExerciseGenerateState | undefined = stateStored
        ? JSON.parse(stateStored) as IExerciseGenerateState
        : undefined

    console.log("HEZ LOCALSTORAGE")
    console.log(objStateStored)

    const textsExercise = texts.exerciseGenerate
    const router = useRouter()

    const [displayErrorVerb, setDisplayErrorVerb] = useState<boolean>(false)
    const [displayErrorTenses, setDisplayErrorTenses] = useState<boolean>(false)
    const [displayErrorTypes, setDisplayErrorTypes] = useState<boolean>(false)
    const [displayErrorLevels, setDisplayErrorLevels] = useState<boolean>(false)
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

    const [state, dispatch] = useReducer<Reducer<IExerciseGenerateState, TExerciseGenerateAction>>(reducer, {
        exerciseMode: objStateStored ? objStateStored.exerciseMode : 'random',
        selectedTypes: objStateStored ? objStateStored.selectedTypes : [],
        selectedTenses: objStateStored ? objStateStored.selectedTenses : [],
        selectedLevels: objStateStored ? objStateStored.selectedLevels : [],
        selectedVerbs: objStateStored ? objStateStored.selectedVerbs : [],
        updatedSelectedTypes: objStateStored ? objStateStored.updatedSelectedTypes : [],
        updatedSelectedTenses: objStateStored ? objStateStored.updatedSelectedTenses : [],
        updatedSelectedLevels: objStateStored ? objStateStored.updatedSelectedLevels : []
    })


    // let data

    // try {
    //     const response = await fetch('http://localhost:3000/api/verbs')

    //     if (!response.ok) {
    //         throw new Error('Network response was not ok')
    //     } else {

    //     }

    // }

    const setExerciseMode = (mode: TExerciseMode)=> {
        dispatch({
            type: actions.SET_EXERCISE_MODE,
            payload: mode
        })
    }

    const setReducerSelectedTenses = (tenses: string[])=> {
        dispatch({
            type: actions.SET_SELECTED_TENSES,
            payload: [...new Set(tenses)]
        })
    }

    const setReducerSelectedTypes = (types: string[])=> {
        dispatch({
            type: actions.SET_SELECTED_TYPES,
            payload: [...new Set(types)]
        })
    }

    const setReducerSelectedLevels = (levels: string[])=> {
        dispatch({
            type: actions.SET_SELECTED_LEVELS,
            payload: [...new Set(levels)]
        })
    }

    const setReducerSelectedVerbs = (verbs: string[])=> {
        dispatch({
            type: actions.SET_SELECTED_VERBS,
           payload: [...new Set(verbs)]
        })
    }

    const setReducerUpdatedSelectedTypes = (types: string[])=> {
        dispatch({
            type: actions.SET_UPDATED_SELECTED_TYPES,
            payload: [...new Set(types)]
        })
    }

    const setReducerUpdatedSelectedLevels = (levels: string[])=> {
        dispatch({
            type: actions.SET_UPDATED_SELECTED_LEVELS,
            payload: [...new Set(levels)]
        })
    }

    const setReducerUpdatedSelectedTenses = (tenses: string[])=> {
        dispatch({
            type: actions.SET_UPDATED_SELECTED_TENSES,
            payload: [...new Set(tenses)]
        })
    }

    // Update sessionstorage state:
    useEffect(()=> {
        console.log("HEY USE EFFECT STATE CHANGE")
        console.log(state)
        sessionStorage.setItem(sessionStorageKey, JSON.stringify(state))
    }, [state])

    const onTypesInputChange = (value: string, group: string, isChecked: boolean)=> {
        const newTypesState: string[] = state.selectedTypes || []
        if (isChecked) {
            newTypesState.push(value)
        } else {
            newTypesState.splice(newTypesState.indexOf(value))
        }
        setReducerSelectedTypes(newTypesState)
        setReducerUpdatedSelectedTypes(newTypesState)
    }

    const onLevelInputChange = (value: string, group: string, isChecked: boolean)=> {
        const newLevelsState: string[] = state.selectedLevels || []
        if (isChecked) {
            newLevelsState.push(value)
        } else {
            newLevelsState.splice(newLevelsState.indexOf(value))
        }
        setReducerSelectedLevels(newLevelsState)
    }

    const onTensesInputChange = (value: string, group: string, isChecked: boolean)=> {
        const newTensesState: string[] = state.selectedTenses || []
        if (isChecked) {
            newTensesState.push(value)
        } else {
            newTensesState.splice(newTensesState.indexOf(value))
        }
        setReducerSelectedTenses(newTensesState)
    }

    const onVerbSelect = (value: string)=> {
        if (state.selectedVerbs.includes(value)) return

        const newVerbsState: string[] = state.selectedVerbs || []
        newVerbsState.push(value)
        console.log(value)
        setReducerSelectedVerbs(newVerbsState)
    }

    const onBtnStartClick = ()=> {
        console.log(state.exerciseMode)

        if (state.exerciseMode === 'search') actionsOnSearchModeAccept()
        if (state.exerciseMode === 'random') actionsOnRandomModeAccept()

    }


    const actionsOnRandomModeAccept = ()=> {
        if (state.selectedTypes.length > 0 && state.selectedLevels.length > 0 && state.selectedTenses.length > 0) {

            const typeParams: string = getComaSeparatedStringFromArray(state.selectedTypes)
            const levelParams: string = getComaSeparatedStringFromArray(state.selectedLevels)
            const tensesParams: string = getComaSeparatedStringFromArray(
                replaceTensesArrayForUrl(state.selectedTenses)
            )

            router.push(`/exercise?random=true&types=${typeParams.toLowerCase()}&levels=${levelParams}&tenses=${tensesParams}`)

            // const tensesParams: string = getComaSeparatedStringFromArray(
            //     replaceTensesArrayForUrl(state.selectedTenses))
            // const verbsParams: string = getComaSeparatedStringFromArray(state.selectedVerbs)
        }

        if (state.selectedLevels.length === 0) {
            setDisplayErrorLevels(true)
        }

        if (state.selectedTypes.length === 0) {
            setDisplayErrorTypes(true)
        }

        if (state.selectedTenses.length === 0) {
            setDisplayErrorTenses(true)
        }
    }


    const actionsOnSearchModeAccept = ()=> {

        if (state.selectedVerbs.length > 0 && state.selectedTenses.length > 0) {

            const tensesParams: string = getComaSeparatedStringFromArray(
                replaceTensesArrayForUrl(state.selectedTenses)
            )
            const verbsParams: string = getComaSeparatedStringFromArray(state.selectedVerbs)

            router.push(`/exercise?tenses=${tensesParams}&verbs=${verbsParams}`)
        }

        if (state.selectedVerbs.length === 0) {
            setDisplayErrorVerb(true)
        }

        if (state.selectedTenses.length === 0) {
            setDisplayErrorTenses(true)
        }
    }

    const removeItems = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>)=> {
        const item: HTMLButtonElement = e.target as HTMLButtonElement
        const listName = item.getAttribute('data-list')
        const value = item.getAttribute('data-value')
        console.log(listName)

        console.log("HEY REMOVE ITEM")
        console.log(item)
        console.log(value)
        console.log(listName)

        if (!value) return

        switch(listName) {
            case 'types':
                const newTypesState: string[] = state.selectedTypes || []
                newTypesState.splice(newTypesState.indexOf(value), 1)
                setReducerSelectedTypes(newTypesState)
                setReducerUpdatedSelectedTypes(newTypesState)
                return

            case 'types-remove-all':
                setReducerSelectedTypes([])
                setReducerUpdatedSelectedTypes([])
                return

            case 'levels':
                const newLevelsState: string[] = state.selectedLevels || []
                console.log("before is")
                console.log(newLevelsState)
                newLevelsState.splice(newLevelsState.indexOf(value), 1)
                console.log("after is")
                console.log(newLevelsState)

                setReducerSelectedLevels(newLevelsState)
                setReducerUpdatedSelectedLevels(newLevelsState)
                return

            case 'levels-remove-all':
                setReducerSelectedLevels([])
                setReducerUpdatedSelectedLevels([])
                return

            case 'tenses':
                const newTensesState: string[] = state.selectedTenses || []
                newTensesState.splice(newTensesState.indexOf(value), 1)
                setReducerSelectedTenses(newTensesState)
                setReducerUpdatedSelectedTenses(newTensesState)
                return

            case 'tenses-remove-all':
                setReducerSelectedTenses([])
                setReducerUpdatedSelectedTenses([])
                return

            case 'verbs':
                const newVerbsState: string[] = state.selectedVerbs || []
                newVerbsState.splice(newVerbsState.indexOf(value), 1)
                setReducerSelectedVerbs(newVerbsState)
                return
        }

    }

    const ButtonRemoveItem = (props: {type: string, value: string}) => {
        return (
            <button
                className={`${styles.selectedTenseContainer} ${styles.animated}`}
                onClick={(e) => removeItems(e)}
                data-value={props.value}
                data-list={props.type}
            >
                <p className={styles.selectedTense} >{props.value}</p>
                <div
                    className={styles.crossButton}
                >
                    <SVGCross />
                </div>
            </button>
        )
    }

    const restartInputs = ()=> {
        if (state.exerciseMode === 'search') {
            setReducerSelectedVerbs([])
            setReducerSelectedTenses([])
            setReducerUpdatedSelectedTenses([])
        }

        if (state.exerciseMode === 'random') {
            setReducerSelectedTypes([])
            setReducerUpdatedSelectedTypes([])
            setReducerSelectedLevels([])
            setReducerUpdatedSelectedLevels([])
            setReducerSelectedTenses([])
            setReducerUpdatedSelectedTenses([])
        }
    }


    function setOrRemoveSearchBar(arg0: boolean) {
        throw new Error('Function not implemented.')
    }

    const toggleModal = ()=> {

    }

    return  (

        <><div className={styles.exerciseGenerate}>

            <div
                className={`${styles.btnsContainer}`}
                data-exercise-mode={state.exerciseMode}
            >
                <Button
                    text={'aleatory verbs'}
                    callback={() => setExerciseMode('random')}
                    icon={'random'}
                    isTextOnHover={true}
                ></Button>
                <Button
                    text={'specific verbs'}
                    callback={() => setExerciseMode('search')}
                    icon={'search'}
                    isTextOnHover={true}
                ></Button>
                <Button
                    text={'listed verbs'}
                    color={'greyReverse'}
                    callback={() => setExerciseMode('search')}
                    icon={'list'}
                    isTextOnHover={true}
                ></Button>
            </div>



            <div className={`${styles.container}`}>
                <p className={styles.anouncement}>Choose the type and level of the aleatory verbs to be displayed, as well as the tenses you want to practice</p>
                <div
                    data-display={state.exerciseMode === 'random'}
                    className={styles.containerRandomOption}
                >
                    {/* <div className={styles.wrap}> */}
                    {/* <HoverWithInfo text={'Aleatory verbs'} bg={''}> */}
                    {/* <Button
        text={''}
        color={'greyReverse'}
        callback={() => setExerciseMode('search')}
        icon={'search'}
        isTextOnHover={true}
    ></Button> */}

                    {/* </HoverWithInfo> */}
                    {/* </div> */}

                    <div className={`${styles.typesContainer}`}>

                        {/* BUTTON TYPES */}
                        {/* <ButtonExercise
                            callbackOnClick={() => setIsModalOpen(!isModalOpen)}
                            text={'Verb type'} /> */}

    <Selector
        isExerciseGenerate={true}
        type={'checkbox'}
        options={[{ options: textsExercise.typesSelector }]}
        updatedSelectedOptions={JSON.stringify(state.selectedTypes)}
        columns={3}
        selectedOption={'Verb type(s)'}
        callbackOnChange={onTypesInputChange}
        selectAllOption={textsExercise.typesSelectAllOption.label}
    />
    <div data-types className={`${styles.selectedTensesContainer}`}>
        {state.selectedTypes.length < textsExercise.typesSelector.length
            ? state.selectedTypes.map((type, i) => {
                return (
                    <ButtonRemoveItem
                        type='types'
                        value={type}
                        key={`cont-type-${i}`}
                    />
                )
        })

        :
            <ButtonRemoveItem
                type='types-remove-all'
                value={textsExercise.typesSelectAllOption.label}
            />
        }
    </div>
                        {// Error display:
                            displayErrorTypes && state.selectedTypes.length === 0
                                ? <ErrorMessage text={textsExercise.errorMessages.types} />
                                : <></>}
                    </div>

                    <div data-levels className={`${styles.levelsContainer}`}>
                        <Selector
                            isExerciseGenerate={true}
                            type={'checkbox'}
                            options={[{ options: textsExercise.levelsSelector }]}
                            updatedSelectedOptions={JSON.stringify(state.updatedSelectedLevels)}
                            columns={3}
                            selectedOption={'Verb level(s)'}
                            callbackOnChange={onLevelInputChange}
                            selectAllOption={textsExercise.levelsSelectAllOption.label}
                        />
                        <div className={`${styles.selectedTensesContainer}`}>
                            {state.selectedLevels.length < textsExercise.levelsSelector.length
                                ? state.selectedLevels.map((level, i) => {
                                    return (
                                        <ButtonRemoveItem
                                            key={`cont-level-${i}`}
                                            type='levels'
                                            value={level}
                                        />
                                    )
                                })

                                :
                                    <ButtonRemoveItem
                                        key={`cont-level-all`}
                                        type='levels-remove-all'
                                        value={textsExercise.levelsSelectAllOption.label}
                                    />
                                }
                        </div>
                        {// Error display:
                            displayErrorLevels && state.selectedLevels.length === 0
                                ? <ErrorMessage text={textsExercise.errorMessages.levels} />
                                : <></>}
                    </div>
                </div>


                <div
                    data-display={state.exerciseMode === 'search'}
                    className={styles.searchBarContainer}
                >
                    <div className={`${styles.searchBarContainer}`}>
                        {displayErrorVerb && state.selectedVerbs.length === 0
                            ? <ErrorMessage text={textsExercise.errorMessages.verbs} />
                            : <></>}
                        <SearchBar
                            isExerciseGenerate={true}
                            callbackOnSelect={onVerbSelect}
                            placeholder={'Add verb(s)'} />

                        <div className={`${styles.selectedTensesContainer}`}>
                            {state.selectedVerbs ? state.selectedVerbs.map((verb, i) => {
                                return (
                                    <ButtonRemoveItem
                                        key={`verbs-selected-${i}`}
                                        type='verbs'
                                        value={verb}
                                    />
                                )
                            })
                                : <></>
                            }
                        </div>

                    </div>
                </div>


                <div className={`${styles.selectorContainer}`}>
                    <Selector
                        isExerciseGenerate={true}
                        type={'checkbox'}
                        options={[{ options: textsExercise.tensesSelector }]}
                        updatedSelectedOptions={JSON.stringify(state.updatedSelectedTenses)}
                        columns={4}
                        selectedOption={textsExercise.tensesSelectText}
                        callbackOnChange={onTensesInputChange}
                        selectAllOption={textsExercise.tensesSelectAllOption.label}
                    />
                    <div className={`${styles.selectedTensesContainer}`}>
                        {state.selectedTenses.length < textsExercise.tensesSelector.length ? state.selectedTenses.map((tense, i) => {
                            return (
                                <ButtonRemoveItem
                                    key={`verbs-tenses-${i}`}
                                    type='tenses'
                                    value={tense}
                                />
                            )
                        })

                            :

                            <div key={`cont-tenses-all`} className={`${styles.selectedTenseContainer} ${styles.animated}`}>
                                <p
                                    className={styles.selectedTense}
                                    key={`tense-all`}
                                >
                                    {textsExercise.tensesSelectAllOption.labelSelected}
                                </p>
                                <ButtonRemoveItem
                                    type='tenses-remove-all'
                                    value={textsExercise.tensesSelectAllOption.label} />
                            </div>}
                    </div>
                    {displayErrorTenses && state.selectedTenses.length === 0
                        ? <ErrorMessage text={textsExercise.errorMessages.tenses} />
                        : <></>}
                </div>
                {(state.exerciseMode === 'search' && (state.selectedVerbs.length > 0 || state.selectedTenses.length > 0))
                || (state.exerciseMode === 'random' && (state.selectedTypes.length > 0 || state.selectedLevels.length > 0 || state.selectedTenses.length > 0))
                ?
                    <div className={styles.btnRestartContainer}>
                        <Button
                            text={'restart inputs'}
                            color={'transparent'}
                            callback={() => restartInputs()}
                            icon={'restart'}
                            isTextOnHover={true}
                            title='restart'
                        ></Button>
                    </div>
                : <></>}
                <div className={styles.btnConfirmContainer}>
                    <Button
                        text={'Start practising'}
                        color={'primaryDark'}
                        callback={onBtnStartClick}
                        icon={'exercise'}
                    />
                </div>
            </div>
        </div>

        {/* <ModalExercises
            open={true}
            text={''}
            callbackClose={() => setIsModalOpen(false)}
            widerVersion={true}
        >
            <RandomExerciseForm />
        </ModalExercises> */}

        </>

    )
}


const ErrorMessage = ({text}: {text: string})=> {
    return (
        <p
            className={styles.error}
            dangerouslySetInnerHTML={{__html: sanitize(text)}}
        ></p>
    )
}