import { Fragment } from "react"
import styles from '../page.module.scss'
import { getLessonsData } from "@/lib/getApiData"
import LessonsPage from "./LessonsPage"


export default async function Page() {

    const lessonsProps = await getLessonsData(['präsens', 'präteritum', 'perfekt', 'plusquamperfekt', 'futur-I'])


    return (
        <Fragment>
            <LessonsPage lessonsProps={lessonsProps}></LessonsPage>
        </Fragment>
    )
}