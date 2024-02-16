import React from 'react'
import { useState } from 'react';
import axios from 'axios';

// mui component
import { Box, Button, TextField } from '@mui/material'


const EditModal = ({ todo }) => {
  const [newTitle, setNewTitle] = useState(todo.title)

  const handleUpdate = async () => {
    try{
      const response = await axios.patch('http://localhost:4001/api/todos/' + todo._id, 
      { title: newTitle }
      )
      
      if(response.statusCode === 200){
        dispatch({ type: 'UPDATE_TODO', payload: response.data })
      }
      
    } catch (error) {
      console.log('Error updating data:', error)
    }
  }
  
  const handleTitleChange = (e) => {
    setNewTitle(e.value)
  }

  return (
    <Box zIndex={1}>
      <Box  sx={{
        display: 'block',
        backgroundColor: '#393943',
        borderRadius: '5px',
        padding: '50px',
        maxWidth: '300px'
    }}>
        <form onSubmit={handleUpdate}>
          <TextField fullWidth value={newTitle} onChange={handleTitleChange} sx={{display: 'block', pb: '5px'}} id="outlined-basic" label="Edit Todo" variant="outlined" />
          <Box sx={{display: 'grid'}}>
              <Button sx={{my: '10px'}} onClick={handleUpdate} variant="contained">Update</Button>
              <Button variant="outlined" color="error">Cancel</Button>
          </Box>
        </form>
      </Box>
    </Box>
  )
}

export default EditModal