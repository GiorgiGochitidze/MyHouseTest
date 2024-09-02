import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import HouseContext from './Components/HouseContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <HouseContext>
    <App />
  </HouseContext>
)
