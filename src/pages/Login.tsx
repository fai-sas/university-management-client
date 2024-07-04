import { Button } from 'antd'
import { useForm } from 'react-hook-form'

const Login = () => {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      userId: 'A-0002',
      password: 'admin123',
    },
  })

  const onSubmit = async (data) => {
    console.log(data)
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
