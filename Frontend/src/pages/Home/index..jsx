import React from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Grid,
  Sheet,
  Avatar,
  Chip
} from '@mui/joy'

const Home = () => {
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('user'))

  function handleLogout() {
    localStorage.removeItem('user')
    navigate('/login')
    window.location.reload()
  }

  const getRoleColor = (role) => {
    if (role === 'superadmin') return 'danger'
    if (role === 'admin') return 'primary'
    return 'success'
  }

  const getRoleLabel = (role) => {
    if (role === 'superadmin') return 'Super Admin'
    if (role === 'admin') return 'Admin'
    return 'Employee'
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.body' }}>
      <Sheet
        variant="soft"
        sx={{
          p: 3,
          mb: 3,
          borderRadius: 0,
          borderBottom: '1px solid',
          borderColor: 'divider'
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: 1200, mx: 'auto' }}>
          <Typography level="h3">Employee Management</Typography>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <Chip
              color={getRoleColor(user.role)}
              variant="soft"
              size="lg"
            >
              {getRoleLabel(user.role)}
            </Chip>
            <Button variant="outlined" color="neutral" onClick={handleLogout}>
              Logout
            </Button>
          </Box>
        </Box>
      </Sheet>

      <Box sx={{ maxWidth: 1200, mx: 'auto', p: 3 }}>
        <Card
          variant="soft"
          sx={{
            mb: 4,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white'
          }}
        >
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Avatar size="lg" sx={{ bgcolor: 'rgba(255,255,255,0.2)' }}>
                {user.username.charAt(0).toUpperCase()}
              </Avatar>
              <Box>
                <Typography level="h2" sx={{ color: 'white', mb: 0.5 }}>
                  Welcome back, {user.username}!
                </Typography>
                <Typography level="body-md" sx={{ color: 'rgba(255,255,255,0.9)' }}>
                  Manage your employees and access all features from here
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>

        <Grid container spacing={2}>
          {(user.role === 'admin' || user.role === 'superadmin') && (
            <Grid xs={12} sm={6} md={4}>
              <Card
                variant="outlined"
                sx={{
                  height: '100%',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  '&:hover': {
                    boxShadow: 'md',
                    transform: 'translateY(-4px)'
                  }
                }}
                onClick={() => navigate('/register')}
              >
                <CardContent>
                  <Typography level="h4" sx={{ mb: 1 }}>
                    Register Employee
                  </Typography>
                  <Typography level="body-sm" color="neutral">
                    Add a new employee to the system
                  </Typography>
                  <Button
                    variant="soft"
                    color="primary"
                    fullWidth
                    sx={{ mt: 2 }}
                  >
                    Register Now
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          )}

          {(user.role === 'admin' || user.role === 'superadmin') && (
            <Grid xs={12} sm={6} md={4}>
              <Card
                variant="outlined"
                sx={{
                  height: '100%',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  '&:hover': {
                    boxShadow: 'md',
                    transform: 'translateY(-4px)'
                  }
                }}
                onClick={() => navigate('/employees')}
              >
                <CardContent>
                  <Typography level="h4" sx={{ mb: 1 }}>
                    View Employees
                  </Typography>
                  <Typography level="body-sm" color="neutral">
                    Browse and manage all employees
                  </Typography>
                  <Button
                    variant="soft"
                    color="primary"
                    fullWidth
                    sx={{ mt: 2 }}
                  >
                    View List
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          )}

          <Grid xs={12} sm={6} md={4}>
            <Card variant="outlined" sx={{ height: '100%' }}>
              <CardContent>
                <Typography level="h4" sx={{ mb: 1 }}>
                  Profile
                </Typography>
                <Typography level="body-sm" color="neutral" sx={{ mb: 2 }}>
                  Username: <strong>{user.username}</strong>
                </Typography>
                <Typography level="body-sm" color="neutral" sx={{ mb: 2 }}>
                  Email: <strong>{user.email || 'N/A'}</strong>
                </Typography>
                <Chip
                  color={getRoleColor(user.role)}
                  variant="soft"
                  size="sm"
                >
                  {getRoleLabel(user.role)}
                </Chip>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}

export default Home