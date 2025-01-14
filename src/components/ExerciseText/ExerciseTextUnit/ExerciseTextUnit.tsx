import { TextReplaced } from "@/components/Lesson/Components/TextReplaced/TextRepaced"
import styles from './exerciseTextUnit.module.scss'
import React, { createContext, useContext, useEffect, useReducer, useRef, useState } from "react"
import { AudioIcon } from "@/components/AudioIcon/AudioIcon";
import { SVGAudio } from "@/assets/svg/svgExports";
import SpecialCharacters from "@/components/ExerciseConjugation/Components/SpecialCharacters/SpecialCharacters";
import { Button } from "@/components/Button/Button";
import { ExercisePageContext } from "@/app/exercises/[slug]/ExercisePage";
import { ButtonClose } from "@/components/ButtonClose/ButtonClose";
import { useSpeechRecognition } from "@/hooks/useSpeechRecognition";

interface IExerciseUnitContext {
    validationTrigger: number;
    // callbackOnAddedInput: (answer: string) => void;
    callBackOnCorrectInput: () => void;
    callBackOnInputFocus: (e: React.FocusEvent<HTMLInputElement>) => void;
}

const reducerInitialState = {
    numCorrectInputs: 0,
    isUnitCompleted: false
}

const reducer = (state: any, action: any) => {
    switch (action.type) {
        case 'increment':
            return {...state, numCorrectInputs: state.numCorrectInputs + 1 }
        case 'reset':
            return {...state, numCorrectInputs: 0 }
        case 'setIsUnitCompleted':
            return { ...state, isUnitCompleted: action.payload }
        case 'setNumInputs':
            return { ...state, numInputs: action.payload }
        case 'setTriggerValidation':
            return { ...state, triggerValidation: action.payload }
        default:
            return state;
    }
};

export const ExerciseTextUnitContext = createContext<IExerciseUnitContext>({} as IExerciseUnitContext)

export const ExerciseTextUnit = ({sentence, order}: {
    sentence: {
        audioPath: string
        imgPath: string
        audio: string
        text: string
        translations: {en: string, es: string, fr: string}
        onlyText?: boolean
    }, order: number
}) => { 

    const [state, dispatch] = useReducer(reducer, reducerInitialState);

    const incrementCorrectInputs = () => dispatch({ type: 'increment' })
    const resetCorrectInputs = () => dispatch({ type: 'reset' })
    const setIsUnitCompleted = (isComplete: boolean) => dispatch({ type: 'setIsUnitCompleted', payload: isComplete })
    const setNumInputs = (num: number) => dispatch({ type: 'setNumInputs', payload: num })
    const setTriggerValidation = (num: number) => dispatch({ type: 'setTriggerValidation', payload: num })
    const callBackOnCorrectInput = () => incrementCorrectInputs()

    const [hasBeenFocused, setHasBeenFocused] = useState<boolean>(false)
    const [audioState, setAudioState] = useState<"stopped" | "loading" | "playing">("stopped")
    const [displayTranslation, setDisplayTranslation] = useState<boolean>(false)
    const [lastInputFocused, setLastInputFocused] = useState<string>('')

    const refAudio = useRef<HTMLAudioElement | null>(null)
    const refTranslation = useRef<HTMLDivElement | null>(null)
    const refContainer = useRef<HTMLDivElement | null>(null)

    useEffect(()=> {
        const inputs = refContainer.current?.querySelectorAll(".input-exercise-text")
        setNumInputs(inputs?.length || 0)

        inputs?.forEach((input, i)=> {
            input.setAttribute('data-order', i.toString())
        })
    }, [])


    useEffect(()=> {
        if (displayTranslation) window.addEventListener('click', (e)=> handleClickOutsideTranslation)
        else window.removeEventListener('click', (e)=> handleClickOutsideTranslation)
    }, [displayTranslation])

    // Detect when corrected inputs are equal to the total number of inputs
    useEffect(()=> {
        if (state.numCorrectInputs === state.numInputs) {
            if (state.numCorrectInputs > 0) setIsUnitCompleted(true)
        } else {
            setIsUnitCompleted(false)
        }
    }, [state.numCorrectInputs])


    const handleClickOutsideTranslation = (e: MouseEvent)=> {
        if (refTranslation.current && !refTranslation.current.contains(e.target as Node)) {
            setDisplayTranslation(false)
        }
    }

    // const onAddedInput = (answer: string) => {
    //     console.log("LETS ADD INPUT", answer)
    //     setNumInputs(numInputs + 1)
    // }


    const onSpecialCharacterClick = (char: string) => {
        console.log("char is", char)

        const inputLastFocused: HTMLInputElement = refContainer.current?.querySelector(`input[data-order="${lastInputFocused}"]`) as HTMLInputElement

        if (inputLastFocused) {
            inputLastFocused.value += char
            inputLastFocused.focus()
        }
    }

    const onButtonClick = () => {

    }

    const displayHelp = () => {

    }

    const playAudio = () => {
        if (!refAudio.current) {
                refAudio.current = new Audio(window.location.protocol + '/audio/exercises/' + sentence.audioPath);
                refAudio.current.addEventListener('playing', () => {
                setAudioState("playing")
            })
            refAudio.current.addEventListener('waiting', () => setAudioState("loading"))
            refAudio.current.addEventListener('pause', () => setAudioState("stopped"))
            refAudio.current.addEventListener('ended', () => setAudioState("stopped"))
            refAudio.current.play()
        }

        if (refAudio.current && audioState !== "playing") {
            refAudio.current.play()
        }

        if (refAudio.current && audioState === "playing") {
            refAudio.current.pause()
        }

    }

    const closeTranslation = () => {
        setDisplayTranslation(false)
    }


    const onCorrectButtonClick = () => {
        if (!state.isUnitCompleted) {
            setTriggerValidation(state.triggerValidation + 1)
            // setNumCorrectInputs(numCorrectInputs + 1)
        } else {
            setIsUnitCompleted(false)
            resetCorrectInputs()
            setTriggerValidation(0)
        }
    }


    const Translation = () => {
        return (
            <div
                ref={refTranslation}
                className={styles.translationsContainer}
                data-display={displayTranslation}
            >
                <p className={styles.translation}>
                    {sentence.translations.en}
                </p>
                {
                    <ButtonClose closeAction={()=> closeTranslation()}></ButtonClose>
                }

            </div>
        )
    }

    const onInputFocus = (e: React.FocusEvent<HTMLInputElement>) => {
        setHasBeenFocused(true)
        setLastInputFocused(e.target.dataset.order || '')
    }

    return (
        <ExerciseTextUnitContext.Provider
            value={{
                validationTrigger: state.triggerValidation,
                // callbackOnAddedInput: onAddedInput,
                callBackOnInputFocus: (e) => onInputFocus(e),
                callBackOnCorrectInput
            }}
        >

        <template data-debug>
            data-corrected-inputs="{state.numCorrectInputs}"
            data-isUnitCompleted="{state.isUnitCompleted}"
            data-num-inputs="{state.numInputs}"
        </template>

        <div className={styles.container} key={'sentence'} ref={refContainer}>
            <div className={styles.characterContainer}>
                <img
                    className={styles.characterImage}
                    src={`/img/exercises/characters/${sentence.imgPath}`}
                    alt="audio"
                    width="100"
                    height="100"
                />
                <img
                    className={styles.audioIcon}
                    src={"/img/icons/wave.svg"}
                    alt="audio"
                    width="80"
                    height="80"
                    data-display={audioState === "playing"}
                />
            </div>
            <div className={styles.sentenceContainer}>
                <Translation />
                <p className={styles.sentence}>
                    <TextReplaced text={sentence.text}></TextReplaced>
                </p>
            </div>
            <div className={styles.playButtonContainer}>
                <Button
                    title={"play"}
                    img={audioState === "stopped" ? "play" : audioState === "loading" ? "loading" : "pause"}
                    width="fitContent"
                    size={"square"}
                    text=""
                    color="greyReverse"
                    callback={playAudio}
                />
            </div>
            <div className={styles.keyboardContainer} data-visible={hasBeenFocused && !state.isUnitCompleted}>
                <div className={styles.buttonsHelpContainer}>
                    <Button
                        title={"show translation"}
                        img={"translate"}
                        width="fitContent"
                        size={"square"}
                        text=""
                        color="greyReverse"
                        callback={()=> setDisplayTranslation(!displayTranslation)}
                    ></Button>
                    {
                        !sentence.onlyText ?
                            <>
                                <Button title={"show help"} img={"help"} width="fitContent" size={"square"} text="" color="greyReverse" callback={displayHelp}></Button>
                                <Button title={"show answers"} img={"show"} width="fitContent" size={"square"} text="" color="greyReverse" callback={displayHelp}></Button>
                            </>
                        : <></>
                    }
                </div>
                {
                    !sentence.onlyText ?
                        <SpecialCharacters
                            callbackOnClick={onSpecialCharacterClick}
                            isActive={true}
                        />
                    : <></>
                }
            </div>
            {
                !sentence.onlyText ?
                    <Button
                        img={state.isUnitCompleted ? "repeat-white" : "pen-white"}
                        text={state.isUnitCompleted ? "REPEAT" : "CHECK"}
                        color="inactive"
                        callback={()=> onCorrectButtonClick()}
                        attribute={'button-correct'}
                    ></Button>
                    : <></>
            }
        </div>
        </ExerciseTextUnitContext.Provider>
    )
}