import axios from 'axios'
const token = JSON.parse(localStorage.getItem('user'))?.token

const apiCaller = axios.create({
    baseURL: 'http://localhost:3000',
    headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }),
    },
})

export default apiCaller



