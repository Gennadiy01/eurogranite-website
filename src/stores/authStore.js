import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useAuthStore = create(
  persist(
    (set, get) => ({
      // Стан аутентифікації
      isAuthenticated: false,
      user: null,
      loginError: null,

      // Простий логін (для демо використовуємо хардкодені дані)
      login: async (username, password) => {
        try {
          // В реальному проекті тут буде API запит
          const ADMIN_CREDENTIALS = {
            username: 'admin',
            password: 'euro2025Granite'
          }

          if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
            const user = {
              id: 1,
              username: 'admin',
              role: 'administrator',
              loginTime: new Date().toISOString()
            }

            set({
              isAuthenticated: true,
              user,
              loginError: null
            })

            return { success: true, user }
          } else {
            set({ loginError: 'Невірний логін або пароль' })
            return { success: false, error: 'Invalid credentials' }
          }
        } catch (error) {
          set({ loginError: 'Помилка входу в систему' })
          return { success: false, error: error.message }
        }
      },

      // Вихід з системи
      logout: () => {
        set({
          isAuthenticated: false,
          user: null,
          loginError: null
        })
      },

      // Очистка помилок
      clearError: () => {
        set({ loginError: null })
      },

      // Перевірка сесії
      checkSession: () => {
        const { user, isAuthenticated } = get()

        if (isAuthenticated && user) {
          const loginTime = new Date(user.loginTime)
          const now = new Date()
          const hoursDiff = (now - loginTime) / (1000 * 60 * 60)

          // Сесія дійсна 24 години
          if (hoursDiff > 24) {
            get().logout()
            return false
          }
          return true
        }
        return false
      }
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        user: state.user
      })
    }
  )
)

export default useAuthStore