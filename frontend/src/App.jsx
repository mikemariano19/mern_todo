import * as React from 'react';
import { Container } from '@mui/material';

// component
import AddTask from './components/AddTask';
import TodoItems from './components/TodoItems';
import Header from './components/Header';





function App() {
  
  return (
    <Container  maxWidth="md" sx={{mx: 'auto', px: 0}}>
      <Header />
      <AddTask />
      <TodoItems />
    </Container>
  )
}

export default App
