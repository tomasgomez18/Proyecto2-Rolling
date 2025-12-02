import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Pagina404 from './Components/Views/Pagina404/Pagina404'
import './App.css'

function App() {
  

  return (
    <>
    <BrowserRouter>
    <menu></menu>
    <main>
      <Routes>
        <Route path='/404' element={<Pagina404/> }/>
      </Routes>
    </main>
    </BrowserRouter>
    </>
  )
}

export default App
