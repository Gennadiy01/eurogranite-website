import React from 'react'
import { Link } from 'react-router-dom'
import useAuthStore from '../../stores/authStore'
import AdminNavigation from '../../components/admin/navigation/AdminNavigation'
import './Dashboard.scss'

const Dashboard = () => {
  const { user } = useAuthStore()


  const adminCards = [
    {
      id: 'products',
      title: 'Управління продуктами',
      description: 'Додавати, редагувати та видаляти продукти з каталогу',
      icon: '🏗️',
      link: '/admin/products',
      color: 'blue'
    },
    {
      id: 'gallery',
      title: 'Управління галереєю',
      description: 'Завантажувати та організовувати зображення',
      icon: '🖼️',
      link: '/admin/gallery',
      color: 'green'
    },
    {
      id: 'articles',
      title: 'Управління статтями',
      description: 'Створювати та редагувати статті блогу',
      icon: '📝',
      link: '/admin/articles',
      color: 'purple'
    }
  ]

  return (
    <div className="dashboard">
      <AdminNavigation pageType="dashboard" />

      <div className="dashboard-header">
        <div className="header-content">
          <div className="welcome-section">
            <h1>Адміністративна панель EuroGranite</h1>
            <p>Ласкаво просимо, {user?.username}!</p>
          </div>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">📊</div>
            <div className="stat-info">
              <h3>Статистика</h3>
              <p>Перегляд аналітики сайту</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">🔄</div>
            <div className="stat-info">
              <h3>Оновлення</h3>
              <p>Останнє оновлення сьогодні</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">✅</div>
            <div className="stat-info">
              <h3>Статус</h3>
              <p>Всі системи працюють</p>
            </div>
          </div>
        </div>

        <div className="admin-grid">
          {adminCards.map(card => (
            <Link
              key={card.id}
              to={card.link}
              className={`admin-card admin-card--${card.color}`}
            >
              <div className="admin-card__icon">
                {card.icon}
              </div>
              <div className="admin-card__content">
                <h3>{card.title}</h3>
                <p>{card.description}</p>
              </div>
              <div className="admin-card__arrow">
                →
              </div>
            </Link>
          ))}
        </div>

      </div>
    </div>
  )
}

export default Dashboard