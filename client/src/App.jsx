// import { useState } from 'react'
import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Auth from './pages/Auth'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { setUserData } from './redux/userSlice'
import InterviewPage from './pages/InterviewPage'
import InterviewHistory from './pages/InterviewHistory'
import Pricing from './pages/Pricing'
import InterviewReport from './pages/InterviewReport'

// export const ServerUrl = "http://localhost:4000"
// const ServerUrl = import.meta.env.VITE_SERVER_URL

function App() {

  const dispatch = useDispatch()


  useEffect(() =>{
    const getUser = async () => {
      try {
        const result = await axios.get( import.meta.env.VITE_SERVER_URL+ "/api/user/current-user" ,
        {withCredentials:true})
        // console.log(result.data)
        dispatch(setUserData(result.data))

        
      } catch (error) {
        console.log(error)
        dispatch(setUserData(null))
      }
      
    }
    getUser();
  },[dispatch])
  return (
    <Routes>
      {/* Home Page */}
      <Route path='/' element={<Home />} />

      {/* Auth Page */}
      <Route path='/auth' element={<Auth />} />
    
      {/* InterviewPage */}

    <Route path='/interview' element={<InterviewPage />} />

    {/* InterviewHistoryPage */}
    <Route path='/history' element={<InterviewHistory />} />

    {/* PricingPage */}
    <Route path='/Pricing' element={<Pricing />} />
       
       {/* InterviewReportPage */}
    <Route path='/report/:id' element={<InterviewReport />} />
    </Routes>
  )
}

export default App


