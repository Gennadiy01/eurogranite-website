import React from 'react'
import useAdminProductsStore from '../../../stores/adminProductsStore'

const ProductsFilter = () => {
  const {
    searchQuery,
    selectedCategory,
    sortBy,
    sortOrder,
    hasUnsavedChanges,
    isLoading,
    setSearchQuery,
    setSelectedCategory,
    setSortBy,
    openEditModal,
    exportProducts,
    saveProducts,
    resetProducts,
    refreshProducts,
    clearError
  } = useAdminProductsStore()

  const categories = [
    { value: 'all', label: 'Всі категорії', count: null },
    { value: 'gabbro', label: 'Габро (чорний)', count: null },
    { value: 'granite', label: 'Граніт (сірий/коричневий)', count: null },
    { value: 'green', label: 'Зелений граніт', count: null },
    { value: 'labradorite', label: 'Лабрадорит', count: null }
  ]

  const sortOptions = [
    { value: 'name', label: 'За назвою' },
    { value: 'price', label: 'За ціною' },
    { value: 'dimensions', label: 'За розміром' },
    { value: 'inStock', label: 'За наявністю' }
  ]

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value)
    clearError()
  }

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value)
    clearError()
  }

  const handleSortChange = (e) => {
    setSortBy(e.target.value)
  }

  const clearSearch = () => {
    setSearchQuery('')
    setSelectedCategory('all')
    clearError()
  }

  const handleSaveProducts = async () => {
    const result = await saveProducts()
    if (result.success) {
      alert('✅ Зміни успішно збережено!')
    } else {
      alert(`❌ Помилка збереження: ${result.error}`)
    }
  }

  const handleResetProducts = async () => {
    if (hasUnsavedChanges) {
      const confirm = window.confirm(
        'Ви впевнені, що хочете скинути всі незбережені зміни? Ця дія незворотна.'
      )
      if (!confirm) return
    }

    const result = await resetProducts()
    if (result.success) {
      alert('🔄 Дані скинуто до оригінального стану')
    } else {
      alert(`❌ Помилка скидання: ${result.error}`)
    }
  }

  const handleRefreshProducts = async () => {
    if (hasUnsavedChanges) {
      const confirm = window.confirm(
        'У вас є незбережені зміни. Оновлення призведе до їх втрати. Продовжити?'
      )
      if (!confirm) return
    }

    const result = await refreshProducts()
    if (result.success) {
      alert('✅ Продукти оновлено з сервера!')
    } else {
      alert(`❌ Помилка оновлення: ${result.error}`)
    }
  }

  return (
    <div className="products-filter">
      <div className="filter-section">
        <div className="filter-row">
          {/* Пошук */}
          <div className="search-group">
            <div className="search-input-wrapper">
              <input
                type="text"
                placeholder="Пошук по назві, ID або текстурі..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="search-input"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="clear-search-btn"
                  title="Очистити пошук"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Категорії */}
          <div className="filter-group">
            <select
              value={selectedCategory}
              onChange={handleCategoryChange}
              className="filter-select"
            >
              {categories.map(category => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
          </div>

          {/* Сортування */}
          <div className="filter-group">
            <select
              value={sortBy}
              onChange={handleSortChange}
              className="filter-select"
            >
              {sortOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <button
              onClick={() => setSortBy(sortBy)}
              className={`sort-order-btn ${sortOrder === 'desc' ? 'desc' : 'asc'}`}
              title={`Сортування: ${sortOrder === 'asc' ? 'зростання' : 'спадання'}`}
            >
              {sortOrder === 'asc' ? '↑' : '↓'}
            </button>
          </div>
        </div>

        {/* Швидкі дії */}
        <div className="filter-actions">
          <div className="action-group">
            <button
              onClick={() => openEditModal()}
              className="btn btn-primary"
            >
              ➕ Додати продукт
            </button>

            <button
              onClick={handleRefreshProducts}
              className="btn btn-secondary"
              title="Оновити продукти з сервера"
              disabled={isLoading}
            >
              {isLoading ? '⏳ Оновлення...' : '🔄 Оновити'}
            </button>

            <button
              onClick={exportProducts}
              className="btn btn-secondary"
              title="Експортувати всі продукти в JSON"
              disabled={isLoading}
            >
              📤 Експорт
            </button>

            {hasUnsavedChanges && (
              <button
                onClick={handleSaveProducts}
                className="btn btn-success"
                title="Зберегти всі зміни на сервер"
                disabled={isLoading}
              >
                {isLoading ? '⏳ Збереження...' : '💾 Зберегти зміни'}
              </button>
            )}

            <button
              onClick={handleResetProducts}
              className="btn btn-outline"
              title="Скинути всі зміни до оригінального стану"
              disabled={isLoading}
            >
              {isLoading ? '⏳ Скидання...' : '🔄 Скинути зміни'}
            </button>
          </div>

          {/* Очистка фільтрів */}
          {(searchQuery || selectedCategory !== 'all') && (
            <button
              onClick={clearSearch}
              className="btn btn-ghost"
              title="Очистити всі фільтри"
            >
              🗑️ Очистити фільтри
            </button>
          )}
        </div>
      </div>

      {/* Активні фільтри */}
      {(searchQuery || selectedCategory !== 'all') && (
        <div className="active-filters">
          <span className="active-filters-label">Активні фільтри:</span>

          {searchQuery && (
            <span className="filter-tag">
              Пошук: "{searchQuery}"
              <button onClick={() => setSearchQuery('')}>✕</button>
            </span>
          )}

          {selectedCategory !== 'all' && (
            <span className="filter-tag">
              Категорія: {categories.find(c => c.value === selectedCategory)?.label}
              <button onClick={() => setSelectedCategory('all')}>✕</button>
            </span>
          )}
        </div>
      )}
    </div>
  )
}

export default ProductsFilter