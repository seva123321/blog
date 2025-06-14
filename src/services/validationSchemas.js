import * as yup from 'yup'

const RegExpEmail = /(^[a-z][a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$)/
const RegExpUser = /^[a-z][a-z0-9]*$/

export const SignUpSchema = yup.object().shape({
  username: yup
    .string()
    .trim()
    .required('This field is required!')
    .matches(
      RegExpUser,
      'You can only use lowercase English letters and numbers',
    )
    .min(3, 'Minimum 3 characters required')
    .max(25, 'Maximum length is 25 characters'),
  email: yup
    .string()
    .required('This field is required!')
    .matches(RegExpEmail, 'Invalid email format'),
  password: yup
    .string()
    .required('This field is required!')
    .min(6, 'Minimum 6 characters required')
    .max(40, 'Maximum length is 40 characters'),
  repeatPassword: yup
    .string()
    .required('This field is required!')
    .oneOf([yup.ref('password')], 'Passwords do not match'),
  agreement: yup
    .boolean()
    .oneOf([true], 'You must agree to continue')
    .required('You must agree to continue'),
})

export const SignInSchema = yup.object().shape({
  email: yup
    .string()
    .required('This field is required!')
    .matches(RegExpEmail, 'Invalid email format'),
  password: yup
    .string()
    .required('This field is required!')
    .min(6, 'Minimum 6 characters required')
    .max(40, 'Maximum length is 40 characters'),
})

export const EditFormSchema = yup.object().shape({
  title: yup.string().required('This field is required!'),
  description: yup.string().required('This field is required!'),
  body: yup.string().required('This field is required!'),
})

export const ProfileSchema = yup.object().shape({
  username: yup
    .string()
    .trim()
    .required('This field is required!')
    .matches(
      RegExpUser,
      'You can only use lowercase English letters and numbers',
    )
    .min(3, 'Minimum 3 characters required')
    .max(25, 'Maximum length is 25 characters'),
  email: yup
    .string()
    .required('This field is required!')
    .matches(RegExpEmail, 'Invalid email format'),
  password: yup
    .string()
    .required('This field is required!')
    .min(6, 'Minimum 6 characters required')
    .max(40, 'Maximum length is 40 characters'),
  image: yup
    .string()
    .url('Должен быть корректным URL')
    .test('is-valid-image-url', 'URL должен вести на изображение', (value) => {
      if (!value) return true

      const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp']
      return imageExtensions.some((ext) => value.toLowerCase().endsWith(ext))
    })
    .test('is-valid-url', 'URL должен использовать HTTPS', (value) => {
      if (!value) return true
      return value.startsWith('https://')
    }),
})
