import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useAppSelector } from '../../shared/lib/hooks'
import { selectLanguage, selectTheme } from '../../features/settings/model/settingsSlice'

export const useSyncAppSettings = () => {
  const { i18n } = useTranslation()
  const language = useAppSelector(selectLanguage)
  const theme = useAppSelector(selectTheme)

  useEffect(() => {
    i18n.changeLanguage(language)
  }, [i18n, language])

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])
}
