import React from 'react'
import Colors from '@theme/colors'

// components
import { Box, Typography, Divider, TextField, Button } from '@mui/material'

type Props = {}

const LoginContainer: React.FC<Props> = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <Box
        sx={{
          width: '100vw',
          bgcolor: '#051D88',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Typography
          sx={{
            color: Colors.mainWhite,
            fontSize: '16px',
            p: '10px',
            textTransform: 'uppercase',
          }}
        >
          МОНГОЛ УЛСЫН ТЕХНОЛОГИЙН ИХ СУРГУУЛЬ
        </Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          width: 450,
          py: '40px',
          px: '90px',
        }}
      >
        <Typography
          sx={{
            color: '#08158e',
            fontSize: '20px',
            fontWeight: 700,
            textTransform: 'uppercase',
          }}
        >
          Багшийн веб
        </Typography>
        <Divider sx={{ width: '270px', my: 2 }} />
        <TextField
          variant="outlined"
          fullWidth
          sx={{ mt: 2, mb: 4 }}
          placeholder="Багшийн код"
        />
        <TextField variant="outlined" fullWidth placeholder="Нууц үг" />
        <Button
          variant="contained"
          fullWidth
          sx={{ my: 4, color: '#08158e', bgcolor: '#FFC20E', fontWeight: 700 }}
        >
          Нэвтрэх
        </Button>
        <img src="/img/login.png" style={{ objectFit: 'cover' }} />
      </Box>
      <Box
        sx={{
          width: '100vw',
          bgcolor: '#051D88',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Typography sx={{ color: Colors.mainWhite, fontSize: '14px' }}>
          © 2022 Мэдээллийн технологийн төв
        </Typography>
      </Box>
    </Box>
  )
}

export default LoginContainer
