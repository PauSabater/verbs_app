import { ISelectorDropdownOptions } from "@/components/Selector/Selector";

export const formatStringForValidation = (str: string)=> {
    return str.toLowerCase().trim().replace(/\s+/g, ' ')
}

export function disableScroll() {
    (document.body.parentElement as HTMLElement).style.overflowY = 'hidden';
  }
export function enableScroll() {
    (document.body.parentElement as HTMLElement).style.overflowY = 'visible';
}

export function setLocalstorageItem(key: string, item: string) {
    localStorage.setItem(key, item)
}

export function getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
}

export const getOptionsDropdown = (tenses: any)=> {
    let optionsDropdown: ISelectorDropdownOptions[] = []

    for (const tenseGroup of tenses) {
        optionsDropdown.push({
            title: tenseGroup.title,
            options: tenseGroup.tenses
        })
    }

    return optionsDropdown
}