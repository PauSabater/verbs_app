import { sanitize } from "isomorphic-dompurify";

export function VerbDescription({text}: {text: string}) {
    return (
        <div dangerouslySetInnerHTML={{__html: sanitize(text)}}>
            {/* <p>{text}</p> */}
        </div>
    )
}