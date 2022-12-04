import { useMemo } from 'react'
import { Controller, useForm } from 'react-hook-form'
import * as Yup from 'yup'
const { yupResolver } = require('@hookform/resolvers/yup')
import { t } from 'i18next'

export const initialValues = {
  student_id: '',
  chip_number: '',
}

const useFormValidation = () => {
  const validationSchema = useMemo(
    () =>
      Yup.object().shape({
        student_id: Yup.string().required(t('validation.required')),
        chip_number: Yup.string().required(t('validation.required')),
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

export default useFormValidation
