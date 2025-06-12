/* eslint-disable indent */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { PAGINATION_LIMIT } from '@/services/utils'
import Encryption from '@/services/encryption'

import BASE_URL from '../config'

const articleApi = createApi({
  reducerPath: 'articleApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/articles`,
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
  tagTypes: ['Article'],
  endpoints: (build) => ({
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
                type: 'Article',
                id: slug,
              })),
              { type: 'Article', id: 'LIST' },
            ]
          : [{ type: 'Article', id: 'LIST' }]
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

    getArticleBySlug: build.query({
      query: (slug) => `/${slug}`,
      providesTags: (result, error, slug) => [{ type: 'Article', id: slug }],
    }),
    postArticle: build.mutation({
      query: (body) => ({
        url: '',
        method: 'POST',
        body: { article: { ...body } },
      }),
      invalidatesTags: [{ type: 'Article', id: 'LIST' }],
    }),
    updateArticle: build.mutation({
      query: ({ body, slug }) => ({
        url: `/${slug}`,
        method: 'PUT',
        body: { article: { ...body } },
      }),
      invalidatesTags: (result, error, { slug }) => [
        { type: 'Article', id: slug },
        { type: 'Article', id: 'LIST' },
      ],
    }),
    likedArticle: build.mutation({
      query: (slug) => ({
        url: `/${slug}/favorite`,
        method: 'POST',
      }),
      invalidatesTags: (result, error, { slug }) => [
        { type: 'Article', id: slug },
        { type: 'Article', id: 'LIST' },
      ],
    }),
    unLikedArticle: build.mutation({
      query: (slug) => ({
        url: `/${slug}/favorite`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, { slug }) => [
        { type: 'Article', id: slug },
        { type: 'Article', id: 'LIST' },
      ],
    }),
    deleteArticle: build.mutation({
      query: (slug) => ({
        url: `/${slug}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Article', id: 'LIST' }],
    }),
  }),
})
export const {
  useGetArticlesQuery,
  useGetArticleBySlugQuery,
  usePostArticleMutation,
  useUpdateArticleMutation,
  useLikedArticleMutation,
  useUnLikedArticleMutation,
  useDeleteArticleMutation,
  useLazyGetArticlesQuery,
} = articleApi

export default articleApi
