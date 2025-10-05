/**
 * Dashboard Component
 *
 * Main dashboard page for admin panel
 */

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProductsStore } from '../../stores/useProductsStore';
import axios from 'axios';

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
    <div style={{ padding: '2rem' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '1rem' }}>
        Панель Адміністратора
      </h1>
      <p style={{ color: '#64748b' }}>Ласкаво просимо до адмінпанелі EuroGranite</p>

      {/* API Status Card */}
      <div style={{
        marginTop: '2rem',
        padding: '1rem',
        backgroundColor: apiStatus.healthy ? '#f0fdf4' : '#fef2f2',
        border: `2px solid ${apiStatus.healthy ? '#86efac' : '#fca5a5'}`,
        borderRadius: '0.5rem',
        marginBottom: '1rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ fontSize: '1.5rem' }}>
            {apiStatus.loading ? '⏳' : apiStatus.healthy ? '✅' : '❌'}
          </span>
          <div>
            <strong style={{ color: apiStatus.healthy ? '#16a34a' : '#dc2626' }}>
              Backend API: {apiStatus.loading ? 'Перевірка...' : apiStatus.healthy ? 'Працює' : 'Недоступний'}
            </strong>
            {apiStatus.healthy && (
              <p style={{ margin: '0.25rem 0 0', fontSize: '0.875rem', color: '#64748b' }}>
                Час відгуку: {apiStatus.responseTime}ms | Продуктів у базі: {products.length}
              </p>
            )}
            {!apiStatus.healthy && apiStatus.error && (
              <p style={{ margin: '0.25rem 0 0', fontSize: '0.875rem', color: '#dc2626' }}>
                Помилка: {apiStatus.error}
              </p>
            )}
          </div>
        </div>
      </div>

      <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
        <div
          onClick={() => navigate('/admin/products')}
          style={{
            padding: '1.5rem',
            backgroundColor: 'white',
            borderRadius: '0.75rem',
            boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
            flex: 1,
            cursor: 'pointer',
            transition: 'transform 0.2s, box-shadow 0.2s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 1px 3px 0 rgba(0, 0, 0, 0.1)';
          }}
        >
          <h3 style={{ margin: '0 0 0.5rem', color: '#1e40af' }}>📦 Продукція</h3>
          <p style={{ margin: 0, color: '#64748b' }}>Управління гранітними виробами</p>
          <p style={{ margin: '0.5rem 0 0', fontSize: '1.5rem', fontWeight: '700', color: '#1e40af' }}>
            {products.length}
          </p>
        </div>
        <div style={{
          padding: '1.5rem',
          backgroundColor: 'white',
          borderRadius: '0.75rem',
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
          flex: 1,
          opacity: 0.5,
          cursor: 'not-allowed',
        }}>
          <h3 style={{ margin: '0 0 0.5rem', color: '#64748b' }}>📝 Статті</h3>
          <p style={{ margin: 0, color: '#64748b' }}>Буде доступно в Phase 1.5</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
