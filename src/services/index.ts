import { api } from '@utils/axios'
import { URI } from '@constants/uri.constants'

// export const fetchExample = (params, page: number, limit?: number) => {
//   return api({
//     url: URI.GET_EXAMPLE,
//     params: { q: params, page: page, limit: limit },
//   })
// }

// export const fetchExample = () => {
//   return api({ url: URI.GET_EXAMPLE })
// }

// export const getExample = (slug) => {
//   return api({ url: URI.GET_EXAMPLE.replace(/:id/gi, slug) })
// }

// export const postExample = (payload) => {
//   return api({
//     url: URI.POST_EXAMPLE,
//     method: 'POST',
//     data: JSON.stringify(payload),
//   })
// }

export const postBookNow = (formData) => {
  return api({
    url: URI.CREATE_ORDER,
    method: 'POST',
    data: JSON.stringify(formData),
  })
}
