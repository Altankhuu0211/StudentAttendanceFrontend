import axios from 'axios'
import { URI } from '@constants/uri.constants'
import { getFromStorage } from './common'

// const client = axios.create({ baseURL: 'http://localhost:8000' })
const client = axios.create({
  headers: {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
    Authorization: `Bearer ${String(getFromStorage('token'))}`,
  },
  baseURL: URI.DOMAIN,
})

export const api = ({ ...options }) => {
  client.defaults.headers.common.Authorization = 'Bearer token'
  const onSuccess = (response) => response
  const onError = (error) => {
    return error.response
  }

  return client(options).then(onSuccess).catch(onError)
}
