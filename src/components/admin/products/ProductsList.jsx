import React from 'react'
import useAdminProductsStore from '../../../stores/adminProductsStore'
import ProductCard from './ProductCard'
import ProductsFilter from './ProductsFilter'
import './products-admin.scss'

const ProductsList = () => {
  const {
    getFilteredProducts,
    searchQuery,
    selectedCategory,
    sortBy,
    sortOrder,
    isLoading,
    error,
    openEditModal,
    deleteProduct,
    duplicateProduct,
    toggleProductStock,
    getProductsStats
  } = useAdminProductsStore()

  const filteredProducts = getFilteredProducts()
  const stats = getProductsStats()

  const handleEdit = (product) => {
    openEditModal(product)
  }

  const handleDelete = async (productId) => {
    if (window.confirm('Ви впевнені, що хочете видалити цей продукт?')) {
      const result = await deleteProduct(productId)
      if (!result.success) {
        alert(`Помилка: ${result.error}`)
      }
    }
  }

  const handleDuplicate = async (productId) => {
    const result = await duplicateProduct(productId)
    if (!result.success) {
      alert(`Помилка: ${result.error}`)
    }
  }

  const handleToggleStock = (productId) => {
    toggleProductStock(productId)
  }

  if (isLoading) {
    return (
      <div className="products-loading">
        <div className="loading-spinner"></div>
        <p>Завантаження продуктів...</p>
      </div>
    )
  }

  return (
    <div className="products-list">
      {/* Статистика */}
      <div className="products-stats">
        <div className="stats-grid">
          <div className="stat-item">
            <span className="stat-number">{stats.total}</span>
            <span className="stat-label">Всього продуктів</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{stats.inStock}</span>
            <span className="stat-label">В наявності</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{stats.outOfStock}</span>
            <span className="stat-label">Немає в наявності</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{stats.priceRange.min} - {stats.priceRange.max}</span>
            <span className="stat-label">Діапазон цін (грн/м²)</span>
          </div>
        </div>
      </div>

      {/* Фільтри */}
      <ProductsFilter />

      {/* Помилки */}
      {error && (
        <div className="products-error">
          <p>❌ {error}</p>
        </div>
      )}

      {/* Результати пошуку */}
      <div className="products-results">
        <div className="results-header">
          <h3>
            Знайдено {filteredProducts.length}
            {filteredProducts.length === 1 ? ' продукт' :
             filteredProducts.length < 5 ? ' продукти' : ' продуктів'}
            {searchQuery && (
              <span className="search-query"> за запитом "{searchQuery}"</span>
            )}
            {selectedCategory !== 'all' && (
              <span className="category-filter"> в категорії "{selectedCategory}"</span>
            )}
          </h3>

          <div className="sort-info">
            Сортування: {sortBy === 'name' ? 'за назвою' :
                       sortBy === 'price' ? 'за ціною' :
                       sortBy === 'dimensions' ? 'за розміром' :
                       sortBy === 'inStock' ? 'за наявністю' : 'за ID'}
            ({sortOrder === 'asc' ? 'зростання' : 'спадання'})
          </div>
        </div>

        {/* Список продуктів */}
        {filteredProducts.length === 0 ? (
          <div className="no-products">
            <div className="no-products-icon">📦</div>
            <h3>Продукти не знайдені</h3>
            <p>
              {searchQuery || selectedCategory !== 'all'
                ? 'Спробуйте змінити критерії пошуку або фільтри'
                : 'Ще немає жодного продукту'
              }
            </p>
            <button
              onClick={() => openEditModal()}
              className="btn btn-primary"
            >
              ➕ Додати перший продукт
            </button>
          </div>
        ) : (
          <div className="products-grid">
            {filteredProducts.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onDuplicate={handleDuplicate}
                onToggleStock={handleToggleStock}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductsList