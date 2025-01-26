
export default function ButtonExercise({
    text, callbackOnClick}:
    {text: string, callbackOnClick: Function}
) {


    return (
        <button
            onClick={()=> callbackOnClick()}
        >
            {text}
        </button>
    )
}
