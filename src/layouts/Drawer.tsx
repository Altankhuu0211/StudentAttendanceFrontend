import * as React from 'react'
import Colors from '@theme/colors'
import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Toolbar,
  Typography,
} from '@mui/material'

import {
  Home as IconHome,
  Lock as IconLock,
  PowerSettingsNew as IconPower,
  AccountBox as IconAccount,
} from '@mui/icons-material'

const drawerWidth = 218

export type Props = {}

const MenuDrawer: React.FC<Props> = () => {
  const drawer = (
    <>
      <Toolbar sx={{ height: 40 }} />
      <Box
        sx={{
          bgcolor: Colors.mainWhite,
          display: 'flex',
          alignItems: 'center',
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
              Нууц үг солих
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
            <Typography variant="body2" sx={{ color: Colors.textBlack }}>
              Гарах
            </Typography>
          </Box>
        </Box>
      </Box>

      <List sx={{ mt: -1 }}>
        {['Нүүр', 'Багш', 'Хичээл', 'Ирц бүртгэл'].map((text, index) => (
          <div key={index}>
            <ListItem key={text} disablePadding>
              <ListItemButton sx={{ bgcolor: '#587597' }}>
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
      </List>
    </>
  )

  return (
    <Box sx={{ display: 'flex', zIndex: -1 }}>
      <Box component="nav" sx={{ width: drawerWidth }}>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            position: 'fixed',
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  )
}

export default MenuDrawer
