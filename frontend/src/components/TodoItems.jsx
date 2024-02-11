import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import { useTodosContext } from '../hooks/useTodosContext'


// mui component
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import { IconButton, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { Box } from '@mui/system';
import TextField from '@mui/material/TextField'
import CheckBoxIcon from '@mui/icons-material/CheckBox';

// Date-fns
import { formatDistanceToNow } from 'date-fns/formatDistanceToNow'

const CheckboxLine = ({ isChecked, children }) => (
  <span style={{ textDecoration: isChecked ? 'line-through' : 'none' }}>
    {children}
  </span>
);

const TodoItems = ({ todo }) => {
  const { dispatch } = useTodosContext();

  const [isChecked, setIsChecked] = useState(false)
  const [isEditing, setEditing] = useState(false)
  const [newTitle, setNewTitle] = useState(todo.title)
  
  const handleChange = async () => {
    setIsChecked(!isChecked)
  }

  const handleDelete = async () => {
    try {
      const response = await axios.delete('http://localhost:4001/api/todos/' + todo._id)
      if(response.status === 200) {
        dispatch({ type: 'DELETE_TODO', payload: response.data })
      }
    } catch (error) {
      console.log('Error deleting data:', error)
  }
}

const toggleEdit = () => {
  setEditing(!isEditing)
}

const handleTitleChange = (e) => {
  setNewTitle(e.target.value)
}

const handleSubmit = async (e) => {
  e.preventDefault()
  try{
    const response = await axios.patch('http://localhost:4001/api/todos/' + todo._id, 
      { title: newTitle }
    )

    if(response.statusCode === 200){
      dispatch({ type: 'UPDATE_TODO', payload: response.data })
      toggleEdit()
    }

  } catch (error) {
    console.log('Error updating data:', error)
  }

}



  return (
    <Grid className='todo-details' container justifyContent={'space-between'} sx={{borderBottom: 1, borderColor: '#949494'}}>
      <Box sx={{display: 'flex'}}>
        <Box>
          <Typography sx={{fontSize: 20}}>
            {isEditing ? (
              <form>
                <TextField
                  value={newTitle}
                  onChange={handleTitleChange}
                  fullWidth
                />
              </form>
            ) : (

              <CheckboxLine isChecked={isChecked}>
                <Checkbox onChange={handleChange} sx={{pr: 1}} />
                  <span>{todo.title}</span>
              </CheckboxLine>
                )
            }
          </Typography>
          <Typography sx={{fontSize: 12, color: 'text.secondary'}}>
            {formatDistanceToNow(new Date(todo.createdAt), { addSuffix: true })}
          </Typography>
        </Box>
      </Box>
      <Box sx={{my: 'auto'}}>
            {isEditing ? (
              <IconButton type='submit' onClick={handleSubmit}>
                <CheckBoxIcon sx={{fontSize: 32, color: '#1976D2'}} />
              </IconButton>
            ) : (
              <IconButton onClick={toggleEdit}>
          <     BorderColorIcon sx={{fontSize: 32, color: '#1976D2'}} />
              </IconButton>
            )

            }
        <IconButton onClick={handleDelete}>
          <DeleteIcon sx={{fontSize: 32, color: '#F34542'}}/>
        </IconButton>
      </Box>
    </Grid>
  )
}

export default TodoItems