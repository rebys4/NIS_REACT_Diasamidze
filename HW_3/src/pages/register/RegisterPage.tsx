import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { RoutePath } from '../../shared/config/routes'

const RegisterPage = () => {
  const { t } = useTranslation()

  return (
    <div className="fullpage-center">
      <div className="card">
        <h1>{t('auth.registerTitle')}</h1>
        <p>{t('auth.registerStub')}</p>
        <Link to={RoutePath.login}>{t('auth.title')}</Link>
      </div>
    </div>
  )
}

export default RegisterPage
