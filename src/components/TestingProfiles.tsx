import { Box, Card, CardContent, Typography } from '@mui/material'
import React from 'react'
import { testUsers } from '../const/const'
import { InfoOutlined } from '@mui/icons-material'

const TestingProfiles = () => {
  return (
    <>
      <Box sx={{ mt: '90px' }}>
        {testUsers.map((user, index) => (
          <Card
            variant="outlined"
            key={index}
            sx={{
              borderColor: '#1976d2',
              borderWidth: 1,
              borderRadius: 2,
              marginBottom: 2,
            }}
          >
            <CardContent>
              <Box sx={{ display: 'flex' }}>
                <InfoOutlined color="primary" sx={{ mr: 1 }} />
                <Box
                  sx={{
                    display: 'flex',
                    marginBottom: '1',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                  }}
                >
                  <Typography sx={{ fontWeight: 500, fontSize: '16px' }}>
                    {user.name}
                  </Typography>

                  <Typography sx={{ fontWeight: 400, fontSize: '14px' }}>
                    Логин: {user.login}
                  </Typography>
                  <Typography sx={{ fontWeight: 400, fontSize: '14px' }}>
                    Пароль: {user.password}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
    </>
  )
}

export default TestingProfiles
