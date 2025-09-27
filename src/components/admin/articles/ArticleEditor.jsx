import React, { useState, useEffect } from 'react'
import useAdminArticlesStore from '../../../stores/adminArticlesStore'

const ArticleEditor = () => {
  const {
    currentArticle,
    isEditModalOpen,
    isCreateModalOpen,
    isLoading,
    addArticle,
    updateArticle,
    closeEditModal,
    closeCreateModal,
    categories
  } = useAdminArticlesStore()

  const [formData, setFormData] = useState({
    title: { ua: '', en: '', de: '', pl: '' },
    content: { ua: '', en: '', de: '', pl: '' },
    excerpt: { ua: '', en: '', de: '', pl: '' },
    category: '',
    status: 'draft',
    featuredImage: '',
    tags: [],
    seo: {
      metaTitle: { ua: '', en: '', de: '', pl: '' },
      metaDescription: { ua: '', en: '', de: '', pl: '' }
    }
  })

  const [currentLanguage, setCurrentLanguage] = useState('ua')
  const [tagInput, setTagInput] = useState('')
  const [errors, setErrors] = useState({})

  const languages = [
    { code: 'ua', name: 'Українська', flag: '🇺🇦' },
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'pl', name: 'Polski', flag: '🇵🇱' }
  ]

  // Заповнення форми при відкритті модального вікна
  useEffect(() => {
    if (currentArticle) {
      setFormData({
        title: currentArticle.title,
        content: currentArticle.content,
        excerpt: currentArticle.excerpt,
        category: currentArticle.category,
        status: currentArticle.status,
        featuredImage: currentArticle.featuredImage || '',
        tags: currentArticle.tags || [],
        seo: currentArticle.seo || {
          metaTitle: { ua: '', en: '', de: '', pl: '' },
          metaDescription: { ua: '', en: '', de: '', pl: '' }
        }
      })
    } else {
      // Очищення форми для нової статті
      setFormData({
        title: { ua: '', en: '', de: '', pl: '' },
        content: { ua: '', en: '', de: '', pl: '' },
        excerpt: { ua: '', en: '', de: '', pl: '' },
        category: categories.length > 0 ? categories[0].id : '',
        status: 'draft',
        featuredImage: '',
        tags: [],
        seo: {
          metaTitle: { ua: '', en: '', de: '', pl: '' },
          metaDescription: { ua: '', en: '', de: '', pl: '' }
        }
      })
    }
    setErrors({})
  }, [currentArticle, isEditModalOpen, isCreateModalOpen, categories])

  const handleInputChange = (field, value, language = null) => {
    setFormData(prev => {
      if (language) {
        return {
          ...prev,
          [field]: {
            ...prev[field],
            [language]: value
          }
        }
      } else {
        return {
          ...prev,
          [field]: value
        }
      }
    })

    // Очищення помилки для цього поля
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: null
      }))
    }
  }

  const handleSeoChange = (field, value, language) => {
    setFormData(prev => ({
      ...prev,
      seo: {
        ...prev.seo,
        [field]: {
          ...prev.seo[field],
          [language]: value
        }
      }
    }))
  }

  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()]
      }))
      setTagInput('')
    }
  }

  const handleRemoveTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }))
  }

  const validateForm = () => {
    const newErrors = {}

    // Перевірка назви (принаймні українська)
    if (!formData.title.ua.trim()) {
      newErrors.title = 'Назва українською обов\'язкова'
    }

    // Перевірка змісту (принаймні українською)
    if (!formData.content.ua.trim()) {
      newErrors.content = 'Зміст українською обов\'язковий'
    }

    // Перевірка витягу (принаймні українською)
    if (!formData.excerpt.ua.trim()) {
      newErrors.excerpt = 'Витяг українською обов\'язковий'
    }

    // Перевірка категорії
    if (!formData.category) {
      newErrors.category = 'Категорія обов\'язкова'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    try {
      let result
      if (currentArticle) {
        result = await updateArticle(currentArticle.id, formData)
      } else {
        result = await addArticle(formData)
      }

      if (result.success) {
        if (currentArticle) {
          closeEditModal()
        } else {
          closeCreateModal()
        }
      }
    } catch (error) {
      console.error('Помилка збереження статті:', error)
    }
  }

  const handleCancel = () => {
    if (currentArticle) {
      closeEditModal()
    } else {
      closeCreateModal()
    }
  }

  if (!isEditModalOpen && !isCreateModalOpen) {
    return null
  }

  return (
    <div className="modal-overlay">
      <div className="modal article-editor-modal">
        <div className="modal-header">
          <h2>{currentArticle ? 'Редагування статті' : 'Створення нової статті'}</h2>
          <button onClick={handleCancel} className="modal-close">&times;</button>
        </div>

        <form onSubmit={handleSubmit} className="article-editor-form">
          <div className="modal-body">
            {/* Вибір мови */}
            <div className="language-tabs">
              {languages.map(lang => (
                <button
                  key={lang.code}
                  type="button"
                  className={`language-tab ${currentLanguage === lang.code ? 'active' : ''}`}
                  onClick={() => setCurrentLanguage(lang.code)}
                >
                  {lang.flag} {lang.name}
                </button>
              ))}
            </div>

            {/* Основна інформація */}
            <div className="form-section">
              <h3>Основна інформація</h3>

              <div className="form-group">
                <label htmlFor={`title-${currentLanguage}`}>
                  Назва ({languages.find(l => l.code === currentLanguage)?.name})
                  {currentLanguage === 'ua' && <span className="required">*</span>}
                </label>
                <input
                  type="text"
                  id={`title-${currentLanguage}`}
                  value={formData.title[currentLanguage]}
                  onChange={(e) => handleInputChange('title', e.target.value, currentLanguage)}
                  placeholder={`Введіть назву статті ${languages.find(l => l.code === currentLanguage)?.name.toLowerCase()}`}
                  className={errors.title ? 'error' : ''}
                />
                {errors.title && <span className="error-message">{errors.title}</span>}
              </div>

              <div className="form-group">
                <label htmlFor={`excerpt-${currentLanguage}`}>
                  Короткий опис ({languages.find(l => l.code === currentLanguage)?.name})
                  {currentLanguage === 'ua' && <span className="required">*</span>}
                </label>
                <textarea
                  id={`excerpt-${currentLanguage}`}
                  value={formData.excerpt[currentLanguage]}
                  onChange={(e) => handleInputChange('excerpt', e.target.value, currentLanguage)}
                  placeholder={`Короткий опис статті ${languages.find(l => l.code === currentLanguage)?.name.toLowerCase()}`}
                  rows="3"
                  className={errors.excerpt ? 'error' : ''}
                />
                {errors.excerpt && <span className="error-message">{errors.excerpt}</span>}
              </div>

              <div className="form-group">
                <label htmlFor={`content-${currentLanguage}`}>
                  Зміст статті ({languages.find(l => l.code === currentLanguage)?.name})
                  {currentLanguage === 'ua' && <span className="required">*</span>}
                </label>
                <textarea
                  id={`content-${currentLanguage}`}
                  value={formData.content[currentLanguage]}
                  onChange={(e) => handleInputChange('content', e.target.value, currentLanguage)}
                  placeholder={`Повний зміст статті ${languages.find(l => l.code === currentLanguage)?.name.toLowerCase()}`}
                  rows="10"
                  className={errors.content ? 'error' : ''}
                />
                {errors.content && <span className="error-message">{errors.content}</span>}
              </div>
            </div>

            {/* SEO налаштування */}
            <div className="form-section">
              <h3>SEO налаштування</h3>

              <div className="form-group">
                <label htmlFor={`meta-title-${currentLanguage}`}>
                  Meta заголовок ({languages.find(l => l.code === currentLanguage)?.name})
                </label>
                <input
                  type="text"
                  id={`meta-title-${currentLanguage}`}
                  value={formData.seo.metaTitle[currentLanguage]}
                  onChange={(e) => handleSeoChange('metaTitle', e.target.value, currentLanguage)}
                  placeholder="SEO заголовок для пошукових систем"
                  maxLength="60"
                />
                <small className="form-hint">
                  Рекомендована довжина: до 60 символів ({formData.seo.metaTitle[currentLanguage].length}/60)
                </small>
              </div>

              <div className="form-group">
                <label htmlFor={`meta-description-${currentLanguage}`}>
                  Meta опис ({languages.find(l => l.code === currentLanguage)?.name})
                </label>
                <textarea
                  id={`meta-description-${currentLanguage}`}
                  value={formData.seo.metaDescription[currentLanguage]}
                  onChange={(e) => handleSeoChange('metaDescription', e.target.value, currentLanguage)}
                  placeholder="SEO опис для пошукових систем"
                  rows="3"
                  maxLength="160"
                />
                <small className="form-hint">
                  Рекомендована довжина: до 160 символів ({formData.seo.metaDescription[currentLanguage].length}/160)
                </small>
              </div>
            </div>

            {/* Метадані (показувати тільки для української мови) */}
            {currentLanguage === 'ua' && (
              <div className="form-section">
                <h3>Метадані</h3>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="category">
                      Категорія <span className="required">*</span>
                    </label>
                    <select
                      id="category"
                      value={formData.category}
                      onChange={(e) => handleInputChange('category', e.target.value)}
                      className={errors.category ? 'error' : ''}
                    >
                      <option value="">Оберіть категорію</option>
                      {categories.map(category => (
                        <option key={category.id} value={category.id}>
                          {category.name.ua}
                        </option>
                      ))}
                    </select>
                    {errors.category && <span className="error-message">{errors.category}</span>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="status">Статус</label>
                    <select
                      id="status"
                      value={formData.status}
                      onChange={(e) => handleInputChange('status', e.target.value)}
                    >
                      <option value="draft">Чернетка</option>
                      <option value="published">Опубліковано</option>
                      <option value="archived">Архів</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="featured-image">Головне зображення</label>
                  <input
                    type="text"
                    id="featured-image"
                    value={formData.featuredImage}
                    onChange={(e) => handleInputChange('featuredImage', e.target.value)}
                    placeholder="URL або шлях до зображення"
                  />
                  <small className="form-hint">
                    Введіть URL зображення або шлях до файлу в Cloudinary
                  </small>
                </div>

                <div className="form-group">
                  <label htmlFor="tags">Теги</label>
                  <div className="tags-input-container">
                    <input
                      type="text"
                      id="tags"
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault()
                          handleAddTag()
                        }
                      }}
                      placeholder="Введіть тег і натисніть Enter"
                    />
                    <button
                      type="button"
                      onClick={handleAddTag}
                      className="btn btn-sm btn-secondary"
                    >
                      Додати
                    </button>
                  </div>

                  {formData.tags.length > 0 && (
                    <div className="tags-list">
                      {formData.tags.map((tag, index) => (
                        <span key={index} className="tag">
                          {tag}
                          <button
                            type="button"
                            onClick={() => handleRemoveTag(tag)}
                            className="tag-remove"
                          >
                            &times;
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="modal-footer">
            <button
              type="button"
              onClick={handleCancel}
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
              {isLoading ? 'Збереження...' : (currentArticle ? 'Оновити' : 'Створити')}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ArticleEditor