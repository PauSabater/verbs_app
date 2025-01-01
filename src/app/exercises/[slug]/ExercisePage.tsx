'use client'

import { createContext, useLayoutEffect, useState } from 'react'
import { IVerbProperties } from '@/assets/interfaces/interfaces'
import ExerciseText from '@/components/ExerciseText/ExerciseText'
import { getUtteraceInstance } from '@/utils/utils'

interface IExercisePage {
    host: string
    dataVerbsInText: {
        verb: string
        properties: IVerbProperties
    }[],
    dataExercise: any
}

interface IExercisePageContext {
    utterance: SpeechSynthesisUtterance | null;
    url: string
    dataVerbsInText: {
        verb: string
        properties: IVerbProperties
    }[],
    callbackOnExerciseOpen: (verb: string) => void;
}

export const ExercisePageContext = createContext<IExercisePageContext>({} as IExercisePageContext)

export function ExercisePage({
    host,
    dataVerbsInText,
    dataExercise
}: IExercisePage) {

    const [utterance, setUtterance] = useState<SpeechSynthesisUtterance | null>(null)

    useLayoutEffect(() => {
        getUtteraceInstance().then((utterance) => {
            setUtterance(utterance)
        })
    }, [])

    const addNewVerb = (verb: string) => {
        console.log("hey verb!!", verb)

    }




    return (
        <>
        <ExercisePageContext.Provider
            value={{
                url: host,
                dataVerbsInText: dataVerbsInText,
                utterance: utterance,
                callbackOnExerciseOpen: addNewVerb
            }}

        >
            <ExerciseText
                {...dataExercise}
            ></ExerciseText>

        </ExercisePageContext.Provider></>
    )
}
