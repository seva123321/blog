/* eslint-disable import/prefer-default-export */
/* eslint-disable implicit-arrow-linebreak */
import { configureStore } from '@reduxjs/toolkit'

import articleApi from './articleApi'

export const store = configureStore({
  reducer: {
    [articleApi.reducerPath]: articleApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(articleApi.middleware),
})
