import * as React from 'react'
import Colors from '@theme/colors'
import { useRouter } from 'next/router'
import { t } from 'i18next'

import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Typography,
} from '@mui/material'

import {
  Home as IconHome,
  Lock as IconLock,
  PowerSettingsNew as IconPower,
  AccountBox as IconAccount,
  List as IconList,
} from '@mui/icons-material'
import { PageRoutes } from '@constants/routes.constants'

const drawerWidth = 218

export type Props = {}

const MenuDrawer: React.FC<Props> = () => {
  const router = useRouter()
  const drawer = (
    <>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          borderRight: `1px solid ${Colors.lineGrey}`,
          boxShadow: `inset 0 0 5px #ccc`,
        }}
      >
        <IconAccount sx={{ fontSize: '90px' }} />
        <Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'left',
            }}
          >
            <IconHome sx={{ fontSize: '18px' }} />
            <Typography variant="body2" sx={{ color: Colors.textBlack }}>
              J.SW301
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'left',
            }}
          >
            <IconLock sx={{ fontSize: '18px' }} />
            <Typography variant="body2" sx={{ color: Colors.textBlack }}>
              {`${t('common.change_password')}`}
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'left',
            }}
          >
            <IconPower sx={{ fontSize: '18px' }} />
            <Typography
              variant="body2"
              sx={{
                color: Colors.textBlack,
                '&:hover': { textDecoration: 'underline', cursor: 'pointer' },
              }}
              onClick={() => router.push(PageRoutes.LOGIN)}
            >
              {`${t('common.logout')}`}
            </Typography>
          </Box>
        </Box>
      </Box>
      <List sx={{ mt: -1 }}>
        {['Нүүр', 'Багш', 'Хичээл'].map((text, index) => (
          <div key={index}>
            <ListItem key={text} disablePadding>
              <ListItemButton
                sx={{
                  bgcolor: Colors.primary,
                  '&:hover': { bgcolor: Colors.secondary },
                }}
                onClick={() => router.push('#')}
              >
                <IconList sx={{ color: Colors.lightWhite, mr: 1 }} />
                <ListItemText
                  primary={text}
                  sx={{
                    color: '#FFFFFF',
                    fontFamily: 'Arial, Helvetica, sans-serif',
                    fontSize: '10px',
                    textTransform: 'uppercase',
                  }}
                />
              </ListItemButton>
            </ListItem>
            <Divider />
          </div>
        ))}
        <ListItem disablePadding>
          <ListItemButton
            sx={{
              bgcolor: Colors.secondary,
              '&:hover': { bgcolor: Colors.secondary },
            }}
            onClick={() => router.push(PageRoutes.HOME)}
          >
            <IconList sx={{ color: Colors.lightWhite, mr: 1 }} />
            <ListItemText
              primary="Ирц бүртгэл"
              sx={{
                color: Colors.mainWhite,
                fontFamily: 'Arial, Helvetica, sans-serif',
                fontSize: '10px',
                textTransform: 'uppercase',
              }}
            />
          </ListItemButton>
        </ListItem>
      </List>
    </>
  )

  return (
    <Box sx={{ display: 'flex' }}>
      <Box
        component="nav"
        sx={{ width: drawerWidth, bgcolor: Colors.lightWhite }}
      >
        {drawer}
      </Box>
    </Box>
  )
}

export default MenuDrawer
