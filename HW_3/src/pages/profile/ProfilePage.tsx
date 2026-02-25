import { useTranslation } from 'react-i18next'
import { useAppSelector } from '../../shared/lib/hooks'
import { selectAuthUser } from '../../entities/user/model/authSlice'
import { useGetMeQuery } from '../../entities/user/api/authApi'
import { ErrorState } from '../../shared/ui/States'
import { FullPageLoader } from '../../shared/ui/FullPageLoader'

const ProfilePage = () => {
  const { t } = useTranslation()
  const user = useAppSelector(selectAuthUser)
  const { isLoading, isError } = useGetMeQuery()

  if (isLoading && !user) {
    return <FullPageLoader />
  }

  if (isError || !user) {
    return <ErrorState />
  }

  return (
    <section className="card">
      <h1>{t('profile.title')}</h1>
      <p>
        {t('profile.name')}: {user.firstName} {user.lastName}
      </p>
      <p>
        {t('profile.email')}: {user.email}
      </p>
    </section>
  )
}

export default ProfilePage
