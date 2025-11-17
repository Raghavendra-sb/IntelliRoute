import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import { ThemeProvider } from './context/ThemeProvider.jsx'
import { GlobalQueryProvider } from './context/GlobalQueryContext.jsx'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <GlobalQueryProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </GlobalQueryProvider>
    </ThemeProvider>
  </React.StrictMode>
)