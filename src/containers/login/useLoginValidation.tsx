import { useMemo } from 'react'
import { Controller, useForm } from 'react-hook-form'
import * as Yup from 'yup'
const { yupResolver } = require('@hookform/resolvers/yup')
import { t } from 'i18next'

export const initialValues = {
  username: '',
  password: '',
}

const useLoginValidation = () => {
  const validationSchema = useMemo(
    () =>
      Yup.object().shape({
        username: Yup.string().required(t('validation.required')),
        password: Yup.string().required(t('validation.required')),
      }),
    []
  )

  const methods = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: initialValues,
    mode: 'onBlur',
  })

  return { Controller, methods, initialValues }
}

export default useLoginValidation
