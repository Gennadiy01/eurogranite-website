import React, { useState, useRef } from 'react'
import useAdminGalleryStore from '../../../stores/adminGalleryStore'

const GalleryUploadModal = () => {
  const {
    isUploadModalOpen,
    closeUploadModal,
    addGalleryImage,
    categories,
    uploadProgress,
    setUploadProgress
  } = useAdminGalleryStore()

  const [dragActive, setDragActive] = useState(false)
  const [uploadQueue, setUploadQueue] = useState([])
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef(null)

  const [defaultSettings, setDefaultSettings] = useState({
    category: 'courtyard',
    generateAlt: true,
    autoTags: true
  })

  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    const files = Array.from(e.dataTransfer.files)
    handleFiles(files)
  }

  const handleFileInput = (e) => {
    const files = Array.from(e.target.files)
    handleFiles(files)
  }

  const handleFiles = (files) => {
    const imageFiles = files.filter(file => file.type.startsWith('image/'))

    if (imageFiles.length === 0) {
      alert('Будь ласка, виберіть файли зображень')
      return
    }

    const newQueue = imageFiles.map(file => ({
      id: Date.now() + Math.random(),
      file,
      name: file.name,
      size: file.size,
      preview: URL.createObjectURL(file),
      status: 'pending', // pending, uploading, completed, error
      progress: 0,
      publicId: '',
      error: null
    }))

    setUploadQueue(prev => [...prev, ...newQueue])
  }

  const removeFromQueue = (itemId) => {
    setUploadQueue(prev => {
      const updated = prev.filter(item => item.id !== itemId)
      // Clean up object URL
      const item = prev.find(item => item.id === itemId)
      if (item?.preview) {
        URL.revokeObjectURL(item.preview)
      }
      return updated
    })
  }

  const generateAltText = (filename, category) => {
    const categoryNames = {
      courtyard: {
        ua: 'Проект гранітного мощення внутрішнього дворика',
        en: 'Granite courtyard paving project',
        de: 'Granit-Innenhof-Pflasterung',
        pl: 'Projekt granitowej kostki na dziedzińcu'
      },
      walkway: {
        ua: 'Проект гранітного мощення пішохідної доріжки',
        en: 'Granite walkway paving project',
        de: 'Granit-Gehweg-Pflasterung',
        pl: 'Projekt granitowej kostki na chodniku'
      },
      plaza: {
        ua: 'Проект гранітного мощення площі',
        en: 'Granite plaza paving project',
        de: 'Granit-Platz-Pflasterung',
        pl: 'Projekt granitowej kostki na placu'
      },
      driveway: {
        ua: 'Проект гранітного мощення вулиці',
        en: 'Granite street paving project',
        de: 'Granit-Straßenpflasterung',
        pl: 'Projekt granitowej kostki na ulicy'
      }
    }

    return categoryNames[category] || categoryNames.courtyard
  }

  const uploadToCloudinary = async (file) => {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET || 'eurogranite_upload')
    formData.append('folder', `dsunqfo3g/${defaultSettings.category}`)

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME || 'dsunqfo3g'}/image/upload`,
        {
          method: 'POST',
          body: formData
        }
      )

      if (!response.ok) {
        throw new Error(`Upload failed: ${response.statusText}`)
      }

      const result = await response.json()
      return {
        success: true,
        publicId: result.public_id,
        width: result.width,
        height: result.height,
        url: result.secure_url
      }
    } catch (error) {
      return {
        success: false,
        error: error.message
      }
    }
  }

  const startUpload = async () => {
    if (uploadQueue.length === 0) return

    setIsUploading(true)
    setUploadProgress(0)

    const pendingItems = uploadQueue.filter(item => item.status === 'pending')
    let completedCount = 0

    for (const item of pendingItems) {
      // Update item status to uploading
      setUploadQueue(prev => prev.map(i =>
        i.id === item.id ? { ...i, status: 'uploading', progress: 0 } : i
      ))

      try {
        // Upload to Cloudinary
        const uploadResult = await uploadToCloudinary(item.file)

        if (uploadResult.success) {
          // Create gallery image data
          const imageData = {
            publicId: uploadResult.publicId,
            category: defaultSettings.category,
            width: uploadResult.width,
            height: uploadResult.height,
            tags: defaultSettings.autoTags ? ['gallery', defaultSettings.category] : ['gallery'],
            alt: defaultSettings.generateAlt ? generateAltText(item.name, defaultSettings.category) : {
              ua: '',
              en: '',
              de: '',
              pl: ''
            }
          }

          // Add to gallery store
          const result = await addGalleryImage(imageData)

          if (result.success) {
            setUploadQueue(prev => prev.map(i =>
              i.id === item.id ? {
                ...i,
                status: 'completed',
                progress: 100,
                publicId: uploadResult.publicId
              } : i
            ))
          } else {
            throw new Error(result.error)
          }
        } else {
          throw new Error(uploadResult.error)
        }
      } catch (error) {
        setUploadQueue(prev => prev.map(i =>
          i.id === item.id ? {
            ...i,
            status: 'error',
            error: error.message
          } : i
        ))
      }

      completedCount++
      setUploadProgress((completedCount / pendingItems.length) * 100)
    }

    setIsUploading(false)
  }

  const clearCompleted = () => {
    setUploadQueue(prev => {
      const completed = prev.filter(item => item.status === 'completed')
      completed.forEach(item => {
        if (item.preview) {
          URL.revokeObjectURL(item.preview)
        }
      })
      return prev.filter(item => item.status !== 'completed')
    })
  }

  const clearAll = () => {
    uploadQueue.forEach(item => {
      if (item.preview) {
        URL.revokeObjectURL(item.preview)
      }
    })
    setUploadQueue([])
    setUploadProgress(0)
  }

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  if (!isUploadModalOpen) return null

  return (
    <div className="upload-modal-overlay">
      <div className="upload-modal">
        <div className="modal-header">
          <h2>Завантаження зображень</h2>
          <button
            onClick={closeUploadModal}
            className="close-btn"
            disabled={isUploading}
          >
            ✕
          </button>
        </div>

        <div className="upload-content">
          {/* Upload Settings */}
          <div className="upload-settings">
            <h3>Налаштування завантаження</h3>
            <div className="settings-grid">
              <div className="form-group">
                <label>Категорія за замовчуванням</label>
                <select
                  value={defaultSettings.category}
                  onChange={(e) => setDefaultSettings(prev => ({
                    ...prev,
                    category: e.target.value
                  }))}
                  disabled={isUploading}
                >
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name.ua}
                    </option>
                  ))}
                </select>
              </div>

              <div className="settings-checkboxes">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={defaultSettings.generateAlt}
                    onChange={(e) => setDefaultSettings(prev => ({
                      ...prev,
                      generateAlt: e.target.checked
                    }))}
                    disabled={isUploading}
                  />
                  Автоматично генерувати Alt текст
                </label>

                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={defaultSettings.autoTags}
                    onChange={(e) => setDefaultSettings(prev => ({
                      ...prev,
                      autoTags: e.target.checked
                    }))}
                    disabled={isUploading}
                  />
                  Автоматично додавати теги
                </label>
              </div>
            </div>
          </div>

          {/* Upload Area */}
          <div
            className={`upload-area ${dragActive ? 'drag-active' : ''}`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileInput}
              style={{ display: 'none' }}
              disabled={isUploading}
            />

            <div className="upload-icon">📁</div>
            <p>Перетягніть зображення сюди або клікніть для вибору</p>
            <small>Підтримуються: JPG, PNG, WebP, GIF</small>
          </div>

          {/* Upload Queue */}
          {uploadQueue.length > 0 && (
            <div className="upload-queue">
              <div className="queue-header">
                <h3>Черга завантаження ({uploadQueue.length})</h3>
                <div className="queue-actions">
                  {!isUploading && (
                    <>
                      <button
                        onClick={clearCompleted}
                        className="btn btn-secondary btn-sm"
                        disabled={uploadQueue.filter(item => item.status === 'completed').length === 0}
                      >
                        Очистити завершені
                      </button>
                      <button
                        onClick={clearAll}
                        className="btn btn-secondary btn-sm"
                      >
                        Очистити все
                      </button>
                      <button
                        onClick={startUpload}
                        className="btn btn-primary btn-sm"
                        disabled={uploadQueue.filter(item => item.status === 'pending').length === 0}
                      >
                        Почати завантаження
                      </button>
                    </>
                  )}
                </div>
              </div>

              {isUploading && (
                <div className="upload-progress">
                  <div className="progress-bar">
                    <div
                      className="progress-fill"
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                  <span>{Math.round(uploadProgress)}%</span>
                </div>
              )}

              <div className="queue-list">
                {uploadQueue.map(item => (
                  <div key={item.id} className={`queue-item status-${item.status}`}>
                    <div className="item-preview">
                      <img src={item.preview} alt={item.name} />
                    </div>

                    <div className="item-info">
                      <div className="item-name">{item.name}</div>
                      <div className="item-size">{formatFileSize(item.size)}</div>
                      {item.status === 'error' && (
                        <div className="item-error">{item.error}</div>
                      )}
                      {item.status === 'completed' && (
                        <div className="item-success">
                          Завантажено: {item.publicId}
                        </div>
                      )}
                    </div>

                    <div className="item-status">
                      {item.status === 'pending' && '⏳'}
                      {item.status === 'uploading' && '⏫'}
                      {item.status === 'completed' && '✅'}
                      {item.status === 'error' && '❌'}
                    </div>

                    {!isUploading && (
                      <button
                        onClick={() => removeFromQueue(item.id)}
                        className="remove-item-btn"
                        title="Видалити з черги"
                      >
                        🗑️
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="modal-actions">
          <button
            onClick={closeUploadModal}
            className="btn btn-secondary"
            disabled={isUploading}
          >
            {uploadQueue.length > 0 ? 'Закрити' : 'Скасувати'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default GalleryUploadModal