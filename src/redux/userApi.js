import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import Encryption from '@/services/encryption'

import BASE_URL from '../config'

const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}`,
    prepareHeaders: async (headers) => {
      const userData = localStorage.getItem('user')
      if (!userData) return headers

      try {
        const cryptoService = new Encryption()
        const userDecrypted = await cryptoService.decrypt(JSON.parse(userData))
        headers.set('Content-Type', 'application/json')

        if (userDecrypted?.token) {
          headers.set('Authorization', `Token ${userDecrypted.token}`)
        }

        return headers
      } catch (error) {
        return headers
      }
    },
  }),
  endpoints: (build) => ({
    register: build.mutation({
      query: (body) => ({
        url: '/users',
        method: 'POST',
        body: { user: { ...body } },
      }),
    }),
    login: build.mutation({
      query: (body) => ({
        url: '/users/login',
        method: 'POST',
        body: { user: { ...body } },
      }),
    }),
    getUser: build.query({
      query: () => '/user',
    }),
    updateUser: build.mutation({
      query: (body) => ({
        url: '/user',
        method: 'PUT',
        body: { user: { ...body } },
      }),
      invalidatesTags: ['Profile'],
    }),
  }),
})

export const {
  useRegisterMutation,
  useLoginMutation,
  useGetUserQuery,
  useUpdateUserMutation,
} = userApi

export default userApi
