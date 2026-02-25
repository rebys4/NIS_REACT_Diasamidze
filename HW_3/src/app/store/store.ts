import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { baseApi } from '../../shared/api/baseApi'
import { authReducer } from '../../entities/user/model/authSlice'
import { settingsReducer } from '../../features/settings/model/settingsSlice'
import { loadSettings, saveSettings } from '../../shared/lib/storage/settingsStorage'

const preloadedSettings = loadSettings()

export const store = configureStore({
  reducer: {
    auth: authReducer,
    settings: settingsReducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseApi.middleware),
  preloadedState: {
    settings: preloadedSettings,
  },
})

store.subscribe(() => {
  saveSettings(store.getState().settings)
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
