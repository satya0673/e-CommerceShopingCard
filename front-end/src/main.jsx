import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import HotelManagement from './components/HotelManagement.jsx'
import { BrowserRouter } from 'react-router-dom'
import UserProvider from './components/context/ContextDetals.jsx'

createRoot(document.getElementById('root')).render(
  <UserProvider>
    <BrowserRouter>
      <HotelManagement />
    </BrowserRouter>
  </UserProvider>,
)
