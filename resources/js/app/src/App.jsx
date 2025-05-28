import { useState } from 'react'
import './App.css'
import Rotas from './routes/Routes'
import DefaultLayout from './components/DefaultLayout'
import ContextProvider from './context/ContextProvider'

function App() {
  
  return (
    <>  
      <ContextProvider>
        <Rotas/>
      </ContextProvider>
    </>
  )
}

export default App
