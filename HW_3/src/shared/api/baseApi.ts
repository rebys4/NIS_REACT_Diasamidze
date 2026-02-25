import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { AuthState } from '../../entities/user/model/types'

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://dummyjson.com',
    prepareHeaders: (headers, { getState }) => {
      const state = getState() as { auth: AuthState }
      const token = state.auth.token

      if (token) {
        headers.set('Authorization', `Bearer ${token}`)
      }

      return headers
    },
  }),
  tagTypes: ['User', 'Products', 'Product'],
  endpoints: () => ({}),
})
