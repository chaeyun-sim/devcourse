import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom'
import App from './App'

async function mountApp() {
  if (process.env.NODE_ENV === 'development') {
    const { worker } = require('./mock/browse')
    await worker.start()
  }

  ReactDOM.render(
    <StrictMode>
      <App />
    </StrictMode>,
    document.getElementById('root')
  )
}

mountApp();