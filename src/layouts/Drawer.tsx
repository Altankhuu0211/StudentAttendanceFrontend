import React from 'react'
import Colors from '@theme/colors'

import { Box } from '@mui/material'
import MenuDrawer from '@components/MenuDrawer'
import { DRAWER_WIDTH } from '@constants/common'

export type Props = {}

const Drawer: React.FC<Props> = () => {
  return (
    <Box sx={{ display: { xs: 'none', sm: 'none', md: 'flex' } }}>
      <Box
        component="nav"
        sx={{ width: DRAWER_WIDTH, bgcolor: Colors.lightWhite }}
      >
        <MenuDrawer />
      </Box>
    </Box>
  )
}

export default Drawer
