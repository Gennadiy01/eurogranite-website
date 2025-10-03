/**
 * AdminLayout Component
 *
 * Main layout wrapper for admin panel with navigation
 */

import React from 'react';
import { Routes, Route, NavLink, useNavigate } from 'react-router-dom';
import ProductsManager from '../../../pages/admin/ProductsManager';
import styles from './AdminLayout.module.scss';

// Dashboard placeholder (will be enhanced later)
const Dashboard = () => (
  <div style={{ padding: '2rem' }}>
    <h1 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '1rem' }}>
      Admin Dashboard
    </h1>
    <p style={{ color: '#64748b' }}>Welcome to EuroGranite Admin Panel</p>
    <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
      <div style={{
        padding: '1.5rem',
        backgroundColor: 'white',
        borderRadius: '0.75rem',
        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
        flex: 1,
      }}>
        <h3 style={{ margin: '0 0 0.5rem', color: '#1e40af' }}>📦 Products</h3>
        <p style={{ margin: 0, color: '#64748b' }}>Manage granite products</p>
      </div>
      <div style={{
        padding: '1.5rem',
        backgroundColor: 'white',
        borderRadius: '0.75rem',
        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
        flex: 1,
        opacity: 0.5,
      }}>
        <h3 style={{ margin: '0 0 0.5rem', color: '#64748b' }}>📝 Articles</h3>
        <p style={{ margin: 0, color: '#64748b' }}>Coming in Phase 1.5</p>
      </div>
    </div>
  </div>
);

const AdminLayout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // TODO: Implement logout logic in Phase 2
    console.log('Logout clicked');
    navigate('/');
  };

  return (
    <div className={styles.adminLayout}>
      {/* Header with Navigation */}
      <header className={styles.adminHeader}>
        <h1 className={styles.adminTitle}>🏠 EuroGranite Admin</h1>

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

          <button onClick={handleLogout} className={styles.logoutButton}>
            Logout
          </button>
        </nav>
      </header>

      {/* Main Content Area */}
      <main className={styles.adminContent}>
        <Routes>
          <Route index element={<Dashboard />} />
          <Route path="products" element={<ProductsManager />} />
        </Routes>
      </main>
    </div>
  );
};

export default AdminLayout;
