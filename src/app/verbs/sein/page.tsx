// import { VerbLayout} from '../layout'
import { VerbDescription } from "@/components/VerbDescription/VerbDescription"
import VerbTable from "@/components/VerbTable/VerbTable"
import { CollapsibleTenses } from "@/components/CollapsibleTenses/CollapsibleTenses"
import Sein from "../../../dummyData/sein.json"
import styles from './verb.module.scss'
// import '../../../styles/variables.scss'
import texts from '../../../dummyData/texts.json'

export default function Page() {



    return (
        <div className={styles.pageContent}>
            <h1>Hello, Next.js!</h1>
            <div>
                <CollapsibleTenses texts={{title: texts.verbsPage.collapsibles[0].title}}>
                    {
                        texts.verbsPage.collapsibles[0].tenses.map((tableTense, i) => {
                            return (
                                <VerbTable key={tableTense} data={Sein.data.indicative.find((tense)=> tense.tense === tableTense)}></VerbTable>
                            )
                        })
                    }
                </CollapsibleTenses>

                <CollapsibleTenses texts={{title: texts.verbsPage.collapsibles[1].title}}>
                    {
                        texts.verbsPage.collapsibles[1].tenses.map((tableTense, i) => {
                            return (
                                <VerbTable key={tableTense} data={Sein.data.indicative.find((tense)=> tense.tense === tableTense)}></VerbTable>
                            )
                        })
                    }
                </CollapsibleTenses>
            </div>
        </div>
    )
}


// return (
//     <div className={styles.pageContent}>
//         <h1>Hello, Next.js!</h1>
//         <div>
//             { texts.verbsPage.collapsibles.map((collapsible, i) => {
//                 return (
//                     collapsible.tenses.map((tableTense, i) => {
//                         return (
//                             <VerbTable key={tableTense} data={Sein.data.indicative.find((tense)=> tense.tense === tableTense)}></VerbTable>
//                         )
//                     })
//                 )
//             })
//         }
//         </div>
//     </div>
// )