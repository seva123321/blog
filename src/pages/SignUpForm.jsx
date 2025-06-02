import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import Input from '@/components/Input'
import ROUTES from '@/services/routes'
import { SignUpSchema } from '@/services/validationSchemas'

function SignUpForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    defaultValues: {},
    resolver: yupResolver(SignUpSchema),
  })

  const submitForm = () => {
    // console.log('data submited', data)
    reset({})
  }

  return (
    <section>
      <form
        className="mx-auto max-w-sm space-y-4 bg-white px-8 py-12 shadow-2xl"
        action=""
        onSubmit={handleSubmit(submitForm)}
      >
        <span className="block text-center text-2xl">Create new account</span>

        <Input
          type="text"
          label="Username"
          autoComplete
          error={errors.username?.message}
          {...register('username')}
        />

        <Input
          type="email"
          label="Email address"
          autoComplete
          {...register('email')}
          error={errors.email?.message}
        />

        <Input
          type="password"
          {...register('password')}
          error={errors.password?.message}
        />
        <Input
          type="password"
          label="Repeat Password"
          {...register('repeatPassword')}
          error={errors.repeatPassword?.message}
        />
        <hr className="border-0.5 border-[#BFBFBF]" />

        <Input
          {...register('agreement')}
          type="checkbox"
          value
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
    </section>
  )
}
export default SignUpForm
