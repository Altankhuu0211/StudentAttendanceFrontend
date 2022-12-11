import React, { useEffect, useState } from 'react'
import Colors from '@theme/colors'
import { useRouter } from 'next/router'
import { t } from 'i18next'

import {
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Typography,
  ListItemIcon,
} from '@mui/material'

import {
  Home as IconHome,
  Lock as IconLock,
  PowerSettingsNew as IconPower,
  AccountBox as IconAccount,
  List as IconList,
} from '@mui/icons-material'
import { PageRoutes } from '@constants/routes.constants'
import { removeFromStorage, getFromStorage } from '@utils/common'

export type Props = {}

const MenuDrawer: React.FC<Props> = () => {
  const router = useRouter()
  const [permission, setPermission] = useState<string>('')
  const [userCode, setUserCode] = useState<string>('')

  useEffect(() => {
    setPermission(getFromStorage('permission') || '')
    setUserCode(getFromStorage('user_code') || '')
  }, [])

  const onSubmitHandler = () => {
    removeFromStorage('user_code')
    removeFromStorage('token')
    removeFromStorage('user_name')
    removeFromStorage('permission')
    router.push(PageRoutes.LOGIN)
  }

  return (
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
              {userCode}
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
              onClick={onSubmitHandler}
            >
              {`${t('common.logout')}`}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box>
        <List sx={{ mt: -1 }}>
          {permission == '3' &&
            ['Нүүр', 'Багш', 'Хичээл'].map((text, index) => (
              <ListItem
                key={index}
                disablePadding
                sx={{ borderBottom: '1px solid white' }}
              >
                <ListItemButton
                  sx={{
                    bgcolor: Colors.primary,
                    '&:hover': { bgcolor: Colors.secondary },
                  }}
                  onClick={() => router.push('#')}
                >
                  <ListItemIcon>
                    <IconList sx={{ color: Colors.lightWhite, mr: 1 }} />
                  </ListItemIcon>

                  <ListItemText
                    primary={text}
                    sx={{
                      color: Colors.mainWhite,
                      fontFamily: 'Arial, Helvetica, sans-serif',
                      fontSize: '10px',
                      textTransform: 'uppercase',
                    }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          {permission == '3' && (
            <ListItem disablePadding>
              <ListItemButton
                sx={{
                  bgcolor:
                    router.pathname == PageRoutes.HOME ||
                    router.pathname == PageRoutes.ATTENDANCE ||
                    router.pathname == PageRoutes.REPORT
                      ? Colors.secondary
                      : Colors.primary,
                  '&:hover': { bgcolor: Colors.secondary },
                }}
                onClick={() => router.push(PageRoutes.HOME)}
              >
                <ListItemIcon>
                  <IconList sx={{ color: Colors.lightWhite, mr: 1 }} />
                </ListItemIcon>

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
          )}
          {permission == '2' && (
            <ListItem disablePadding>
              <ListItemButton
                sx={{
                  bgcolor:
                    router.pathname == PageRoutes.FORM
                      ? Colors.secondary
                      : Colors.primary,
                  '&:hover': { bgcolor: Colors.secondary },
                }}
                onClick={() => router.push(PageRoutes.FORM)}
              >
                <ListItemIcon>
                  <IconList sx={{ color: Colors.lightWhite, mr: 1 }} />
                </ListItemIcon>

                <ListItemText
                  primary="Оюутны үнэмлэхний дугаар бүртгэх"
                  sx={{
                    color: Colors.mainWhite,
                    fontFamily: 'Arial, Helvetica, sans-serif',
                    fontSize: '10px',
                    textTransform: 'uppercase',
                  }}
                />
              </ListItemButton>
            </ListItem>
          )}
        </List>
      </Box>
    </>
  )
}

export default MenuDrawer
