import * as React from 'react'
import MainLayout from '@layouts/MainLayout'
import AttendanceContainer from '@containers/attendance'
import type { NextPage } from 'next'

const AttendancePage: NextPage = () => {
  return (
    <MainLayout>
      <AttendanceContainer />
    </MainLayout>
  )
}

export default AttendancePage
