import React, { useEffect, useState } from 'react'
import { useTodosContext } from '../hooks/useTodosContext'
import axios from 'axios'


// components
// import TodoItems from '../components/TodoItems'
import TodoItemss from '../components/TodoItemss'
// import EditModal from '../components/EditModal'
import AddTask from '../components/AddTask'
import { Box } from '@mui/material'

const Home = ({ todo }) => {
    const { todos, dispatch } = useTodosContext()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedTodo, setSelectedTodo] = useState(null)
    const [editModeTodoId, setEditModeTodoId] = useState(null);


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

    const handleToggleEdit = () => {
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
        {isModalOpen && selectedTodo && (
            <EditModal
                // key={todo._id}
                todo={selectedTodo} // Pass selected todo to modal
                onClose={handleCloseModal} // Pass function to close modal
            />
            )}
            <Box>
                {Array.isArray(todos) && todos.map((todo) => (
                    <TodoItemss 
                        key={todo._id} 
                        todo={todo} 
                        onToggleEdit={()=> handleToggleEdit(todo)} 
                        disableButtons={editModeTodoId !== null && editModeTodoId !==todo._id}
                    /> // Pass edit function as prop
                ))}
            </Box>
    </Box>
  )
}

export default Home