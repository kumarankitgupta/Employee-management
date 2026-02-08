import React from 'react'
import './style.css'
import useRegister from './useRegister'

function Register() {
    const {formData, handleChange, handleSubmit , isLoading} = useRegister()
    return (
      <RoleBasedWrapper>
        <div className='register-container'>
          <div className='register-form'>
          <h2 className='register-title'> Register An Employee </h2>
            <input className='register-input' type="text" placeholder="Username" name="username" value={formData.username} onChange={handleChange} />
            <input className='register-input' type="email" placeholder="Email" name="email" value={formData.email} onChange={handleChange} />
            <input className='register-input' type="text" placeholder="Role" name="role" value={formData.role} onChange={handleChange} />
            <input className='register-input' type="password" placeholder="Password" name="password" value={formData.password} onChange={handleChange} />
            <button className='register-button' type="submit" onClick={handleSubmit} disabled={isLoading}>{isLoading ? 'Registering...' : 'Register'}</button>
          </div>
        </div>
        </RoleBasedWrapper>
    )
}

export function RoleBasedWrapper({children}) {
    const user = JSON.parse(localStorage.getItem('user'))
    console.log(user.role !== 'admin' || user.role !== 'superadmin')
    
    if(user.role !== 'admin' && user.role !== 'superadmin') {
        return <div style={{color: 'red', fontSize: '20px', fontWeight: 'bold'}}>You are not authorized to access this page</div>
    }

    return children
}

export default Register