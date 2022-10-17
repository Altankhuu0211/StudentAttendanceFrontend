import React from 'react'
import Colors from '@theme/colors'

// components
import { Box, Typography } from '@mui/material'

export type Props = { isLandingPage?: boolean }

const Header: React.FC<Props> = () => {
  return (
    <Box component="header">
      <Box
        sx={{
          width: '100%',
          // height: '40px',
          py: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          bgcolor: '#587597',
        }}
      >
        <Box sx={{ display: 'flex' }}>
          <Box sx={{ width: 20, height: 35, ml: 2 }}>
            <img
              src="/img/shutis.svg"
              height="100%"
              width="100%"
              style={{ objectFit: 'cover' }}
            />
          </Box>
          <Box sx={{ width: 180 }}>
            <Typography
              sx={{
                fontFamily: 'Arial, Helvetica, sans-serif',
                fontSize: '10px',
                fontWeight: 700,
                color: 'white',
                textAlign: 'center',
              }}
            >
              ШИНЖЛЭХ УХААН ТЕХНОЛОГИЙН ИХ СУРГУУЛЬ
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box sx={{ bgcolor: '#E9E9E9', py: 1 }}>
        <Typography
          sx={{
            color: '#333333',
            fontFamily: 'Arial, Helvetica, sans-serif',
            fontSize: '11px',
          }}
        >
          Гарах
        </Typography>
      </Box>
    </Box>
  )
}

export default Header
