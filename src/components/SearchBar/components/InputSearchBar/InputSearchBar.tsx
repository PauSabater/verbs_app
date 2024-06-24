import { ChangeEvent, useEffect, useLayoutEffect, useRef, useState } from 'react'
import styles from './inputSearchBar.module.scss'
import { SVGCross, SVGFilter, SVGSearch } from '@/assets/svg/svgExports'

interface IInputSearchBar {
    callbackOnFilterClick?: Function
    callbackOnInputClick?: Function
    onUpdateResults: Function
    numDisplayedResults: number
    placeholder: string
}

export default function InputSearchBar(props: IInputSearchBar) {

    const [urlFetchData, setUrlFetchData] = useState<string>('')
    const [showIconRestartInput, setShowIconRestartInput] = useState<boolean>(false)
    const refInput = useRef<HTMLInputElement | null>(null)

    useLayoutEffect(()=> {
        setUrlFetchData(window.location.href.includes('localhost') ? 'http://localhost:9090/api/verbs/get/search/' : '?')
    },[])

    useEffect(()=> {
        if (props.numDisplayedResults === 0) {
            restartInput()
        }
    }, [props.numDisplayedResults])

    const onInputChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const verb = e.target.value
        setShowIconRestartInput(verb !== '')

        const response = await fetch(`${urlFetchData}${e.target.value || ''}`)
        const verbsResp = await response.json()
        props.onUpdateResults(verbsResp)
    }

    const restartInput = ()=> {

        if (refInput.current) {
            refInput.current.value = ''
            props.onUpdateResults('')
            setShowIconRestartInput(false)
        }
    }

    return (
        <div className={styles.container}>
            <SVGSearch />
            <input
                ref={refInput}
                className={styles.input}
                placeholder={props.placeholder || 'Search verb'}
                onChange={(e) => onInputChange(e)}
                onClick={() => props.callbackOnInputClick ? props.callbackOnInputClick() : ''}
            ></input>

            {
                showIconRestartInput
                    ?
                        <div className={styles.crossContainer} onClick={restartInput}>
                            <SVGCross />
                        </div>
                    : <></>
            }
            {/* <div className={styles.filterIconContainer} onClick={() => props.callbackOnFilterClick()}>
                <SVGFilter />
            </div> */}

        </div>
    )
}