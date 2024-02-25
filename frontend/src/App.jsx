import * as React from 'react';
import { Container } from '@mui/material';

// component
import Header from './components/Header';
import Home from './pages/Home';





function App() {
  
  return (
    <Container disableGutters  maxWidth="md" sx={{mx: 'auto', px: 0, backgroundColor: ''}}>
      <Header />
      <Home />
    </Container>
  )
}

export default App
