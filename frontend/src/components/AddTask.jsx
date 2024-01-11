import React from 'react'
import styled from 'styled-components'

import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import AddIcon from '@mui/icons-material/Add';
import { red } from '@mui/material/colors';

const styles = styled.button`
  background-color" 'red'
`

const input = () => {
  return (
        <Grid container spacing={0} >
          <Grid item xs={10} md={10} sx={{mb: 0}}>
              <TextField
                id="standard-password-input"
                label="ADD TASK"
                type="password"
                autoComplete="current-password"
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
            }}
            >
              ADD TASK
            </Button>
          </Grid>
        </Grid>
  )
}

export default input