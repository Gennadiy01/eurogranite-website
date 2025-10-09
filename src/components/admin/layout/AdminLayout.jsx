/**
 * AdminLayout Component
 *
 * Main layout wrapper for admin panel with navigation
 */

import React, { useEffect, useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import useAuthStore from '../../../stores/useAuthStore';
import styles from './AdminLayout.module.scss';

const AdminLayout = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const [apiHealthy, setApiHealthy] = useState(null);

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  // Перевірка health API
  useEffect(() => {
    const checkAPI = async () => {
      try {
        const response = await axios.get('http://localhost:5000/health', { timeout: 3000 });
        setApiHealthy(response.data.status === 'ok');
      } catch (error) {
        setApiHealthy(false);
      }
    };

    checkAPI();
    const interval = setInterval(checkAPI, 30000); // Кожні 30 сек
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.adminLayout}>
      {/* Header with Navigation */}
      <header className={styles.adminHeader}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <h1 className={styles.adminTitle}>🏠 EuroGranite Admin</h1>

          {/* API Status Indicator */}
          <div
            className={styles.apiStatus}
            title={apiHealthy === null ? 'Перевірка...' : apiHealthy ? 'API працює' : 'API недоступний'}
            style={{
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              backgroundColor: apiHealthy === null ? '#fbbf24' : apiHealthy ? '#22c55e' : '#ef4444',
              animation: apiHealthy === null ? 'pulse 2s infinite' : 'none'
            }}
          />
        </div>

        <nav className={styles.adminNav}>
          <NavLink
            to="/admin"
            end
            className={({ isActive }) =>
              `${styles.navLink} ${isActive ? styles.active : ''}`
            }
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/admin/products"
            className={({ isActive }) =>
              `${styles.navLink} ${isActive ? styles.active : ''}`
            }
          >
            Products
          </NavLink>

          {/* User Info */}
          {user && (
            <span className={styles.userInfo}>
              👤 {user.username}
            </span>
          )}

          <button onClick={handleLogout} className={styles.logoutButton}>
            🚪 Вийти
          </button>
        </nav>
      </header>

      {/* Main Content Area */}
      <main className={styles.adminContent}>
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
