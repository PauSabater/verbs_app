import Image from 'next/image'
import styles from './VerbTable.module.scss'
import { Fragment } from 'react'
import { sanitize } from 'isomorphic-dompurify'
import { SVGDoc, SVGExercise } from '@/assets/svg/svgExports'
import HoverWithInfo from '../HoverWithInfo/HoverWithInfo'

interface IVerbTable {
        tense: string,
        conjugations: {
                person: string,
                conjugation: string,
                conjugationHTML: string
        }[]
}

export default function VerbTable({data}: {data: IVerbTable | undefined}) {

    const dispatchModalOpen = (tenses: string)=> {
        console.log("DISPATCH MODEEEE")
        //First, we initialize our event
        const event = new CustomEvent('openModalExercise', {
            detail: {
                tenses: tenses
            },
            bubbles: false
        })

        // Next, we dispatch the event.
        document.dispatchEvent(event);
    }

    return data === undefined ? null : (
        <div className={styles.container}>
            <table>
                <thead>
                    <tr>
                        <th colSpan={3} className={styles.tenseTitle}>
                            <div onClick={()=> dispatchModalOpen(data.tense)}>
                                <HoverWithInfo text={`practise ${data.tense} tense`}>
                                    {data.tense}
                                    <SVGExercise></SVGExercise>
                                </HoverWithInfo>
                            </div>
                            <HoverWithInfo text={`lesson for ${data.tense} tense`}>
                                <SVGDoc></SVGDoc>
                            </HoverWithInfo>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.conjugations.map((row, i) => {
                            return (
                                <tr key={`row-${row.person}`}>
                                    <td>{row.person}</td>
                                    <td dangerouslySetInnerHTML={{__html: sanitize(row.conjugationHTML)}}></td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

{/* <table>
<thead>
  <tr>
    <th>Company</th>
    <th>Contact</th>
    <th>Country</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>Alfreds Futterkiste</td>
    <td>Maria Anders</td>
    <td>Germany</td>
  </tr>
  <tr>
    <td>Centro comercial Moctezuma</td>
    <td>Francisco Chang</td>
    <td>Mexico</td>
  </tr>
</tbody>
</table> */}