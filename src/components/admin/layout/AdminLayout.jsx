/**
 * AdminLayout Component
 *
 * Main layout wrapper for admin panel with navigation
 */

import React from 'react';
import { Routes, Route, NavLink, useNavigate } from 'react-router-dom';
import styles from './AdminLayout.module.scss';

// Placeholder components (will be created later)
const Dashboard = () => (
  <div>
    <h1>Admin Dashboard</h1>
    <p>Welcome to EuroGranite Admin Panel</p>
  </div>
);

const ProductsManager = () => (
  <div>
    <h1>Products Manager</h1>
    <p>Manage your granite products here</p>
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
