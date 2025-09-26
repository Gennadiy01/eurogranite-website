import React from 'react'
import { GalleryImagesList, GalleryImageEditor, GalleryUploadModal } from '../../components/admin/gallery'
import '../../components/admin/products/products-admin.scss'

const GalleryManager = () => {
  return (
    <div className="gallery-manager">
      <div className="gallery-manager-header">
        <h1>Управління галереєю</h1>
        <p>Додавайте, редагуйте та організовуйте зображення проектів</p>
      </div>

      <div className="gallery-manager-content">
        <GalleryImagesList />
        <GalleryImageEditor />
        <GalleryUploadModal />
      </div>
    </div>
  )
}

export default GalleryManager