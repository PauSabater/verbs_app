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
        <path d="M1 13L12.5 1.5M12.5 13L1 1.5" stroke={color || "currentColor"} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
)}