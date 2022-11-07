import * as React from 'react'
import MainLayout from '@layouts/MainLayout'
import ViewAttendanceContainer from '@containers/viewAttendance'
import type { NextPage } from 'next'

const Home: NextPage = () => {
  return (
    <MainLayout>
      <ViewAttendanceContainer />
    </MainLayout>
  )
}

export default Home
