import React from 'react'
import { Box, CircularProgress } from '@mui/material'

const Loading = () => {
  return (
    <Box
      sx={{
        position: 'fixed',
        width: '100vw',
        height: '100vh',
        top: 0,
        left: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1900,
      }}
    >
      <CircularProgress color="primary" />
    </Box>
  )
}

export default Loading
