import React, { useEffect } from 'react'
import { useState } from 'react';
import axios from 'axios';
import { useTodosContext } from '../hooks/useTodosContext';

// mui component
import { Box, Button, TextField } from '@mui/material'


  const EditModal = ({ todo }) => {
  const { dispatch } = useTodosContext();
  const [newTitle, setNewTitle] = useState(todo);
  const [originalTitle, setOriginalTitle] = useState(todo)
  const [isEditing, setIsEditing] = useState(false)



  const handleUpdate = async () => {
    try{
      const response = await axios.patch('http://localhost:4001/api/todos/' + todo._id, 
        { title: newTitle } 
      )
      
      if(response.status === 200){
        dispatch({ type: 'UPDATE_TODO', payload: response.data })
        console.log('updated')
      }
      
    } catch (error) {
      console.log('Error updating data:', error)
    }
  }
  
  // const handleTitleChange = (e) => {
  //     setNewTitle(e.target.value)
  //     console.log(e.target.value)
  // }

  const handleCancelEdit = () => {
    if(!isEditing){
      setOriginalTitle(originalTitle)
    }
    setIsEditing(false)
    console.log('cancelling edit')
  }

  
  // handle blur event
  // const handleBlur = async () => {
  //   try{
  //     if(newTitle !== todo) {
  //       const isConfirmed = window.confirm(`Do you want to save the changes of ${todo} to ${newTitle}`)
  //       if(isConfirmed) {
  //        await handleUpdate()
  //       } if(!isConfirmed) {
  //         handleCancelEdit()
  //       }
  //     }
  //     console.log('blurred')
  //   } catch (error) {
  //     console.log('Error updating data:', error)
  //     // setNewTitle(todo.title)
  //     setIsEditing(!isEditing)
  //   }
  // }

  return (
    <Box zIndex={5} sx={{display: 'flex', position: 'absolute', justifyContent: 'center'}}>
      <Box sx={{
        display: 'block',
        backgroundColor: 'rgba(133, 133, 133, 0.1)',
        borderRadius: 4,
        border: 1,
        borderColor: 'grey.500',
        padding: '50px',
        maxWidth: '300px'
        }}>
        <form onSubmit={handleUpdate}>
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
  )
}

export default EditModal