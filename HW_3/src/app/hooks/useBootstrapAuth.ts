import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../shared/lib/hooks'
import { authApi } from '../../entities/user/api/authApi'
import { selectAuthToken, selectSessionChecked, setSessionChecked } from '../../entities/user/model/authSlice'

export const useBootstrapAuth = () => {
  const dispatch = useAppDispatch()
  const token = useAppSelector(selectAuthToken)
  const isSessionChecked = useAppSelector(selectSessionChecked)

  const query = authApi.useGetMeQuery(undefined, {
    skip: !token,
  })

  useEffect(() => {
    if (!token && !isSessionChecked) {
      dispatch(setSessionChecked(true))
    }
  }, [dispatch, token, isSessionChecked])

  useEffect(() => {
    if (!token) {
      return
    }

    if (query.isSuccess || query.isError) {
      dispatch(setSessionChecked(true))
    }
  }, [dispatch, query.isError, query.isSuccess, token])

  return token ? isSessionChecked && !query.isLoading : isSessionChecked
}
