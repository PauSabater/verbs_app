import { ChangeEvent, useLayoutEffect, useState } from 'react'
import styles from './inputSearchBar.module.scss'
import { SVGFilter, SVGSearch } from '@/assets/svg/svgExports'

interface IInputSearchBar {
    callbackOnFilterClick?: Function
    callbackOnInputClick?: Function
    onUpdateResults: Function
}

export default function InputSearchBar(props: IInputSearchBar) {

    const [urlFetchData, setUrlFetchData] = useState<string>('')

    useLayoutEffect(()=> {
        setUrlFetchData(window.location.href.includes('localhost') ? 'http://localhost:9090/api/verbs/get/search/' : '?')
    },[])

    const onInputChange = async (e: ChangeEvent<HTMLInputElement>) => {

        const verb = e.target.value
        const response = await fetch(`${urlFetchData}${e.target.value || ''}`)
        const verbsResp = await response.json()
        console.log(verbsResp)
        props.onUpdateResults(verbsResp)
    }

    return (
        <div className={styles.container}>
            <SVGSearch />
            <input
                className={styles.input}
                placeholder={'Search verb'}
                onChange={(e) => onInputChange(e)}
                onClick={() => props.callbackOnInputClick ? props.callbackOnInputClick() : ''}
            ></input>
            {/* <div className={styles.filterIconContainer} onClick={() => props.callbackOnFilterClick()}>
                <SVGFilter />
            </div> */}
        </div>
    )
}