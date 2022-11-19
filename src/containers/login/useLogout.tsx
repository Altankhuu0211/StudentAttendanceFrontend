import { useMutation } from 'react-query'
import { logout } from '@services/index'
import { useRouter } from 'next/router'
import { PageRoutes } from '@constants/routes.constants'

const useLogout = () => {
  const router = useRouter()
  const { mutate } = useMutation(logout, {
    onSuccess: () => {
      localStorage.removeItem('token')
      router.push(PageRoutes.LOGIN)
    },
  })
  return {
    mutate: mutate,
  }
}
export default useLogout
