import React, { useRef } from 'react'
import { useState } from 'react';
import axios from 'axios';
import { useTodosContext } from '../hooks/useTodosContext'


// mui component
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import { Typography, IconButton, TextField, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { Box } from '@mui/system';

// Date-fns
import { formatDistanceToNow } from 'date-fns/formatDistanceToNow'

const CheckboxLine = ({ isChecked, children }) => (
  <span style={{ textDecoration: isChecked ? 'line-through' : 'none' }}>
    {children}
  </span>
)

const TodoItemss = ({ todo }) => {
  const { dispatch } = useTodosContext();
  const [isChecked, setIsChecked] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [newTitle, setNewTitle] = useState(todo.title)
//   const inputRef = useRef(todo.title)
  const [originalTitle, setOriginalTitle] = useState(todo.title)

  const handleChange = () => {
    setIsChecked(!isChecked)
  }

  const toggleEdit = (todo) => {
    setIsEditing((prevIsEditing) => !prevIsEditing)
    if(!isEditing ) {
      setOriginalTitle(todo.title)
    }
    console.log('onToggleEdit in TodoItems')
  }


// handle update
  const handleUpdate = async () => {
    try{
      const response = await axios.patch('http://localhost:4001/api/todos/' + todo._id, 
        { title: newTitle } 
      )
      1
        dispatch({ type: 'UPDATE_TODO', payload: response.data })
        console.log('Updated!')
      
    } catch (error) {
      console.log('Error updating data:', error)
    }
  }
  
  // handle delete
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

// handle cancel edit
  const handleCancelEdit = () => {
    if(!isEditing){
      setOriginalTitle(originalTitle)
    }
    setIsEditing(false)
    console.log('cancelling edit')
  }
// handle onblur
  const handleBlur = async () => {
    try {
      if (newTitle !== originalTitle) {
        const isConfirmed = window.confirm(`Do you want to save the changes of "${originalTitle}" to "${newTitle}"?`);
        if (isConfirmed) {
          await handleUpdate();
        } else {
          handleCancelEdit();
        }
      }
    } catch (error) {
      console.log('Error updating data:', error);
      setIsEditing(false); // Exit edit mode on error
    }
  };

  

  return (
      <Box>
        {!isEditing ? (
            <Grid className='todo-details' container justifyContent={'space-between'} sx={{borderBottom: 1, borderColor: '#949494'}}>
            <Box sx={{display: 'flex'}}>
              <Box>
                <Typography sx={{fontSize: 20}}>
                  <CheckboxLine isChecked={isChecked}>
                    <Checkbox onChange={handleChange} sx={{pr: 1}} />
                      <span>{todo.title}</span>
                  </CheckboxLine>
                </Typography>
                {/* date */}
                <Typography sx={{fontSize: 12, color: 'text.secondary'}}>
                  {formatDistanceToNow(new Date(todo.createdAt), { addSuffix: true })}
                </Typography>
              </Box>
            </Box>
                {!isEditing ? (
                    <Box sx={{my: 'auto'}}>
                    <Box sx={{display: 'block'}}>
                    {/* edit button */}
                    <IconButton disabled onClick={toggleEdit}>
                        <BorderColorIcon sx={{fontSize: 32, color: '#1976D2'}} />
                    </IconButton>
                    {/* delete button */}
                    <IconButton disabled onClick={handleDelete}>
                        <DeleteIcon sx={{fontSize: 32, color: '#F34542'}}/>
                    </IconButton>
                    </Box>
              </Box>
                ) : (
                    <Box sx={{my: 'auto'}}>
                    <Box sx={{display: 'block'}}>
                    {/* edit button */}
                    <IconButton  onClick={toggleEdit}>
                        <BorderColorIcon sx={{fontSize: 32, color: '#1976D2'}} />
                    </IconButton>
                    {/* delete button */}
                    <IconButton disabled onClick={handleDelete}>
                        <DeleteIcon sx={{fontSize: 32, color: '#F34542'}}/>
                    </IconButton>
                    </Box>
              </Box>
                )}
          </Grid>
        ) : (
            <Box zIndex={5} sx={{display: 'flex', position: 'absolute', justifyContent: 'center'}}>
            <Box sx={{
                display: 'block',
                backgroundColor: 'rgba(133, 133, 133, 0.1)',
                borderRadius: 4,
                border: 1,
                borderColor: 'grey.500',
                padding: '150px',
                maxWidth: '300px'
                }}>
                <form action='' onSubmit={handleUpdate}>
                <TextField 
                fullWidth
                autoFocus
                type='text'
                // onBlur={handleBlur}
                value={newTitle} 
                onChange={(e) => setNewTitle(e.target.value)} 
                inputProps={{ maxLength: 20 }} 
                sx={{display: 'block', pb: '5px'}}
                id="outlined-basic" 
                label="Edit Todo"
                variant="outlined" />
                <Box sx={{display: 'grid'}}>
                    <Button sx={{my: '10px'}} onClick={handleUpdate} type='submit' variant="contained">Update</Button>
                    <Button variant="outlined" color="error" onClick={handleCancelEdit}>Cancel</Button>
                </Box>
                </form>
            </Box>
        </Box> 
      )}
      </Box>
  )
}

export default TodoItemss