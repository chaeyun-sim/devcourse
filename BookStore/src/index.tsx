import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { ThemeContext } from './context/themeContext'

ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById('root')
)
