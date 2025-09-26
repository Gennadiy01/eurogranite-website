import React, { useState, useEffect } from 'react'
import useAdminGalleryStore from '../../../stores/adminGalleryStore'
import CloudinaryImage from '../../atoms/CloudinaryImage/CloudinaryImage'

const GalleryImagesList = () => {
  const {
    galleryImages,
    getFilteredImages,
    currentCategory,
    searchQuery,
    sortBy,
    isLoading,
    statistics,
    loadGalleryImages,
    deleteGalleryImage,
    deleteMultipleImages,
    updateCategory,
    setCurrentCategory,
    setSearchQuery,
    setSortBy,
    openEditModal,
    openUploadModal,
    exportGalleryData,
    categories
  } = useAdminGalleryStore()

  const [selectedImages, setSelectedImages] = useState(new Set())
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null)
  const [bulkAction, setBulkAction] = useState('')

  // Load images on mount
  useEffect(() => {
    loadGalleryImages()
  }, [loadGalleryImages])

  const filteredImages = getFilteredImages()

  const handleSelectImage = (imageId) => {
    const newSelected = new Set(selectedImages)
    if (newSelected.has(imageId)) {
      newSelected.delete(imageId)
    } else {
      newSelected.add(imageId)
    }
    setSelectedImages(newSelected)
  }

  const handleSelectAll = () => {
    if (selectedImages.size === filteredImages.length) {
      setSelectedImages(new Set())
    } else {
      setSelectedImages(new Set(filteredImages.map(img => img.id)))
    }
  }

  const handleDeleteImage = async (imageId) => {
    const result = await deleteGalleryImage(imageId)
    if (result.success) {
      setShowDeleteConfirm(null)
      setSelectedImages(prev => {
        const newSet = new Set(prev)
        newSet.delete(imageId)
        return newSet
      })
    }
  }

  const handleBulkAction = async () => {
    const selectedIds = Array.from(selectedImages)

    if (bulkAction === 'delete') {
      const result = await deleteMultipleImages(selectedIds)
      if (result.success) {
        setSelectedImages(new Set())
        setBulkAction('')
      }
    } else if (bulkAction.startsWith('category-')) {
      const newCategory = bulkAction.replace('category-', '')
      const result = await updateCategory(selectedIds, newCategory)
      if (result.success) {
        setSelectedImages(new Set())
        setBulkAction('')
      }
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('uk-UA', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getCategoryName = (categoryId) => {
    const category = categories.find(cat => cat.id === categoryId)
    return category ? category.name.ua : categoryId
  }

  if (isLoading && galleryImages.length === 0) {
    return (
      <div className="gallery-loading">
        <div className="loading-spinner"></div>
        <p>Завантаження галереї...</p>
      </div>
    )
  }

  return (
    <div className="gallery-images-list">
      {/* Header with statistics */}
      <div className="gallery-header">
        <div className="gallery-stats">
          <div className="stat-card">
            <h3>{statistics.totalImages}</h3>
            <p>Всього зображень</p>
          </div>
          <div className="stat-card">
            <h3>{statistics.recentUploads}</h3>
            <p>Нових за місяць</p>
          </div>
          <div className="stat-card">
            <h3>{Object.keys(statistics.imagesByCategory).length}</h3>
            <p>Категорій</p>
          </div>
        </div>

        <div className="gallery-actions">
          <button
            onClick={openUploadModal}
            className="btn btn-primary"
          >
            ➕ Додати зображення
          </button>
          <button
            onClick={exportGalleryData}
            className="btn btn-secondary"
          >
            📥 Експорт
          </button>
        </div>
      </div>

      {/* Filters and search */}
      <div className="gallery-filters">
        <div className="filter-row">
          <div className="search-box">
            <input
              type="text"
              placeholder="Пошук зображень..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="filter-controls">
            <select
              value={currentCategory}
              onChange={(e) => setCurrentCategory(e.target.value)}
              className="filter-select"
            >
              <option value="all">Всі категорії</option>
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name.ua}
                </option>
              ))}
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="filter-select"
            >
              <option value="newest">Найновіші</option>
              <option value="oldest">Найстаріші</option>
              <option value="category">За категорією</option>
              <option value="id">За ID</option>
            </select>
          </div>
        </div>

        {/* Bulk actions */}
        {selectedImages.size > 0 && (
          <div className="bulk-actions">
            <span className="selected-count">
              Вибрано: {selectedImages.size}
            </span>

            <div className="bulk-controls">
              <select
                value={bulkAction}
                onChange={(e) => setBulkAction(e.target.value)}
                className="bulk-select"
              >
                <option value="">Дії з вибраними</option>
                <option value="delete">Видалити</option>
                <optgroup label="Змінити категорію">
                  {categories.map(category => (
                    <option key={`category-${category.id}`} value={`category-${category.id}`}>
                      {category.name.ua}
                    </option>
                  ))}
                </optgroup>
              </select>

              {bulkAction && (
                <button
                  onClick={handleBulkAction}
                  className="btn btn-primary btn-sm"
                >
                  Застосувати
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Results info */}
      <div className="results-info">
        <span>Знайдено: {filteredImages.length} зображень</span>
        <label className="select-all-label">
          <input
            type="checkbox"
            checked={selectedImages.size === filteredImages.length && filteredImages.length > 0}
            onChange={handleSelectAll}
          />
          Вибрати всі
        </label>
      </div>

      {/* Images grid */}
      <div className="gallery-grid">
        {filteredImages.map(image => (
          <div
            key={image.id}
            className={`gallery-item ${selectedImages.has(image.id) ? 'selected' : ''}`}
          >
            <div className="image-container">
              <input
                type="checkbox"
                className="image-checkbox"
                checked={selectedImages.has(image.id)}
                onChange={() => handleSelectImage(image.id)}
              />

              <CloudinaryImage
                publicId={image.publicId}
                alt={image.alt?.ua || image.alt?.en || `Gallery image ${image.id}`}
                width={300}
                height={200}
                className="gallery-thumbnail"
              />

              <div className="image-overlay">
                <div className="image-actions">
                  <button
                    onClick={() => openEditModal(image)}
                    className="action-btn edit-btn"
                    title="Редагувати"
                  >
                    ✏️
                  </button>
                  <button
                    onClick={() => setShowDeleteConfirm(image.id)}
                    className="action-btn delete-btn"
                    title="Видалити"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            </div>

            <div className="image-info">
              <div className="image-id">{image.id}</div>
              <div className="image-category">
                <span className={`category-tag category-${image.category}`}>
                  {getCategoryName(image.category)}
                </span>
              </div>
              <div className="image-meta">
                <span className="image-dimensions">
                  {image.width} × {image.height}
                </span>
                <span className="image-date">
                  {formatDate(image.createdAt)}
                </span>
              </div>
            </div>
          </div>
        ))}

        {filteredImages.length === 0 && !isLoading && (
          <div className="no-results">
            <p>Зображення не знайдено</p>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="btn btn-secondary"
              >
                Очистити пошук
              </button>
            )}
          </div>
        )}
      </div>

      {/* Delete confirmation modal */}
      {showDeleteConfirm && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Підтвердження видалення</h3>
            <p>Ви впевнені, що хочете видалити це зображення?</p>
            <div className="modal-actions">
              <button
                onClick={() => setShowDeleteConfirm(null)}
                className="btn btn-secondary"
              >
                Скасувати
              </button>
              <button
                onClick={() => handleDeleteImage(showDeleteConfirm)}
                className="btn btn-danger"
              >
                Видалити
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default GalleryImagesList