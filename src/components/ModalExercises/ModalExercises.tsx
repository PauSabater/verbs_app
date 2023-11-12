import { sanitize } from "isomorphic-dompurify"

export function ModalExercises({text}: {text: string}) {
    return (
        <div dangerouslySetInnerHTML={{__html: sanitize(text)}}>
            {/* <p>{text}</p> */}
        </div>
    )
}