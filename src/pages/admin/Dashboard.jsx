/**
 * Dashboard Component
 *
 * Main dashboard page for admin panel
 */

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProductsStore } from '../../stores/useProductsStore';
import axios from 'axios';
import styles from './Dashboard.module.scss';

const Dashboard = () => {
  const navigate = useNavigate();
  const { products } = useProductsStore();
  const [apiStatus, setApiStatus] = useState({
    healthy: false,
    loading: true,
    error: null,
    responseTime: null
  });

  // Перевірка health API
  useEffect(() => {
    const checkAPIHealth = async () => {
      const startTime = Date.now();
      try {
        const response = await axios.get('http://localhost:5000/health', { timeout: 5000 });
        const responseTime = Date.now() - startTime;

        if (response.data.status === 'ok') {
          setApiStatus({
            healthy: true,
            loading: false,
            error: null,
            responseTime
          });
        }
      } catch (error) {
        setApiStatus({
          healthy: false,
          loading: false,
          error: error.message,
          responseTime: null
        });
      }
    };

    checkAPIHealth();
    // Перевіряти кожні 30 секунд
    const interval = setInterval(checkAPIHealth, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.dashboard}>
      <h1 className={styles.title}>
        Панель Адміністратора
      </h1>
      <p className={styles.subtitle}>Ласкаво просимо до адмінпанелі EuroGranite</p>

      {/* API Status Card */}
      <div className={`${styles.apiCard} ${apiStatus.healthy ? styles.healthy : styles.unhealthy}`}>
        <div className={styles.apiCardContent}>
          <span className={styles.apiIcon}>
            {apiStatus.loading ? '⏳' : apiStatus.healthy ? '✅' : '❌'}
          </span>
          <div className={styles.apiStatus}>
            <strong className={`${styles.apiTitle} ${apiStatus.healthy ? styles.healthy : styles.unhealthy}`}>
              Backend API: {apiStatus.loading ? 'Перевірка...' : apiStatus.healthy ? 'Працює' : 'Недоступний'}
            </strong>
            {apiStatus.healthy && (
              <p className={styles.apiDetails}>
                Час відгуку: {apiStatus.responseTime}ms | Продуктів у базі: {products.length}
              </p>
            )}
            {!apiStatus.healthy && apiStatus.error && (
              <p className={styles.apiError}>
                Помилка: {apiStatus.error}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className={styles.cardsGrid}>
        <div
          onClick={() => navigate('/admin/products')}
          className={`${styles.card} ${styles.clickable}`}
        >
          <h3 className={styles.cardTitle}>📦 Продукція</h3>
          <p className={styles.cardDescription}>Управління гранітними виробами</p>
          <p className={styles.cardCount}>
            {products.length}
          </p>
        </div>
        <div className={`${styles.card} ${styles.disabled}`}>
          <h3 className={`${styles.cardTitle} ${styles.cardTitleDisabled}`}>📝 Статті</h3>
          <p className={styles.cardDescription}>Буде доступно в Phase 1.5</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
