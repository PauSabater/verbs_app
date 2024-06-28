import { isError, isSuccess } from "@/utils/constants";
import { ReactNode } from "react";

export function SVGExercise({color}: {color?: string}) { return (
    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
        <path
            d="m539.846-94-45.999-46 142-142L282-635.847l-142 142-46-45.999 56.77-58-45.999-46 84-84-56-57.23 42.153-42.153 57.23 56 84-84 46 45.999 58-56.769L466.153-820l-142 142L678-324.153l142-142 45.999 45.999-56.769 58 45.999 46-84 84 56 57.23-42.153 42.153-57.23-56-84 84-46-45.999-58 56.77Z"
            fill={color || 'currentColor'}
        />
    </svg>
)}

export function SVGRestart({color}: {color?: string}) { return (
    <svg data-svg-restart viewBox="0 0 26 31" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M13.25 7.24999C15.4256 7.24999 17.5523 7.89513 19.3613 9.10383C21.1702 10.3125 22.5801 12.0305 23.4127 14.0405C24.2452 16.0505 24.4631 18.2622 24.0386 20.396C23.6142 22.5298 22.5666 24.4898 21.0282 26.0282C19.4898 27.5665 17.5298 28.6142 15.396 29.0386C13.2622 29.4631 11.0505 29.2452 9.04048 28.4127C7.03049 27.5801 5.31253 26.1702 4.10383 24.3613C2.89514 22.5523 2.25 20.4256 2.25 18.25"
            stroke={color || "currentColor"} strokeWidth="3.5" strokeLinecap="round"/>
        <path d="M16 12L12 7.5L16 3" stroke={color || "currentColor"} strokeWidth="3" strokeLinecap="square"/>
    </svg>
)}


export function SVGNextPrev({color}: {color?: string}) { return (
    <svg viewBox="0 0 39 66" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M35 3.5L5.5 33L35 62.5" stroke={color || "currentColor"} strokeWidth="3" strokeLinecap="round"/>
    </svg>
    )
}


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
    <svg data-svg-cross width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1 13L12.5 1.5M12.5 13L1 1.5" stroke={color || "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
)}

export function SVGAudio({color}: {color?: string}) { return (
    <svg data-svg-audio viewBox="0 0 182 358" fill="none" xmlns="http://www.w3.org/2000/svg">
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
        <circle cx="11.5" cy="11" r="10" stroke={color || "currentColor"} strokeWidth="2"/>
    </svg>
)}

export const getFeedbackSvg = (state: string)=> {
    if(isSuccess(state)) return (<SVGCorrect></SVGCorrect>)
    if(isError(state)) return (<SVGIncorrect></SVGIncorrect>)
    return null
}

export const SVGArrow = ({color = "currentColor", strokeWidth = 6}: {color?: string, strokeWidth?: number})=> <svg data-svg-arrow viewBox="0 0 52 34" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 5.5L26 26.5L47 5.5" stroke={color || "currentColor"} strokeWidth={strokeWidth} strokeLinecap="round"/>
</svg>

export const SVGArrowNext = ({color = "currentColor", strokeWidth = 6}: {color?: string, strokeWidth?: number})=> <svg width="63" height="52" viewBox="0 0 63 52" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M2 13.4545H29.1609C29.7132 13.4545 30.1609 13.0068 30.1609 12.4545V2.11227C30.1609 1.2683 31.1419 0.803862 31.7947 1.33878L62.0226 26.1082C62.5216 26.5171 62.5086 27.2846 61.9959 27.6763L31.768 50.7721C31.1099 51.2749 30.1609 50.8056 30.1609 49.9775V39.5455C30.1609 38.9932 29.7132 38.5455 29.1609 38.5455H2C1.44772 38.5455 1 38.0977 1 37.5455V14.4545C1 13.9023 1.44772 13.4545 2 13.4545Z" fill="none" stroke={color || "currentColor"} stroke-dasharray="2 2"/>
</svg>


export const SVGTailedArrow = () => {return (
    <svg viewBox="0 0 47 51" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 14.4545H19.0465C20.1511 14.4545 21.0465 13.5591 21.0465 12.4545V5.95461C21.0465 4.15532 23.237 3.2711 24.4861 4.56618L45.6132 26.4712C46.3794 27.2656 46.3573 28.5305 45.5638 29.2976L24.4366 49.7226C23.1673 50.9497 21.0465 50.0502 21.0465 48.2846V41.5455C21.0465 40.4409 20.1511 39.5455 19.0465 39.5455H3C1.89543 39.5455 1 38.65 1 37.5455V16.4545C1 15.35 1.89543 14.4545 3 14.4545Z" fill="#39088F"/>
        <path d="M3 11.4545H18.5465C19.6511 11.4545 20.5465 10.5591 20.5465 9.45455V2.95461C20.5465 1.15532 22.737 0.271104 23.9861 1.56618L45.1132 23.4712C45.8794 24.2656 45.8573 25.5305 45.0638 26.2976L23.9366 46.7226C22.6673 47.9497 20.5465 47.0502 20.5465 45.2846V38.5455C20.5465 37.4409 19.6511 36.5455 18.5465 36.5455H3C1.89543 36.5455 1 35.65 1 34.5455V13.4545C1 12.35 1.89543 11.4545 3 11.4545Z" fill="white" stroke="#817F7F"/>
    </svg>
)}

export const SVGHelp = ({color}: {color?: string})=> { return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
        <path d="M478-240q21 0 35.5-14.5T528-290q0-21-14.5-35.5T478-340q-21 0-35.5 14.5T428-290q0 21 14.5 35.5T478-240Zm-36-154h74q0-33 7.5-52t42.5-52q26-26 41-49.5t15-56.5q0-56-41-86t-97-30q-57 0-92.5 30T342-618l66 26q5-18 22.5-39t53.5-21q32 0 48 17.5t16 38.5q0 20-12 37.5T506-526q-44 39-54 59t-10 73Zm38 314q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/>
    </svg>
)}

export const SVGBookmark = ({color}: {color?: string})=> { return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
        <path fill={color || "currentColor"} d="M200-120v-640q0-33 23.5-56.5T280-840h400q33 0 56.5 23.5T760-760v640L480-240 200-120Zm80-122 200-86 200 86v-518H280v518Zm0-518h400-400Z"/>
    </svg>

)}

export const SVGBookmarkFilled = ({ color, isFilled }: { color?: string; isFilled?: boolean }) => {
    return (
        <svg data-svg-bookmark-filled viewBox="0 0 36 49" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M5 1.5H31C33.2091 1.5 35 3.29086 35 5.5V46.0179C35 46.7897 34.1628 47.2706 33.4961 46.8817L21.0232 39.6058C19.155 38.5161 16.8449 38.5161 14.9768 39.6058L2.50387 46.8817C1.83721 47.2706 1 46.7897 1 46.0179V5.5C1 3.29086 2.79086 1.5 5 1.5Z"
                fill={isFilled ? color || 'currentColor' : 'transparent'}
                stroke={color || 'currentColor'}
                strokeWidth="3"
            />
        </svg>
    )
}

export const SVGTheme = ({ color }: { color?: string }) => {
    return (
        <svg viewBox="0 0 54 54" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="27" cy="27" r="25.5" stroke={color || 'currentColor'} strokeWidth="2" />
            <path
                d="M52.5004 27C52.5004 40.5797 41.8855 51.6802 28.5004 52.4566C28.5002 36.747 28.5002 36.2914 28.5003 35.3653C28.5003 34.7398 28.5004 33.8997 28.5004 28L28.5004 19.0956L28.5004 1.54339C41.8855 2.31981 52.5004 13.4203 52.5004 27Z"
                fill={color || 'currentColor'}
                stroke={color || 'currentColor'}
                strokeWidth="3"
            />
        </svg>
    )
}


export const SVGStarFilled = ({ color, isFilled }: { color?: string, isFilled?: boolean }) => {
    return (
        <svg data-svg-star-filled viewBox="0 0 62 58" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M31 1.61804L37.7089 22.266L37.8212 22.6115H38.1844H59.895L42.3308 35.3726L42.0369 35.5861L42.1492 35.9316L48.8581 56.5795L31.2939 43.8184L31 43.6049L30.7061 43.8184L13.1419 56.5795L19.8508 35.9316L19.9631 35.5861L19.6692 35.3726L2.10503 22.6115H23.8156H24.1788L24.2911 22.266L31 1.61804Z"
                fill={isFilled ? color || 'currentColor' : 'transparent'}
                stroke={color || 'currentColor'}
                strokeWidth="3"
            />
        </svg>
    )
}

export const SVGAddFilled = ({ color }: { color?: string }) => {
    return (
        <svg viewBox="0 0 58 58" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M58 29C58 45.0162 45.0162 58 29 58C12.9838 58 0 45.0162 0 29C0 12.9838 12.9838 0 29 0C45.0162 0 58 12.9838 58 29ZM29 5C31.4852 5 33.5 7.01477 33.5 9.5V24.5H48.5C50.9852 24.5 53 26.5148 53 29C53 31.4852 50.9852 33.5 48.5 33.5H33.5V48.5C33.5 50.9852 31.4852 53 29 53C26.5148 53 24.5 50.9852 24.5 48.5V33.5H9.5C7.01477 33.5 5 31.4852 5 29C5 26.5148 7.01477 24.5 9.5 24.5H24.5V9.5C24.5 7.01477 26.5148 5 29 5Z" fill={color || 'currentColor'}/>
        </svg>
    )
}

export const SVGRandom = ({ color }: { color?: string }) => {
    return (
        <svg data-svg-random xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill={color || 'currentColor'}><path d="M560-160v-80h104L537-367l57-57 126 126v-102h80v240H560Zm-344 0-56-56 504-504H560v-80h240v240h-80v-104L216-160Zm151-377L160-744l56-56 207 207-56 56Z"/>
        </svg>
    )
}

export const SVGAdd = ({ color }: { color?: string }) => {
    return (
        <svg viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.5 3L22.5 42" stroke={color || 'currentColor'} strokeWidth="3" strokeLinecap="round" />
            <path d="M42 22.5L3 22.5" stroke={color || 'currentColor'} strokeWidth="3" strokeLinecap="round" />
        </svg>
    )
}

export const SVGChevron = ({ color }: { color?: string }) => {
    return (
        <svg data-svg-chevron viewBox="0 0 13 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6.5 10L0.870833 0.250001L12.1292 0.25L6.5 10Z" fill={color || 'currentColor'}/>
        </svg>
    )
}


export const SVGFacebook = ({bg}: {bg?: string})=> {
    return (
        <svg viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M25.347 0.156998C11.747 0.156998 0.722046 11.184 0.722046 24.782C0.722046 38.382 11.747 49.405 25.347 49.405C38.947 49.405 49.972 38.382 49.972 24.782C49.972 11.184 38.946 0.156998 25.347 0.156998ZM31.864 24.679H27.6C27.6 31.493 27.6 39.886 27.6 39.886H21.28C21.28 39.886 21.28 31.579 21.28 24.679H18.274V19.31H21.28V15.831C21.28 13.341 22.462 9.454 27.659 9.454L32.339 9.472V14.687C32.339 14.687 29.493 14.687 28.941 14.687C28.386 14.687 27.601 14.964 27.601 16.148V19.311H32.419L31.864 24.679Z"
            fill={bg || "currentColor"}/>
        </svg>
    )
}


export const SVGWhatsapp = ({bg}: {bg?: string}) => {
    return (
        <svg viewBox="0 0 49 49" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_220_4)">
                <path fillRule="evenodd" clipRule="evenodd" d="M24.5 0C38.0219 0 49 10.9781 49 24.5C49 38.0219 38.0219 49 24.5 49C10.9781 49 0 38.0219 0 24.5C0 10.9781 10.9781 0 24.5 0ZM36.1305 12.905C33.1976 9.96958 29.2972 8.3523 25.1417 8.35067C16.5793 8.35067 9.6106 15.3167 9.60725 23.8791C9.60611 26.6161 10.3214 29.2878 11.6808 31.6427L9.47691 39.69L17.712 37.5306C19.9809 38.7677 22.5355 39.4196 25.1355 39.4208H25.1419C33.7034 39.4208 40.6727 32.4539 40.6761 23.8914C40.6778 19.7419 39.0634 15.8402 36.1305 12.905ZM25.1418 36.7979H25.1366C22.8197 36.797 20.5474 36.1748 18.565 34.9988L18.0934 34.719L13.2067 36.0005L14.5111 31.2375L14.2041 30.7492C12.9116 28.6942 12.229 26.3188 12.23 23.88C12.2329 16.7634 18.025 10.9734 25.147 10.9734C28.5956 10.9748 31.8374 12.3192 34.2751 14.7589C36.7129 17.1986 38.0546 20.4416 38.0533 23.8905C38.0504 31.0076 32.2584 36.7979 25.1418 36.7979ZM32.2241 27.131C31.8359 26.9368 29.9276 25.998 29.5717 25.8686C29.216 25.7391 28.9573 25.6743 28.6985 26.0627C28.4397 26.4512 27.6958 27.3253 27.4694 27.5842C27.243 27.8431 27.0166 27.8756 26.6284 27.6813C26.2403 27.4872 24.9896 27.0774 23.5071 25.7553C22.3532 24.7265 21.5742 23.4557 21.3477 23.0673C21.1214 22.6789 21.3236 22.4689 21.518 22.2754C21.6925 22.1016 21.9061 21.8222 22.1001 21.5956C22.2942 21.369 22.3589 21.2071 22.4883 20.9483C22.6177 20.6892 22.553 20.4627 22.456 20.2684C22.3589 20.0742 21.5827 18.1643 21.2592 17.3873C20.9442 16.6307 20.6242 16.7331 20.3859 16.7213C20.1598 16.71 19.9008 16.7076 19.642 16.7076C19.3832 16.7076 18.9628 16.8047 18.6069 17.1932C18.2512 17.5816 17.2485 18.5204 17.2485 20.4302C17.2485 22.3402 18.6393 24.1852 18.8334 24.4443C19.0275 24.7033 21.5704 28.6226 25.4641 30.3033C26.3901 30.7031 27.1132 30.9419 27.6769 31.1207C28.6067 31.416 29.4528 31.3744 30.1217 31.2744C30.8674 31.163 32.4182 30.3357 32.7416 29.4294C33.065 28.523 33.0649 27.7461 32.968 27.5842C32.871 27.4224 32.6122 27.3253 32.2241 27.131Z"
                fill={bg || "currentColor"}/>
            </g>
            <defs>
                <clipPath id="clip0_220_4">
                    <rect width="49" height="49" fill="white"/>
                </clipPath>
            </defs>
        </svg>
    )
}

export const SVGMail = ({bg}: {bg?: string}) => {
    return (
        <svg aria-description="email" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_220_6)">
                <path fillRule="evenodd" clipRule="evenodd" d="M24 48C37.2548 48 48 37.2548 48 24C48 10.7452 37.2548 0 24 0C10.7452 0 0 10.7452 0 24C0 37.2548 10.7452 48 24 48Z"
                    fill={bg || "currentColor"}/>
                <path fillRule="evenodd" clipRule="evenodd" d="M12 17.4415V31.0317C12 31.7711 12.5412 32.3703 13.2867 32.3703H34.4965C35.2413 32.3703 35.7832 31.7641 35.7832 31.0317V17.4415C35.7832 16.6302 35.2986 16 34.4965 16H13.2867C12.4537 16 12 16.6457 12 17.4415ZM13.9556 18.6253C13.9556 18.2978 14.1538 18.1105 14.4705 18.1105C14.6663 18.1105 22.3734 22.9941 22.8403 23.2805L24.0465 24.0307C24.4289 23.7745 24.8129 23.5554 25.2093 23.2898C26.0183 22.7726 33.2168 18.1105 33.415 18.1105C33.7324 18.1105 33.9298 18.2978 33.9298 18.6253C33.9298 18.9721 33.2617 19.3166 32.8266 19.5822C30.0929 21.2483 27.36 23.0645 24.6534 24.7925C24.4955 24.8994 24.1897 25.1277 23.9605 25.0929C23.705 25.0534 15.8625 20.015 14.4356 19.1757C14.2212 19.0495 13.9556 18.9342 13.9556 18.6253Z"
                    fill="white"/>
            </g>
            <defs>
                <clipPath id="clip0_220_6">
                    <rect width="48" height="48" fill="white"/>
                </clipPath>
            </defs>
        </svg>
    )
}

export const SVGX = ({bg}: {bg?: string}) => {
    return (
        <svg viewBox="0 0 47 47" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M47 23.5C47 36.4787 36.4787 47 23.5 47C10.5213 47 0 36.4787 0 23.5C0 10.5213 10.5213 0 23.5 0C36.4787 0 47 10.5213 47 23.5Z"
                fill={bg || "currentColor"}/>
                <g clipPath="url(#clip0_0_1)">
                <mask id="mask0_0_1" maskUnits="userSpaceOnUse" x="12" y="12" width="23" height="23">
                    <path d="M35 12H12V35H35V12Z" fill="white"/>
                </mask>
                    <g mask="url(#mask0_0_1)">
                <path d="M25.6881 21.7339L34.2504 12H32.2214L24.7868 20.4518L18.8488 12H12L20.9794 24.7807L12 34.9882H14.0291L21.8802 26.0628L28.1512 34.9882H35L25.6876 21.7339H25.6881ZM22.909 24.8933L21.9992 23.6206L14.7602 13.4939H17.8768L23.7187 21.6665L24.6285 22.9391L32.2224 33.5623H29.1058L22.909 24.8938V24.8933Z" fill="white"/>
            </g>
            </g>
                <defs>
                    <clipPath id="clip0_0_1">
                        <rect width="23" height="23" fill="white" transform="translate(12 12)"/>
                    </clipPath>
                </defs>
        </svg>
    )
}

export const SVGLinkedIn = ({bg}: {bg?: string}) => {
    return (
        <svg viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_221_24)">
                <path fillRule="evenodd" clipRule="evenodd" d="M22 0C34.1421 0 44 9.85789 44 22C44 34.1421 34.1421 44 22 44C9.85789 44 0 34.1421 0 22C0 9.85789 9.85789 0 22 0ZM15.1218 34.3639V17.1832H9.41007V34.3639H15.1218ZM35.7142 34.3639V24.5115C35.7142 19.2342 32.8965 16.7792 29.1392 16.7792C26.1094 16.7792 24.7523 18.4455 23.9925 19.6157V17.1832H18.2822C18.3579 18.7951 18.2822 34.3639 18.2822 34.3639H23.9924V24.769C23.9924 24.2554 24.0293 23.742 24.1807 23.375C24.5927 22.3493 25.5331 21.2868 27.1107 21.2868C29.1761 21.2868 30.0036 22.8629 30.0036 25.1715V34.3639H35.7142ZM12.3045 8.89883C10.3503 8.89883 9.07354 10.1836 9.07354 11.8675C9.07354 13.516 10.3115 14.8362 12.2289 14.8362H12.2658C14.2574 14.8362 15.497 13.516 15.497 11.8675C15.4601 10.1836 14.2575 8.89883 12.3045 8.89883Z"
                fill={bg || "currentColor"}/>
            </g>
            <defs>
                <clipPath id="clip0_221_24">
                    <rect width="44" height="44" fill="white"/>
                </clipPath>
            </defs>
        </svg>

    )
}


export const SVGSearch = ({ color }: { color?: string }) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
            <path
                d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z"
                fill={color || 'currentColor'}
            />
        </svg>
    )
}

export const SVGFilter = ({ color }: { color?: string }) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
            <path
                d="M200-160v-280h-80v-80h240v80h-80v280h-80Zm0-440v-200h80v200h-80Zm160 0v-80h80v-120h80v120h80v80H360Zm80 440v-360h80v360h-80Zm240 0v-120h-80v-80h240v80h-80v120h-80Zm0-280v-360h80v360h-80Z"
                fill={color || 'currentColor'}
            />
        </svg>
    )
}


export const SVGLink = ({ color }: { color?: string }) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
            <path
                d="M440-280H280q-83 0-141.5-58.5T80-480q0-83 58.5-141.5T280-680h160v80H280q-50 0-85 35t-35 85q0 50 35 85t85 35h160v80ZM320-440v-80h320v80H320Zm200 160v-80h160q50 0 85-35t35-85q0-50-35-85t-85-35H520v-80h160q83 0 141.5 58.5T880-480q0 83-58.5 141.5T680-280H520Z"
                fill={color || 'currentColor'}
            />
        </svg>
    )
}


export const SVGStar = ({ color }: { color?: string }) => {
    return (
        <svg viewBox="0 0 21 19" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M10.5 1.61804L12.3819 7.40983L12.4941 7.75532H12.8574H18.9473L14.0205 11.3348L13.7266 11.5484L13.8388 11.8939L15.7207 17.6857L10.7939 14.1061L10.5 13.8926L10.2061 14.1061L5.27931 17.6857L7.16118 11.8939L7.27344 11.5484L6.97954 11.3348L2.05275 7.75532H8.1426H8.50587L8.61813 7.40983L10.5 1.61804Z"
                stroke={color || 'currentColor'}
                strokeWidth={1}
            />
        </svg>
    )
}











