import ExerciseText from '@/components/ExerciseText/ExerciseText'
import exercisesData from '../../../../public/data/exercises/exercises.json'
import { getVerbsProperties } from '@/lib/getApiData'
import { ExercisePage } from './ExercisePage'
import { headers } from 'next/headers'
import fs from 'fs'
import path from 'path'

export function getFileNames() {
  const dir = path.join(process.cwd(), 'public/data/exercises/kojunktiv-II-futur-I');
  return fs.readdirSync(dir).map(file => file.replace('.json', ''));
}

export default async function Page({ params }: { params: { slug: string } }) {

    console.log("HELLO SLUG IS", params.slug)

    const dataVerbsInText = await getVerbsProperties(
        (exercisesData as any).exercises.find((exercise: any) => exercise.path === params.slug).verbsUsed as string[]
    )

    const exerciseData = exercisesData.exercises.filter((exercise)=>
        exercise.path === params.slug
    )[0]

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