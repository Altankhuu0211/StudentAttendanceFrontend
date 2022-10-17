import * as React from 'react'
import MainLayout from '@layouts/MainLayout'
import ScheduleContainer from '@containers/schedule'
import type { NextPage } from 'next'

const Home: NextPage = () => {
  return (
    <MainLayout>
      <ScheduleContainer />
    </MainLayout>
  )
}

export default Home
