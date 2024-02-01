import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { TodosContextProvider } from './context/TodoContext';

// mui fonts
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <TodosContextProvider>
      <App />
    </TodosContextProvider>
  </React.StrictMode>,
)
