import * as React from 'react'
import MainLayout from '@layouts/MainLayout'
import FormContainer from '@containers/form'
import type { NextPage } from 'next'

const FormPage: NextPage = () => {
  return (
    <MainLayout>
      <FormContainer />
    </MainLayout>
  )
}

export default FormPage
