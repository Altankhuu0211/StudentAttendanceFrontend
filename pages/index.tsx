import { useEffect } from 'react'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { PageRoutes } from '@constants/routes.constants'

const Home: NextPage = () => {
  const router = useRouter()

  useEffect(() => {
    if (router.isReady) router.replace(PageRoutes.LOGIN)
  }, [router])

  return <></>
}

export default Home
