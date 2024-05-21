import { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Manager from './components/Manager';
import{
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Tables from './components/Tables'

function App() {
  const [passwordArray,setPasswordArray] = useState([]);
  const [form,setForm] = useState({link:"",username:"",password:""});

  return (
    <>
    <Router>
    <Navbar passwordArray={passwordArray} setPasswordArray={setPasswordArray}/>
      <Routes>
      <Route exact path="/" element={<Manager passwordArray={passwordArray} setPasswordArray={setPasswordArray} form={form} setForm={setForm}/>}/>
      <Route exact path="/allpasswords" element={<Tables passwordArray={passwordArray} setPasswordArray={setPasswordArray} form={form} setForm={setForm}/>}/>
      </Routes>
    </Router>
    
    </>
  )
}

export default App
