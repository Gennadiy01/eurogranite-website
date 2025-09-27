import React, { useState, useEffect } from 'react'
import useAdminArticlesStore from '../../../stores/adminArticlesStore'

const ArticlesList = () => {
  const {
    articles,
    getFilteredArticles,
    currentCategory,
    searchQuery,
    sortBy,
    isLoading,
    statistics,
    loadArticles,
    deleteArticle,
    deleteMultipleArticles,
    updateArticleStatus,
    updateArticleCategory,
    setCurrentCategory,
    setSearchQuery,
    setSortBy,
    openEditModal,
    openCreateModal,
    exportArticlesData,
    categories
  } = useAdminArticlesStore()

  const [selectedArticles, setSelectedArticles] = useState(new Set())
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null)
  const [bulkAction, setBulkAction] = useState('')

  // Завантаження статей при монтуванні
  useEffect(() => {
    loadArticles()
  }, [loadArticles])

  const filteredArticles = getFilteredArticles()

  const handleSelectArticle = (articleId) => {
    const newSelected = new Set(selectedArticles)
    if (newSelected.has(articleId)) {
      newSelected.delete(articleId)
    } else {
      newSelected.add(articleId)
    }
    setSelectedArticles(newSelected)
  }

  const handleSelectAll = () => {
    if (selectedArticles.size === filteredArticles.length) {
      setSelectedArticles(new Set())
    } else {
      setSelectedArticles(new Set(filteredArticles.map(article => article.id)))
    }
  }

  const handleDeleteArticle = async (articleId) => {
    const result = await deleteArticle(articleId)
    if (result.success) {
      setShowDeleteConfirm(null)
      setSelectedArticles(prev => {
        const newSet = new Set(prev)
        newSet.delete(articleId)
        return newSet
      })
    }
  }

  const handleBulkAction = async () => {
    const selectedIds = Array.from(selectedArticles)

    if (bulkAction === 'delete') {
      const result = await deleteMultipleArticles(selectedIds)
      if (result.success) {
        setSelectedArticles(new Set())
        setBulkAction('')
      }
    } else if (bulkAction.startsWith('status-')) {
      const newStatus = bulkAction.replace('status-', '')
      const result = await updateArticleStatus(selectedIds, newStatus)
      if (result.success) {
        setSelectedArticles(new Set())
        setBulkAction('')
      }
    } else if (bulkAction.startsWith('category-')) {
      const newCategory = bulkAction.replace('category-', '')
      const result = await updateArticleCategory(selectedIds, newCategory)
      if (result.success) {
        setSelectedArticles(new Set())
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

  const getStatusBadge = (status) => {
    const statusConfig = {
      published: { text: 'Опубліковано', className: 'status-published' },
      draft: { text: 'Чернетка', className: 'status-draft' },
      archived: { text: 'Архів', className: 'status-archived' }
    }
    return statusConfig[status] || { text: status, className: 'status-unknown' }
  }

  if (isLoading && articles.length === 0) {
    return (
      <div className="articles-loading">
        <div className="loading-spinner"></div>
        <p>Завантаження статей...</p>
      </div>
    )
  }

  return (
    <div className="articles-list">
      {/* Заголовок зі статистикою */}
      <div className="articles-header">
        <div className="articles-stats">
          <div className="stat-card">
            <h3>{statistics.totalArticles}</h3>
            <p>Всього статей</p>
          </div>
          <div className="stat-card">
            <h3>{statistics.publishedArticles}</h3>
            <p>Опубліковано</p>
          </div>
          <div className="stat-card">
            <h3>{statistics.draftArticles}</h3>
            <p>Чернеток</p>
          </div>
          <div className="stat-card">
            <h3>{statistics.recentArticles}</h3>
            <p>Нових за місяць</p>
          </div>
        </div>

        <div className="articles-actions">
          <button
            onClick={openCreateModal}
            className="btn btn-primary"
          >
            ➕ Створити статтю
          </button>
          <button
            onClick={exportArticlesData}
            className="btn btn-secondary"
          >
            📥 Експорт
          </button>
        </div>
      </div>

      {/* Фільтри та пошук */}
      <div className="articles-filters">
        <div className="filter-row">
          <div className="search-box">
            <input
              type="text"
              placeholder="Пошук статей..."
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
              <option value="title">За назвою</option>
              <option value="status">За статусом</option>
              <option value="category">За категорією</option>
            </select>
          </div>
        </div>

        {/* Масові дії */}
        {selectedArticles.size > 0 && (
          <div className="bulk-actions">
            <span className="selected-count">
              Вибрано: {selectedArticles.size}
            </span>

            <div className="bulk-controls">
              <select
                value={bulkAction}
                onChange={(e) => setBulkAction(e.target.value)}
                className="bulk-select"
              >
                <option value="">Дії з вибраними</option>
                <option value="delete">Видалити</option>
                <optgroup label="Змінити статус">
                  <option value="status-published">Опублікувати</option>
                  <option value="status-draft">В чернетки</option>
                  <option value="status-archived">В архів</option>
                </optgroup>
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

      {/* Інформація про результати */}
      <div className="results-info">
        <span>Знайдено: {filteredArticles.length} статей</span>
        <label className="select-all-label">
          <input
            type="checkbox"
            checked={selectedArticles.size === filteredArticles.length && filteredArticles.length > 0}
            onChange={handleSelectAll}
          />
          Вибрати всі
        </label>
      </div>

      {/* Список статей */}
      <div className="articles-table">
        <div className="table-header">
          <div className="col-checkbox">
            <input
              type="checkbox"
              checked={selectedArticles.size === filteredArticles.length && filteredArticles.length > 0}
              onChange={handleSelectAll}
            />
          </div>
          <div className="col-title">Назва</div>
          <div className="col-category">Категорія</div>
          <div className="col-status">Статус</div>
          <div className="col-date">Дата</div>
          <div className="col-actions">Дії</div>
        </div>

        <div className="table-body">
          {filteredArticles.map(article => {
            const statusBadge = getStatusBadge(article.status)
            return (
              <div
                key={article.id}
                className={`table-row ${selectedArticles.has(article.id) ? 'selected' : ''}`}
              >
                <div className="col-checkbox">
                  <input
                    type="checkbox"
                    checked={selectedArticles.has(article.id)}
                    onChange={() => handleSelectArticle(article.id)}
                  />
                </div>

                <div className="col-title">
                  <div className="article-title">
                    <h4>{article.title.ua}</h4>
                    <p className="article-excerpt">{article.excerpt.ua}</p>
                  </div>
                  <div className="article-meta">
                    <span className="article-id">ID: {article.id}</span>
                    <span className="article-author">Автор: {article.author}</span>
                  </div>
                </div>

                <div className="col-category">
                  <span className={`category-tag category-${article.category}`}>
                    {getCategoryName(article.category)}
                  </span>
                </div>

                <div className="col-status">
                  <span className={`status-badge ${statusBadge.className}`}>
                    {statusBadge.text}
                  </span>
                </div>

                <div className="col-date">
                  <div className="date-info">
                    <span className="created-date">
                      Створено: {formatDate(article.createdAt)}
                    </span>
                    {article.updatedAt !== article.createdAt && (
                      <span className="updated-date">
                        Оновлено: {formatDate(article.updatedAt)}
                      </span>
                    )}
                  </div>
                </div>

                <div className="col-actions">
                  <div className="action-buttons">
                    <button
                      onClick={() => openEditModal(article)}
                      className="action-btn edit-btn"
                      title="Редагувати"
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => setShowDeleteConfirm(article.id)}
                      className="action-btn delete-btn"
                      title="Видалити"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              </div>
            )
          })}

          {filteredArticles.length === 0 && !isLoading && (
            <div className="no-results">
              <p>Статті не знайдено</p>
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
      </div>

      {/* Модальне вікно підтвердження видалення */}
      {showDeleteConfirm && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Підтвердження видалення</h3>
            <p>Ви впевнені, що хочете видалити цю статтю?</p>
            <div className="modal-actions">
              <button
                onClick={() => setShowDeleteConfirm(null)}
                className="btn btn-secondary"
              >
                Скасувати
              </button>
              <button
                onClick={() => handleDeleteArticle(showDeleteConfirm)}
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

export default ArticlesList