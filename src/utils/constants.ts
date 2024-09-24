export const strInactive = "inactive"
export const strSuccess = "success"
export const strError = "error"
export const strFilling = "filling"
export const strFilled = "filled"

export const isSuccess = (state: string)=> {return state === strSuccess}
export const isError = (state: string)=> {return state === strError}
export const isInactive = (state: string)=> {return state === strInactive}
export const isFilled = (state: string)=> {return state === strFilled}

export const iconImgSize = 24

// export const Tenses =  [
//     {
//         str: "Präsens"
//     },{
//         str: "Präsens"
//     }
// ]

// export const Tenses = {
//     indicative: []
// }