import { create } from 'zustand'

const useToastStore = create((set, get) => ({
  toasts: [],
  
  addToast: (message, type = 'success', duration = 5000) => {
    const id = Date.now() + Math.random()
    const toast = { id, message, type, duration }
    
    set(state => ({
      toasts: [...state.toasts, toast]
    }))
    
    return id
  },
  
  removeToast: (id) => {
    set(state => ({
      toasts: state.toasts.filter(toast => toast.id !== id)
    }))
  },
  
  clearToasts: () => {
    set({ toasts: [] })
  },
  
  showSuccess: (message, duration) => {
    return get().addToast(message, 'success', duration)
  },
  
  showError: (message, duration) => {
    return get().addToast(message, 'error', duration)
  },
  
  showWarning: (message, duration) => {
    return get().addToast(message, 'warning', duration)
  },
  
  showInfo: (message, duration) => {
    return get().addToast(message, 'info', duration)
  }
}))

export default useToastStore