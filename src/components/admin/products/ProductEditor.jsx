import React, { useState, useEffect } from 'react'
import useAdminProductsStore from '../../../stores/adminProductsStore'
import { surfaceFinishTypes, standardSizes } from '../../../constants/productsData'

const ProductEditor = () => {
  const {
    editingProduct,
    isEditModalOpen,
    closeEditModal,
    addProduct,
    updateProduct,
    isLoading,
    error
  } = useAdminProductsStore()

  const [formData, setFormData] = useState({
    name: {
      ua: '',
      en: '',
      de: '',
      pl: ''
    },
    textureId: 'black-001',
    finishType: 'sawn-thermal-top',
    size: 'paver_200x100x50',
    dimensions: { ...standardSizes.paver_200x100x50 },
    price: {
      ua: '',
      en: '',
      de: '',
      pl: ''
    },
    image: '',
    description: {
      ua: '',
      en: '',
      de: '',
      pl: ''
    },
    features: {
      ua: [],
      en: [],
      de: [],
      pl: []
    },
    inStock: true,
    customizable: true
  })

  const [customDimensions, setCustomDimensions] = useState(false)
  const [newFeature, setNewFeature] = useState({
    ua: '', en: '', de: '', pl: ''
  })

  // Заповнення форми при редагуванні
  useEffect(() => {
    if (editingProduct) {
      setFormData({
        name: editingProduct.name || { ua: '', en: '', de: '', pl: '' },
        textureId: editingProduct.textureId || 'black-001',
        finishType: editingProduct.finishType || 'sawn-thermal-top',
        size: editingProduct.size || 'paver_200x100x50',
        dimensions: editingProduct.dimensions || { ...standardSizes.paver_200x100x50 },
        price: editingProduct.price || { ua: '', en: '', de: '', pl: '' },
        image: editingProduct.image || '',
        description: editingProduct.description || { ua: '', en: '', de: '', pl: '' },
        features: editingProduct.features || { ua: [], en: [], de: [], pl: [] },
        inStock: editingProduct.inStock !== undefined ? editingProduct.inStock : true,
        customizable: editingProduct.customizable !== undefined ? editingProduct.customizable : true
      })

      setCustomDimensions(editingProduct.size === 'custom')
    } else {
      // Скидання форми для нового продукту
      setFormData({
        name: { ua: '', en: '', de: '', pl: '' },
        textureId: 'black-001',
        finishType: 'sawn-thermal-top',
        size: 'paver_200x100x50',
        dimensions: { ...standardSizes.paver_200x100x50 },
        price: { ua: '', en: '', de: '', pl: '' },
        image: '',
        description: { ua: '', en: '', de: '', pl: '' },
        features: { ua: [], en: [], de: [], pl: [] },
        inStock: true,
        customizable: true
      })
      setCustomDimensions(false)
    }
  }, [editingProduct])

  // Обробка зміни розміру
  useEffect(() => {
    if (formData.size !== 'custom' && standardSizes[formData.size]) {
      setFormData(prev => ({
        ...prev,
        dimensions: { ...standardSizes[formData.size] }
      }))
      setCustomDimensions(false)
    } else if (formData.size === 'custom') {
      setCustomDimensions(true)
    }
  }, [formData.size])

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

  const handleDimensionChange = (dimension, value) => {
    const numValue = parseFloat(value) || 0
    setFormData(prev => ({
      ...prev,
      dimensions: {
        ...prev.dimensions,
        [dimension]: numValue
      }
    }))
  }

  const addFeature = () => {
    if (newFeature.ua.trim()) {
      setFormData(prev => ({
        ...prev,
        features: {
          ua: [...prev.features.ua, newFeature.ua.trim()],
          en: [...prev.features.en, newFeature.en.trim() || newFeature.ua.trim()],
          de: [...prev.features.de, newFeature.de.trim() || newFeature.ua.trim()],
          pl: [...prev.features.pl, newFeature.pl.trim() || newFeature.ua.trim()]
        }
      }))
      setNewFeature({ ua: '', en: '', de: '', pl: '' })
    }
  }

  const removeFeature = (index) => {
    setFormData(prev => ({
      ...prev,
      features: {
        ua: prev.features.ua.filter((_, i) => i !== index),
        en: prev.features.en.filter((_, i) => i !== index),
        de: prev.features.de.filter((_, i) => i !== index),
        pl: prev.features.pl.filter((_, i) => i !== index)
      }
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Валідація
    if (!formData.name.ua.trim()) {
      alert('Будь ласка, введіть назву продукту українською')
      return
    }

    if (!formData.price.ua.trim()) {
      alert('Будь ласка, введіть ціну')
      return
    }

    try {
      let result
      if (editingProduct) {
        result = await updateProduct(editingProduct.id, formData)
      } else {
        result = await addProduct(formData)
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

  if (!isEditModalOpen) return null

  return (
    <div className="product-editor-overlay">
      <div className="product-editor-modal">
        <div className="modal-header">
          <h2>
            {editingProduct ? 'Редагувати продукт' : 'Додати новий продукт'}
          </h2>
          <button
            onClick={closeEditModal}
            className="close-btn"
            disabled={isLoading}
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="product-form">
          <div className="form-sections">
            {/* Основна інформація */}
            <div className="form-section">
              <h3>Основна інформація</h3>

              <div className="form-group">
                <label>Назва продукту *</label>
                <div className="lang-inputs">
                  <input
                    type="text"
                    placeholder="Українська"
                    value={formData.name.ua}
                    onChange={(e) => handleInputChange('name', e.target.value, 'ua')}
                    required
                  />
                  <input
                    type="text"
                    placeholder="English"
                    value={formData.name.en}
                    onChange={(e) => handleInputChange('name', e.target.value, 'en')}
                  />
                  <input
                    type="text"
                    placeholder="Deutsch"
                    value={formData.name.de}
                    onChange={(e) => handleInputChange('name', e.target.value, 'de')}
                  />
                  <input
                    type="text"
                    placeholder="Polski"
                    value={formData.name.pl}
                    onChange={(e) => handleInputChange('name', e.target.value, 'pl')}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Тип текстури</label>
                  <select
                    value={formData.textureId}
                    onChange={(e) => handleInputChange('textureId', e.target.value)}
                  >
                    <option value="black-001">Чорний граніт (Black-001)</option>
                    <option value="green-001">Зелений граніт (Green-001)</option>
                    <option value="green-002">Зелений граніт (Green-002)</option>
                    <option value="red-brown-002">Червоно-коричневий (Red-Brown-002)</option>
                    <option value="red-brown-003">Червоно-коричневий (Red-Brown-003)</option>
                    <option value="red-brown-008">Червоно-коричневий (Red-Brown-008)</option>
                    <option value="gray-001">Сірий граніт (Gray-001)</option>
                    <option value="labradorite-001">Лабрадорит (Labradorite-001)</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Тип обробки</label>
                  <select
                    value={formData.finishType}
                    onChange={(e) => handleInputChange('finishType', e.target.value)}
                  >
                    {Object.entries(surfaceFinishTypes).map(([key, finish]) => (
                      <option key={key} value={key}>
                        {finish.name.ua}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>URL зображення (необов'язково)</label>
                <input
                  type="text"
                  placeholder="https://example.com/image.jpg або залиште порожнім"
                  value={formData.image}
                  onChange={(e) => handleInputChange('image', e.target.value)}
                />
                <small className="form-hint">
                  Можна залишити порожнім або вказати повний URL до зображення
                </small>
              </div>
            </div>

            {/* Розміри */}
            <div className="form-section">
              <h3>Розміри</h3>

              <div className="form-group">
                <label>Стандартний розмір</label>
                <select
                  value={formData.size}
                  onChange={(e) => handleInputChange('size', e.target.value)}
                >
                  {Object.entries(standardSizes).map(([key, size]) => (
                    <option key={key} value={key}>
                      {key === 'custom' ? 'Кастомний розмір' : `${size.length}×${size.width}×${size.height} ${size.unit}`}
                    </option>
                  ))}
                </select>
              </div>

              {customDimensions && (
                <div className="form-row">
                  <div className="form-group">
                    <label>Довжина (мм)</label>
                    <input
                      type="number"
                      value={formData.dimensions.length}
                      onChange={(e) => handleDimensionChange('length', e.target.value)}
                      min="1"
                    />
                  </div>
                  <div className="form-group">
                    <label>Ширина (мм)</label>
                    <input
                      type="number"
                      value={formData.dimensions.width}
                      onChange={(e) => handleDimensionChange('width', e.target.value)}
                      min="1"
                    />
                  </div>
                  <div className="form-group">
                    <label>Висота (мм)</label>
                    <input
                      type="number"
                      value={formData.dimensions.height}
                      onChange={(e) => handleDimensionChange('height', e.target.value)}
                      min="1"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Ціна */}
            <div className="form-section">
              <h3>Ціна</h3>
              <div className="form-row">
                <div className="form-group">
                  <label>Ціна (UAH) *</label>
                  <input
                    type="text"
                    placeholder="1140 грн/м²"
                    value={formData.price.ua}
                    onChange={(e) => handleInputChange('price', e.target.value, 'ua')}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Ціна (EUR)</label>
                  <input
                    type="text"
                    placeholder="21 €/m²"
                    value={formData.price.en}
                    onChange={(e) => handleInputChange('price', e.target.value, 'en')}
                  />
                </div>
              </div>
            </div>

            {/* Особливості */}
            <div className="form-section">
              <h3>Особливості продукту</h3>

              <div className="features-list">
                {formData.features.ua.map((feature, index) => (
                  <div key={index} className="feature-item">
                    <span>{feature}</span>
                    <button
                      type="button"
                      onClick={() => removeFeature(index)}
                      className="remove-feature-btn"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>

              <div className="add-feature">
                <div className="lang-inputs">
                  <input
                    type="text"
                    placeholder="Особливість українською"
                    value={newFeature.ua}
                    onChange={(e) => setNewFeature(prev => ({...prev, ua: e.target.value}))}
                  />
                  <input
                    type="text"
                    placeholder="English"
                    value={newFeature.en}
                    onChange={(e) => setNewFeature(prev => ({...prev, en: e.target.value}))}
                  />
                </div>
                <button type="button" onClick={addFeature} className="add-feature-btn">
                  ➕ Додати особливість
                </button>
              </div>
            </div>

            {/* Опції */}
            <div className="form-section">
              <h3>Опції</h3>
              <div className="checkbox-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={formData.inStock}
                    onChange={(e) => handleInputChange('inStock', e.target.checked)}
                  />
                  В наявності
                </label>
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={formData.customizable}
                    onChange={(e) => handleInputChange('customizable', e.target.checked)}
                  />
                  Можливе кастомне виготовлення
                </label>
              </div>
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
              {isLoading ? 'Збереження...' : editingProduct ? 'Оновити' : 'Створити'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ProductEditor