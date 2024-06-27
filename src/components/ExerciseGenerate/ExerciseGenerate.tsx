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

    const textsExercise = texts.exerciseGenerate
    const router = useRouter()

    const [displayErrorVerb, setDisplayErrorVerb] = useState<boolean>(false)
    const [displayErrorTenses, setDisplayErrorTenses] = useState<boolean>(false)
    const [displayErrorTypes, setDisplayErrorTypes] = useState<boolean>(false)
    const [displayErrorLevels, setDisplayErrorLevels] = useState<boolean>(false)

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

    const setExerciseMode = (mode: TExerciseMode)=> {
        dispatch({
            type: actions.SET_EXERCISE_MODE,
            payload: mode
        })
    }

    const setReducerSelectedTenses = (tenses: string[])=> {
        dispatch({
            type: actions.SET_SELECTED_TENSES,
            payload: tenses
        })
    }

    const setReducerSelectedTypes = (types: string[])=> {
        dispatch({
            type: actions.SET_SELECTED_TYPES,
            payload: types
        })
    }

    const setReducerSelectedLevels = (levels: string[])=> {
        dispatch({
            type: actions.SET_SELECTED_LEVELS,
            payload: levels
        })
    }

    const setReducerSelectedVerbs = (verbs: string[])=> {
        dispatch({
            type: actions.SET_SELECTED_VERBS,
            payload: verbs
        })
    }

    const setReducerUpdatedSelectedTypes = (types: string[])=> {
        dispatch({
            type: actions.SET_UPDATED_SELECTED_TYPES,
            payload: types
        })
    }

    const setReducerUpdatedSelectedLevels = (levels: string[])=> {
        dispatch({
            type: actions.SET_UPDATED_SELECTED_LEVELS,
            payload: levels
        })
    }

    const setReducerUpdatedSelectedTenses = (tenses: string[])=> {
        dispatch({
            type: actions.SET_UPDATED_SELECTED_TENSES,
            payload: tenses
        })
    }

    const onTensesSelect = (value: string, group: string, isChecked: boolean)=> {

        if (isChecked) {
            const newTensesState: string[] = state.selectedTenses || []
            newTensesState.push(value)

            setReducerSelectedTenses(newTensesState)
        }
    }

    // Update sessionstorage state:
    useEffect(()=> {
        sessionStorage.setItem(sessionStorageKey, JSON.stringify(state))
    }, [state])

    const onTypesSelect = (value: string, group: string, isChecked: boolean)=> {

        if (isChecked) {
            const newTypesState: string[] = state.selectedTypes || []
            newTypesState.push(value)
            console.log(newTypesState)
            setReducerSelectedTypes(newTypesState)
        }
    }

    const onVerbSelect = (value: string)=> {
        if (state.selectedVerbs.includes(value)) return

        const newVerbsState: string[] = state.selectedVerbs || []
        newVerbsState.push(value)
        console.log(value)
        setReducerSelectedVerbs(newVerbsState)
    }

    const onLevelSelect = (value: string)=> {
        if (state.selectedVerbs.includes(value)) return

        const newLevelsState: string[] = state.selectedLevels || []
        newLevelsState.push(value)
        setReducerSelectedLevels(newLevelsState)
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

            router.push(`/exercise?random=true&types=${typeParams.toLowerCase()}&level=${levelParams}&tenses=${tensesParams}`)

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
        const item: HTMLDivElement = e.target as HTMLDivElement
        const listName = item.getAttribute('data-list')
        const value = item.getAttribute('data-value')
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
                newLevelsState.splice(newLevelsState.indexOf(value), 1)
                setReducerSelectedLevels(newLevelsState)
                setReducerUpdatedSelectedLevels([...newLevelsState])
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
                className={styles.crossButton}
                data-value={props.value}
                data-list={props.type}
                onClick={(e) => removeItems(e)}
            >
                <SVGCross />
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


    return  (

        <div className={styles.exerciseGenerate}>

        {/* <div className={`${styles.btnsContainer}`}>
            <p>Exercise type → </p>
            <Button
                text={''}
                color={'greyReverse'}
                callback={() => setOrRemoveSearchBar(true)}
                icon={'search'}
                isTextOnHover={true}
            ></Button>
            <Button
                text={''}
                color={'greyReverse'}
                callback={() => setOrRemoveSearchBar(false)}
                icon={'random'}
                isTextOnHover={true}
            ></Button>
        </div> */}



            <div className={`${styles.container}`}>
                <div
                    data-display={state.exerciseMode === 'random'}
                    className={styles.containerRandomOption}
                >
                    <div className={styles.wrap}>
                        {/* <HoverWithInfo text={'Aleatory verbs'} bg={''}> */}
                        <Button
                            text={''}
                            color={'greyReverse'}
                            callback={() => setExerciseMode('search')}
                            icon={'search'}
                            isTextOnHover={true}
                        ></Button>

                        {/* </HoverWithInfo> */}
                    </div>

                    <div className={`${styles.typesContainer}`}>
                        <Selector
                            isExerciseGenerate={true}
                            type={'checkbox'}
                            options={[{ options: textsExercise.typesSelector }]}
                            updatedSelectedOptions={state.updatedSelectedTypes}
                            columns={2}
                            selectedOption={'Verb type(s)'}
                            callbackOnChange={onTypesSelect}
                            selectAllOption={textsExercise.typesSelectAllOption.label}
                        />
                        <div data-types className={`${styles.selectedTensesContainer}`}>
                            {state.selectedTypes.length < textsExercise.typesSelector.length
                                ? state.selectedTypes.map((type, i) => {
                                    return (
                                        <div key={`cont-type-${i}`} className={`${styles.selectedTenseContainer} ${styles.animated}`}>
                                            <p className={styles.selectedTense} key={`type-${i}`}>{type}</p>
                                            <ButtonRemoveItem
                                                type='types'
                                                value={type}
                                            />
                                        </div>
                                    )
                            })

                            :
                                <div key={`cont-type-all`} className={`${styles.selectedTenseContainer} ${styles.animated}`}>
                                    <p
                                        className={styles.selectedTense}
                                        key={`type-all`}
                                    >
                                        {textsExercise.typesSelectAllOption.labelSelected}
                                    </p>
                                    <ButtonRemoveItem
                                        type='types-remove-all'
                                        value={textsExercise.typesSelectAllOption.label}
                                    />
                                </div>
                        }
                        </div>
                        {   // Error display:
                            displayErrorTypes && state.selectedTypes.length === 0
                                ? <ErrorMessage text={textsExercise.errorMessages.types}/>
                                : <></>
                        }
                    </div>

                    <div data-levels className={`${styles.levelsContainer}`}>
                        <Selector
                            isExerciseGenerate={true}
                            type={'checkbox'}
                            options={[{ options: textsExercise.levelsSelector }]}
                            updatedSelectedOptions={state.updatedSelectedLevels}
                            columns={2}
                            selectedOption={'Level(s)'}
                            callbackOnChange={onLevelSelect}
                            selectAllOption={textsExercise.levelsSelectAllOption.label}
                            // updatedSelection={}
                        />
                        <div className={`${styles.selectedTensesContainer}`}>
                            {state.selectedLevels.length < textsExercise.levelsSelector.length
                                ? state.selectedLevels.map((level, i) => {
                                return (
                                    <div key={`cont-level-${i}`} className={`${styles.selectedTenseContainer} ${styles.animated}`}>
                                        <p className={styles.selectedTense} key={`level-${i}`}>{level}</p>
                                        <ButtonRemoveItem
                                            type='levels'
                                            value={level}
                                        />
                                    </div>
                                )
                            })

                            :
                                <div key={`cont-level-all`} className={`${styles.selectedTenseContainer} ${styles.animated}`}>
                                    <p
                                        className={styles.selectedTense}
                                        key={`level-all`}
                                    >
                                        {textsExercise.typesSelectAllOption.labelSelected}
                                    </p>
                                    <ButtonRemoveItem
                                        type='levels-remove-all'
                                        value={textsExercise.levelsSelectAllOption.label}
                                    />
                                </div>

                        }
                        </div>
                        {   // Error display:
                            displayErrorLevels && state.selectedLevels.length === 0
                                ? <ErrorMessage text={textsExercise.errorMessages.levels}/>
                                : <></>
                        }
                    </div>
                </div>


                <div
                    data-display={state.exerciseMode === 'search'}
                    className={styles.searchBarContainer}
                >
                    <div className={styles.wrap}>
                        {/* <HoverWithInfo text={'Aleatory verbs'} bg={''}> */}
                        <Button
                            text={''}
                            color={'greyReverse'}
                            callback={() => setExerciseMode('random')}
                            icon={'random'}
                            isTextOnHover={true}
                        ></Button>
                        {/* </HoverWithInfo> */}
                    </div>
                    <div className={`${styles.searchBarContainer}`}>
                        {
                            displayErrorVerb && state.selectedVerbs.length === 0
                                ? <ErrorMessage text={textsExercise.errorMessages.verbs}/>
                                : <></>
                        }
                        <SearchBar
                            isExerciseGenerate={true}
                            callbackOnSelect={onVerbSelect}
                            placeholder={'Add verb(s)'}
                            // callBackOnInputFocus={onInputSearchBarFocus}
                        />

                        <div className={`${styles.selectedTensesContainer}`}>
                            {state.selectedVerbs ? state.selectedVerbs.map((verb, i) => {
                                return (
                                    <div key={`cont-verb-${i}`} className={`${styles.selectedTenseContainer} ${styles.animated}`}>
                                        <p className={styles.selectedTense} key={`verb-${i}`}>{verb}</p>
                                        <ButtonRemoveItem
                                            type='verbs'
                                            value={verb}
                                        />
                                    </div>
                                )
                            })
                                : <></>}
                        </div>

                    </div>
                </div>


                <div className={`${styles.selectorContainer}`}>
                    <Selector
                        isExerciseGenerate={true}
                        type={'checkbox'}
                        options={[{ options: textsExercise.tensesSelector }]}
                        updatedSelectedOptions={state.updatedSelectedTenses}
                        columns={3}
                        selectedOption={textsExercise.tensesSelectText}
                        callbackOnChange={onTensesSelect}
                        selectAllOption={textsExercise.tensesSelectAllOption.label}
                    />
                    <div className={`${styles.selectedTensesContainer}`}>
                        {state.selectedTenses.length < textsExercise.tensesSelector.length ? state.selectedTenses.map((tense, i) => {
                            return (
                                <div key={`cont-tenses-${i}`} className={styles.selectedTenseContainer}>
                                    <p className={styles.selectedTense} key={`tense-${i}`}>{tense}</p>
                                    <ButtonRemoveItem
                                        type='tenses'
                                        value={tense}
                                    />
                                </div>
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
                                    value={textsExercise.tensesSelectAllOption.label}
                                />
                            </div>

                        }
                    </div>
                        {
                            displayErrorTenses && state.selectedTenses.length === 0
                                ? <ErrorMessage text={textsExercise.errorMessages.tenses}/>
                                : <></>
                        }
                </div>
                <Button
                    text={'Start'}
                    color={'primaryDark'}
                    callback={onBtnStartClick}
                />
            </div>
            {
                (state.exerciseMode === 'search' && (state.selectedVerbs.length > 0 || state.selectedTenses.length > 0))
                || (state.exerciseMode === 'random' && (state.selectedTypes.length > 0 || state.selectedLevels.length > 0 || state.selectedTenses.length > 0))
                    ?
                    <div className={styles.btnRestartContainer}>
                        <Button
                            text={''}
                            color={'transparent'}
                            callback={() => restartInputs()}
                            icon={'restart'}
                            isTextOnHover={true}
                            title='restart'
                        ></Button>
                    </div>
                    : <></>
            }
        </div>

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