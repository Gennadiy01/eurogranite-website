import React from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import useAuthStore from '../../../stores/authStore'
import './AdminNavigation.scss'

const AdminNavigation = ({ pageType = '' }) => {
  const navigate = useNavigate()
  const location = useLocation()
  const { logout } = useAuthStore()

  const handleLogout = () => {
    logout()
    navigate('/admin')
  }

  // Налаштування для різних типів сторінок
  const getPageConfig = () => {
    const currentPath = location.pathname

    if (currentPath.includes('/admin/products')) {
      return {
        title: 'Управління продуктами',
        siteLink: '/ua/products',
        siteLinkText: 'Переглянути каталог продуктів'
      }
    } else if (currentPath.includes('/admin/gallery')) {
      return {
        title: 'Управління галереєю',
        siteLink: '/ua/gallery',
        siteLinkText: 'Переглянути галерею проектів'
      }
    } else if (currentPath.includes('/admin/articles')) {
      return {
        title: 'Управління статтями',
        siteLink: '/ua/articles',
        siteLinkText: 'Переглянути статті блогу'
      }
    } else {
      return {
        title: 'Адміністративна панель',
        siteLink: '/ua',
        siteLinkText: 'Перейти на головну сторінку сайту'
      }
    }
  }

  const config = getPageConfig()

  return (
    <div className="admin-navigation">
      <div className="admin-nav-container">
        {/* Логотип та назва */}
        <div className="admin-nav-brand">
          <Link to="/admin/dashboard" className="admin-nav-logo">
            <span className="logo-text">EuroGranite</span>
            <span className="admin-badge">Адмін</span>
          </Link>
        </div>


        {/* Дії користувача */}
        <div className="admin-nav-actions">
          {/* Кнопка переходу на сайт */}
          <a
            href={config.siteLink}
            target="_blank"
            rel="noopener noreferrer"
            className="admin-nav-btn admin-nav-btn--site"
            title={config.siteLinkText}
          >
            <span className="btn-icon">🌐</span>
            <span className="btn-text">Сайт</span>
          </a>

          {/* Кнопка повернення на головну адмінпанелі */}
          {!location.pathname.includes('/admin/dashboard') && (
            <Link
              to="/admin/dashboard"
              className="admin-nav-btn admin-nav-btn--home"
              title="Повернутися на головну адмінпанелі"
            >
              <span className="btn-icon">🏠</span>
              <span className="btn-text">Головна</span>
            </Link>
          )}

          {/* Кнопка виходу */}
          <button
            onClick={handleLogout}
            className="admin-nav-btn admin-nav-btn--logout"
            title="Вийти з адмінпанелі"
          >
            <span className="btn-icon">🚪</span>
            <span className="btn-text">Вихід</span>
          </button>
        </div>
      </div>

      {/* Хлібні крошки для навігації */}
      <div className="admin-breadcrumbs">
        <div className="breadcrumbs-container">
          {location.pathname === '/admin/dashboard' ? (
            <span className="breadcrumb-current">Головна</span>
          ) : (
            <>
              <Link to="/admin/dashboard" className="breadcrumb-item">
                Головна
              </Link>
              <span className="breadcrumb-separator">›</span>
              <span className="breadcrumb-current">{config.title}</span>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default AdminNavigation