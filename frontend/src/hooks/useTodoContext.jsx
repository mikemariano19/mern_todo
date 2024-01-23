import { TodosContext } from '../context/TodoContext'

export const useTodosContext = () => {
    const context  = useContext(TodosContext);

    if(!context) {
        throw Error('useTodosContextHooks must be used inside an TodoContextProvider')
    }

    return context
}