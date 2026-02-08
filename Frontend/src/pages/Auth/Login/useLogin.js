import { useState } from 'react'
import axios from 'axios'
import { apiUrl } from '../../../Api/api_url'
import { useNavigate } from 'react-router-dom'
import apiCaller from '../../../Api/apiCaller'

function useLogin() {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    })
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    function syncWithLocalStorage(data) {
        localStorage.setItem('user', JSON.stringify(data))
        // set the token in the api caller as it will not synced wiht the local storage for the first app initialization at the time when no user is logged in
        apiCaller.defaults.headers.common['Authorization'] = `Bearer ${data.token}`
    }

    const handleSubmit = async () => {
      if(formData.username.trim() === '' || formData.password.trim() === '') {
        alert('Please fill in all fields')
        return
      }

      try{
        setIsLoading(true)
        const response = await axios.post(`${apiUrl}/login`, formData)
        syncWithLocalStorage(response.data)
        alert('Login successful')
        navigate('/')
      } catch (error) {
        console.log(error)
        alert(error.message || 'Login failed')
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

export default useLogin