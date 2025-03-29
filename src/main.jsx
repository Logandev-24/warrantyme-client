import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google'
import AppRouter from './routes/AppRoutes.jsx'

createRoot(document.getElementById('root')).render(
  <AppRouter />
)
