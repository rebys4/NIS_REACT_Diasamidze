import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../../app/store/store'
import { authApi } from '../api/authApi'
import type { AuthState, User } from './types'

const TOKEN_KEY = 'hw3_access_token'

const initialState: AuthState = {
  token: localStorage.getItem(TOKEN_KEY),
  user: null,
  isSessionChecked: false,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null
      state.user = null
      state.isSessionChecked = true
      localStorage.removeItem(TOKEN_KEY)
    },
    setToken: (state, action: PayloadAction<string | null>) => {
      state.token = action.payload
      if (action.payload) {
        localStorage.setItem(TOKEN_KEY, action.payload)
      } else {
        localStorage.removeItem(TOKEN_KEY)
      }
    },
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload
    },
    setSessionChecked: (state, action: PayloadAction<boolean>) => {
      state.isSessionChecked = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(authApi.endpoints.login.matchFulfilled, (state, action) => {
      state.user = {
        id: action.payload.id,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        email: action.payload.email,
        username: action.payload.username,
      }

      const token = action.payload.accessToken ?? action.payload.token
      if (token) {
        state.token = token
        localStorage.setItem(TOKEN_KEY, token)
      }
    })

    builder.addMatcher(authApi.endpoints.getMe.matchFulfilled, (state, action) => {
      state.user = action.payload
    })

    builder.addMatcher(authApi.endpoints.getMe.matchRejected, (state) => {
      state.token = null
      state.user = null
      localStorage.removeItem(TOKEN_KEY)
    })
  },
})

export const { logout, setToken, setUser, setSessionChecked } = authSlice.actions
export const authReducer = authSlice.reducer

export const selectAuthToken = (state: RootState) => state.auth.token
export const selectAuthUser = (state: RootState) => state.auth.user
export const selectSessionChecked = (state: RootState) => state.auth.isSessionChecked
export const selectIsAuthorized = (state: RootState) => Boolean(state.auth.token)
