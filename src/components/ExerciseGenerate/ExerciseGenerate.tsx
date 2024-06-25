'use client'

import { useRouter } from 'next/navigation'
import styles from './exerciseGenerate.module.scss'
import SearchBar from '../SearchBar/SearchBar'
import { Selector } from '../Selector/Selector'
import { Button } from '../Button/Button'
import { useEffect, useState } from 'react'
import { SVGCross } from '@/assets/svg/svgExports'
import { replaceTensesFromStringForUrl } from '@/utils/utils'
import { HoverWithInfo } from '../HoverWithInfo/HoverWithInfo'


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

const selectorLevels = [
    "A1",
    "A2",
    "B1",
    "B2",
    "C1",
    "C2",
    "all",
]

const selectorTypes = [
    "Regular",
    "Irregular",
    "Separable",
    "Inseparable",
    "Prefixed",
    "Modal",
    "Auxiliary"
]

interface IExerciseGenerate {
    isSearchBarOption: boolean
}

export function ExerciseGenerate(props: IExerciseGenerate) {

    const router = useRouter()

    const [selectedTypes, setSelectedTypes] = useState<string[]>([])
    const [updatedSelectedTypes, setUpdatedSelectedTypes] = useState<string[]>([])

    const [selectedTenses, setSelectedTenses] = useState<string[]>([])
    const [updatedSelectedTenses, setUpdatedSelectedTenses] = useState<string[]>([])

    const [selectedVerbs, setSelectedVerbs] = useState<string[]>([])

    const [selectedLevels, setSelectedLevels] = useState<string[]>([])
    const [updatedSelectedLevels, setUpdatedSelectedLevels] = useState<string[]>([])


    const [isSearchBarOption, setIsSearchBarOption] = useState<boolean>(props.isSearchBarOption)

    const onTensesSelect = (value: string, group: string, isChecked: boolean)=> {

        if (isChecked) {
            const newTensesState: string[] = selectedTenses || []
            newTensesState.push(value)
            console.log(newTensesState)
            // const newCurrentState: string[] = currentState.push('hello')
            setSelectedTenses([...newTensesState])
        }
    }

    const onTypesSelect = (value: string, group: string, isChecked: boolean)=> {

        if (isChecked) {
            const newTypesState: string[] = selectedTypes || []
            newTypesState.push(value)
            console.log(newTypesState)
            // const newCurrentState: string[] = currentState.push('hello')
            setSelectedTypes([...newTypesState])
        }
    }

    const onVerbSelect = (value: string)=> {
        if (selectedVerbs.includes(value)) return

        const newVerbsState: string[] = selectedVerbs || []
        newVerbsState.push(value)
        console.log(value)
        setSelectedVerbs([...newVerbsState])
    }

    const onLevelSelect = (value: string)=> {
        if (selectedVerbs.includes(value)) return

        const newLevelsState: string[] = selectedLevels || []
        newLevelsState.push(value)
        console.log(value)
        setSelectedLevels([...newLevelsState])
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
                const newTypesState: string[] = selectedTypes || []
                newTypesState.splice(newTypesState.indexOf(value), 1)
                setSelectedTypes([...newTypesState])
                setUpdatedSelectedTypes([...newTypesState])
                return
            case 'levels':
                const newLevelsState: string[] = selectedLevels || []
                newLevelsState.splice(newLevelsState.indexOf(value), 1)
                setSelectedLevels([...newLevelsState])
                setUpdatedSelectedLevels([...newLevelsState])
                return
            case 'tenses':
                const newTensesState: string[] = selectedTenses || []
                newTensesState.splice(newTensesState.indexOf(value), 1)
                setSelectedTenses([...newTensesState])
                setUpdatedSelectedTenses([...newTensesState])
                return
            case 'verbs':
                const newVerbsState: string[] = selectedVerbs || []
                newVerbsState.splice(newVerbsState.indexOf(value), 1)
                setSelectedVerbs([...newVerbsState])
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
                            {selectedTypes.map((type, i) => {
                                return (
                                    <div key={`cont-type-${i}`} className={`${styles.selectedTenseContainer} ${styles.animated}`}>
                                        <p className={styles.selectedTense} key={`type-${i}`}>{type}</p>
                                        <ButtonRemoveItem
                                            type='types'
                                            value={type}
                                        />
                                    </div>
                                )
                            })}
                        </div>
                        <Selector
                            isExerciseGenerate={true}
                            type={'checkbox'}
                            options={[{ options: selectorTypes }]}
                            updatedSelectedOptions={updatedSelectedTypes}
                            columns={2}
                            selectedOption={'Verb type(s)'}
                            callbackOnChange={onTypesSelect}
                            selectAllOption={'select all types'}
                        />
                    </div>

                    <div data-levels className={`${styles.levelsContainer}`}>
                        <div className={`${styles.selectedTensesContainer}`}>
                            {selectedLevels.map((level, i) => {
                                return (
                                    <div key={`cont-level-${i}`} className={`${styles.selectedTenseContainer} ${styles.animated}`}>
                                        <p className={styles.selectedTense} key={`level-${i}`}>{level}</p>
                                        <ButtonRemoveItem
                                            type='levels'
                                            value={level}
                                        />
                                    </div>
                                )
                            })}
                        </div>
                        <Selector
                            isExerciseGenerate={true}
                            type={'checkbox'}
                            options={[{ options: selectorLevels }]}
                            updatedSelectedOptions={updatedSelectedLevels}
                            columns={2}
                            selectedOption={'Level(s)'}
                            callbackOnChange={onLevelSelect}
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
                            {selectedVerbs ? selectedVerbs.map((verb, i) => {
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
                        options={[{ options: SelectorTenses }]}
                        updatedSelectedOptions={updatedSelectedTenses}
                        columns={3}
                        selectedOption={'Select tense(s)'}
                        callbackOnChange={onTensesSelect}
                    />
                    <div className={`${styles.selectedTensesContainer}`}>
                        {selectedTenses.map((tense, i) => {
                            return (
                                <div key={`cont-tenses-${i}`} className={styles.selectedTenseContainer}>
                                    <p className={styles.selectedTense} key={`tense-${i}`}>{tense}</p>
                                    <ButtonRemoveItem
                                        type='tenses'
                                        value={tense}
                                    />
                                </div>
                            )
                        })}
                    </div>
                </div>
                <Button
                    text={'Start'}
                    color={'primaryDark'}
                    callback={onBtnStartClick} />
            </div></>

    )
}