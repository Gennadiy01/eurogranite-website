import React, { useState, useEffect } from 'react'
import useAdminGalleryStore from '../../../stores/adminGalleryStore'
import CloudinaryImage from '../../atoms/CloudinaryImage/CloudinaryImage'

const GalleryImageEditor = () => {
  const {
    editingImage,
    isEditModalOpen,
    closeEditModal,
    addGalleryImage,
    updateGalleryImage,
    isLoading,
    error,
    categories
  } = useAdminGalleryStore()

  const [formData, setFormData] = useState({
    publicId: '',
    category: 'courtyard',
    width: 1920,
    height: 1280,
    tags: [],
    alt: {
      ua: '',
      en: '',
      de: '',
      pl: ''
    }
  })

  const [newTag, setNewTag] = useState('')
  const [imagePreview, setImagePreview] = useState(null)

  // Fill form when editing
  useEffect(() => {
    if (editingImage) {
      setFormData({
        publicId: editingImage.publicId || '',
        category: editingImage.category || 'courtyard',
        width: editingImage.width || 1920,
        height: editingImage.height || 1280,
        tags: editingImage.tags?.filter(tag => !categories.some(cat => cat.id === tag)) || [],
        alt: editingImage.alt || { ua: '', en: '', de: '', pl: '' }
      })
      setImagePreview(editingImage.publicId)
    } else {
      // Reset form for new image
      setFormData({
        publicId: '',
        category: 'courtyard',
        width: 1920,
        height: 1280,
        tags: [],
        alt: { ua: '', en: '', de: '', pl: '' }
      })
      setImagePreview(null)
    }
  }, [editingImage, categories])

  const handleInputChange = (field, value, lang = null) => {
    if (lang) {
      setFormData(prev => ({
        ...prev,
        [field]: {
          ...prev[field],
          [lang]: value
        }
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }))
    }
  }

  const handlePublicIdChange = (value) => {
    setFormData(prev => ({ ...prev, publicId: value }))
    setImagePreview(value)
  }

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }))
      setNewTag('')
    }
  }

  const removeTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validation
    if (!formData.publicId.trim()) {
      alert('Будь ласка, введіть Public ID зображення')
      return
    }

    if (!formData.alt.ua.trim()) {
      alert('Будь ласка, введіть опис зображення українською')
      return
    }

    try {
      let result
      if (editingImage) {
        result = await updateGalleryImage(editingImage.id, formData)
      } else {
        result = await addGalleryImage(formData)
      }

      if (result.success) {
        closeEditModal()
      } else {
        alert(`Помилка: ${result.error}`)
      }
    } catch (error) {
      alert(`Помилка: ${error.message}`)
    }
  }

  const extractPublicIdFromUrl = (url) => {
    try {
      // Extract public ID from Cloudinary URL
      const match = url.match(/\/image\/upload\/(?:v\d+\/)?(.+?)(?:\.[^.]+)?$/)
      if (match) {
        return match[1].split('/').pop()
      }
      return url
    } catch {
      return url
    }
  }

  const handleUrlPaste = (e) => {
    const pastedUrl = e.target.value
    const extractedId = extractPublicIdFromUrl(pastedUrl)
    handlePublicIdChange(extractedId)
  }

  if (!isEditModalOpen) return null

  return (
    <div className="gallery-editor-overlay">
      <div className="gallery-editor-modal">
        <div className="modal-header">
          <h2>
            {editingImage ? 'Редагувати зображення' : 'Додати нове зображення'}
          </h2>
          <button
            onClick={closeEditModal}
            className="close-btn"
            disabled={isLoading}
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="gallery-form">
          <div className="form-sections">
            {/* Image Preview */}
            {imagePreview && (
              <div className="form-section">
                <h3>Попередній перегляд</h3>
                <div className="image-preview">
                  <CloudinaryImage
                    publicId={imagePreview}
                    alt="Preview"
                    width={400}
                    height={267}
                    className="preview-image"
                  />
                </div>
              </div>
            )}

            {/* Basic Information */}
            <div className="form-section">
              <h3>Основна інформація</h3>

              <div className="form-group">
                <label>Cloudinary Public ID *</label>
                <input
                  type="text"
                  placeholder="image-name_abc123 або вставте повний URL"
                  value={formData.publicId}
                  onChange={(e) => handleUrlPaste(e)}
                  required
                />
                <small className="form-help">
                  Введіть Public ID з Cloudinary або вставте повний URL зображення
                </small>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Категорія</label>
                  <select
                    value={formData.category}
                    onChange={(e) => handleInputChange('category', e.target.value)}
                  >
                    {categories.map(category => (
                      <option key={category.id} value={category.id}>
                        {category.name.ua}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>Ширина (px)</label>
                  <input
                    type="number"
                    value={formData.width}
                    onChange={(e) => handleInputChange('width', parseInt(e.target.value) || 1920)}
                    min="1"
                  />
                </div>

                <div className="form-group">
                  <label>Висота (px)</label>
                  <input
                    type="number"
                    value={formData.height}
                    onChange={(e) => handleInputChange('height', parseInt(e.target.value) || 1280)}
                    min="1"
                  />
                </div>
              </div>
            </div>

            {/* Alt Text */}
            <div className="form-section">
              <h3>Опис зображення (Alt text)</h3>

              <div className="form-group">
                <label>Українська *</label>
                <textarea
                  placeholder="Опис зображення українською мовою"
                  value={formData.alt.ua}
                  onChange={(e) => handleInputChange('alt', e.target.value, 'ua')}
                  required
                  rows="3"
                />
              </div>

              <div className="form-group">
                <label>English</label>
                <textarea
                  placeholder="Image description in English"
                  value={formData.alt.en}
                  onChange={(e) => handleInputChange('alt', e.target.value, 'en')}
                  rows="3"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Deutsch</label>
                  <textarea
                    placeholder="Bildbeschreibung auf Deutsch"
                    value={formData.alt.de}
                    onChange={(e) => handleInputChange('alt', e.target.value, 'de')}
                    rows="2"
                  />
                </div>

                <div className="form-group">
                  <label>Polski</label>
                  <textarea
                    placeholder="Opis obrazu po polsku"
                    value={formData.alt.pl}
                    onChange={(e) => handleInputChange('alt', e.target.value, 'pl')}
                    rows="2"
                  />
                </div>
              </div>
            </div>

            {/* Tags */}
            <div className="form-section">
              <h3>Додаткові теги</h3>

              <div className="tags-list">
                {formData.tags.map((tag, index) => (
                  <div key={index} className="tag-item">
                    <span>{tag}</span>
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="remove-tag-btn"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>

              <div className="add-tag">
                <input
                  type="text"
                  placeholder="Новий тег"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                />
                <button type="button" onClick={addTag} className="add-tag-btn">
                  ➕ Додати тег
                </button>
              </div>

              <small className="form-help">
                Теги галерея та категорія додаються автоматично
              </small>
            </div>
          </div>

          {error && (
            <div className="form-error">
              ❌ {error}
            </div>
          )}

          <div className="form-actions">
            <button
              type="button"
              onClick={closeEditModal}
              className="btn btn-secondary"
              disabled={isLoading}
            >
              Скасувати
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isLoading}
            >
              {isLoading ? 'Збереження...' : editingImage ? 'Оновити' : 'Додати'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default GalleryImageEditor