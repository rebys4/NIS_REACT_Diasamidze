import { NavLink, Outlet } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { RoutePath } from '../../shared/config/routes'
import './AppLayout.css'

export const AppLayout = () => {
  const { t } = useTranslation()

  return (
    <div className="layout">
      <aside className="sidebar">
        <h2>E-commerce Admin</h2>
        <nav>
          <NavLink to={RoutePath.dashboard}>{t('nav.dashboard')}</NavLink>
          <NavLink to={RoutePath.products}>{t('nav.products')}</NavLink>
          <NavLink to={RoutePath.profile}>{t('nav.profile')}</NavLink>
          <NavLink to={RoutePath.settings}>{t('nav.settings')}</NavLink>
          <NavLink to={RoutePath.logout}>{t('nav.logout')}</NavLink>
        </nav>
      </aside>
      <main className="content">
        <header className="content-header">E-commerce Admin</header>
        <Outlet />
      </main>
    </div>
  )
}
