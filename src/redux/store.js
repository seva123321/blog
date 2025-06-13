/* eslint-disable import/prefer-default-export */
/* eslint-disable implicit-arrow-linebreak */
import { configureStore } from '@reduxjs/toolkit'

import Encryption from '@/services/encryption'

import userApi from './userApi'
import articleApi from './articleApi'
import userReducer from './userSlice'

export const createStore = async () => {
  let preloadedState = {}
  try {
    const userData = localStorage.getItem('user')
    if (userData) {
      const cryptoService = new Encryption()
      const encrypted = JSON.parse(userData)
      const decrypted = await cryptoService.decrypt(encrypted)
      preloadedState = { user: decrypted }
    }
  } catch (error) {
    localStorage.removeItem('user')
  }

  return configureStore({
    reducer: {
      user: userReducer,
      [userApi.reducerPath]: userApi.reducer,
      [articleApi.reducerPath]: articleApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(articleApi.middleware, userApi.middleware),
    devTools: import.meta.env.VITE_MODE !== 'production',
    preloadedState,
  })
}
