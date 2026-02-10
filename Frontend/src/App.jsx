import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { CssVarsProvider } from '@mui/joy/styles'
import Home from './pages/Home/index.'
import Register from './pages/Auth/Register'
import Login from './pages/Auth/Login'
import UpdateUser from './pages/Auth/UpdateUser'
import NotFound from './pages/NotFound'
import Employee from './pages/Employees/Employee'
import { ToastContainer } from 'react-toastify'

const App = () => {
  return (
    <CssVarsProvider>
      <BrowserRouter>
        <ToastContainer />
          <Routes>
          <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/register" element={<ProtectedRoute><Register /></ProtectedRoute>} />
          <Route path="/update/:id" element={<ProtectedRoute><UpdateUser /></ProtectedRoute>} />
          <Route path="/login" element={<Login />} />
          <Route path="/employees" element={<ProtectedRoute><Employee /></ProtectedRoute>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </CssVarsProvider>
  )
}


function ProtectedRoute({ children }) {
 const user = JSON.parse(localStorage.getItem('user'))
 if(!user) {
  return <Navigate to="/login" />
 }
 return children
}

export default App