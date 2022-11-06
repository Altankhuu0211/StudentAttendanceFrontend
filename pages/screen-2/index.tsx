import * as React from 'react'
import MainLayout from '@layouts/MainLayout'
import RecordAttendanceContainer from '@containers/recordAttendance'
import type { NextPage } from 'next'

const Home: NextPage = () => {
  return (
    <MainLayout>
      <RecordAttendanceContainer />
    </MainLayout>
  )
}

export default Home
