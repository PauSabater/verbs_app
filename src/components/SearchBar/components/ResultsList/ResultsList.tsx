import { ChangeEvent } from 'react'
import styles from './resultsList.module.scss'
import { SVGFilter, SVGSearch } from '@/assets/svg/svgExports'

interface IInputSearchBar {
    callbackOnFilterClick: Function
}

export default function ResultsList(props: IInputSearchBar) {
    const currentDomain = window.location.href
    const urlFetchData = currentDomain.includes('localhost') ? 'http://localhost:9090/verbs/get/search/' : '?'

    const onInputChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const verb = e.target.value
        const response = await fetch(`${urlFetchData}${e.target.value || ''}`)
        const verbsResp = await response.json()
        console.log(verbsResp)
    }

    return (
        <div className={styles.container}>
            <SVGSearch />
            <input className={styles.input} placeholder={'Search verb'} onChange={(e) => onInputChange(e)}></input>
            <div className={styles.filterIconContainer} onClick={() => props.callbackOnFilterClick()}>
                <SVGFilter />
            </div>
        </div>
    )
}
