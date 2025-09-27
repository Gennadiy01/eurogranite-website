import React, { useEffect } from 'react'
import { ProductsList, ProductEditor } from '../../components/admin/products'
import AdminNavigation from '../../components/admin/navigation/AdminNavigation'
import useAdminProductsStore from '../../stores/adminProductsStore'
import '../../components/admin/products/products-admin.scss'

const ProductsManager = () => {
  const { loadProducts, hasUnsavedChanges } = useAdminProductsStore()

  useEffect(() => {
    loadProducts()
  }, [loadProducts])

  // Попередження при спробі покинути сторінку з незбереженими змінами
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (hasUnsavedChanges) {
        e.preventDefault()
        e.returnValue = 'У вас є незбережені зміни. Ви впевнені, що хочете покинути сторінку?'
      }
    }

    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => window.removeEventListener('beforeunload', handleBeforeUnload)
  }, [hasUnsavedChanges])

  return (
    <div className="products-manager">
      <AdminNavigation pageType="products" />

      <div className="products-manager-header">
        <h1>Управління продуктами</h1>
        <p>Створюйте, редагуйте та керуйте каталогом гранітних виробів</p>
        {hasUnsavedChanges && (
          <div style={{
            color: '#f59e0b',
            fontSize: '0.875rem',
            marginTop: '0.5rem',
            fontWeight: '500'
          }}>
            ⚠️ У вас є незбережені зміни
          </div>
        )}
      </div>

      <div className="products-manager-content">
        <ProductsList />
        <ProductEditor />
      </div>
    </div>
  )
}

export default ProductsManager