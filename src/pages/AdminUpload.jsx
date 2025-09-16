import React from 'react'
import ImageUploader from '../components/admin/ImageUploader'
import '../components/admin/ImageUploader.scss'

const AdminUpload = () => {
  const handleUploadComplete = (results) => {
    console.log('Upload completed:', results)

    // Тут можна автоматично оновити galleryData.js або зберегти в базі даних
    const successfulUploads = results.filter(r => r.success)

    if (successfulUploads.length > 0) {
      console.log('✅ Successfully uploaded images:')
      successfulUploads.forEach(upload => {
        console.log(`- ${upload.result.public_id}`)
        console.log(`  URL: ${upload.result.secure_url}`)
        console.log(`  Tags: ${upload.result.tags?.join(', ')}`)
      })
    }
  }

  return (
    <div className="admin-upload-page">
      <div className="container" style={{ maxWidth: '1200px', margin: '2rem auto', padding: '0 1rem' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '2rem', color: '#1f2937' }}>
          EuroGranite Gallery Image Upload
        </h1>

        <div style={{
          background: '#f0f9ff',
          padding: '1rem',
          borderRadius: '0.5rem',
          marginBottom: '2rem',
          border: '1px solid #bfdbfe'
        }}>
          <h3 style={{ margin: '0 0 0.5rem 0', color: '#1e40af' }}>📁 Рекомендації по іменуванню файлів:</h3>
          <ul style={{ margin: 0, paddingLeft: '1.5rem', color: '#1e40af' }}>
            <li><code>black-granite-driveway-large-2024-kyiv.jpg</code></li>
            <li><code>grey-granite-walkway-medium-2023.png</code></li>
            <li><code>labradorite-plaza-large-2024-lviv.webp</code></li>
          </ul>
          <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.875rem', color: '#3730a3' }}>
            Система автоматично розпізнає категорію, тип граніту, розмір та інші параметри з назви файлу.
          </p>
        </div>

        <ImageUploader onUploadComplete={handleUploadComplete} />

        <div style={{
          background: '#f0fdf4',
          padding: '1rem',
          borderRadius: '0.5rem',
          marginTop: '2rem',
          border: '1px solid #bbf7d0'
        }}>
          <h3 style={{ margin: '0 0 0.5rem 0', color: '#166534' }}>🔧 Наступні кроки:</h3>
          <ol style={{ margin: 0, paddingLeft: '1.5rem', color: '#166534' }}>
            <li>Завантажте зображення через форму вище</li>
            <li>Перевірте метадані кожного зображення</li>
            <li>Натисніть "Upload" для завантаження в Cloudinary</li>
            <li>Скопіюйте public_id завантажених зображень</li>
            <li>Додайте їх до <code>galleryData.js</code></li>
          </ol>
        </div>
      </div>
    </div>
  )
}

export default AdminUpload