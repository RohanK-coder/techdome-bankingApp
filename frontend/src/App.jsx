import React from 'react'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Footer from './components/Footer'
import Registration from './pages/Registration'
import { LoginProvider } from '../context/LoginContext'
import CustomerPage from './pages/CustomerPage'
import AdminLogin from './pages/AdminLogin'
import AdminPage from './pages/AdminPage'



import { Routes,Route } from 'react-router-dom'


export default function App() {
  return (
   <>
   <LoginProvider>
   <Navbar/>
   <Routes>
    <Route path='/' element={<Home/>}/>

    <Route path='/customerpage' element={<CustomerPage/>}/>
    <Route path='/adminlogin' element={<AdminLogin/>}/>
    <Route path='/adminpage' element={<AdminPage/>}/>



   </Routes>
   <Footer/>
   <Routes>
   <Route path='/signin' element={<Registration/>}/>
   </Routes>
   </LoginProvider>


   </>
  )
}
