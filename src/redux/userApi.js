import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import BASE_URL from '../config'

const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/users`,
    prepareHeaders: (headers) => {
      headers.set('Content-Type', 'application/json')
      return headers
    },
  }),
  endpoints: (build) => ({
    register: build.mutation({
      query: (body) => ({
        url: '',
        method: 'POST',
        body: { user: { ...body } },
        // headers: {
        //   'Custom-Header': 'value',
        // },
      }),
    }),
    login: build.mutation({
      query: (body) => ({
        url: '/login',
        method: 'POST',
        body: { user: { ...body } },
        // headers: {
        //   'Custom-Header': 'value',
        // },
      }),
    }),
  }),
})

export const { useRegisterMutation, useLoginMutation } = userApi

export default userApi

// возврат данных postUserRegister

// {
//     "data": {
//         "user": {
//             "username": "wwerty",
//             "email": "qdd@mail.ru",
//             "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
// eyJpZCI6IjY4NDA3OTBkNWVmZjZlMWIwMGQyNzc5NSIsIn
// VzZXJuYW1lIjoid3dlcnR5IiwiZXhwIjoxNzU0MjM5NzU3LCJpYXQiOjE3NDkwNTU3NTd9.
// dB0CtQuHkhi3HS3bbNg69SVqHngOYapXNepk1ngnsLA"
//         }
//     }
// }
