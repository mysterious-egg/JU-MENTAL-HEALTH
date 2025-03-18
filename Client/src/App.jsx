import React from 'react'
import DynamicForm from './Components/AssesmentForm'
import ASRSAssessment from './Components/ADHD'
import ConditionRouter from './Components/dashboard'
import DASS21Assessment from './Components/DAAS21'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import EmotionalDysregulationAssessment from './Components/emotDis'
import SelfHarmAssessment from './Components/selfHarm'
import FinalPage from './Components/FinalPage'
import HomePage from './Components/Homepage'
import UserInfoForm from './Components/details'
import AdminDashboard from './Components/adminDash'
import LoginForm from './Components/login'



const App = () => {
  return (
   
    <Routes>
      <Route path="/dashboard" element={< ConditionRouter />} />
      <Route path="/assessment" element={< DynamicForm />} />
      <Route path="/adhd" element={<ASRSAssessment/>} />
      <Route path="/emoDis" element={<EmotionalDysregulationAssessment/>} />
      <Route path="/daas" element={<DASS21Assessment/>} />
      <Route path="/selfHarm" element={<SelfHarmAssessment/>} />
      <Route path="/fp" element={<FinalPage/>} />
      <Route path="/" element={<HomePage/>} />
      <Route path="/details" element={<UserInfoForm/>} />
      <Route path="/priv/adminDash" element={<AdminDashboard/>} />
      <Route path="/login" element={<LoginForm/>} />
    </Routes>
    

  )
}

export default App