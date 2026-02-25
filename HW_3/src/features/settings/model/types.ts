export type Language = 'ru' | 'en'
export type Theme = 'light' | 'dark'

export interface SettingsState {
  language: Language
  theme: Theme
  pageSize: number
}
