import React from 'react'
import {
  Card,
  CardContent,
  Typography,
  Input,
  Button,
  Box,
  Select,
  Option,
  Alert
} from '@mui/joy'
import useRegister from './useRegister'

function Register() {
    const {formData, handleChange, handleSubmit, isLoading, error} = useRegister()
    
    return (
      <RoleBasedWrapper>
        <Box
          sx={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            p: 3,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
          }}
        >
          <Card
            sx={{
              width: '100%',
              maxWidth: 450,
              boxShadow: 'lg'
            }}
          >
            <CardContent sx={{ p: 4 }}>
              <Typography level="h2" sx={{ mb: 1, textAlign: 'center' }}>
                Register Employee
              </Typography>
              <Typography level="body-sm" sx={{ mb: 3, textAlign: 'center', color: 'neutral.500' }}>
                Create a new employee account
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
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  size="lg"
                  required
                  disabled={isLoading}
                />
                <Select
                  placeholder="Select Role"
                  name="role"
                  value={formData.role}
                  onChange={(event, value) => handleChange({ target: { name: 'role', value } })}
                  size="lg"
                  required
                  disabled={isLoading}
                >
                  <Option value="emp">Employee</Option>
                  <Option value="admin">Admin</Option>
                </Select>
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
                  {isLoading ? 'Registering...' : 'Register'}
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </RoleBasedWrapper>
    )
}

export function RoleBasedWrapper({children}) {
    const user = JSON.parse(localStorage.getItem('user'))
    
    if(!user || (user.role !== 'admin' && user.role !== 'superadmin')) {
        return (
          <Box
            sx={{
              minHeight: '100vh',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              p: 3
            }}
          >
            <Alert color="danger" size="lg" variant="soft">
              <Typography level="title-lg">Access Denied</Typography>
              <Typography level="body-md">
                You are not authorized to access this page. Admin or Superadmin role required.
              </Typography>
            </Alert>
          </Box>
        )
    }

    return children
}

export default Register