import { useTranslation } from 'react-i18next'
import { useAppDispatch, useAppSelector } from '../../../shared/lib/hooks'
import {
  selectLanguage,
  selectPageSize,
  selectTheme,
  setLanguage,
  setPageSize,
  setTheme,
} from '../model/settingsSlice'

export const SettingsForm = () => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const language = useAppSelector(selectLanguage)
  const theme = useAppSelector(selectTheme)
  const pageSize = useAppSelector(selectPageSize)

  return (
    <div className="card">
      <h1>{t('settings.title')}</h1>

      <label>
        {t('settings.language')}
        <select value={language} onChange={(event) => dispatch(setLanguage(event.target.value as 'ru' | 'en'))}>
          <option value="ru">RU</option>
          <option value="en">EN</option>
        </select>
      </label>

      <label>
        {t('settings.theme')}
        <select value={theme} onChange={(event) => dispatch(setTheme(event.target.value as 'light' | 'dark'))}>
          <option value="light">{t('settings.light')}</option>
          <option value="dark">{t('settings.dark')}</option>
        </select>
      </label>

      <label>
        {t('settings.pageSize')}
        <select value={pageSize} onChange={(event) => dispatch(setPageSize(Number(event.target.value)))}>
          <option value={6}>6</option>
          <option value={12}>12</option>
          <option value={24}>24</option>
        </select>
      </label>
    </div>
  )
}
