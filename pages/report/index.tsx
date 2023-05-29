import * as React from 'react'
import MainLayout from '@layouts/MainLayout'
import ReportContainer from '@containers/report'
import type { NextPage } from 'next'

const ReportPage: NextPage = () => {
  return (
    <MainLayout>
      <ReportContainer />
    </MainLayout>
  )
}

export default ReportPage
