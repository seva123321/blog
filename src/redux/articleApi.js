/* eslint-disable indent */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { PAGINATION_LIMIT } from '@/services/utils'

import BASE_URL from '../config'

const articleApi = createApi({
  reducerPath: 'articleApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/articles`,
  }),
  endpoints: (build) => ({
    // getArticles: build.query({
    //   query: ({ offset = 0, limit = 20 }) => ({
    //     url: '',
    //     params: { offset, limit },
    //   }),
    // }),
    getArticles: build.query({
      query: ({ offset = 0, limit = PAGINATION_LIMIT }) => ({
        url: '',
        params: { offset, limit },
      }),
      // eslint-disable-next-line arrow-body-style
      providesTags: (result) => {
        return result
          ? [
              ...result.articles.map(({ slug }) => ({
                type: 'Articles',
                id: slug,
              })),
              { type: 'Articles', id: 'PARTIAL-LIST' },
            ]
          : [{ type: 'Articles', id: 'PARTIAL-LIST' }]
      },
      // Автоматически объединяем данные для пагинации
      serializeQueryArgs: ({ queryArgs }) => ({ offset: queryArgs.offset }),
      merge: (currentCache, newItems, { arg }) => {
        if (arg.offset === 0 || !currentCache) return newItems

        return {
          ...newItems,
          articles: [...newItems.articles],
        }
      },
      // Определяем когда нужно перезаписать данные
      forceRefetch: ({ currentArg, previousArg }) =>
        // eslint-disable-next-line implicit-arrow-linebreak
        currentArg?.offset === previousArg?.offset,
    }),

    // https://blog-platform.kata.academy/api/articles?offset=20&limit=20
    // getArticlesOffset: build.query({
    //   query: ({ offset = 0, limit = 20 }) => `?offset=${offset}&limit=${limit}`,
    // }),
    getArticleBySlug: build.query({
      query: (slug) => `/${slug}`,
    }),
    postArticle: build.mutation({
      query: (body) => ({
        url: '',
        method: 'POST',
        body,
      }),
      invalidatesTags: (result, error, slug) => [
        { type: 'Articles', slug },
        { type: 'Articles', slug: 'PARTIAL-LIST' },
      ],
    }),
  }),
})
export const {
  useGetArticlesQuery,
  useGetArticleBySlugQuery,
  usePostArticleMutation,
  useLazyGetArticlesQuery,
  useGetArticlesOffsetQuery,
} = articleApi

export default articleApi

// export const articleApi = createApi({
//   reducerPath: 'articleApi',
//   baseQuery: fetchBaseQuery({ baseUrl: `${BASE_URL}/articles` }),
//   endpoints: (builder) => ({
//     getArticles: builder.query({
//       query: ({ offset = 0, limit = 20 }) => ({
//         url: '',
//         params: { offset, limit }
//       }),
//       // Автоматически объединяем данные для пагинации
//       serializeQueryArgs: ({ endpointName }) => endpointName,
//       merge: (currentCache, newItems) => {
//         currentCache.articles.push(...newItems.articles)
//       },
//       // Определяем когда нужно перезаписать данные
//       forceRefetch: ({ currentArg, previousArg }) => currentArg?.offset === 0
//     })
//   })
// })
