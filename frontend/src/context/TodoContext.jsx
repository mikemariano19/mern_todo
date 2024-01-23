import React, { createContext, useReducer } from 'react'

export const TodoContext = createContext()

const todosReducer = (state, action) => {
  switch (action.type) {
    case 'SET_TODO':
      return {
        todos: action.payload
      }
    case 'CREATE_TODO':
    return {
      todos: action.payload
      }
    case 'DELETE_TODO':
      return {
        todos: action.payload
      }
    case 'EDIT_TODO':
      return {
        todos: action.payload
      }
      default:
        return state
  }
}

 export const TodosContextProvider = () => {
  const [state, dispatch] = useReducer(workoutsReducer, {
    workout: null
  })


  return (
    <TodoContext.Provider value={{ ...state, dispatch }}>
      { children }
    </TodoContext.Provider>
  )
 }

 


export default TodoContext