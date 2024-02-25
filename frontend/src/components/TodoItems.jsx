import React, { useRef } from 'react'
import { useState } from 'react';
import axios from 'axios';
import { useTodosContext } from '../hooks/useTodosContext'


// mui component
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import { Button, FormControl, IconButton, Input, TextField, Typography } from '@mui/material';
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
  const [isEditing, setIsEditing] = useState(false)
  const [newTitle, setNewTitle] = useState(todo.title)
  const inputRef = useRef(todo.title)

  const handleChange = async () => {
    setIsChecked(!isChecked)
  }

  const toggleEdit = () => {
    setIsEditing(!isEditing)
  }
  
  // handle update
  const handleUpdate = async () => {
    try{
      const response = await axios.patch('http://localhost:4001/api/todos/' + todo._id, 
      { title: newTitle } 
      )
      
      if(response.status === 200){
        await dispatch({ type: 'UPDATE_TODO', payload: response.data })
        setIsEditing(!isEditing)
        console.log('Updated!')
      }
      
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
  
  const handleTitleChange = (e) => {
    setNewTitle(e.target.value)
  }

  const handleBlur = async () => {
    try{
      setIsEditing(!isEditing)
      if(newTitle !== todo.title) {
        const isConfirmed = window.confirm(`Do you want to save the changes of ${todo.title} to ${newTitle}`)
        if(isConfirmed) {
          await handleUpdate()
          setIsEditing(!isEditing)
        } if(!isConfirmed) {
          console.log('Cancel updating')
          setIsEditing(!isEditing) }
      }
      
    } catch (error) {
      console.log('Error updating data:', error)
      // setNewTitle(todo.title)
      setIsEditing(!isEditing)
    }
  }


  return (
    <Box>
      <Box zIndex={5} >
        {isEditing ? (
          <FormControl onSubmit={handleUpdate} sx={{
            display: 'flex', 
            justifyContent: 'center',
            backgroundColor: 'blue'}}>
            <Input onSubmit={handleUpdate}
              fullWidth
              value={newTitle}
              onChange={handleTitleChange}
              onBlur={handleBlur} // Save changes on blur (e.g., when focus is lost)
              autoFocus // Automatically focus on the input field when editing starts
              inputRef={inputRef} // Assign the input element reference
              maxLength={20}
            />
            <Button onClick={handleUpdate}>Edit</Button>
          </FormControl>
        ) : (
          <Box></Box>
        )}
      </Box>
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
        <Box sx={{my: 'auto'}}>
          <Box sx={{display: 'block'}}>
            {/* edit button */}
            <IconButton onClick={toggleEdit}>
              <BorderColorIcon sx={{fontSize: 32, color: '#1976D2'}} />
            </IconButton>
            {/* delete button */}
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