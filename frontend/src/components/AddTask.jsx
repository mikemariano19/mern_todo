import React from 'react'
import axios from 'axios'
import { useState } from 'react'


// style components
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import AddIcon from '@mui/icons-material/Add';
import { useTodosContext } from '../hooks/useTodosContext'





const input = () => {
  const { dispatch } = useTodosContext()
  const [ title, setTitle ] = useState('')
  const [ isError, setIsError ] = useState(null)
  
  const apiUrl = import.meta.env.VITE_API_URL;
  
  const handleSubmit = async (e) => {
    e.preventDefault()
  
    const todo = { title }

    let response
  
    try{
      response = await axios.post(apiUrl + todo, {
        headers: {
          'Content-Type': 'application/json'
        }
      })

      setIsError(null)
      setTitle('')
      console.log('New todo added:', response.data)
      dispatch({type: 'CREATE_TODO', payload: response.data})
    } catch(error){
      setIsError(error.response.data)
      console.log(error.response.data)
    }
  
  }

 

  return (
        <form action="submit" name='todo' onSubmit={handleSubmit}>
          <Grid container spacing={0} sx={{mb: 3}}>
            <Grid item xs={10} md={10} sx={{mt: 0, pt: 0}}>
                <TextField
                  onChange={(e) => setTitle(e.target.value.toUpperCase())}
                  value={title}
                  name={'addtask'}
                  label="ADD TASK"
                  type="text"
                  variant="standard"
                  inputProps={{maxLength: 19}}
                  sx={{
                    width: "98%",
                    height: "100%"
                  }}
                />
            </Grid>
            <Grid item xs={2} display={{xs: 'block', md: 'none'}} >
              <Button type='submit' variant="contained" color="primary" startIcon={<AddIcon />}
              sx={{
                p: 2,
                pl: 3.5,
                width: '100%'
              }}
              >
              </Button>
            </Grid>
            <Grid item md={2} display={{xs: 'none', md: 'block'}}>
              <Button variant="contained" type='submit' color="primary" 
              sx={{
                p: 2,
                width: '100%'
              }}
              >
                ADD TASK
              </Button>
            </Grid>
          </Grid>
        </form>
  )
}

export default input