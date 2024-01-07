import * as React from 'react';


import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import AddIcon from '@mui/icons-material/Add';


function App() {

  

  return (
    <>
      <Container maxWidth="md" disableGutters={true}>
        <h1>TODO-LIST</h1>
        <Grid container spacing={1} sx={{height: 1 }}>
          <Grid item xs={10} sm={10}>
              <TextField
                id="standard-password-input"
                label="ADD TASK"
                type="password"
                autoComplete="current-password"
                variant="standard"
                sx={{
                  width: "100%"

                }}
              />
          </Grid>
          <Grid item xs={2} display={{xs: 'block', sm: 'none'}} >
            <Button variant="contained" color="primary" startIcon={<AddIcon />}
            sx={{
              padding: 2,
            }}
            >
            </Button>
          </Grid>
          <Grid item md={2} display={{xs: 'none', sm: 'block'}}>
            <Button variant="contained" color="primary" 
            sx={{
              padding: 2,
              width: 1
            }}
            >
              ADD TASK
            </Button>
          </Grid>
        </Grid>
      </Container>
    </>
  )
}

export default App
