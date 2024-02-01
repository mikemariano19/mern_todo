import { useContext } from "react"
import { TodosContext } from "../context/TodoContext"

export const useTodosContext = () => {
    const context = useContext(TodosContext)

    if(!context) {
        throw Error('useTodoContextHooks must be used inside an TodoContextProvider')
    }
    return context
}