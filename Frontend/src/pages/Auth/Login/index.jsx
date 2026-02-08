import React from 'react'
import './style.css'
import useLogin from './useLogin'
import { Navigate } from 'react-router-dom'

function Login() {
  const user = JSON.parse(localStorage.getItem('user'))
  if(user) {
    return <Navigate to="/" />
  }
  const {formData, handleChange, handleSubmit, isLoading} = useLogin()
    return (
        <div className='login-container'>
     
          <div className='login-form'>
          <h2 className='login-title'>Employee Login </h2>
            <input className='login-input' type="text" placeholder="Username" name="username" value={formData.username} onChange={handleChange} />
            <input className='login-input' type="password" placeholder="Password" name="password" value={formData.password} onChange={handleChange} />
            <button className='login-button' onClick={handleSubmit} disabled={isLoading}>{isLoading ? 'Logging in...' : 'Login'}  </button>
          </div>
        </div>
    )
}

export default Login