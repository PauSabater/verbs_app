import { Fragment } from "react"
import styles from '../page.module.scss'
import { getLessonsData } from "@/lib/getApiData"
import ExercisesPage from "./ExercisesPage"


export default async function Page() {

    return (
        <Fragment>
            <ExercisesPage ></ExercisesPage>
        </Fragment>
    )
}