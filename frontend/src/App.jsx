import * as React from 'react';
import { Container } from '@mui/material';

// component
import Header from './components/Header';
import Home from './pages/Home';





function App() {
  
  return (
    <Container  maxWidth="md" sx={{mx: 'auto', px: 0, backgroundColor: 'blue'}}>
      <Header />
      <Home />
    </Container>
  )
}

export default App
