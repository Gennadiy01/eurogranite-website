import React from 'react'

const ProductCard = ({ product, onEdit, onDelete, onDuplicate, onToggleStock }) => {
  const handleStockToggle = (e) => {
    e.stopPropagation()
    onToggleStock(product.id)
  }

  const handleEdit = (e) => {
    e.stopPropagation()
    onEdit(product)
  }

  const handleDelete = (e) => {
    e.stopPropagation()
    onDelete(product.id)
  }

  const handleDuplicate = (e) => {
    e.stopPropagation()
    onDuplicate(product.id)
  }

  const getTextureColor = (textureId) => {
    if (textureId.includes('black')) return '#2d3748'
    if (textureId.includes('green')) return '#38a169'
    if (textureId.includes('red-brown')) return '#c05621'
    if (textureId.includes('gray')) return '#718096'
    if (textureId.includes('labradorite')) return '#4a5568'
    return '#e2e8f0'
  }

  return (
    <div className={`product-card ${!product.inStock ? 'product-card--out-of-stock' : ''}`}>
      {/* Зображення продукту */}
      <div className="product-card__image">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name.ua}
            onError={(e) => {
              e.target.style.display = 'none'
              e.target.nextSibling.style.display = 'flex'
            }}
          />
        ) : null}

        {/* Fallback для зображень */}
        <div
          className="product-card__image-fallback"
          style={{
            backgroundColor: getTextureColor(product.textureId),
            display: product.image ? 'none' : 'flex'
          }}
        >
          <span>🏗️</span>
        </div>

        {/* Статус наявності */}
        <div className={`product-card__stock-badge ${product.inStock ? 'in-stock' : 'out-of-stock'}`}>
          {product.inStock ? '✅ В наявності' : '❌ Немає'}
        </div>

        {/* Тип текстури */}
        <div className="product-card__texture-badge">
          {product.textureId}
        </div>
      </div>

      {/* Інформація про продукт */}
      <div className="product-card__content">
        <div className="product-card__header">
          <h3 className="product-card__title" title={product.name.ua}>
            {product.name.ua}
          </h3>
          <span className="product-card__id">#{product.id.split('-').pop()}</span>
        </div>

        <div className="product-card__details">
          <div className="product-detail">
            <span className="label">Розміри:</span>
            <span className="value">
              {product.dimensions.length}×{product.dimensions.width}×{product.dimensions.height} {product.dimensions.unit}
            </span>
          </div>

          <div className="product-detail">
            <span className="label">Ціна:</span>
            <span className="value price">{product.price.ua}</span>
          </div>

          <div className="product-detail">
            <span className="label">Обробка:</span>
            <span className="value">{product.finishType}</span>
          </div>

          {product.features?.ua && (
            <div className="product-detail">
              <span className="label">Особливості:</span>
              <div className="features-list">
                {product.features.ua.slice(0, 2).map((feature, index) => (
                  <span key={index} className="feature-tag">
                    {feature}
                  </span>
                ))}
                {product.features.ua.length > 2 && (
                  <span className="feature-tag more">
                    +{product.features.ua.length - 2}
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Дії */}
      <div className="product-card__actions">
        <div className="action-buttons">
          <button
            onClick={handleEdit}
            className="action-btn action-btn--edit"
            title="Редагувати продукт"
          >
            ✏️
          </button>

          <button
            onClick={handleDuplicate}
            className="action-btn action-btn--duplicate"
            title="Дублювати продукт"
          >
            📋
          </button>

          <button
            onClick={handleStockToggle}
            className={`action-btn action-btn--stock ${product.inStock ? 'in-stock' : 'out-of-stock'}`}
            title={product.inStock ? 'Позначити як відсутній' : 'Позначити як наявний'}
          >
            {product.inStock ? '📦' : '📭'}
          </button>

          <button
            onClick={handleDelete}
            className="action-btn action-btn--delete"
            title="Видалити продукт"
          >
            🗑️
          </button>
        </div>

        <div className="card-footer">
          <span className="customizable-badge">
            {product.customizable ? '🔧 Кастомізація' : '📐 Стандарт'}
          </span>
        </div>
      </div>
    </div>
  )
}

export default ProductCard