import React from 'react'
import { useTodosContext } from '../hooks/useTodosContext'
import { useState } from 'react';
import axios from 'axios';


// mui component
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import { IconButton, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { Box } from '@mui/system';

// Date-fns
// import { formatDistanceToNow } from 'date-fns/formatDistanceToNow'

const CheckboxLine = ({ isChecked, children }) => (
  <span style={{ textDecoration: isChecked ? 'line-through' : 'none' }}>
    {children}
  </span>
);

const TodoItems = ({ todo }) => {
  const { dispatch } = useTodosContext();

  const [isChecked, setIsChecked] = useState(false)
  
  const handleChange = async () => {
    setIsChecked(!isChecked)
  }
  const handleClick = async () => {
    try {
      const response = await axios.delete('http://localhost:4001/api/todos/' + todo._id)
      if(response.status === 200) {
        dispatch({ type: 'DELETE_WORKOUT', payload: response.data })
      }
    } catch (error) {
      console.log('Error deleting data:', error)
  }
}


  return (
    <Grid className='todo-details' container justifyContent={'space-between'} sx={{borderBottom: 1, borderColor: '#949494'}}>
      <Box sx={{display: 'flex'}}>
        <Box>
          <Typography sx={{fontSize: 20}}>
            <CheckboxLine isChecked={isChecked}>
              <Checkbox onChange={handleChange} sx={{pr: 1}} />
                <span>{todo}</span>
                
            </CheckboxLine>
          </Typography>
          <Typography sx={{fontSize: 12, color: 'text.secondary'}}>
            {/* <p>{formatDistanceToNow(new Date(TodoItems.createdAt), { addSuffix: true })}</p> */}
          </Typography>
        </Box>
      </Box>
      <Box sx={{my: 'auto'}}>
        <IconButton onClick={handleClick}>
          <DeleteIcon sx={{fontSize: 32, color: '#F34542'}}/>
        </IconButton>
        <IconButton>
          <BorderColorIcon sx={{fontSize: 32, color: '#1976D2'}} />
        </IconButton>
      </Box>
    </Grid>
  )
}

export default TodoItems