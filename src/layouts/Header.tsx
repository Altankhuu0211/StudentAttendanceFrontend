import React from 'react'
import Colors from '@theme/colors'
import { t } from 'i18next'

// components
import { Box, Typography } from '@mui/material'
import { ExpandMore as IconExpandMore } from '@mui/icons-material'

export type Props = {}

const Header: React.FC<Props> = () => {
  return (
    <Box component="header">
      <Box
        sx={{
          width: '100%',
          height: 40,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          bgcolor: Colors.primary,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
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
              variant="body2"
              sx={{
                fontFamily: 'Arial, Helvetica, sans-serif',
                fontSize: '10px',
                fontWeight: 700,
                color: Colors.mainWhite,
                textAlign: 'center',
                lineheight: '10px',
              }}
            >
              {`${t('common.shutis')}`}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          bgcolor: Colors.cardBg,
          height: 23,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid #D5D5D5',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: 218,
            // borderRight: '1px solid #D5D5D5',
          }}
        >
          <Typography
            variant="body2"
            sx={{
              fontFamily: 'Arial, Helvetica, sans-serif',
              fontSize: '11px',
              color: Colors.textBlack,
              ml: 2,
            }}
          >
            Сайн байна уу С.Хулан
          </Typography>
          <IconExpandMore />
        </Box>
        <Box
          sx={{
            width: 80,
            height: 23,
            borderLeft: '1px solid #D5D5D5',
            borderRight: '1px solid #D5D5D5',
            mr: 2,
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Typography
            sx={{
              color: Colors.textBlack,
              fontFamily: 'Arial, Helvetica, sans-serif',
              fontSize: '11px',
              textTransform: 'initial',
            }}
          >
            {`${t('common.logout')}`}
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}

export default Header
