import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import {Signin} from './pages/Signin'
import {Signup} from './pages/Signup'
import {SettingsPage} from './pages/SettingsPage'
import { ProfilePage } from './pages/ProfilePage'
import {Homepage} from './pages/Homepage'
import { useAuthStore } from '../store/useAuthStore'
import { Loader } from 'lucide-react';
import { Toaster } from 'react-hot-toast'
import { useThemeStore } from '../store/useThemeStore'

function App() {
   const {authUser , checkAuth , isCheckingAuth } =useAuthStore();
   const {theme} = useThemeStore();

   useEffect(()=>{
    checkAuth()
   },[checkAuth])

   console.log(authUser);

   if(isCheckingAuth && !authUser){
      
      return (<div className="flex items-center justify-center h-screen">

        <Loader className="size-10 animate-spin" />
        
      </div>
      )
   }
   console.log(theme)
  return (
<div data-theme={theme}>

    <Navbar/>
    
    <Routes>
     
      <Route path="/" element={authUser ? <Homepage/> : <Navigate to="/signin"/> } />
      <Route path="/signup" element={!authUser ?<Signup/> : <Navigate to="/"/> } />
      <Route path="/signin" element={!authUser ? <Signin/>  : <Navigate to="/"/>} />
      <Route path="/settings" element={<SettingsPage/>} />
      <Route path="/profile" element={authUser ?<ProfilePage/> : <Navigate to="/signin"/> } />
      

    </Routes>

    <Toaster position="top-center" reverseOrder={false} />
    
   
   </div>
  )
}



export default App
