import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import { useTodosContext } from '../hooks/useTodosContext'
import EditModal from '../modal/EditModal';


// mui component
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import { IconButton, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { Box } from '@mui/system';

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

  const handleChange = async () => {
    setIsChecked(!isChecked)
  }

  const toggleEdit = () => {
    setEditing(!isEditing)
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

  return (
    <Box>
        {isEditing  ? (
        <EditModal sx={{position: 'absolute'}} todo={todo} />
      ) : (
        <Box sx={{display: 'none'}}></Box>
      )}
      <Grid className='todo-details' container justifyContent={'space-between'} sx={{borderBottom: 1, borderColor: '#949494'}}>
        <Box sx={{display: 'flex'}}>
          <Box>
            <Typography sx={{fontSize: 20}}>
              <CheckboxLine isChecked={isChecked}>
                <Checkbox onChange={handleChange} sx={{pr: 1}} />
                  <span>{todo.title}</span>
              </CheckboxLine>
            </Typography>
            <Typography sx={{fontSize: 12, color: 'text.secondary'}}>
              {formatDistanceToNow(new Date(todo.createdAt), { addSuffix: true })}
            </Typography>
          </Box>
        </Box>
        <Box sx={{my: 'auto'}}>
          <Box sx={{display: 'block'}}>
            <IconButton onClick={toggleEdit}>
              <BorderColorIcon sx={{fontSize: 32, color: '#1976D2'}} />
            </IconButton>
            <IconButton onClick={handleDelete}>
              <DeleteIcon sx={{fontSize: 32, color: '#F34542'}}/>
            </IconButton>
          </Box>
        </Box>
      </Grid>
    </Box>
  )
}

export default TodoItems