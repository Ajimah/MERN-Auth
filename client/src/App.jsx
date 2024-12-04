
import './App.css'
import { Route, Routes,  } from 'react-router-dom';
import Navbar from '../src/components/Navbar';
import Home from "./components/pages/Home";
import Register from "./components/pages/Register";
import Login from "./components/pages/Login";
import axios from 'axios';
import {Toaster} from 'react-hot-toast';
import { UserContextProvider } from '../context/usercontext';
import Dashboard from './components/pages/Dashboard';

axios.defaults.baseURL = 'http://localhost:8000'
axios.defaults.withCredentials = true


function App() {
    return (
      
      <UserContextProvider>
            <Navbar />
            <Toaster position='bottom-right' toastOptions={{duration:3000}} />
              <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/register' element={<Register/>} />
                <Route path='/login' element={<Login/>} />
                <Route path='/dashboard' element={<Dashboard/>} />
              </Routes>
          </UserContextProvider>
    )
    
  
}

export default App
