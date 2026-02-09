import React from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent
} from '@mui/joy'

const NotFound = () => {
    const navigate = useNavigate()
    
    return (
        <Box
          sx={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            p: 3
          }}
        >
          <Card
            sx={{
              maxWidth: 500,
              textAlign: 'center',
              boxShadow: 'lg'
            }}
          >
            <CardContent sx={{ p: 4 }}>
              <Typography level="h1" sx={{ fontSize: '6rem', mb: 2, color: 'primary.500' }}>
                404
              </Typography>
              <Typography level="h3" sx={{ mb: 2 }}>
                Page Not Found
              </Typography>
              <Typography level="body-md" color="neutral" sx={{ mb: 3 }}>
                The page you're looking for doesn't exist or has been moved.
              </Typography>
              <Button
                size="lg"
                onClick={() => navigate('/')}
                sx={{ minWidth: 200 }}
              >
                Go to Home
              </Button>
            </CardContent>
          </Card>
        </Box>
    )
}

export default NotFound