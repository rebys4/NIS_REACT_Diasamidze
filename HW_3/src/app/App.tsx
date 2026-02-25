import { AppRouter } from './router/AppRouter'
import { useBootstrapAuth } from './hooks/useBootstrapAuth'
import { useSyncAppSettings } from './hooks/useSyncAppSettings'
import { FullPageLoader } from '../shared/ui/FullPageLoader'
import { ErrorBoundary } from '../shared/ui/ErrorBoundary'

export const App = () => {
  const isReady = useBootstrapAuth()
  useSyncAppSettings()

  if (!isReady) {
    return <FullPageLoader />
  }

  return (
    <ErrorBoundary>
      <AppRouter />
    </ErrorBoundary>
  )
}
