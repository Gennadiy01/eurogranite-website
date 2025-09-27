import { create } from 'zustand'
import { productsData } from '../constants/productsData'

// API базовий URL
const API_BASE_URL = process.env.NODE_ENV === 'production'
  ? '/api'
  : 'http://localhost:3001/api'

// API клієнт для публічного сайту
const apiClient = {
  async get(endpoint) {
    const response = await fetch(`${API_BASE_URL}${endpoint}`)
    if (!response.ok) throw new Error(`HTTP ${response.status}`)
    return response.json()
  }
}

const useProductsStore = create((set, get) => ({
  // Стан продуктів
  products: [],
  isLoading: false,
  error: null,
  isInitialized: false,

  // Завантаження продуктів з API
  loadProducts: async (forceRefresh = false) => {
    const { isInitialized } = get()

    // Якщо дані вже завантажені і не потрібно примусове оновлення
    if (!forceRefresh && isInitialized) {
      console.log('🔄 Продукти вже завантажені для публічного сайту')
      return { success: true, data: get().products }
    }

    set({ isLoading: true, error: null })

    try {
      console.log('🔄 Завантаження продуктів з API для публічного сайту:', `${API_BASE_URL}/products`)
      const response = await apiClient.get('/products')
      console.log('✅ Отримано продукти для публічного сайту:', response.data.length, 'шт')
      console.log('📦 Перші 3 продукти:', response.data.slice(0, 3).map(p => ({ id: p.id, name: p.name.ua })))

      set({
        products: response.data,
        isLoading: false,
        error: null,
        isInitialized: true
      })

      return { success: true, data: response.data }
    } catch (error) {
      console.error('❌ Помилка API для публічного сайту:', error.message)
      console.log('🔄 Fallback до статичних даних...')

      // Fallback до статичних даних з константи
      const staticProducts = productsData.samples || []
      console.log('📦 Завантажено статичних продуктів:', staticProducts.length, 'шт')

      set({
        products: staticProducts,
        error: `Використовуються статичні дані. API недоступний.`,
        isLoading: false,
        isInitialized: true
      })

      return { success: false, error: error.message, fallbackUsed: true }
    }
  },

  // Отримання продукту за ID
  getProductById: (id) => {
    const { products } = get()
    return products.find(product => product.id === id)
  },

  // Отримання продуктів за категорією
  getProductsByCategory: (category) => {
    const { products } = get()

    if (category === 'all') {
      return products
    }

    return products.filter(product => {
      switch (category) {
        case 'gabbro':
          return product.textureId?.includes('black')
        case 'granite':
          return product.textureId?.includes('red-brown') || product.textureId?.includes('gray')
        case 'green':
          return product.textureId?.includes('green')
        case 'labradorite':
          return product.textureId?.includes('labradorite')
        default:
          return true
      }
    })
  },

  // Отримання продуктів в наявності
  getInStockProducts: () => {
    const { products } = get()
    return products.filter(product => product.inStock)
  },

  // Оновлення продуктів (для використання з адмінпанелі)
  refreshProducts: async () => {
    console.log('🔄 Оновлення продуктів для публічного сайту...')
    return get().loadProducts(true)
  },

  // Очистка помилок
  clearError: () => {
    set({ error: null })
  },

  // Статистика продуктів
  getProductsStats: () => {
    const { products } = get()

    const stats = {
      total: products.length,
      inStock: products.filter(p => p.inStock).length,
      outOfStock: products.filter(p => !p.inStock).length,
      categories: {
        gabbro: products.filter(p => p.textureId?.includes('black')).length,
        granite: products.filter(p =>
          p.textureId?.includes('red-brown') || p.textureId?.includes('gray')
        ).length,
        green: products.filter(p => p.textureId?.includes('green')).length,
        labradorite: products.filter(p => p.textureId?.includes('labradorite')).length
      }
    }

    return stats
  },

  // Пошук продуктів
  searchProducts: (query) => {
    const { products } = get()

    if (!query) return products

    const searchQuery = query.toLowerCase()
    return products.filter(product =>
      product.name.ua.toLowerCase().includes(searchQuery) ||
      product.name.en.toLowerCase().includes(searchQuery) ||
      product.description.ua.toLowerCase().includes(searchQuery) ||
      product.description.en.toLowerCase().includes(searchQuery) ||
      product.features.ua.some(feature => feature.toLowerCase().includes(searchQuery)) ||
      product.features.en.some(feature => feature.toLowerCase().includes(searchQuery))
    )
  }
}))

export default useProductsStore