import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { toast, ToastContainer } from 'react-toastify'
import { yupResolver } from '@hookform/resolvers/yup'

import { useRegisterMutation, saveUser } from '@/redux'
import Input from '@/components/Input'
import ROUTES from '@/services/routes'
import { SignUpSchema } from '@/services/validationSchemas'

function SignUpForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    defaultValues: {},
    resolver: yupResolver(SignUpSchema),
  })
  const [serverErrors, setServerErrors] = useState(null)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [registerUser, { isError, error }] = useRegisterMutation()

  const submitForm = async (data) => {
    try {
      const result = await registerUser(data).unwrap()
      if (isError) setServerErrors(result.error)
      if (error) {
        toast.error(error.data.errors.message)
        return
      }
      if (result.user) {
        dispatch(saveUser(result.user))
      }
      navigate(ROUTES.HOME)
    } catch (err) {
      toast.error(`Ошибка: ${err}`)
    }
  }

  return (
    <section>
      <form
        className="mx-auto max-w-sm space-y-4 bg-white px-8 py-12 shadow-2xl"
        onSubmit={handleSubmit(submitForm)}
      >
        <span className="block text-center text-2xl">Create new account</span>

        <Input
          type="text"
          label="Username"
          autoComplete="username"
          containerClass="mb-4"
          error={
            serverErrors?.data.errors?.username || errors.username?.message
          }
          {...register('username')}
        />

        <Input
          type="email"
          label="Email address"
          autoComplete="email"
          containerClass="mb-4"
          {...register('email')}
          error={serverErrors?.data.errors?.email || errors.email?.message}
        />

        <Input
          type="password"
          label="Password"
          autoComplete="new-password"
          containerClass="mb-4"
          {...register('password')}
          error={
            serverErrors?.data.errors?.password || errors.password?.message
          }
        />

        <Input
          type="password"
          label="Repeat Password"
          autoComplete="new-password"
          containerClass="mb-4"
          {...register('repeatPassword')}
          error={errors.repeatPassword?.message}
        />

        <hr className="border-0.5 border-[#BFBFBF]" />

        <Input
          {...register('agreement')}
          type="checkbox"
          value
          autoComplete="off"
          containerClass="mb-4"
          label="I agree to the processing of my personal information"
          error={errors.agreement?.message}
        />

        <button
          type="submit"
          className="mt-3 mb-2 w-full cursor-pointer rounded-md bg-[#1890FF] px-4 py-3 font-medium text-white transition-colors hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
        >
          Create
        </button>

        <span className="flex justify-center text-xs text-[#8C8C8C]">
          Already have an account?&nbsp;
          <Link to={ROUTES.SIGN_IN} className="text-[#1890FF] hover:underline">
            Sign In.
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
export default SignUpForm
