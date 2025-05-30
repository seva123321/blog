import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import BASE_URL from '../config'

const articleApi = createApi({
  reducerPath: 'articleApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/articles`,
  }),
  endpoints: (build) => ({
    getArticles: build.query({
      query: () => '',
    }),
    getArticleBySlug: build.query({
      query: (slug) => `/${slug}`,
    }),
    postArticle: build.mutation({
      query: (body) => ({
        url: '',
        method: 'POST',
        body,
      }),
    }),
  }),
})

export const {
  useGetArticlesQuery,
  useGetArticleBySlugQuery,
  usePostArticleMutation,
} = articleApi

export default articleApi
