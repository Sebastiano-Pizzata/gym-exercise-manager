import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import GlobalProvider from './context/GlobalProvider.jsx'
// import 'bootstrap/dist/css/bootstrap.min.css'
import "./style/reset.css"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GlobalProvider>
      <App />
    </GlobalProvider>
  </StrictMode>,
)
