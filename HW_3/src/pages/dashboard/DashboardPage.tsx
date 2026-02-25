import { useTranslation } from 'react-i18next'

const DashboardPage = () => {
  const { t } = useTranslation()

  return (
    <section className="card">
      <h1>{t('dashboard.title')}</h1>
      <p>{t('dashboard.subtitle')}</p>
    </section>
  )
}

export default DashboardPage
