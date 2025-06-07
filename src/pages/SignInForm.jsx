import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { toast, ToastContainer } from 'react-toastify'
import { yupResolver } from '@hookform/resolvers/yup'
import { useDispatch } from 'react-redux'

import Input from '@/components/Input'
import ROUTES from '@/services/routes'
import { SignInSchema } from '@/services/validationSchemas'
import { useLoginMutation, saveUser } from '@/redux'

function SignInForm() {
  const {
    // reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(SignInSchema) })
  const [serverErrors, setServerErrors] = useState(null)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [loginUser, { isError, error }] = useLoginMutation()
  // const location = useLocation()
  // console.log('location > ', location)
  // const fromPage = location.state.from || '/'

  const submitForm = async (data) => {
    try {
      const result = await loginUser(data).unwrap()
      if (isError) {
        setServerErrors(result.error)
        // return
      }
      if (error) {
        toast.error(error.data.errors)
        return
      }

      if (result.user) {
        dispatch(saveUser(result.user))
      }
      navigate(ROUTES.HOME)
    } catch (err) {
      const message = Object.entries(err.data.errors)
      toast.error(`Ошибка: ${message.join('')}`)
      // toast.error(`Ошибка: ${err.data.errors}`)
    }
  }

  return (
    <section>
      <form
        className="mx-auto max-w-sm space-y-4 bg-white px-8 py-12 shadow-2xl"
        action=""
        onSubmit={handleSubmit(submitForm)}
      >
        <span className="block text-center text-2xl">Sign In</span>
        <Input
          type="email"
          label="Email address"
          autoComplete="email"
          {...register('email')}
          error={serverErrors?.data.errors?.email || errors.email?.message}
        />
        <Input
          type="password"
          autoComplete="password"
          error={
            serverErrors?.data.errors?.password || errors.password?.message
          }
          {...register('password')}
        />

        <button
          type="submit"
          className="mt-3 mb-2 w-full cursor-pointer rounded-md bg-[#1890FF] px-4 py-3 font-medium text-white transition-colors hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
        >
          Login
        </button>

        <span className="flex justify-center text-xs text-[#8C8C8C]">
          Don’t have an account?&nbsp;
          <Link to={ROUTES.SIGN_UP} className="text-[#1890FF] hover:underline">
            Sign Up.
          </Link>
        </span>
      </form>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover
        theme="light"
      />
    </section>
  )
}
export default SignInForm
