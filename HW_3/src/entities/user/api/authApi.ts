import { baseApi } from '../../../shared/api/baseApi'
import type { LoginRequest, LoginResponse, User } from '../model/types'

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<LoginResponse, LoginRequest>({
      query: (body) => ({
        url: '/auth/login',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['User'],
    }),
    getMe: build.query<User, void>({
      query: () => '/auth/me',
      providesTags: ['User'],
    }),
  }),
})

export const { useLoginMutation, useGetMeQuery } = authApi
