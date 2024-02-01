import styles from './loaderSpin.module.scss'


interface ILoaderSpin {
    isLoading: boolean
}


export default function LoaderSpin(props: ILoaderSpin) {
    return (
        <div className={styles.loader}></div>
    )
}
