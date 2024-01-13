import React from 'react'
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';

const TodoItems = () => {
  return (
    <Grid container sx={{borderBottom: 1, borderColor: '#949494'}}>
      <Checkbox sx={{p: 0, pr: 1}} />
      <h4>Code</h4>
    </Grid>
  )
}

export default TodoItems