import { useMutation } from 'react-query'
import { login } from '@services/index'

type ParamProps = {
  username: string
  password: string
}

const useLogin = () => {
  const { data, mutateAsync } = useMutation(login)
  const onSubmitHandler = (payload: ParamProps) => {
    const res = mutateAsync(payload, { onSuccess: () => data })
    return res
  }
  return {
    onSubmitHandler: onSubmitHandler,
  }
}
export default useLogin
