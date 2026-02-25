import { Suspense, lazy } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { AppLayout } from '../../widgets/layout/AppLayout'
import { PublicOnlyRoute, RequireAuth } from './guards'
import { RoutePath } from '../../shared/config/routes'
import { FullPageLoader } from '../../shared/ui/FullPageLoader'

const DashboardPage = lazy(() => import('../../pages/dashboard/DashboardPage'))
const LoginPage = lazy(() => import('../../pages/login/LoginPage'))
const RegisterPage = lazy(() => import('../../pages/register/RegisterPage'))
const ProductsPage = lazy(() => import('../../pages/products/ProductsPage'))
const ProductDetailsPage = lazy(() => import('../../pages/product-details/ProductDetailsPage'))
const ProfilePage = lazy(() => import('../../pages/profile/ProfilePage'))
const SettingsPage = lazy(() => import('../../pages/settings/SettingsPage'))
const LogoutPage = lazy(() => import('../../pages/logout/LogoutPage'))
const NotFoundPage = lazy(() => import('../../pages/not-found/NotFoundPage'))

export const AppRouter = () => {
  return (
    <Suspense fallback={<FullPageLoader />}>
      <Routes>
        <Route
          path={RoutePath.login}
          element={
            <PublicOnlyRoute>
              <LoginPage />
            </PublicOnlyRoute>
          }
        />
        <Route
          path={RoutePath.register}
          element={
            <PublicOnlyRoute>
              <RegisterPage />
            </PublicOnlyRoute>
          }
        />

        <Route
          element={
            <RequireAuth>
              <AppLayout />
            </RequireAuth>
          }
        >
          <Route path={RoutePath.dashboard} element={<DashboardPage />} />
          <Route path={RoutePath.products} element={<ProductsPage />} />
          <Route path={RoutePath.productDetails} element={<ProductDetailsPage />} />
          <Route path={RoutePath.profile} element={<ProfilePage />} />
          <Route path={RoutePath.settings} element={<SettingsPage />} />
          <Route path={RoutePath.logout} element={<LogoutPage />} />
        </Route>

        <Route path={RoutePath.notFound} element={<NotFoundPage />} />
        <Route path="*" element={<Navigate to={RoutePath.notFound} replace />} />
      </Routes>
    </Suspense>
  )
}
