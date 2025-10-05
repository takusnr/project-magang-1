import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { UserProvider } from './components/AuthPages/UserContext.jsx'
import { SidebarProvider } from './components/Layout/SidebarContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <UserProvider>
      <SidebarProvider>
        <App />
      </SidebarProvider>
    </UserProvider>
  </BrowserRouter>,
)
