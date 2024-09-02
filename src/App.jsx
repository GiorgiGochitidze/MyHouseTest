import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './Components/Navbar'
import Home from './Components/Home'
import SignIn from './Components/AuthForms/SignIn'
import SignUp from './Components/AuthForms/SignUp'
import UploadCard from './Components/UploadCard'

function App() {

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/SignIn' element={<SignIn />} />
        <Route path='/SignUp' element={<SignUp />} />
        <Route path='/HouseUpload' element={<UploadCard />} />
      </Routes>
    </Router>
  )
}

export default App
