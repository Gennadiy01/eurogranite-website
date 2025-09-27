import { create } from 'zustand'
import { productsData } from '../constants/productsData'

// API базовий URL
const API_BASE_URL = process.env.NODE_ENV === 'production'
  ? '/api'
  : 'http://localhost:3001/api'

// API функції
const apiClient = {
  async get(endpoint) {
    const response = await fetch(`${API_BASE_URL}${endpoint}`)
    if (!response.ok) throw new Error(`HTTP ${response.status}`)
    return response.json()
  },

  async post(endpoint, data) {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    if (!response.ok) throw new Error(`HTTP ${response.status}`)
    return response.json()
  },

  async put(endpoint, data) {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    if (!response.ok) throw new Error(`HTTP ${response.status}`)
    return response.json()
  },

  async delete(endpoint) {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'DELETE'
    })
    if (!response.ok) throw new Error(`HTTP ${response.status}`)
    return response.json()
  }
}

const useAdminProductsStore = create((set, get) => ({
  // Стан продуктів
  products: [],
  originalProducts: productsData.samples || [],
  hasUnsavedChanges: false,
  isInitialized: false,

  // Стан UI
  isLoading: false,
  error: null,
  editingProduct: null,
  isEditModalOpen: false,
  searchQuery: '',
  selectedCategory: 'all',
  sortBy: 'name',
  sortOrder: 'asc',

  // Фільтрація та пошук
  setSearchQuery: (query) => {
    set({ searchQuery: query })
  },

  setSelectedCategory: (category) => {
    set({ selectedCategory: category })
  },

  setSortBy: (field) => {
    const { sortBy, sortOrder } = get()
    const newSortOrder = sortBy === field && sortOrder === 'asc' ? 'desc' : 'asc'
    set({ sortBy: field, sortOrder: newSortOrder })
  },

  // Отримання відфільтрованих продуктів
  getFilteredProducts: () => {
    const { products, searchQuery, selectedCategory, sortBy, sortOrder } = get()

    let filtered = [...products]

    // Пошук
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(product =>
        product.name.ua.toLowerCase().includes(query) ||
        product.name.en.toLowerCase().includes(query) ||
        product.id.toLowerCase().includes(query) ||
        product.textureId.toLowerCase().includes(query)
      )
    }

    // Фільтрація по категоріям
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => {
        switch (selectedCategory) {
          case 'gabbro':
            return product.textureId.includes('black')
          case 'granite':
            return product.textureId.includes('red-brown') || product.textureId.includes('gray')
          case 'green':
            return product.textureId.includes('green')
          case 'labradorite':
            return product.textureId.includes('labradorite')
          default:
            return true
        }
      })
    }

    // Сортування
    filtered.sort((a, b) => {
      let aValue, bValue

      switch (sortBy) {
        case 'name':
          aValue = a.name.ua.toLowerCase()
          bValue = b.name.ua.toLowerCase()
          break
        case 'price':
          aValue = parseFloat(a.price.ua.replace(/[^\d]/g, ''))
          bValue = parseFloat(b.price.ua.replace(/[^\d]/g, ''))
          break
        case 'dimensions':
          aValue = a.dimensions.length * a.dimensions.width * a.dimensions.height
          bValue = b.dimensions.length * b.dimensions.width * b.dimensions.height
          break
        case 'inStock':
          aValue = a.inStock ? 1 : 0
          bValue = b.inStock ? 1 : 0
          break
        default:
          aValue = a.id
          bValue = b.id
      }

      if (sortOrder === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0
      }
    })

    return filtered
  },

  // Завантаження продуктів з сервера (завжди свіжі дані)
  loadProducts: async (forceRefresh = false) => {
    const { isInitialized } = get()

    // Завжди завантажуємо свіжі дані або при примусовому оновленні
    if (!forceRefresh && isInitialized) {
      console.log('🔄 Продукти вже завантажені, пропускаємо...')
      return { success: true, data: get().products }
    }

    set({ isLoading: true, error: null })

    try {
      console.log('🔄 Завантаження свіжих продуктів з API:', `${API_BASE_URL}/products`)
      const response = await apiClient.get('/products')
      console.log('✅ Отримано продукти:', response.data.length, 'шт')

      set({
        products: response.data,
        isLoading: false,
        hasUnsavedChanges: false,
        isInitialized: true
      })
      return { success: true, data: response.data }
    } catch (error) {
      console.error('❌ Помилка API:', error.message)
      console.log('🔄 Fallback до локальних даних...')

      // Fallback до локальних даних при помилці
      const { originalProducts } = get()
      console.log('📦 Завантажено локальних продуктів:', originalProducts.length, 'шт')

      set({
        products: originalProducts,
        error: `Помилка з'єднання з API. Використовуються локальні дані.`,
        isLoading: false,
        isInitialized: true
      })
      return { success: false, error: error.message }
    }
  },

  // Примусове оновлення продуктів
  refreshProducts: async () => {
    console.log('🔄 Примусове оновлення продуктів...')
    return get().loadProducts(true)
  },

  // CRUD операції
  addProduct: async (productData) => {
    set({ isLoading: true, error: null })

    try {
      const response = await apiClient.post('/products', productData)

      const { products } = get()
      const updatedProducts = [...products, response.data]

      set({
        products: updatedProducts,
        isLoading: false,
        isEditModalOpen: false,
        editingProduct: null,
        hasUnsavedChanges: true
      })

      return { success: true, product: response.data }
    } catch (error) {
      set({ error: error.message, isLoading: false })
      return { success: false, error: error.message }
    }
  },

  updateProduct: async (productId, updates) => {
    set({ isLoading: true, error: null })

    try {
      const response = await apiClient.put(`/products/${productId}`, updates)

      const { products } = get()
      const updatedProducts = products.map(product =>
        product.id === productId
          ? response.data
          : product
      )

      set({
        products: updatedProducts,
        isLoading: false,
        isEditModalOpen: false,
        editingProduct: null,
        hasUnsavedChanges: true
      })

      return { success: true }
    } catch (error) {
      set({ error: error.message, isLoading: false })
      return { success: false, error: error.message }
    }
  },

  deleteProduct: async (productId) => {
    set({ isLoading: true, error: null })

    try {
      await apiClient.delete(`/products/${productId}`)

      const { products } = get()
      const updatedProducts = products.filter(product => product.id !== productId)

      set({
        products: updatedProducts,
        isLoading: false,
        hasUnsavedChanges: true
      })

      return { success: true }
    } catch (error) {
      set({ error: error.message, isLoading: false })
      return { success: false, error: error.message }
    }
  },

  duplicateProduct: (productId) => {
    set({ isLoading: true, error: null })

    try {
      const { products } = get()
      const originalProduct = products.find(p => p.id === productId)

      if (!originalProduct) {
        throw new Error('Продукт не знайдено')
      }

      const duplicatedProduct = {
        ...originalProduct,
        id: `${originalProduct.id}-copy-${Date.now()}`,
        name: {
          ua: `${originalProduct.name.ua} (копія)`,
          en: `${originalProduct.name.en} (copy)`,
          de: `${originalProduct.name.de} (Kopie)`,
          pl: `${originalProduct.name.pl} (kopia)`
        }
      }

      const updatedProducts = [...products, duplicatedProduct]

      set({
        products: updatedProducts,
        isLoading: false
      })

      return { success: true, product: duplicatedProduct }
    } catch (error) {
      set({ error: error.message, isLoading: false })
      return { success: false, error: error.message }
    }
  },

  // Управління модальним вікном
  openEditModal: (product = null) => {
    set({
      editingProduct: product,
      isEditModalOpen: true,
      error: null
    })
  },

  closeEditModal: () => {
    set({
      editingProduct: null,
      isEditModalOpen: false,
      error: null
    })
  },

  // Оновлення статусу наявності
  toggleProductStock: (productId) => {
    const { products } = get()
    const updatedProducts = products.map(product =>
      product.id === productId
        ? { ...product, inStock: !product.inStock }
        : product
    )

    set({ products: updatedProducts })
    return { success: true }
  },

  // Збереження змін
  saveProducts: async () => {
    set({ isLoading: true, error: null })

    try {
      const response = await apiClient.post('/products/save')
      set({
        isLoading: false,
        hasUnsavedChanges: false
      })
      return { success: true, message: response.message }
    } catch (error) {
      set({ error: error.message, isLoading: false })
      return { success: false, error: error.message }
    }
  },

  // Скидання змін
  resetProducts: async () => {
    set({ isLoading: true, error: null })

    try {
      const response = await apiClient.post('/products/reset')
      set({
        products: response.data || get().originalProducts,
        isLoading: false,
        hasUnsavedChanges: false,
        error: null,
        editingProduct: null,
        isEditModalOpen: false
      })
      return { success: true, message: response.message }
    } catch (error) {
      // Fallback до локального скидання
      const { originalProducts } = get()
      set({
        products: [...originalProducts],
        error: `Помилка скидання: ${error.message}. Скинуто до локальних даних.`,
        editingProduct: null,
        isEditModalOpen: false,
        isLoading: false
      })
      return { success: false, error: error.message }
    }
  },

  // Експорт/Імпорт даних
  exportProducts: () => {
    const { products } = get()
    const dataStr = JSON.stringify(products, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)

    const link = document.createElement('a')
    link.href = url
    link.download = `products-export-${new Date().toISOString().split('T')[0]}.json`
    link.click()

    URL.revokeObjectURL(url)
  },

  // Очистка помилок
  clearError: () => {
    set({ error: null })
  },

  // Отримання статистики
  getProductsStats: () => {
    const { products } = get()

    return {
      total: products.length,
      inStock: products.filter(p => p.inStock).length,
      outOfStock: products.filter(p => !p.inStock).length,
      categories: {
        gabbro: products.filter(p => p.textureId.includes('black')).length,
        granite: products.filter(p =>
          p.textureId.includes('red-brown') || p.textureId.includes('gray')
        ).length,
        green: products.filter(p => p.textureId.includes('green')).length,
        labradorite: products.filter(p => p.textureId.includes('labradorite')).length
      },
      priceRange: {
        min: Math.min(...products.map(p => parseFloat(p.price.ua.replace(/[^\d]/g, '')))),
        max: Math.max(...products.map(p => parseFloat(p.price.ua.replace(/[^\d]/g, ''))))
      }
    }
  }
}))

export default useAdminProductsStore