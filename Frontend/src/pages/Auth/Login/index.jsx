import React from 'react'
import {
  Card,
  CardContent,
  Typography,
  Input,
  Button,
  Box,
  Sheet,
  Alert
} from '@mui/joy'
import { Navigate } from 'react-router-dom'
import useLogin from './useLogin'

function Login() {
  const user = JSON.parse(localStorage.getItem('user'))
  if(user) {
    return <Navigate to="/" />
  }
  const {formData, handleChange, handleSubmit, isLoading, error} = useLogin()
  
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        p: 2
      }}
    >
      <Card
        sx={{
          width: '100%',
          maxWidth: 400,
          boxShadow: 'lg'
        }}
      >
        <CardContent sx={{ p: 4 }}>
          <Typography level="h2" sx={{ mb: 1, textAlign: 'center' }}>
            Welcome Back
          </Typography>
          <Typography level="body-sm" sx={{ mb: 3, textAlign: 'center', color: 'neutral.500' }}>
            Sign in to your account
          </Typography>

          {error && (
            <Alert color="danger" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Input
              placeholder="Username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              size="lg"
              required
              disabled={isLoading}
            />
            <Input
              type="password"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              size="lg"
              required
              disabled={isLoading}
            />
            <Button
              onClick={handleSubmit}
              loading={isLoading}
              size="lg"
              fullWidth
              sx={{ mt: 1 }}
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  )
}

export default Login