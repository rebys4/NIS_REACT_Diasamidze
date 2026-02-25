import type { SettingsState } from '../../../features/settings/model/types'

const SETTINGS_KEY = 'hw3_settings'

export const loadSettings = (): SettingsState => {
  const fallback: SettingsState = {
    language: 'ru',
    theme: 'light',
    pageSize: 12,
  }

  try {
    const raw = localStorage.getItem(SETTINGS_KEY)
    if (!raw) {
      return fallback
    }

    const parsed = JSON.parse(raw) as Partial<SettingsState>
    return {
      language: parsed.language === 'en' ? 'en' : 'ru',
      theme: parsed.theme === 'dark' ? 'dark' : 'light',
      pageSize: typeof parsed.pageSize === 'number' && parsed.pageSize > 0 ? parsed.pageSize : 12,
    }
  } catch {
    return fallback
  }
}

export const saveSettings = (settings: SettingsState) => {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings))
}
