/**
 * Authentication API Service
 * Handles login, logout, and token verification
 */

import axios from 'axios';

const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

/**
 * Login user and get JWT token
 * @param {Object} credentials - { username, password }
 * @returns {Promise<Object>} { token, user }
 */
export const login = async (credentials) => {
  try {
    const response = await axios.post(`${API_BASE}/auth/login`, credentials);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message || 'Помилка входу в систему');
  }
};

/**
 * Logout user (client-side only, JWT is stateless)
 * @returns {Promise<Object>}
 */
export const logout = async () => {
  try {
    const response = await axios.post(`${API_BASE}/auth/logout`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message || 'Помилка виходу з системи');
  }
};

/**
 * Verify JWT token
 * @param {string} token - JWT token
 * @returns {Promise<Object>} User data from token
 */
export const verifyToken = async (token) => {
  try {
    const response = await axios.get(`${API_BASE}/auth/verify`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message || 'Токен недійсний');
  }
};

/**
 * Get auth header for authenticated requests
 * @returns {Object} Authorization header or empty object
 */
export const getAuthHeader = () => {
  const token = localStorage.getItem('authToken');
  return token ? { 'Authorization': `Bearer ${token}` } : {};
};

/**
 * Save token to localStorage
 * @param {string} token - JWT token
 */
export const saveToken = (token) => {
  localStorage.setItem('authToken', token);
};

/**
 * Remove token from localStorage
 */
export const removeToken = () => {
  localStorage.removeItem('authToken');
};

/**
 * Get token from localStorage
 * @returns {string|null}
 */
export const getToken = () => {
  return localStorage.getItem('authToken');
};

/**
 * Check if user is authenticated (has valid token)
 * @returns {boolean}
 */
export const isAuthenticated = () => {
  return !!localStorage.getItem('authToken');
};
