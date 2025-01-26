import ExerciseText from '@/components/ExerciseText/ExerciseText'
import { getVerbsProperties } from '@/lib/getApiData'
import { ExercisePage } from './ExercisePage'
import { headers } from 'next/headers'
import fs from 'fs'
import path from 'path'

export function getFileNames() {
  const dir = path.join(process.cwd(), 'public/data/exercises/');
  return fs.readdirSync(dir).map(file => file.replace('.json', ''));
}

export default async function Page({ params }: { params: { slug: string } }) {

    console.log("HELLO SLUG IS", params.slug)

    const filePath = path.join(process.cwd(), `public/data/exercises/${params.slug}.json`)
    console.log("file path is", filePath)
    const fileContent = fs.readFileSync(filePath, 'utf-8')
    const dataExercise = JSON.parse(fileContent)

    console.log("exercise DATA IS", dataExercise)

    const dataVerbsInText = await getVerbsProperties(
        dataExercise.verbsUsed as string[]
    )
    const exerciseData = dataExercise



    // /Users/pausabatervilar/projects/verbs_app/verbs_app/public/data/exercises/konjunctive-II-futur-I-die-knoblauchsuppe.json
    // /Users/pausabatervilar/projects/verbs_app/verbs_app/public/data/exercises/kojunktiv-II-futur-I-die-knoblauchsuppe.json

    return (
        <>
            <ExercisePage
                host={headers().get('host') || ''}
                dataVerbsInText={dataVerbsInText}
                dataExercise={exerciseData}
            ></ExercisePage>
        </>
    )
}

export async function generateStaticParams() {

    const fileNames = getFileNames()
    console.log("heloooo names are")
    console.log(fileNames)
    return fileNames.map(slug => ({ slug }))
}