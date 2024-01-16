import { ISelectorDropdownOptions } from "@/components/Selector/Selector"
import { createContext } from "react"

export const PageContext = createContext<{
    exerciseTense: string,
    exerciseTensesCheckboxList: ISelectorDropdownOptions[] | null,
    selectedTensesFromCheckboxList: string[]
  }>({
    exerciseTense: '',
    exerciseTensesCheckboxList: [],
    selectedTensesFromCheckboxList: []
  })