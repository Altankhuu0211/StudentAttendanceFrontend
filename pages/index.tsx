import { useEffect } from 'react'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { PageRoutes } from '@constants/routes.constants'
import { Box, CircularProgress } from '@mui/material'

const Landing: NextPage = () => {
  const router = useRouter()

  useEffect(() => {
    if (router.isReady) router.replace(PageRoutes.LOGIN)
  }, [router])

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <CircularProgress />
    </Box>
  )
}

export default Landing
