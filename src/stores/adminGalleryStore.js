import { create } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'

const useAdminGalleryStore = create(
  subscribeWithSelector((set, get) => ({
    // State
    galleryImages: [],
    categories: [
      { id: 'courtyard', name: { ua: 'Внутрішні дворики', en: 'Courtyards', de: 'Innenhöfe', pl: 'Dziedzińce' } },
      { id: 'walkway', name: { ua: 'Пішохідні доріжки', en: 'Walkways', de: 'Gehwege', pl: 'Chodniki' } },
      { id: 'plaza', name: { ua: 'Площі', en: 'Plazas', de: 'Plätze', pl: 'Place' } },
      { id: 'driveway', name: { ua: 'Вулиці', en: 'Streets', de: 'Straßen', pl: 'Ulice' } }
    ],
    isLoading: false,
    error: null,

    // Filter and search state
    currentCategory: 'all',
    searchQuery: '',
    sortBy: 'newest',

    // Modal state
    isEditModalOpen: false,
    editingImage: null,
    isUploadModalOpen: false,
    uploadProgress: 0,

    // Statistics
    statistics: {
      totalImages: 0,
      imagesByCategory: {},
      recentUploads: 0
    },

    // Actions
    loadGalleryImages: async () => {
      set({ isLoading: true, error: null })

      try {
        // Simulate API call - in real app this would fetch from backend
        // For now, we'll simulate with the existing gallery data
        const { galleryProjects } = await import('../constants/galleryData')

        // Transform the static data to match our admin structure
        const transformedImages = galleryProjects.map(project => ({
          id: project.id,
          publicId: project.publicId,
          category: project.category,
          width: project.width,
          height: project.height,
          tags: project.tags,
          alt: project.alt,
          createdAt: new Date(`2024-${Math.floor(Math.random() * 12) + 1}-${Math.floor(Math.random() * 28) + 1}`).toISOString(),
          updatedAt: new Date().toISOString()
        }))

        // Calculate statistics
        const stats = get().calculateStatistics(transformedImages)

        set({
          galleryImages: transformedImages,
          statistics: stats,
          isLoading: false
        })

        return { success: true }
      } catch (error) {
        set({ error: error.message, isLoading: false })
        return { success: false, error: error.message }
      }
    },

    addGalleryImage: async (imageData) => {
      set({ isLoading: true, error: null })

      try {
        // Generate unique ID
        const newId = `image-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

        const newImage = {
          id: newId,
          publicId: imageData.publicId,
          category: imageData.category,
          width: imageData.width || 1920,
          height: imageData.height || 1280,
          tags: ['gallery', imageData.category, ...(imageData.tags || [])],
          alt: imageData.alt || {},
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }

        const currentImages = get().galleryImages
        const updatedImages = [newImage, ...currentImages]
        const stats = get().calculateStatistics(updatedImages)

        set({
          galleryImages: updatedImages,
          statistics: stats,
          isLoading: false
        })

        return { success: true, image: newImage }
      } catch (error) {
        set({ error: error.message, isLoading: false })
        return { success: false, error: error.message }
      }
    },

    updateGalleryImage: async (imageId, updates) => {
      set({ isLoading: true, error: null })

      try {
        const currentImages = get().galleryImages
        const updatedImages = currentImages.map(image =>
          image.id === imageId
            ? {
                ...image,
                ...updates,
                updatedAt: new Date().toISOString()
              }
            : image
        )

        const stats = get().calculateStatistics(updatedImages)

        set({
          galleryImages: updatedImages,
          statistics: stats,
          isLoading: false
        })

        return { success: true }
      } catch (error) {
        set({ error: error.message, isLoading: false })
        return { success: false, error: error.message }
      }
    },

    deleteGalleryImage: async (imageId) => {
      set({ isLoading: true, error: null })

      try {
        const currentImages = get().galleryImages
        const updatedImages = currentImages.filter(image => image.id !== imageId)
        const stats = get().calculateStatistics(updatedImages)

        set({
          galleryImages: updatedImages,
          statistics: stats,
          isLoading: false
        })

        return { success: true }
      } catch (error) {
        set({ error: error.message, isLoading: false })
        return { success: false, error: error.message }
      }
    },

    // Bulk operations
    deleteMultipleImages: async (imageIds) => {
      set({ isLoading: true, error: null })

      try {
        const currentImages = get().galleryImages
        const updatedImages = currentImages.filter(image => !imageIds.includes(image.id))
        const stats = get().calculateStatistics(updatedImages)

        set({
          galleryImages: updatedImages,
          statistics: stats,
          isLoading: false
        })

        return { success: true, deletedCount: imageIds.length }
      } catch (error) {
        set({ error: error.message, isLoading: false })
        return { success: false, error: error.message }
      }
    },

    updateCategory: async (imageIds, newCategory) => {
      set({ isLoading: true, error: null })

      try {
        const currentImages = get().galleryImages
        const updatedImages = currentImages.map(image =>
          imageIds.includes(image.id)
            ? {
                ...image,
                category: newCategory,
                tags: image.tags.filter(tag => !get().categories.some(cat => cat.id === tag))
                  .concat([newCategory]),
                updatedAt: new Date().toISOString()
              }
            : image
        )

        const stats = get().calculateStatistics(updatedImages)

        set({
          galleryImages: updatedImages,
          statistics: stats,
          isLoading: false
        })

        return { success: true, updatedCount: imageIds.length }
      } catch (error) {
        set({ error: error.message, isLoading: false })
        return { success: false, error: error.message }
      }
    },

    // Filtering and search
    setCurrentCategory: (category) => {
      set({ currentCategory: category })
    },

    setSearchQuery: (query) => {
      set({ searchQuery: query })
    },

    setSortBy: (sortBy) => {
      set({ sortBy })
    },

    getFilteredImages: () => {
      const { galleryImages, currentCategory, searchQuery, sortBy } = get()

      let filtered = [...galleryImages]

      // Filter by category
      if (currentCategory !== 'all') {
        filtered = filtered.filter(image => image.category === currentCategory)
      }

      // Filter by search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase()
        filtered = filtered.filter(image =>
          image.id.toLowerCase().includes(query) ||
          image.category.toLowerCase().includes(query) ||
          image.tags.some(tag => tag.toLowerCase().includes(query)) ||
          Object.values(image.alt || {}).some(text =>
            text.toLowerCase().includes(query)
          )
        )
      }

      // Sort results
      switch (sortBy) {
        case 'newest':
          filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          break
        case 'oldest':
          filtered.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
          break
        case 'category':
          filtered.sort((a, b) => a.category.localeCompare(b.category))
          break
        case 'id':
          filtered.sort((a, b) => a.id.localeCompare(b.id))
          break
        default:
          break
      }

      return filtered
    },

    // Modal actions
    openEditModal: (image = null) => {
      set({
        isEditModalOpen: true,
        editingImage: image
      })
    },

    closeEditModal: () => {
      set({
        isEditModalOpen: false,
        editingImage: null
      })
    },

    openUploadModal: () => {
      set({ isUploadModalOpen: true })
    },

    closeUploadModal: () => {
      set({ isUploadModalOpen: false, uploadProgress: 0 })
    },

    setUploadProgress: (progress) => {
      set({ uploadProgress: progress })
    },

    // Statistics calculation
    calculateStatistics: (images) => {
      const imagesByCategory = images.reduce((acc, image) => {
        acc[image.category] = (acc[image.category] || 0) + 1
        return acc
      }, {})

      const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
      const recentUploads = images.filter(image =>
        new Date(image.createdAt) > thirtyDaysAgo
      ).length

      return {
        totalImages: images.length,
        imagesByCategory,
        recentUploads
      }
    },

    // Export functionality
    exportGalleryData: () => {
      const { galleryImages } = get()
      const dataStr = JSON.stringify(galleryImages, null, 2)
      const dataBlob = new Blob([dataStr], { type: 'application/json' })

      const url = URL.createObjectURL(dataBlob)
      const link = document.createElement('a')
      link.href = url
      link.download = `gallery-export-${new Date().toISOString().split('T')[0]}.json`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
    },

    // Clear all data
    clearError: () => {
      set({ error: null })
    }
  }))
)

export default useAdminGalleryStore