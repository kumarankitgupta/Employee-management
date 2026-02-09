import React, { useState } from 'react'
import { apiUrl } from '../../../Api/api_url'
import { useNavigate } from 'react-router-dom'
import apiCaller from '../../../Api/apiCaller'

function useRegister() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        role: '',
        password: '',
    })
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')
    const navigate = useNavigate()
    
    const handleChange = (e) => {
        setError('')
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async () => {
      if(formData.username.trim() === '' || formData.email.trim() === '' || formData.role.trim() === '' || formData.password.trim() === '') {
        setError('Please fill in all fields')
        return
      }

      if(formData.password.length < 6) {
        setError('Password must be at least 6 characters long')
        return
      }

      try{
        setIsLoading(true)
        setError('')
        await apiCaller.post(`${apiUrl}/register`, formData)
        navigate('/login')
      } catch (error) {
        console.log(error)
        setError(error.response?.data?.message || error.message || 'Registration failed. Please try again.')
      } finally {
        setIsLoading(false)
      }
    }

  return {
    formData,
    handleChange,
    handleSubmit,
    isLoading,
    error
  }
}

export default useRegister