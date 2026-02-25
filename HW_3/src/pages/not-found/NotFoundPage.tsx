import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { RoutePath } from '../../shared/config/routes'

const NotFoundPage = () => {
  const { t } = useTranslation()

  return (
    <div className="fullpage-center">
      <div className="card">
        <h1>404</h1>
        <p>{t('errors.notFound')}</p>
        <Link to={RoutePath.dashboard}>{t('nav.dashboard')}</Link>
      </div>
    </div>
  )
}

export default NotFoundPage
