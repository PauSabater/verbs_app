import { isError, isSuccess } from "@/utils/constants";
import { ReactNode } from "react";

export function SVGExercise({color}: {color?: string}) { return (
    <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M11.4 19.9L9.99998 18.5L13.55 14.95L5.04998 6.44998L1.49998 9.99998L0.0999756 8.59998L1.49998 7.14998L0.0999756 5.74998L2.19998 3.64998L0.799976 2.19998L2.19998 0.799976L3.64998 2.19998L5.74998 0.0999756L7.14998 1.49998L8.59998 0.0999756L9.99998 1.49998L6.44998 5.04998L14.95 13.55L18.5 9.99998L19.9 11.4L18.5 12.85L19.9 14.25L17.8 16.35L19.2 17.8L17.8 19.2L16.35 17.8L14.25 19.9L12.85 18.5L11.4 19.9Z"
            fill={color || "currentColor"}
        />
    </svg>
)}

export function SVGDoc({color}: {color?: string}) { return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 14H14V12H10V14ZM10 11H18V9H10V11ZM10 8H18V6H10V8ZM8 18C7.45 18 6.97917 17.8042 6.5875 17.4125C6.19583 17.0208 6 16.55 6 16V4C6 3.45 6.19583 2.97917 6.5875 2.5875C6.97917 2.19583 7.45 2 8 2H20C20.55 2 21.0208 2.19583 21.4125 2.5875C21.8042 2.97917 22 3.45 22 4V16C22 16.55 21.8042 17.0208 21.4125 17.4125C21.0208 17.8042 20.55 18 20 18H8ZM8 16H20V4H8V16ZM4 22C3.45 22 2.97917 21.8042 2.5875 21.4125C2.19583 21.0208 2 20.55 2 20V6H4V20H18V22H4Z"
        fill={color || "currentColor"}
        />
    </svg>
)}

export function SVGCross({color}: {color?: string}) { return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1 13L12.5 1.5M12.5 13L1 1.5" stroke={color || "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
)}

export function SVGAudio({color}: {color?: string}) { return (
    <svg viewBox="0 0 182 358" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M17 108C30.9087 129.191 38.319 153.986 38.319 179.333C38.319 204.681 30.9087 229.476 17 250.667M64.3333 60.6667C89.6721 95.043 103.342 136.628 103.342 179.333C103.342 222.039 89.6721 263.624 64.3333 298M107.667 17.3333C144.566 63.2646 164.679 120.416 164.679 179.333C164.679 238.25 144.566 295.402 107.667 341.333"
        stroke={color || "currentColor"} strokeWidth="33.3333" strokeLinecap="round"/>
    </svg>
)}

export function SVGCorrect({color}: {color?: string}) { return(
    <svg viewBox="0 0 53 53" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M26.5 53C41.1355 53 53 41.1356 53 26.5C53 11.8644 41.1355 0 26.5 0C11.8645 0 0 11.8644 0 26.5C0 41.1356 11.8645 53 26.5 53ZM41.9749 20.4749C43.3417 19.108 43.3417 16.892 41.9749 15.5251C40.608 14.1583 38.392 14.1583 37.0251 15.5251L22 30.5502L16.4749 25.0251C15.108 23.6583 12.892 23.6583 11.5251 25.0251C10.1583 26.392 10.1583 28.608 11.5251 29.9749L19.5251 37.9749L22 40.4498L24.4749 37.9749L41.9749 20.4749Z"
        fill={color || "currentColor"}/>
    </svg>
)}

export function SVGIncorrect({color}: {color?: string}) { return(
    <svg viewBox="0 0 53 53" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M53 26.5C53 41.1356 41.1355 53 26.5 53C11.8645 53 0 41.1356 0 26.5C0 11.8644 11.8645 0 26.5 0C41.1355 0 53 11.8644 53 26.5ZM39.5375 15.0894C40.8689 16.4908 40.812 18.7062 39.4106 20.0375L31.9481 27.1269L39.0375 34.5894C40.3689 35.9908 40.312 38.2062 38.9106 39.5375C37.5092 40.8688 35.2938 40.8121 33.9625 39.4106L26.8732 31.9481L19.4106 39.0375C18.0092 40.3688 15.7938 40.3121 14.4625 38.9106C13.1311 37.5092 13.188 35.2938 14.5894 33.9625L22.0519 26.8731L14.9625 19.4106C13.6311 18.0092 13.688 15.7939 15.0894 14.4625C16.4908 13.1312 18.7062 13.1879 20.0375 14.5894L27.1268 22.0519L34.5894 14.9625C35.9908 13.6312 38.2062 13.6879 39.5375 15.0894Z"
        fill={color || "currentColor"}/>
    </svg>
)}

export const getFeedbackSvg = (state: string)=> {
    if(isSuccess(state)) return (<SVGCorrect></SVGCorrect>)
    if(isError(state)) return (<SVGIncorrect></SVGIncorrect>)
    return null
}







