'use client'

import { Fragment, MouseEventHandler, ReactNode, useEffect, useState } from 'react'
import styles from './exerciseCheckboxList.module.scss'
import stylesExercise from '../ExerciseConjugation/exerciseConjugation.module.scss'
import { useRef } from 'react'
import { Button } from '../Button/Button'
import { ISelectorDropdownOptions } from '../Selector/Selector'
import InputCheckbox from '../UI/InputCheckbox/InputCheckbox'
import { ExerciseFeedback } from '../ExerciseConjugation/Components/Feedback/ExerciseFeedback'
import { TExerciseState } from '../ExerciseConjugation/ExerciseConjugation.exports'

interface IExerciseCheckboxList {
    statement: string,
    items: ISelectorDropdownOptions[]
    callbackOnConfirm: Function
}

export function ExerciseCheckboxList(props: IExerciseCheckboxList): JSX.Element {

    const [selectedItems, setSelectedItems] = useState<string[]>([])

    const [exerciseCheckboxListState, setExerciseCheckboxListState] = useState<TExerciseState>("empty")

    const [selectedArray, setSelectedArray] = useState<string[]>([])


    const updateSelectedItems = (event: Event)=> {
        const elInput = event.target as HTMLInputElement
        const value = elInput.getAttribute("data-value")
        if (!value) return

        if (elInput.checked) selectedArray.push(value)
        else selectedArray.splice(selectedArray.indexOf(value), 1)

        if (selectedArray.length > 0) setExerciseCheckboxListState("filled")
        else setExerciseCheckboxListState("empty")

        console.log(selectedArray)
    }

    const confirmChoices = ()=> {
        console.log("HEY CONFIRM!!")
        props.callbackOnConfirm(selectedArray)
    }

    const getCheckboxesListTemplate = (options: string[])=> {
        return (
            options.map((item)=> {
                return (
                    <InputCheckbox
                        label={item}
                        callbackOnChange={updateSelectedItems}
                        isOnlyLabel={true}
                    />
                )
            })
        )

    }

    return (
        <div className={`${styles.container}`}>
            <div className={`${stylesExercise.container} ${styles.containeList}`}>
                <div className={stylesExercise.statement}>{props.statement}</div>
                    {
                        props.items.map((groupOptions)=> {
                            return (
                                <Fragment>
                                    {groupOptions.title ? <div className={styles.titleGroup}>{groupOptions.title}</div> : <></>}
                                    <div className={styles.exerciseCheckboxList}>
                                        {getCheckboxesListTemplate(groupOptions.options)}
                                    </div>
                                </Fragment>
                            )
                        })
                    }

            </div>
            <ExerciseFeedback
                exerciseState={exerciseCheckboxListState}
                btnText={"string"}
                callBackBtn={confirmChoices}
            />
        </div>
    )
}