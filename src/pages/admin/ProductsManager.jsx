import React from 'react'
import { ProductsList, ProductEditor } from '../../components/admin/products'
import '../../components/admin/products/products-admin.scss'

const ProductsManager = () => {
  return (
    <div className="products-manager">
      <div className="products-manager-header">
        <h1>Управління продуктами</h1>
        <p>Створюйте, редагуйте та керуйте каталогом гранітних виробів</p>
      </div>

      <div className="products-manager-content">
        <ProductsList />
        <ProductEditor />
      </div>
    </div>
  )
}

export default ProductsManager