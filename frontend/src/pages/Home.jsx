import React, { useEffect, useState } from 'react'
import { useTodosContext } from '../hooks/useTodosContext'
import axios from 'axios'


// components
import EditModal from '../components/EditModal'
import TodoItems from '../components/TodoItems'
import AddTask from '../components/AddTask'
import { Box } from '@mui/material'

const Home = ({ todo }) => {
    const { todos, dispatch } = useTodosContext()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedTodo, setSelectedTodo] = useState(todo)



    useEffect(() => {
        const fetchTodos = async () => {
            try {
                const response = await axios.get('http://localhost:4001/api/todos/')
                console.log(response.data)
                if(response.status === 200) {
                    dispatch({type: 'SET_TODOS', payload: response.data})
                }
            } catch (error) {
                console.error('Error fetching data',error)
            }
        }

        fetchTodos()
    }, [dispatch])

    const handleToggleEdit = (todo) => {
        setSelectedTodo(todo)
        if(!isModalOpen){
            setIsModalOpen(true)
        }
        console.log('toggle edit in Home')
    }

    const handleCloseModal = () => {
        setIsModalOpen(false)
    }

  return (
    <Box>
        <Box>
            <AddTask/>
        </Box>
        {isModalOpen ? (
            <EditModal
            key={todo}
            todo={selectedTodo} // Pass selected todo to modal
            onClose={handleCloseModal} // Pass function to close modal
            />
            ) : (
            <Box>
                {Array.isArray(todos) && todos.map((todo) => (
                    <TodoItems key={todo._id} todo={todo} onToggleEdit={handleToggleEdit} /> // Pass edit function as prop
                ))}
            </Box>
            )
        }
    </Box>
  )
}

export default Home