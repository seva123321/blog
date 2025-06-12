/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  articles: [],
  articlesCount: null,
  limitQuery: 20,
}

const articleSlice = createSlice({
  name: 'article',
  initialState,
  reducers: {
    addArticles(state, action) {
      const { articles = [], articlesCount } = action.payload

      state.articles = [...state.articles, ...articles]
      state.articlesCount = articlesCount
    },
  },
})

export const { addArticles } = articleSlice.actions

export default articleSlice.reducer
