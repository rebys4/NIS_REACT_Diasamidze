import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { LoginForm } from '../../features/auth/ui/LoginForm'
import { RoutePath } from '../../shared/config/routes'

const LoginPage = () => {
  const { t } = useTranslation()

  return (
    <div className="fullpage-center">
      <div>
        <LoginForm />
        <p>
          <Link to={RoutePath.register}>{t('auth.registerTitle')}</Link>
        </p>
      </div>
    </div>
  )
}

export default LoginPage
