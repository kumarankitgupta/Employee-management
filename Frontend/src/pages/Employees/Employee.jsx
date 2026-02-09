import React from 'react'
import {
  Table,
  Sheet,
  Box,
  Typography,
  CircularProgress,
  Chip,
  Button,
  Card
} from '@mui/joy'
import { useNavigate } from 'react-router-dom'
import { RoleBasedWrapper } from '../Auth/Register'
import useEmployee from './useEmployee'

function Employee() {
  const { loading, employeeData } = useEmployee()
  const navigate = useNavigate()

  return (
    <RoleBasedWrapper>
      <Box sx={{ minHeight: '100vh', bgcolor: 'background.body' }}>
        <Box sx={{ maxWidth: 1400, mx: 'auto', p: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography level="h2">
              Employee Management
            </Typography>
            <Button
              variant="outlined"
              onClick={() => navigate('/')}
            >
              Back to Home
            </Button>
          </Box>

          {loading ? (
            <Card variant="soft" sx={{ p: 4 }}>
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2 }}>
                <CircularProgress />
                <Typography level="body-md" color="neutral">
                  Loading employee data...
                </Typography>
              </Box>
            </Card>
          ) : employeeData && employeeData.length > 0 ? (
            <Card variant="outlined">
              <Box sx={{ p: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
                <Typography level="title-md">
                  Total Employees: <Chip size="sm" variant="soft" color="primary">{employeeData.length}</Chip>
                </Typography>
              </Box>
              <Sheet
                variant="plain"
                sx={{
                  overflow: 'auto',
                  borderRadius: 0,
                }}
              >
                <Table
                  aria-label="employee table"
                  stickyHeader
                  hoverRow
                  sx={{
                    '--TableCell-headBackground': 'var(--joy-palette-background-level1)',
                    '--Table-headerUnderlineThickness': '1px',
                    '--TableRow-hoverBackground': 'var(--joy-palette-background-level1)',
                    '--TableCell-paddingY': '14px',
                    '--TableCell-paddingX': '20px',
                  }}
                >
                  <thead>
                    <tr>
                      <th style={{ width: '80px', textAlign: 'center' }}>ID</th>
                      <th style={{ width: '150px' }}>Username</th>
                      <th style={{ width: '250px' }}>Email</th>
                      <th style={{ width: '120px' }}>Role</th>
                      <th style={{ width: '150px' }}>Registered By</th>
                    </tr>
                  </thead>
                  <tbody>
                    {employeeData.map((employee) => (
                      <tr key={employee.id}>
                        <td style={{ textAlign: 'center' }}>
                          <Typography level="body-sm" fontWeight="md">
                            {employee.id}
                          </Typography>
                        </td>
                        <td>
                          <Typography level="body-md" fontWeight="md">
                            {employee.username}
                          </Typography>
                        </td>
                        <td>
                          <Typography level="body-sm" color="neutral">
                            {employee.email}
                          </Typography>
                        </td>
                        <td>
                          <Chip
                            size="sm"
                            variant="soft"
                            color={
                              employee.role === 'superadmin'
                                ? 'danger'
                                : employee.role === 'admin'
                                ? 'primary'
                                : 'success'
                            }
                          >
                            {employee.role === 'superadmin' ? 'Super Admin' : employee.role === 'admin' ? 'Admin' : 'Employee'}
                          </Chip>
                        </td>
                        <td>
                          <Typography level="body-sm">
                            {employee.registered_by}
                          </Typography>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Sheet>
            </Card>
          ) : (
            <Card variant="soft">
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', p: 6 }}>
                <Typography level="h4" sx={{ mb: 1 }}>
                  No Employees Found
                </Typography>
                <Typography level="body-md" color="neutral" sx={{ mb: 3 }}>
                  There are no employees in the system yet.
                </Typography>
                <Button
                  variant="soft"
                  onClick={() => navigate('/register')}
                >
                  Register First Employee
                </Button>
              </Box>
            </Card>
          )}
        </Box>
      </Box>
    </RoleBasedWrapper>
  )
}

export default Employee