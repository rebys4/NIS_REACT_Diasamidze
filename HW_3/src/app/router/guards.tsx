import type { PropsWithChildren } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAppSelector } from '../../shared/lib/hooks'
import { selectIsAuthorized } from '../../entities/user/model/authSlice'
import { RoutePath } from '../../shared/config/routes'

export const RequireAuth = ({ children }: PropsWithChildren) => {
  const isAuthorized = useAppSelector(selectIsAuthorized)
  const location = useLocation()

  if (!isAuthorized) {
    return <Navigate to={RoutePath.login} state={{ from: location }} replace />
  }

  return children
}

export const PublicOnlyRoute = ({ children }: PropsWithChildren) => {
  const isAuthorized = useAppSelector(selectIsAuthorized)

  if (isAuthorized) {
    return <Navigate to={RoutePath.dashboard} replace />
  }

  return children
}
