
import './App.css'
import Suscripcion from './Components/Views/Suscripcion/Suscripcion';

function App() {


  return (
    <>
    <BrowserRouter>
      <menu></menu>
        <main>
          <Routes>
            <Route path="/Suscripcion" element={<Suscripcion />} />
          </Routes>
        </main>
      </BrowserRouter>
    </>
  )
}

export default App
