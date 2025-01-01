import ExerciseText from '@/components/ExerciseText/ExerciseText'
import exercisesData from '../../../../public/data/exercises/exercises.json'
import { getVerbsProperties } from '@/lib/getApiData'
import { ExercisePage } from './ExercisePage'


export default async function Page({ params }: { params: { slug: string } }) {

    const dataVerbsInText = await getVerbsProperties(
        (exercisesData as any).exercises.find((exercise: any) => exercise.path === params.slug).verbsUsed as string[]
    )

    const exerciseData = exercisesData.exercises.filter((exercise)=>
        exercise.path === params.slug
    )[0]

    return (
        <>
            <br></br><br></br><br></br><br></br>
            <ExercisePage
                host={''}
                dataVerbsInText={dataVerbsInText}
                dataExercise={exerciseData}
            ></ExercisePage>
        </>
    )
}

export async function generateStaticParams() {

    const exercisePaths = exercisesData.exercises.map((exercise)=> {
        exercise.path
    })

    return exercisePaths.map((path) => ({
        slug: path
    }))
}