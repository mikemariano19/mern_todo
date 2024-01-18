import React from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { useState } from 'react'


// style components
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import AddIcon from '@mui/icons-material/Add';




const input = () => {

  const [ title, setTitle ] = useState('')
  const [ error, setError ] = useState(null)
  const [ emptyField, setEmptyField ] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault()
  
    const todos = { title }
  
    try{
      const response = await axios.post('http://localhost:4001/api/todos/', todos, {
        headers: {
          'Content-Type': 'application/json'
        }
      })

      setEmptyField([])
      setError(null)
      setTitle('')
      
    } catch(e){
  
    }
  
  }
  return (
        <form action="" onChange={handleSubmit}>
          <Grid container spacing={0} sx={{mb: 3}}>
            <Grid item xs={10} md={10} sx={{mt: 0, pt: 0}}>
                <TextField
                  onChange={(e) => setTitle(e.target.value)}
                  value={title}
                  label="ADD TASK"
                  type="text"
                  variant="standard"
                  sx={{
                    width: "98%",
                    height: "100%"
                  }}
                />
            </Grid>
            <Grid item xs={2} display={{xs: 'block', md: 'none'}} >
              <Button variant="contained" color="primary" startIcon={<AddIcon />}
              sx={{
                p: 2,
                pl: 3.5,
                width: '100%'
              }}
              >
              </Button>
            </Grid>
            <Grid item md={2} display={{xs: 'none', md: 'block'}}>
              <Button variant="contained" color="primary" 
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