import React from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('user'))
  console.log(user.role)

  function handleLogout() {
    localStorage.removeItem('user')
    navigate('/login')
  }

  return (
    <div>
      <h1>Welcome {user.username}</h1>
      <div>Home</div>
      <button onClick={handleLogout}>Logout</button>
      <button onClick={() => navigate('/register')}>Register</button>
      {(user.role === 'admin' || user.role === 'superadmin') && <button onClick={() => navigate('/employees')}>Employees</button>}
    </div>
  )
}


export default Home