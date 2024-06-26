'use client'

import { useRouter } from 'next/navigation'
import styles from './exerciseGenerate.module.scss'
import SearchBar from '../SearchBar/SearchBar'
import { Selector } from '../Selector/Selector'
import { Button } from '../Button/Button'
import { Reducer, useEffect, useReducer, useState } from 'react'
import { SVGCross } from '@/assets/svg/svgExports'
import { replaceTensesFromStringForUrl } from '@/utils/utils'
import { HoverWithInfo } from '../HoverWithInfo/HoverWithInfo'
import texts from '../../data/exerciseGenerate.json'
import { TExerciseGenerateAction, actions, reducer } from './exerciseGenerateReducer'


interface IHero {
    // title: string,
    // children: ReactNode,
    // bg: string
}


interface IExerciseGenerate {
    isSearchBarOption: boolean
}

export function ExerciseGenerate(props: IExerciseGenerate) {

    const textsExercise = texts.exerciseGenerate

    const router = useRouter()

    const [updatedSelectedTypes, setUpdatedSelectedTypes] = useState<string[]>([])

    const [updatedSelectedTenses, setUpdatedSelectedTenses] = useState<string[]>([])

    const [updatedSelectedLevels, setUpdatedSelectedLevels] = useState<string[]>([])


    const [isSearchBarOption, setIsSearchBarOption] = useState<boolean>(props.isSearchBarOption)

    interface IExerciseGenerateState {
        selectedTypes: string[],
        selectedTenses: string[],
        selectedLevels: string[],
        selectedVerbs: string[],
        updatedSelectedTypes: string[]
    }


    const [state, dispatch] = useReducer<Reducer<IExerciseGenerateState, TExerciseGenerateAction>>(reducer, {
        selectedTypes: [],
        selectedTenses: [],
        selectedLevels: [],
        selectedVerbs: [],
        updatedSelectedTypes: []
    })

    const setReducerSelectedTenses = (tenses: string[])=> {
        dispatch({
            type: actions.SET_SELECTED_TENSES,
            payload: tenses
        })
    }

    const setReducerUpdatedSelectedTypes = (tenses: string[])=> {
        dispatch({
            type: actions.SET_UPDATED_SELECTED_TYPES,
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

    const onTensesSelect = (value: string, group: string, isChecked: boolean)=> {

        if (isChecked) {
            const newTensesState: string[] = state.selectedTenses || []
            newTensesState.push(value)

            setReducerSelectedTenses(newTensesState)
        }
    }

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

        if (isSearchBarOption) actionsOnVerbModeAccept()

    }


    const actionsOnRandomModeAccept = ()=> {

    }




    const actionsOnVerbModeAccept = ()=> {

        if (state.selectedVerbs.length > 0 && state.selectedTenses.length > 0) {

            let tensesString = ''
            state.selectedTenses.forEach((tense, i)=> {
                const tenseForUrl = replaceTensesFromStringForUrl(tense)
                if (i === 0) tensesString = `${tenseForUrl}`
                else tensesString = `${tensesString},${tenseForUrl}`
            })

            let verbsString = ''
            state.selectedVerbs.forEach((verb, i)=> {
                if (i === 0) verbsString = `${verb}`
                else verbsString = `${verbsString},${verb}`
            })

            router.push(`/exercise?tenses=${tensesString}&verbs=${verbsString}`)
        }

        if (state.selectedVerbs.length === 0) {

        }
    }

    const setOrRemoveSearchBar = (isSearchOption: boolean)=> {
        setIsSearchBarOption(isSearchOption)
    }

    // const getArrayWithoutGivenValue = (value: string, array: string[])=> {
    //     const newArray = array
    //     const index = newArray.indexOf(value)
    //     return newArray.splice(index, 1)
    // }

    const removeItems = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>)=> {
        console.log("HEY REMOVE ITEMS")
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
                setUpdatedSelectedLevels([...newLevelsState])
                return
            case 'levels-remove-all':
                setReducerSelectedLevels([])
                setUpdatedSelectedLevels([...[]])
                return
            case 'tenses':
                const newTensesState: string[] = state.selectedTenses || []
                newTensesState.splice(newTensesState.indexOf(value), 1)
                setReducerSelectedTenses(newTensesState)
                setUpdatedSelectedTenses([...newTensesState])
                return
            case 'tenses-remove-all':
                setReducerSelectedTenses([])
                setUpdatedSelectedTenses([...[]])
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


    return  (

        <>
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
                <div data-display={!isSearchBarOption} className={styles.containerRandomOption}>
                    <div className={styles.wrap}>
                        {/* <HoverWithInfo text={'Aleatory verbs'} bg={''}> */}
                        <Button
                            text={''}
                            color={'greyReverse'}
                            callback={() => setOrRemoveSearchBar(true)}
                            icon={'search'}
                            isTextOnHover={true}
                        ></Button>

                        {/* </HoverWithInfo> */}
                    </div>

                    <div className={`${styles.typesContainer}`}>
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
                    </div>

                    <div data-levels className={`${styles.levelsContainer}`}>
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
                        <Selector
                            isExerciseGenerate={true}
                            type={'checkbox'}
                            options={[{ options: textsExercise.levelsSelector }]}
                            updatedSelectedOptions={updatedSelectedLevels}
                            columns={2}
                            selectedOption={'Level(s)'}
                            callbackOnChange={onLevelSelect}
                            selectAllOption={textsExercise.levelsSelectAllOption.label}
                            // updatedSelection={}
                        />
                    </div>
                </div>


                <div data-display={isSearchBarOption} className={styles.searchBarContainer}>
                    <div className={styles.wrap}>
                        {/* <HoverWithInfo text={'Aleatory verbs'} bg={''}> */}
                        <Button
                            text={''}
                            color={'greyReverse'}
                            callback={() => setOrRemoveSearchBar(false)}
                            icon={'random'}
                            isTextOnHover={true}
                        ></Button>
                        {/* </HoverWithInfo> */}
                    </div>
                    <div className={`${styles.searchBarContainer}`}>
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
                        <SearchBar
                            isExerciseGenerate={true}
                            callbackOnSelect={onVerbSelect}
                            placeholder={'Add verb(s)'} />
                    </div>
                </div>


                <div className={`${styles.selectorContainer}`}>
                    <Selector
                        isExerciseGenerate={true}
                        type={'checkbox'}
                        options={[{ options: textsExercise.tensesSelector }]}
                        updatedSelectedOptions={updatedSelectedTenses}
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

                        {

                        }
                    </div>
                </div>
                <Button
                    text={'Start'}
                    color={'primaryDark'}
                    callback={onBtnStartClick}
                />
            </div></>

    )
}