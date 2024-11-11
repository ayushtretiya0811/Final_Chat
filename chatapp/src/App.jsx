

import './App.css'
import MainContainer from './components/MainContainer'
import { Route, Routes , BrowserRouter} from 'react-router-dom'
import Register from './auth/Register'
import Login from './auth/Login'
// import LoginPage from './Pages/LoginPage'


function App() {
 

  return (
    <>
 
    <Routes>
  <Route path="/login" element={<Login/>} />
  <Route path="/" element={<Register/>} />
  <Route path="/chat" element={<MainContainer/>} />
</Routes>

     </>
  )
}

export default App
