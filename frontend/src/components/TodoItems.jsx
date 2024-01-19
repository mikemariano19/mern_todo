import React from 'react'
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import { IconButton, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { Box } from '@mui/system';
import { useState } from 'react';


const CheckboxLine = ({ isChecked, children }) => (
  <span style={{ textDecoration: isChecked ? 'line-through' : 'none' }}>
    {children}
  </span>
);

const TodoItems = () => {
  const [isChecked, setIsChecked] = useState(false)

  const handleChange = () => {
    setIsChecked(!isChecked)
  }

  return (
    <Grid container justifyContent={'space-between'} sx={{borderBottom: 1, borderColor: '#949494'}}>
      <Box sx={{display: 'flex'}}>
          <Checkbox onChange={handleChange}  sx={{pr: 1,}} />
        <Box>
          <Typography sx={{fontSize: 20}}>
            <CheckboxLine isChecked={isChecked}>
                <span>Code</span>
            </CheckboxLine>
          </Typography>
          <Typography sx={{fontSize: 12, color: 'text.secondary'}}>1/14/2024</Typography>
        </Box>
      </Box>
      <Box sx={{my: 'auto'}}>
        <IconButton>
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