import { useTranslation } from 'react-i18next'

export const FullPageLoader = () => {
  const { t } = useTranslation()

  return (
    <div className="fullpage-center">
      <p>{t('common.loading')}</p>
    </div>
  )
}
