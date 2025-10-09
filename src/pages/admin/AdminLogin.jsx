/**
 * Admin Login Page
 * JWT authentication with username/password
 */

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../../stores/useAuthStore';
import styles from './AdminLogin.module.scss';

function AdminLogin() {
  const navigate = useNavigate();
  const { login, isAuthenticated, isLoading, error, clearError } = useAuthStore();

  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/admin');
    }
  }, [isAuthenticated, navigate]);

  // Clear error when component unmounts
  useEffect(() => {
    return () => clearError();
  }, [clearError]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (error) clearError();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.username || !formData.password) {
      return;
    }

    const result = await login(formData);

    if (result.success) {
      // Navigate to admin dashboard
      navigate('/admin');
    }
  };

  return (
    <div className={styles.loginPage}>
      <div className={styles.loginContainer}>
        <div className={styles.loginCard}>
          {/* Header */}
          <div className={styles.loginHeader}>
            <h1 className={styles.title}>EuroGranite</h1>
            <p className={styles.subtitle}>Панель Адміністратора</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className={styles.loginForm}>
            {/* Username Field */}
            <div className={styles.formGroup}>
              <label htmlFor="username" className={styles.label}>
                Логін
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                className={styles.input}
                placeholder="Введіть логін"
                disabled={isLoading}
                autoComplete="username"
                autoFocus
              />
            </div>

            {/* Password Field */}
            <div className={styles.formGroup}>
              <label htmlFor="password" className={styles.label}>
                Пароль
              </label>
              <div className={styles.passwordWrapper}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={styles.input}
                  placeholder="Введіть пароль"
                  disabled={isLoading}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className={styles.showPasswordBtn}
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoading}
                  aria-label={showPassword ? 'Сховати пароль' : 'Показати пароль'}
                >
                  {showPassword ? '🙈' : '👁️'}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className={styles.errorMessage}>
                ⚠️ {error}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className={styles.submitBtn}
              disabled={isLoading || !formData.username || !formData.password}
            >
              {isLoading ? 'Вхід...' : 'Увійти'}
            </button>
          </form>

          {/* Footer */}
          <div className={styles.loginFooter}>
            <p className={styles.footerText}>
              🔒 Захищено JWT авторизацією
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
