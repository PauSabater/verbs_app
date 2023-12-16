import { isError, isSuccess } from "@/utils/constants";
import { ReactNode } from "react";

export function SVGExercise({color}: {color?: string}) { return (
    <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M11.4 19.9L9.99998 18.5L13.55 14.95L5.04998 6.44998L1.49998 9.99998L0.0999756 8.59998L1.49998 7.14998L0.0999756 5.74998L2.19998 3.64998L0.799976 2.19998L2.19998 0.799976L3.64998 2.19998L5.74998 0.0999756L7.14998 1.49998L8.59998 0.0999756L9.99998 1.49998L6.44998 5.04998L14.95 13.55L18.5 9.99998L19.9 11.4L18.5 12.85L19.9 14.25L17.8 16.35L19.2 17.8L17.8 19.2L16.35 17.8L14.25 19.9L12.85 18.5L11.4 19.9Z"
            fill={color || "currentColor"}
        />
    </svg>
)}

export function SVGRepeat({color}: {color?: string}) { return (
    <svg viewBox="0 0 26 31" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M13.25 7.24999C15.4256 7.24999 17.5523 7.89513 19.3613 9.10383C21.1702 10.3125 22.5801 12.0305 23.4127 14.0405C24.2452 16.0505 24.4631 18.2622 24.0386 20.396C23.6142 22.5298 22.5666 24.4898 21.0282 26.0282C19.4898 27.5665 17.5298 28.6142 15.396 29.0386C13.2622 29.4631 11.0505 29.2452 9.04048 28.4127C7.03049 27.5801 5.31253 26.1702 4.10383 24.3613C2.89514 22.5523 2.25 20.4256 2.25 18.25"
            stroke={color || "currentColor"} stroke-width="3.5" stroke-linecap="round"/>
        <path d="M16 12L12 7.5L16 3" stroke={color || "currentColor"} stroke-width="3" stroke-linecap="square"/>
    </svg>
)}

export function SVGNext({color}: {color?: string}) { return (
    <svg viewBox="0 0 55 52" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M52 26L53.477 28.0171C54.12 27.5462 54.5 26.797 54.5 26C54.5 25.203 54.12 24.4538 53.477 23.9829L52 26ZM21.25 48.5167H18.75C18.75 49.4584 19.2793 50.3203 20.1192 50.7463C20.9591 51.1723 21.9671 51.0901 22.727 50.5337L21.25 48.5167ZM21.25 3.48334L22.727 1.46628C21.9671 0.909889 20.9591 0.82772 20.1192 1.25371C19.2793 1.6797 18.75 2.54157 18.75 3.48334L21.25 3.48334ZM21.25 14V16.5C22.6307 16.5 23.75 15.3807 23.75 14H21.25ZM3 14V11.5C1.61929 11.5 0.5 12.6193 0.5 14H3ZM3 37H0.5C0.5 38.3807 1.61929 39.5 3 39.5L3 37ZM21.25 37H23.75C23.75 35.6193 22.6307 34.5 21.25 34.5V37ZM50.523 23.9829L19.773 46.4996L22.727 50.5337L53.477 28.0171L50.523 23.9829ZM19.773 5.50039L50.523 28.0171L53.477 23.9829L22.727 1.46628L19.773 5.50039ZM23.75 14V3.48334H18.75V14H23.75ZM3 16.5H21.25V11.5H3V16.5ZM5.5 37V14H0.5V37H5.5ZM21.25 34.5H3V39.5H21.25V34.5ZM23.75 48.5167V37H18.75V48.5167H23.75Z"
        fill={color || "currentColor"} />
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
        <path fillRule="evenodd" clipRule="evenodd" d="M26.5 53C41.1355 53 53 41.1356 53 26.5C53 11.8644 41.1355 0 26.5 0C11.8645 0 0 11.8644 0 26.5C0 41.1356 11.8645 53 26.5 53ZM41.9749 20.4749C43.3417 19.108 43.3417 16.892 41.9749 15.5251C40.608 14.1583 38.392 14.1583 37.0251 15.5251L22 30.5502L16.4749 25.0251C15.108 23.6583 12.892 23.6583 11.5251 25.0251C10.1583 26.392 10.1583 28.608 11.5251 29.9749L19.5251 37.9749L22 40.4498L24.4749 37.9749L41.9749 20.4749Z"
        fill={color || "currentColor"}/>
    </svg>
)}

export function SVGIncorrect({color}: {color?: string}) { return(
    <svg viewBox="0 0 53 53" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M53 26.5C53 41.1356 41.1355 53 26.5 53C11.8645 53 0 41.1356 0 26.5C0 11.8644 11.8645 0 26.5 0C41.1355 0 53 11.8644 53 26.5ZM39.5375 15.0894C40.8689 16.4908 40.812 18.7062 39.4106 20.0375L31.9481 27.1269L39.0375 34.5894C40.3689 35.9908 40.312 38.2062 38.9106 39.5375C37.5092 40.8688 35.2938 40.8121 33.9625 39.4106L26.8732 31.9481L19.4106 39.0375C18.0092 40.3688 15.7938 40.3121 14.4625 38.9106C13.1311 37.5092 13.188 35.2938 14.5894 33.9625L22.0519 26.8731L14.9625 19.4106C13.6311 18.0092 13.688 15.7939 15.0894 14.4625C16.4908 13.1312 18.7062 13.1879 20.0375 14.5894L27.1268 22.0519L34.5894 14.9625C35.9908 13.6312 38.2062 13.6879 39.5375 15.0894Z"
        fill={color || "currentColor"}/>
    </svg>
)}

export function SVGInformation({color}: {color?: string}) { return(
    <svg width="23" height="22" viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10.6605 15V8.45455H12.7443V15H10.6605ZM11.7045 7.69176C11.4119 7.69176 11.1605 7.59517 10.9503 7.40199C10.7401 7.20597 10.6349 6.97017 10.6349 6.6946C10.6349 6.42187 10.7401 6.18892 10.9503 5.99574C11.1605 5.79972 11.4119 5.7017 11.7045 5.7017C12 5.7017 12.2514 5.79972 12.4588 5.99574C12.669 6.18892 12.7741 6.42187 12.7741 6.6946C12.7741 6.97017 12.669 7.20597 12.4588 7.40199C12.2514 7.59517 12 7.69176 11.7045 7.69176Z" fill={color || "currentColor"}/>
        <circle cx="11.5" cy="11" r="10" stroke={color || "currentColor"} stroke-width="2"/>
    </svg>
)}

export const getFeedbackSvg = (state: string)=> {
    if(isSuccess(state)) return (<SVGCorrect></SVGCorrect>)
    if(isError(state)) return (<SVGIncorrect></SVGIncorrect>)
    return null
}

export const SVGArrow = ({color = "currentColor", strokeWidth = 6}: {color?: string, strokeWidth?: number})=> <svg data-svg-arrow viewBox="0 0 52 34" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 5.5L26 26.5L47 5.5" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round"/>
</svg>








