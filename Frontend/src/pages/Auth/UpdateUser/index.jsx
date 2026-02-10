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
  Alert,
  CircularProgress
} from '@mui/joy'
import useUpdateUser from './useUpdateUser'
import { RoleBasedWrapper } from '../Register'

function UpdateUser() {
    const {formData, handleChange, handleSubmit, isLoading, isFetching, error} = useUpdateUser()
    
    if (isFetching) {
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
              <CardContent sx={{ p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                <CircularProgress />
                <Typography level="body-md" color="neutral">
                  Loading user data...
                </Typography>
              </CardContent>
            </Card>
          </Box>
        </RoleBasedWrapper>
      )
    }
    
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
                Update Employee
              </Typography>
              <Typography level="body-sm" sx={{ mb: 3, textAlign: 'center', color: 'neutral.500' }}>
                Update employee information
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
                <Button
                  onClick={handleSubmit}
                  loading={isLoading}
                  size="lg"
                  fullWidth
                  sx={{ mt: 1 }}
                >
                  {isLoading ? 'Updating...' : 'Update'}
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </RoleBasedWrapper>
    )
}

export default UpdateUser

