'use client'

import { Fragment, MouseEventHandler, ReactNode, useState } from 'react'
import styles from './exerciseCheckboxList.module.scss'
import stylesExercise from '../ExerciseConjugation/exerciseConjugation.module.scss'
import { useRef } from 'react'
import { Button } from '../Button/Button'
import { ISelectorDropdownOptions } from '../Selector/Selector'
import InputCheckbox from '../UI/InputCheckbox/InputCheckbox'

interface IExerciseCheckboxList {
    items: ISelectorDropdownOptions[]
    callbackOnChange?: Function
}

export function ExerciseCheckboxList(props: IExerciseCheckboxList): JSX.Element {

    const [selectedItems, setSelectedItems] = useState<string[]>([])

    const updateSelectedItems = ()=> {
        console.log("HEY UPDATE!!")

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
        <div className={stylesExercise.container}>
            {
                props.items.map((groupOptions)=> {
                    return (
                        <Fragment>
                            {groupOptions.title ? <div className={styles.titleGroup}>{groupOptions.title}</div> : <></>}
                            <div className={styles.ExerciseCheckboxList}>
                                {getCheckboxesListTemplate(groupOptions.options)}
                            </div>
                        </Fragment>
                    )
                })
            }

        </div>
    )
}