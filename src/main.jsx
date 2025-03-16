import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import ContextAPI from './Contexts/ContextAPI.jsx'
import AuthorizationContext from './Contexts/AuthorizationContext.jsx'




createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthorizationContext>
    <ContextAPI>
    <BrowserRouter>
    <App />
    </BrowserRouter>
    </ContextAPI>
    </AuthorizationContext>
  </StrictMode>,
)
