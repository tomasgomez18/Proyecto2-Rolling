import { BrowserRouter, Route, Routes } from 'react-router'
import Nosotros from './Components/Views/Nosotros/Nosotros'
import './App.css'

function App() {
  

  return (
    <>
    <BrowserRouter>
    <menu></menu>
    <main>
      <Routes>
        <Route path='/Nosotros' element={<Nosotros/>}/>
      </Routes>
    </main>
    </BrowserRouter>
    </>
  )
}

export default App
