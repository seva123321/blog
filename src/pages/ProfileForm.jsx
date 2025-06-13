import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toast, ToastContainer } from 'react-toastify'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import ROUTES from '@/services/routes'
import Input from '@/components/Input'
import { ProfileSchema } from '@/services/validationSchemas'
import { useUpdateUserMutation, useGetUserQuery, saveUser } from '@/redux'

// Компонент-обертка для формы
function ProfileFormWrapper() {
  const { data, isLoading, isError } = useGetUserQuery()
  const navigate = useNavigate()
  const token = useSelector((state) => state.user.token)
  if (!token) {
    navigate(ROUTES.SIGN_IN)
  }
  if (isLoading) return <h1 className="text-center">Loading...</h1>
  if (isError) return <h1 className="text-center">Error Loading!</h1>
  if (!data?.user) return <h1 className="text-center">No user data</h1>

  return <ProfileFormWithData initialData={data.user} />
}

// Основной компонент формы
function ProfileFormWithData({ initialData }) {
  const [updateUser] = useUpdateUserMutation()
  const dispatch = useDispatch()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      username: initialData.username || '',
      email: initialData.email || '',
      password: '',
      image: initialData.image || '',
    },
    resolver: yupResolver(ProfileSchema),
  })

  const submitForm = async (formData) => {
    try {
      const result = await updateUser(formData).unwrap()

      if (result.user) {
        dispatch(saveUser(result.user))
      }

      toast.success('Profile updated successfully!')
    } catch (error) {
      toast.error('Update failed')
    }
  }

  return (
    <section>
      <form
        className="mx-auto max-w-sm space-y-4 bg-white px-8 py-12 shadow-2xl"
        onSubmit={handleSubmit(submitForm)}
      >
        <span className="block text-center text-2xl">Edit Profile</span>

        <Input
          type="text"
          label="Username"
          autoComplete="username"
          containerClass="mb-4"
          {...register('username')}
          error={errors.username?.message}
        />

        <Input
          type="email"
          label="Email address"
          autoComplete="email"
          containerClass="mb-4"
          {...register('email')}
          error={errors.email?.message}
        />

        <Input
          type="password"
          autoComplete="password"
          label="New password"
          placeholder="New password"
          containerClass="mb-4"
          {...register('password')}
          error={errors.password?.message}
        />

        <Input
          type="url"
          label="Avatar image (url)"
          containerClass="mb-4"
          placeholder="Avatar image"
          {...register('image')}
          error={errors.image?.message}
        />

        <button
          type="submit"
          className="mt-3 mb-2 w-full cursor-pointer rounded-md bg-[#1890FF] px-4 py-3 font-medium text-white transition-colors hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
        >
          Save
        </button>
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

export default ProfileFormWrapper
