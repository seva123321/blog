import * as yup from 'yup'

const RegExpEmail = /^\S+@\S+\.\S+$/

export const SignUpSchema = yup.object().shape({
  username: yup
    .string()
    .trim()
    .required('This field is required!')
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

export const SignInSchema = yup.object().shape({})
