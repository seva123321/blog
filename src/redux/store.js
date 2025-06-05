/* eslint-disable import/prefer-default-export */
/* eslint-disable implicit-arrow-linebreak */
import { configureStore } from '@reduxjs/toolkit'

import articleApi from './articleApi'
import userApi from './userApi'
import articleReducer from './articleSlice'

export const store = configureStore({
  reducer: {
    article: articleReducer,
    [articleApi.reducerPath]: articleApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(articleApi.middleware, userApi.middleware),
  devTools: true,
})
