import React from 'react'
import { Box } from '@mui/material'
import Header from '@layouts/Header'
import Drawer from '@layouts/Drawer'
import Colors from '@theme/colors'

export type MainLayoutProps = {
  children: React.ReactNode
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <Box component="main">
      <Header />
      <Box sx={{ display: 'flex', bgcolor: Colors.lightWhite }}>
        <Drawer />
        <Box
          sx={{
            flexGrow: 1,
            p: 3,
            width: { sm: `calc(100% - 240px)` },
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  )
}

export default MainLayout
