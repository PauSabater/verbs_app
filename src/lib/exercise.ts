export async function getExercise(path: string) {

    let exerciseData

    await import(`../../public/data/exercises/${path}`).then((result) => {
        exerciseData = result
    })

    return exerciseData
}