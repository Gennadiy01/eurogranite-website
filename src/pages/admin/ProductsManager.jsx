/**
 * ProductsManager Component
 *
 * Main page for managing granite products
 */

import React, { useEffect } from 'react';
import { useProductsStore } from '../../stores/useProductsStore';
import styles from '../../components/admin/products/ProductsManager.module.scss';

const ProductsManager = () => {
  const { products, loading, error, fetchProducts, deleteProduct } = useProductsStore();

  // Fetch products on mount
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

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
    // TODO: Navigate to edit page (Phase 1 - Week 2)
    console.log('Edit product:', productId);
    alert('Редагування буде реалізовано в наступному етапі');
  };

  const handleAdd = () => {
    // TODO: Navigate to create page (Phase 1 - Week 2)
    console.log('Add new product');
    alert('Додавання продукту буде реалізовано в наступному етапі');
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

      {/* Products Table */}
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead className={styles.tableHeader}>
            <tr>
              <th>ID</th>
              <th>Назва</th>
              <th>Текстура</th>
              <th>Розмір</th>
              <th>Ціна (UA)</th>
              <th>Наявність</th>
              <th>Дії</th>
            </tr>
          </thead>
          <tbody className={styles.tableBody}>
            {products.map((product) => (
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
        Всього продуктів: {products.length}
      </div>
    </div>
  );
};

export default ProductsManager;
