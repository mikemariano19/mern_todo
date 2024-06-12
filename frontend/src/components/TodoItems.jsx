import React from 'react'
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
  const [newTitle, setNewTitle] = useState(todo.title)
  const [isEditing, setIsEditing] = useState(false)
  const [isDelete, setIsDelete] = useState(false)
  const [originalTitle, setOriginalTitle] = useState(todo.title)
  
  const apiUrl = import.meta.env.VITE_API_URL;
  
  const handleChange = () => {
    setIsChecked(!isChecked)
  }

  const toggleEdit = (todo) => {
    if(isEditing ) {
      setOriginalTitle(todo.title)
    }
    setIsEditing((prevIsEditing) => !prevIsEditing)
  }

// handle update
  const handleUpdate = async () => {
    try{
      const response = await axios.patch(apiUrl + todo._id, 
        { title: newTitle } 
      )
       await dispatch({ type: 'UPDATE_TODO', payload: response.data })
        location.reload();
        console.log('Updated!')
    } catch (error) {
      console.log('Error updating data:', error)
    }
  }

  // handle cancel edit
    const handleCancelEdit = () => {
      if(isEditing){
        setOriginalTitle(originalTitle)
        location.reload();
      }
      setIsEditing(false)
    }

  // delete message
  const  handleDeleteMessage =  () => {
    setIsDelete(true)
  }

  // Cancel in Delete mode
  const handleCancelDelete = () => {
    setIsDelete(false)
  }
  
  // handle delete
  const handleDelete = async () => {
    try {
      const response = await axios.delete(apiUrl + todo._id)
      if(response.status === 200) {
        dispatch({ type: 'DELETE_TODO', payload: response.data })
      }
    } catch (error) {
      console.log('Error deleting data:', error)
    }
  }


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
              <Box sx={{my: 'auto'}}>
              <Box sx={{display: 'block'}}>
              {/* edit button */}
              <IconButton onClick={toggleEdit}>
                  <BorderColorIcon sx={{fontSize: 32, color: '#1976D2'}} />
              </IconButton>
              {/* delete button */}
              <IconButton onClick={handleDeleteMessage}>
                  <DeleteIcon sx={{fontSize: 32, color: '#F34542'}}/>
              </IconButton>
              </Box>
            </Box>
        </Grid>
          ) : (
              <Box zIndex={5} 
                  sx={{
                    display: 'grid',
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'fixed',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    padding: 'auto',
                    borderRadius: '5px',
                    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                    width: '100vw',
                    height: '100vh',
                    }}>
                <Box sx={{backgroundColor: '#E6EBF4', padding: '15px', py: '30px', borderRadius: '10px'}}>
                  <Box>
                      <form onSubmit={handleUpdate}>
                        <TextField sx={{
                          '& .MuiInputBase-input': {
                            color: '',
                            borderRadius: '5px',
                            fontSize: '20px',
                          },
                        }}
                        autoComplete='off'
                        name='todo'
                        fontSize='20px'
                        type='standard'
                        id='todo-edit'
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value.toUpperCase())}
                        autoFocus
                        inputProps={{maxLength: 19}}
                      />
                      </form>
                  {/* date */}
                  <Typography sx={{fontSize: 12, color: 'text.secondary'}}>
                    {formatDistanceToNow(new Date(todo.createdAt), { addSuffix: true })}
                  </Typography>
                </Box>
                  <Box>
                    {/* edit button */}
                    <Box>
                      <Button onClick={handleUpdate} variant="contained" sx={{width: '100%'}}>
                        UPDATE
                      </Button>
                    </Box>
                    {/* delete button */}
                    <Box>
                      <Button onClick={handleCancelEdit} variant="outlined" color="error" sx={{width: '100%', mt: '5px'}}>
                        CANCEL
                      </Button>
                    </Box>
                  </Box>
                </Box>
              </Box>
          )}
          {isDelete && (
            <Box zIndex={5} 
            sx={{
              display: 'grid',
              justifyContent: 'center',
              alignItems: 'center',
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              padding: 'auto',
              borderRadius: '5px',
              boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
              width: '100vw',
              height: '100vh',
              }}>
          <Box sx={{backgroundColor: '#E6EBF4', px: '15px', py: '15px', borderRadius: '10px'}}>
            <Box sx={{color: 'text.primary'}}>
                <Box sx={{color: 'text.secondary'}}>
                  <Box sx={{display: 'flex', justifyContent: 'center'}}><h3>{todo.title}</h3></Box> 
                  <span style={{fontFamily: 'monospace', fontSize: 14, fontWeight: 500}}>Are you sure you want to delete this in the list?</span>
                </Box>
            {/* date */}
          </Box>
            <Box>
              {/* delete button */}
              <Box>
                <Button onClick={handleDelete} variant="outlined" color="error" sx={{width: '100%', mt: '15px'}}>
                  Delete
                </Button>
              </Box>
              {/* edit button */}
              <Box>
                <Button onClick={handleCancelDelete} variant="contained" sx={{width: '100%', mt: '5px'}}>
                  Cancel
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
          )}
      </Box>
  )
}

export default TodoItemss