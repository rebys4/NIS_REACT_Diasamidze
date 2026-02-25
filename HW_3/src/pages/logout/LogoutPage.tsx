import { useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { useAppDispatch } from '../../shared/lib/hooks'
import { logout } from '../../entities/user/model/authSlice'
import { RoutePath } from '../../shared/config/routes'
import { baseApi } from '../../shared/api/baseApi'

const LogoutPage = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(logout())
    dispatch(baseApi.util.resetApiState())
  }, [dispatch])

  return <Navigate to={RoutePath.login} replace />
}

export default LogoutPage
