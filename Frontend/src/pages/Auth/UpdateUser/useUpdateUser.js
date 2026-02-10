import React, { useState, useEffect } from 'react'
import { apiUrl } from '../../../Api/api_url'
import { useNavigate, useParams } from 'react-router-dom'
import apiCaller from '../../../Api/apiCaller'

function useUpdateUser() {
    const { id } = useParams()
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        role: '',
    })
    const [isLoading, setIsLoading] = useState(false)
    const [isFetching, setIsFetching] = useState(true)
    const [error, setError] = useState('')
    const navigate = useNavigate()
    
    useEffect(() => {
        const fetchUserData = async () => {
            if (!id) {
                setError('User ID is required')
                setIsFetching(false)
                return
            }

            try {
                setIsFetching(true)
                setError('')
                const response = await apiCaller.get(`${apiUrl}/get-employee-details?user_id=${id}`)
                const userData = response.data.data
                console.log({userData})
                setFormData({
                    username: userData.username || '',
                    email: userData.email || '',
                    role: userData.role || '',
                })
            } catch (error) {
                console.log(error)
                setError(error.response?.data?.message || error.message || 'Failed to fetch user data.')
            } finally {
                setIsFetching(false)
            }
        }

        fetchUserData()
    }, [id])
    
    const handleChange = (e) => {
        setError('')
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async () => {
      if(formData.username.trim() === '' || formData.email.trim() === '' || formData.role.trim() === '') {
        setError('Please fill in all fields')
        return
      }

      try{
        setIsLoading(true)
        setError('')
        await apiCaller.put(`${apiUrl}/update-user-details`, {
          user_id: id,
          username: formData.username,
          email: formData.email,
          role: formData.role,
        })
        navigate('/employees')
      } catch (error) {
        console.log(error)
        setError(error.response?.data?.message || error.message || 'Update failed. Please try again.')
      } finally {
        setIsLoading(false)
      }
    }

  return {
    formData,
    handleChange,
    handleSubmit,
    isLoading,
    isFetching,
    error
  }
}

export default useUpdateUser

