import React, { useEffect } from 'react'
import { useTodosContext } from '../hooks/useTodosContext'
import axios from 'axios'


// components
import TodoItems from '../components/TodoItems'
import AddTask from '../components/AddTask'
import { Box } from '@mui/material'


const Home = () => {
    const { todos, dispatch } = useTodosContext()
    
    const apiUrl = import.meta.env.VITE_API_URL; 

    useEffect(() => {
        const fetchTodos = async () => {
            try {
                const response = await axios.get(apiUrl)
                console.log(response.data)
                if(response.status === 200) {
                    dispatch({type: 'SET_TODOS', payload: response.data})
                }
            } catch (error) {
                console.error('Error fetching data',error)
            }dddw
        }

        fetchTodos()
    }, [apiUrl, dispatch])

  return (
    <Box>
        <Box>
            <AddTask/>
        </Box>
            <Box>
                {Array.isArray(todos) && todos.map((todo) => (
                    <TodoItems key={todo._id} todo={todo} />
                ))}
            </Box>
    </Box>
  )
}

export default Home