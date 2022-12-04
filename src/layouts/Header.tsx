import React from 'react'
import Colors from '@theme/colors'
import { t } from 'i18next'

// components
import { Box, Typography } from '@mui/material'
import {
  ExpandMore as IconExpandMore,
  PowerSettingsNew as IconPower,
} from '@mui/icons-material'
import { useRouter } from 'next/router'
import { PageRoutes } from '@constants/routes.constants'
import { getFromStorage, setToStorage } from '@utils/common'

export type Props = {}

const Header: React.FC<Props> = () => {
  const router = useRouter()

  const onSubmitHandler = () => {
    setToStorage('user_code', undefined)
    setToStorage('token', undefined)
    setToStorage('user_name', undefined)
    setToStorage('permission', undefined)
    router.push(PageRoutes.LOGIN)
  }

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
          <Box sx={{ width: 178 }}>
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
            {`${t('common.welcome')} `}
            {getFromStorage('user_fname')}
          </Typography>
          <IconExpandMore />
        </Box>
        <Box
          sx={{
            width: 70,
            height: 22,
            borderLeft: '1px solid #D5D5D5',
            borderRight: '1px solid #D5D5D5',
            mr: 3,
            display: 'flex',
            justifyContent: 'center',
            '&:hover': { bgcolor: '#E6E6E6', cursor: 'pointer' },
            pt: 0.3,
          }}
          onClick={onSubmitHandler}
        >
          <IconPower sx={{ fontSize: '16px', mr: 0.2 }} />
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
