import { Button } from 'antd'
import { useForm } from 'react-hook-form'
import { useAppDispatch } from '../redux/hooks'
import { useLoginMutation } from '../redux/features/auth/authApi'
import { setUser } from '../redux/features/auth/authSlice'
import { verifyToken } from '../utils/verifyToken'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { register, handleSubmit } = useForm({
    defaultValues: {
      userId: 'A-0011',
      password: 'newpassword',
    },
  })

  const [login, { error }] = useLoginMutation()

  const onSubmit = async (data) => {
    const userInfo = {
      id: data.userId,
      password: data.password,
    }

    const response = await login(userInfo).unwrap()
    const user = verifyToken(response.data.accessToken)

    dispatch(
      setUser({
        user: user,
        token: response.data.accessToken,
      })
    )
    navigate(`/${user.role}/dashboard`)
  }
  return (
    <form className='p-12' onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor='id'>ID: </label>
        <input type='text' id='id' {...register('userId')} />
      </div>
      <div>
        <label htmlFor='password'>Password: </label>
        <input type='text' id='password' {...register('password')} />
      </div>
      <Button htmlType='submit'>Login</Button>
    </form>
  )
}

export default Login
