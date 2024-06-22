'use client'

import styles from './exerciseGenerate.module.scss'
import SearchBar from '../SearchBar/SearchBar'
import { Selector } from '../Selector/Selector'
import { Button } from '../Button/Button'


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

    const onTensesSelect = (value: string, group: string, isChecked: boolean)=> {
        console.log(value)
        console.log(group)
        console.log(isChecked)
    }

    return  (
        <div className={`${styles.container}`}>
            <SearchBar />
            <Selector
                isExerciseGenerate={true}
                type={'checkbox'}
                options={[{options: SelectorTenses}]}
                columns={3}
                selectedOption={'Select tense(s)'}
                callbackOnChange={onTensesSelect}
            />
            <Button text={'Start'} color={'primaryDark'}/>
        </div>

    )
}