import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { useLoginMutation } from '../../../entities/user/api/authApi'
import { RoutePath } from '../../../shared/config/routes'

interface FormErrors {
  username?: string
  password?: string
}

export const LoginForm = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [login, { isLoading }] = useLoginMutation()

  const [username, setUsername] = useState('emilys')
  const [password, setPassword] = useState('emilyspass')
  const [errors, setErrors] = useState<FormErrors>({})
  const [serverError, setServerError] = useState<string>('')

  const validate = () => {
    const nextErrors: FormErrors = {}

    if (!username.trim()) {
      nextErrors.username = t('auth.usernameRequired')
    }
    if (!password.trim()) {
      nextErrors.password = t('auth.passwordRequired')
    }

    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setServerError('')

    if (!validate()) {
      return
    }

    try {
      await login({ username, password }).unwrap()
      navigate(RoutePath.dashboard, { replace: true })
    } catch {
      setServerError(t('auth.invalid'))
    }
  }

  return (
    <form className="card" onSubmit={onSubmit}>
      <h1>{t('auth.title')}</h1>

      <label>
        {t('auth.username')}
        <input value={username} onChange={(event) => setUsername(event.target.value)} />
      </label>
      {errors.username ? <p className="field-error">{errors.username}</p> : null}

      <label>
        {t('auth.password')}
        <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
      </label>
      {errors.password ? <p className="field-error">{errors.password}</p> : null}

      {serverError ? <p className="field-error">{serverError}</p> : null}

      <button type="submit" disabled={isLoading}>
        {isLoading ? t('common.loading') : t('auth.submit')}
      </button>
    </form>
  )
}
