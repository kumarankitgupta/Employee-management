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
    const navigate = useNavigate()
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async () => {
      if(formData.username.trim() === '' || formData.email.trim() === '' || formData.role.trim() === '' || formData.password.trim() === '') {
        alert('Please fill in all fields')
        return
      }

      try{
        setIsLoading(true)
          await apiCaller.post(`${apiUrl}/register`, formData)
          alert('Registration successful')
          navigate('/login')
      } catch (error) {
        console.log(error)
        alert(error.message || 'Registration failed')
      } finally {
        setIsLoading(false)
      }
    }

  return {
    formData,
    handleChange,
    handleSubmit,
    isLoading
  }
}

export default useRegister