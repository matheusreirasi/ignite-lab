import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App' //importa a função App desse arquivo


import "./style/global.css"

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

//é renderizado a função App do arquivo App.tsx