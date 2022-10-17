import * as React from 'react'
import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Toolbar,
} from '@mui/material'

const drawerWidth = 240

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window
}

export default function ResponsiveDrawer(props: Props) {
  const { window } = props
  const [mobileOpen, setMobileOpen] = React.useState(false)

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const drawer = (
    <>
      <Toolbar sx={{ height: 85 }} />
      <Divider />
      <List>
        {['Нүүр', 'Багш', 'Хичээл', 'Ирц бүртгэл'].map((text, index) => (
          <>
            <ListItem key={text} disablePadding>
              <ListItemButton sx={{ bgcolor: '#587597' }}>
                <ListItemText primary={text} sx={{ color: '#FFFFFF' }} />
              </ListItemButton>
            </ListItem>
            <Divider />
          </>
        ))}
      </List>
    </>
  )

  const container =
    window !== undefined ? () => window().document.body : undefined

  return (
    <Box sx={{ display: 'flex', zIndex: -1 }}>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
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
