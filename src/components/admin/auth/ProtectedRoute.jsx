import React, { useEffect } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import useAuthStore from '../../../stores/authStore'

const ProtectedRoute = ({ children }) => {
  const location = useLocation()
  const { isAuthenticated, checkSession, logout } = useAuthStore()

  useEffect(() => {
    // Перевіряємо сесію при кожному рендері захищеного маршруту
    const sessionValid = checkSession()

    if (!sessionValid && isAuthenticated) {
      // Якщо сесія застаріла, виходимо
      logout()
    }
  }, [checkSession, isAuthenticated, logout])

  if (!isAuthenticated) {
    // Зберігаємо поточний шлях для редиректу після логіну
    return <Navigate to="/admin" state={{ from: location }} replace />
  }

  return children
}

export default ProtectedRoute