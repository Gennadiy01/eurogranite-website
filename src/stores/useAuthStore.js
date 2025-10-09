/**
 * Authentication Store (Zustand)
 * Manages authentication state (user, token, login/logout)
 */

import { create } from 'zustand';
import * as authApi from '../services/api/authApi';

const useAuthStore = create((set) => ({
  // State
  user: null,
  token: authApi.getToken(),
  isAuthenticated: authApi.isAuthenticated(),
  isLoading: false,
  error: null,

  // Actions
  login: async (credentials) => {
    set({ isLoading: true, error: null });
    try {
      const response = await authApi.login(credentials);
      const { token, user } = response.data;

      // Save token to localStorage
      authApi.saveToken(token);

      // Update state
      set({
        user,
        token,
        isAuthenticated: true,
        isLoading: false,
        error: null
      });

      return { success: true };
    } catch (error) {
      set({
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
        error: error.message
      });

      return { success: false, error: error.message };
    }
  },

  logout: async () => {
    set({ isLoading: true });
    try {
      // Call backend logout (optional, JWT is stateless)
      await authApi.logout();
    } catch (error) {
      console.warn('Logout API call failed, continuing with local logout:', error);
    } finally {
      // Remove token from localStorage
      authApi.removeToken();

      // Clear state
      set({
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
        error: null
      });
    }
  },

  verifyToken: async () => {
    const token = authApi.getToken();

    if (!token) {
      set({
        user: null,
        token: null,
        isAuthenticated: false
      });
      return false;
    }

    set({ isLoading: true, error: null });

    try {
      const response = await authApi.verifyToken(token);
      const user = response.data.user;

      // Update state with verified user
      set({
        user,
        token,
        isAuthenticated: true,
        isLoading: false,
        error: null
      });

      return true;
    } catch (error) {
      // Token is invalid or expired
      authApi.removeToken();

      set({
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
        error: error.message
      });

      return false;
    }
  },

  clearError: () => {
    set({ error: null });
  }
}));

export default useAuthStore;
