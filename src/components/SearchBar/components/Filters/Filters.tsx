import styles from './filters.module.scss'
import { SVGFilter, SVGSearch } from '@/assets/svg/svgExports'

interface IFilters {
    isOpen: boolean
}

export default function Filters(props: IFilters) {
    return (
        <div className={`${styles.container} ${props.isOpen ? styles.isOpen : ''}`}>
            <p>hey</p>
        </div>
    )
}
