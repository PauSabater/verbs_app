'use client'

import styles from './searchBar.module.scss'
import InputSearchBar from './components/InputSearchBar/InputSearchBar'
import Filters from './components/Filters/Filters'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { SVGLink } from '@/assets/svg/svgExports'

interface ISearchBar {

}

export default function SearchBar(props: ISearchBar) {

    const [isFiltersOpen, setIsFilterOpen] = useState(false)
    const [searchResults, setSearchResults] = useState<any[]>([])
    const [isEventAdded, setIsEventAdded] = useState(false)
    const [isListOpen, setIsListOpen] = useState(false)

    const refContainer = useRef(null)

    useEffect(() => {
        if (searchResults && searchResults.length > 0) {
            setIsListOpen(true)

            if (isEventAdded === false) {
                setIsEventAdded(true)
                document.addEventListener('click', outsideListListener)
            }
        }
    }, [searchResults])

    const outsideListListener = (e: Event)=> {
        console.log(e.target)
        if (refContainer.current && (refContainer.current as HTMLElement).contains(e.target as Node)) {
            // Case we click a link close the list
            if ((e.target as HTMLElement).nodeName === 'A') {
                setIsListOpen(false)
            }
        } else {
            setIsListOpen(false)
        }
    }

    const openList = ()=> {
        setIsListOpen(true)
    }

    const updateResults = (results: any)=> {
        setSearchResults(results.verbs)
    }


    return (
        <div className={styles.container} ref={refContainer}>
            <InputSearchBar callbackOnInputClick={openList} onUpdateResults={updateResults} />
            <ul className={`${styles.list} ${searchResults && searchResults.length > 0 && isListOpen ? styles.isOpen : ''}`}>
                {searchResults && searchResults.length > 0
                    ? searchResults.map((verb: any, i) => {
                          return (
                              <li className={styles.item} key={`link-${i}`}>
                                  <Link href={`/verbs/${verb.verb}`}>{verb.verb}</Link>
                                  <SVGLink />
                              </li>
                          )
                      })
                    : ''}
            </ul>
        </div>
    )
}
