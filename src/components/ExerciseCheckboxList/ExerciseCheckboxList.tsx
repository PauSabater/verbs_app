'use client'

import { Fragment, useEffect, useState } from 'react'
import styles from './exerciseCheckboxList.module.scss'
import stylesExercise from '../ExerciseConjugation/exerciseConjugation.module.scss'
import { ISelectorDropdownOptions } from '../Selector/Selector'
import InputCheckbox from '../UI/InputCheckbox/InputCheckbox'
import { ExerciseFeedback } from '../ExerciseConjugation/Components/Feedback/ExerciseFeedbackAndBtns'
import { TExerciseState } from '../ExerciseConjugation/ExerciseConjugation.exports'
import { useRouter } from 'next/navigation'

interface IExerciseCheckboxList {
    statement: string
    items: ISelectorDropdownOptions[]
    callbackOnConfirm: Function
    isExerciseLayout?: boolean
    verbs: string[]
}

export function ExerciseCheckboxList(props: IExerciseCheckboxList): JSX.Element {

    const [selectedItems, setSelectedItems] = useState<string[]>([])
    const [exerciseCheckboxListState, setExerciseCheckboxListState] = useState<TExerciseState>('empty')
    const [selectedArray, setSelectedArray] = useState<string[]>([])
    const router = useRouter()


    console.log(props.items)


    const updateSelectedItems = (event: Event) => {
        const elInput = event.target as HTMLInputElement
        const value = elInput.getAttribute('data-value')
        if (!value) return

        if (elInput.checked) {
            selectedArray.push(value)
        } else selectedArray.splice(selectedArray.indexOf(value), 1)

        if (selectedArray.length > 0) setExerciseCheckboxListState('filled')
        else setExerciseCheckboxListState('empty')

        console.log(selectedArray)
    }

    const updateSelectedItemsFromLocalstorage = (value: string, isChecked: boolean) => {
        // console.log("IN UPDATE FROM LOCALSTORAGE "+value+" and "+isChecked)
        // if (!value) return
        // if (isChecked) {
        //     console.log("LETS PUSH THE VALUE!!")
        //     selectedArray.push(value)
        // }
        // else selectedArray.splice(selectedArray.indexOf(value), 1)
        // if (selectedArray.length > 0) setExerciseCheckboxListState("filled")
        // else setExerciseCheckboxListState("empty")
    }

    const confirmChoices = () => {
        console.log('HEY CONFIRM!!')
        props.callbackOnConfirm(selectedArray)

        let tensesString = ''
        let verbsString = ''
        selectedArray.forEach((tense, i)=> {
            tensesString = i === 0 ? tense : `${tensesString},${tense}`
        })

        props.verbs.forEach((verb, i)=> {
            verbsString = i === 0 ? verb : `${verbsString},${verb}`
        })

        router.push(`/exercise?tenses=${tensesString}&verbs=${verbsString}`)
    }

    const getCheckboxesListTemplate = (options: string[]) => {
        return options.map((item, i) => {
            return (
                <InputCheckbox
                    label={item}
                    callbackOnChange={updateSelectedItems}
                    // callbackOnChecked={updateSelectedItemsFromLocalstorage}
                    isOnlyLabel={true}
                    // localstorageValue={item}
                    // localstorageKey={'selectedTenses'}
                    key={`input-${i}`}
                />
            )
        })
    }

    return (
        <div className={`${styles.container} ${props.isExerciseLayout ? styles.exerciseLayout : ''}`}>
            <div className={`${stylesExercise.container} ${styles.containerList}`}>
                <div className={stylesExercise.statement}>{props.statement}</div>
                {props.items.map((groupOptions, i) => {
                    return (
                        <Fragment key={`group-${i}`}>
                            {groupOptions.title ? <div className={styles.titleGroup}>{groupOptions.title}</div> : <></>}
                            <div className={styles.exerciseCheckboxList}>{getCheckboxesListTemplate(groupOptions.options)}</div>
                        </Fragment>
                    )
                })}
                <ExerciseFeedback exerciseState={exerciseCheckboxListState} btnText={'string'} callBackBtn={confirmChoices} />
            </div>
        </div>
    )
}
