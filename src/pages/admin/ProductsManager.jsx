/**
 * ProductsManager Component
 *
 * Main page for managing granite products
 */

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProductsStore } from '../../stores/useProductsStore';
import styles from '../../components/admin/products/ProductsManager.module.scss';

const ProductsManager = () => {
  const navigate = useNavigate();
  const { products, loading, error, fetchProducts, deleteProduct } = useProductsStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  console.log('[ProductsManager ADMIN] Rendering admin products manager');

  // Fetch products on mount
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Filter products based on search term
  const filteredProducts = products.filter((product) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      product.id?.toLowerCase().includes(searchLower) ||
      product.name?.ua?.toLowerCase().includes(searchLower) ||
      product.name?.en?.toLowerCase().includes(searchLower) ||
      product.textureId?.toLowerCase().includes(searchLower) ||
      product.size?.toLowerCase().includes(searchLower)
    );
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (!sortConfig.key) return 0;

    let aValue, bValue;

    switch (sortConfig.key) {
      case 'id':
        aValue = a.id || '';
        bValue = b.id || '';
        break;
      case 'name':
        aValue = a.name?.ua || a.name?.en || '';
        bValue = b.name?.ua || b.name?.en || '';
        break;
      case 'texture':
        aValue = a.textureId || '';
        bValue = b.textureId || '';
        break;
      case 'size':
        aValue = a.size || '';
        bValue = b.size || '';
        break;
      case 'price':
        // Extract number from price string (e.g., "1140 грн/м²" -> 1140)
        aValue = parseFloat((a.price?.ua || '0').match(/[\d.]+/)?.[0] || 0);
        bValue = parseFloat((b.price?.ua || '0').match(/[\d.]+/)?.[0] || 0);
        break;
      case 'stock':
        aValue = a.inStock ? 1 : 0;
        bValue = b.inStock ? 1 : 0;
        break;
      default:
        return 0;
    }

    if (aValue < bValue) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (aValue > bValue) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  // Handle column sort
  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  // Get sort indicator
  const getSortIndicator = (key) => {
    if (sortConfig.key !== key) return '↕️';
    return sortConfig.direction === 'asc' ? '↑' : '↓';
  };

  const handleDelete = async (productId, productName) => {
    // Simple confirmation (will be replaced with modal in future)
    if (window.confirm(`Видалити продукт "${productName}"?`)) {
      try {
        await deleteProduct(productId);
        alert('Продукт успішно видалено');
      } catch (error) {
        alert('Помилка видалення: ' + error.message);
      }
    }
  };

  const handleEdit = (productId) => {
    navigate(`/admin/products/${productId}/edit`);
  };

  const handleAdd = () => {
    navigate('/admin/products/new');
  };

  // Loading state
  if (loading && products.length === 0) {
    return (
      <div className={styles.productsManager}>
        <div className={styles.loadingContainer}>
          <div className={styles.spinner}></div>
          <p>Завантаження продуктів...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error && products.length === 0) {
    return (
      <div className={styles.productsManager}>
        <div className={styles.errorContainer}>
          <p>❌ Помилка завантаження</p>
          <p className={styles.errorMessage}>{error}</p>
          <button onClick={() => fetchProducts()} className={styles.retryButton}>
            Спробувати знову
          </button>
          <p style={{ marginTop: '1rem', fontSize: '0.875rem', color: '#64748b' }}>
            Переконайтесь що backend запущено: <code>cd project_eurogranite_admin && npm run dev</code>
          </p>
        </div>
      </div>
    );
  }

  // Empty state
  if (products.length === 0) {
    return (
      <div className={styles.productsManager}>
        <div className={styles.header}>
          <h1 className={styles.title}>Управління Продуктами</h1>
          <button onClick={handleAdd} className={styles.addButton}>
            + Додати Продукт
          </button>
        </div>
        <div className={styles.emptyContainer}>
          <p>Продуктів поки немає</p>
          <button onClick={handleAdd} className={styles.retryButton}>
            Створити перший продукт
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.productsManager}>
      {/* Header */}
      <div className={styles.header}>
        <h1 className={styles.title}>Управління Продуктами</h1>
        <button onClick={handleAdd} className={styles.addButton}>
          + Додати Продукт
        </button>
      </div>

      {/* Search Bar */}
      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="🔍 Пошук по ID, назві, текстурі або розміру..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles.searchInput}
        />
        {searchTerm && (
          <button
            onClick={() => setSearchTerm('')}
            className={styles.clearButton}
            title="Очистити пошук"
          >
            ✕
          </button>
        )}
      </div>

      {/* Products Table */}
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead className={styles.tableHeader}>
            <tr>
              <th>
                <button
                  onClick={() => handleSort('id')}
                  className={styles.sortButton}
                  title="Сортувати по ID"
                >
                  ID {getSortIndicator('id')}
                </button>
              </th>
              <th>
                <button
                  onClick={() => handleSort('name')}
                  className={styles.sortButton}
                  title="Сортувати по назві"
                >
                  Назва {getSortIndicator('name')}
                </button>
              </th>
              <th>
                <button
                  onClick={() => handleSort('texture')}
                  className={styles.sortButton}
                  title="Сортувати по текстурі"
                >
                  Текстура {getSortIndicator('texture')}
                </button>
              </th>
              <th>
                <button
                  onClick={() => handleSort('size')}
                  className={styles.sortButton}
                  title="Сортувати по розміру"
                >
                  Розмір {getSortIndicator('size')}
                </button>
              </th>
              <th>
                <button
                  onClick={() => handleSort('price')}
                  className={styles.sortButton}
                  title="Сортувати по ціні"
                >
                  Ціна {getSortIndicator('price')}
                </button>
              </th>
              <th>Зображення</th>
              <th>
                <button
                  onClick={() => handleSort('stock')}
                  className={styles.sortButton}
                  title="Сортувати по наявності"
                >
                  Наявність {getSortIndicator('stock')}
                </button>
              </th>
              <th>Дії</th>
            </tr>
          </thead>
          <tbody className={styles.tableBody}>
            {sortedProducts.map((product) => (
              <tr key={product.id}>
                <td>
                  <span className={styles.productId} title={product.id}>
                    {product.id}
                  </span>
                </td>
                <td>
                  <span className={styles.productName}>
                    {product.name?.ua || product.name?.en || 'N/A'}
                  </span>
                </td>
                <td>{product.textureId || 'N/A'}</td>
                <td>{product.size || 'N/A'}</td>
                <td>
                  <span className={styles.productPrice}>
                    {product.price?.ua || 'N/A'}
                  </span>
                </td>
                <td>
                  {product.image ? (
                    <img
                      src={
                        product.image.startsWith('/uploads')
                          ? (() => {
                              const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
                              const backendBase = API_URL.replace('/api', '');
                              return `${backendBase}${product.image}`;
                            })() // Uploaded images from backend
                          : product.image.replace('/eurogranite-website', '') // Static images
                      }
                      alt={product.name?.ua || 'Product'}
                      className={styles.productImage}
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                  ) : null}
                  <span
                    className={styles.noImage}
                    style={{ display: product.image ? 'none' : 'flex' }}
                  >
                    📦
                  </span>
                </td>
                <td>
                  <span
                    className={`${styles.productStock} ${
                      product.inStock ? styles.inStock : styles.outOfStock
                    }`}
                  >
                    {product.inStock ? '✓ В наявності' : '✗ Немає'}
                  </span>
                </td>
                <td>
                  <div className={styles.actions}>
                    <button
                      onClick={() => handleEdit(product.id)}
                      className={`${styles.actionButton} ${styles.edit}`}
                      title="Редагувати"
                    >
                      ✏️ Редагувати
                    </button>
                    <button
                      onClick={() => handleDelete(product.id, product.name?.ua)}
                      className={`${styles.actionButton} ${styles.delete}`}
                      title="Видалити"
                    >
                      🗑️ Видалити
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer Info */}
      <div style={{ marginTop: '1rem', color: '#64748b', fontSize: '0.875rem' }}>
        {searchTerm ? (
          <>
            Знайдено: {sortedProducts.length} з {products.length} продуктів
          </>
        ) : (
          <>Всього продуктів: {products.length}</>
        )}
        {sortConfig.key && (
          <span style={{ marginLeft: '1rem' }}>
            • Сортування: {sortConfig.key} ({sortConfig.direction === 'asc' ? 'за зростанням' : 'за спаданням'})
          </span>
        )}
      </div>
    </div>
  );
};

export default ProductsManager;
