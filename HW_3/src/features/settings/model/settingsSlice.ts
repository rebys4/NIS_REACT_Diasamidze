import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../../app/store/store'
import type { Language, SettingsState, Theme } from './types'

const initialState: SettingsState = {
  language: 'ru',
  theme: 'light',
  pageSize: 12,
}

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<Language>) => {
      state.language = action.payload
    },
    setTheme: (state, action: PayloadAction<Theme>) => {
      state.theme = action.payload
    },
    setPageSize: (state, action: PayloadAction<number>) => {
      state.pageSize = action.payload
    },
  },
})

export const { setLanguage, setTheme, setPageSize } = settingsSlice.actions
export const settingsReducer = settingsSlice.reducer

export const selectLanguage = (state: RootState) => state.settings.language
export const selectTheme = (state: RootState) => state.settings.theme
export const selectPageSize = (state: RootState) => state.settings.pageSize
