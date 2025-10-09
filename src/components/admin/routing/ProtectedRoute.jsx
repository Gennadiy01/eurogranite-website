/**
 * Protected Route Component
 * Redirects to login if user is not authenticated
 */

import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import useAuthStore from '../../../stores/useAuthStore';

function ProtectedRoute({ children }) {
  const { isAuthenticated, verifyToken, isLoading } = useAuthStore();
  const [isVerifying, setIsVerifying] = useState(true);

  useEffect(() => {
    const verify = async () => {
      // If there's a token, verify it
      if (isAuthenticated) {
        await verifyToken();
      }
      setIsVerifying(false);
    };

    verify();
  }, [isAuthenticated, verifyToken]);

  // Show loading state while verifying token
  if (isVerifying || isLoading) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        fontSize: '1.25rem',
        color: '#666'
      }}>
        <div>
          <div style={{ marginBottom: '1rem', fontSize: '2rem' }}>⏳</div>
          <div>Перевірка авторизації...</div>
        </div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  // Render protected content
  return children;
}

export default ProtectedRoute;
