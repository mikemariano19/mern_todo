import { Box, Button, TextField } from '@mui/material'
import React from 'react'

const EditModal = () => {

  const handleUpdate = async () => {
    try {
      const response = await axios.patch('http://localhost:4001/api/todos/' + todo._id)
      if(response.status === 200) {
        dispatch({ type: 'UPDATE_TODO', payload: response.data })
      }
    } catch (error) {
      console.log('Error deleting data:', error)
  }
}


  return (
    <Box sx={{
    }}>
      <Box zIndex={0} sx={{
        display: 'block',
        backgroundColor: '#393943',
        borderRadius: '5px',
        padding: '50px',
        m: 'auto',
        maxWidth: '300px'
    }}>
        <TextField fullWidth sx={{display: 'block', pb: '5px'}} id="outlined-basic" label="Edit Todo" variant="outlined" />
        <Box sx={{display: 'grid'}}>
            <Button sx={{my: '10px'}} variant="contained">Edit</Button>
            <Button variant="outlined" color="error">Cancel</Button>
        </Box>
      </Box>
    </Box>
  )
}

export default EditModal