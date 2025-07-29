import './App.css'
import Home from './Pages/Home/Home'
import Trends from './Pages/Trends/Trends';
import Summary from './Pages/Summary/Summary';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { Routes, Route } from 'react-router-dom';

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/summary" element={<Summary />} />
        <Route path="/trending-actions" element={<Trends />} />
      </Routes>
      <ToastContainer />
    </>
  )
}

export default App
