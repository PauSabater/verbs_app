'use client'

import { ChangeEvent, FormEvent, useRef, useState } from 'react'
import styles from './tensesSelector.module.scss'
// import { useEffect, useLayoutEffect, useRef, useState } from 'react'
// import Link from 'next/link'
// import { SVGLink } from '@/assets/svg/svgExports'
import { getModeTenses } from '@/utils/utils'


export default function TensesSelector({mode}: {mode:string}) {

    const refForm = useRef<HTMLFormElement>(null)
    const modeTenses: string[] = getModeTenses(mode)
    let stateTenses: any = {}

    modeTenses.forEach((tense)=> {stateTenses[tense] = false})
    const [tensesState, setTensesState] = useState(stateTenses)



    const onFormSubmit = (e: FormEvent<HTMLFormElement>)=> {
        e.preventDefault()

        if (!refForm.current) return

        const formData = new FormData(refForm.current)

        for(const data of formData) {
            console.log(data)
        }

        console.log(formData)
    }

    const onInputChange = (e: ChangeEvent<HTMLInputElement>)=> {

        const clickedTense = e.target.value

        setTensesState(
            {
                ...tensesState,
                [e.target.value]: e.target.checked
            }
        )
    }

    return (
        <div className={styles.inputsContainer}>
            <p>{`Select the tenses to practise from the mode ${mode} of ${'sein'}`}</p>
            <form ref={refForm} onSubmit={(e) => onFormSubmit(e)}>
                {
                    modeTenses?.map((tense)=> {
                        return (
                            <div className={styles.inputContainer}>
                                <input
                                    className={styles.input}
                                    type='checkbox'
                                    id={tense}
                                    name={tense}
                                    value={tense}
                                    onChange={(e)=> onInputChange(e)}
                                />
                                <label className={styles.label} htmlFor={tense}>{tense}</label>
                            </div>
                        )
                    })
                }
                <input type='submit' name='submit' value='submit'/>
            </form>
            <ul className={`${styles.list}`}>
            </ul>
        </div>
    )
}
