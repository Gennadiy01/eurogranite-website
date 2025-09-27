import React from 'react'
import { ArticlesList, ArticleEditor } from '../../components/admin/articles'
import AdminNavigation from '../../components/admin/navigation/AdminNavigation'
import '../../components/admin/products/products-admin.scss'
import '../../components/admin/articles/articles-admin.scss'

const ArticlesManager = () => {
  return (
    <div className="articles-manager">
      <AdminNavigation pageType="articles" />

      <div className="articles-manager-header">
        <h1>Управління статтями</h1>
        <p>Створюйте, редагуйте та організовуйте статті для блогу</p>
      </div>

      <div className="articles-manager-content">
        <ArticlesList />
        <ArticleEditor />
      </div>
    </div>
  )
}

export default ArticlesManager