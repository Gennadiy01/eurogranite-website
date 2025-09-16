import React, { useState, useCallback } from 'react'
import { uploadBatchImages, parseFilenameMetadata, validateImageFile } from '../../utils/cloudinaryUpload'
import { projectCategories } from '../../constants/galleryData'

const ImageUploader = ({ onUploadComplete }) => {
  const [files, setFiles] = useState([])
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(null)
  const [results, setResults] = useState([])

  const handleFileSelect = useCallback((e) => {
    const selectedFiles = Array.from(e.target.files)
    const validFiles = []

    selectedFiles.forEach(file => {
      const validation = validateImageFile(file)
      if (validation.isValid) {
        const metadata = parseFilenameMetadata(file.name)
        validFiles.push({
          file,
          metadata,
          preview: URL.createObjectURL(file),
          id: Math.random().toString(36).substr(2, 9)
        })
      } else {
        console.warn(`Invalid file ${file.name}:`, validation.errors)
      }
    })

    setFiles(prev => [...prev, ...validFiles])
  }, [])

  const handleMetadataChange = useCallback((fileId, field, value) => {
    setFiles(prev => prev.map(f =>
      f.id === fileId
        ? { ...f, metadata: { ...f.metadata, [field]: value } }
        : f
    ))
  }, [])

  const handleRemoveFile = useCallback((fileId) => {
    setFiles(prev => {
      const file = prev.find(f => f.id === fileId)
      if (file?.preview) {
        URL.revokeObjectURL(file.preview)
      }
      return prev.filter(f => f.id !== fileId)
    })
  }, [])

  const handleUpload = async () => {
    if (files.length === 0) return

    setUploading(true)
    setProgress({ current: 0, total: files.length, percentage: 0 })

    try {
      const uploadData = files.map(f => ({
        file: f.file,
        metadata: f.metadata
      }))

      const results = await uploadBatchImages(uploadData, setProgress)
      setResults(results)

      const successCount = results.filter(r => r.success).length
      console.log(`✅ Upload complete: ${successCount}/${files.length} files uploaded successfully`)

      if (onUploadComplete) {
        onUploadComplete(results)
      }

      // Clear successful uploads
      const failedIds = results
        .map((result, index) => result.success ? null : files[index].id)
        .filter(Boolean)

      setFiles(prev => prev.filter(f => failedIds.includes(f.id)))

    } catch (error) {
      console.error('Upload failed:', error)
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="image-uploader">
      <div className="upload-controls">
        <input
          type="file"
          multiple
          accept="image/jpeg,image/jpg,image/png,image/webp"
          onChange={handleFileSelect}
          disabled={uploading}
          className="file-input"
        />

        {files.length > 0 && (
          <button
            onClick={handleUpload}
            disabled={uploading}
            className="upload-button"
          >
            {uploading ? 'Uploading...' : `Upload ${files.length} image(s)`}
          </button>
        )}
      </div>

      {progress && (
        <div className="upload-progress">
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${progress.percentage}%` }}
            />
          </div>
          <span>{progress.current}/{progress.total} ({progress.percentage}%)</span>
          {progress.currentFile && <span>Uploading: {progress.currentFile}</span>}
        </div>
      )}

      {files.length > 0 && (
        <div className="files-preview">
          {files.map(fileData => (
            <div key={fileData.id} className="file-preview-card">
              <img
                src={fileData.preview}
                alt={fileData.file.name}
                className="preview-image"
              />

              <div className="file-metadata">
                <h4>{fileData.file.name}</h4>

                <div className="metadata-field">
                  <label>Category:</label>
                  <select
                    value={fileData.metadata.category}
                    onChange={(e) => handleMetadataChange(fileData.id, 'category', e.target.value)}
                  >
                    {projectCategories.map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.name.en}</option>
                    ))}
                  </select>
                </div>

                <div className="metadata-field">
                  <label>Additional Notes (optional):</label>
                  <input
                    type="text"
                    placeholder="Optional description or notes"
                    value={fileData.metadata.notes || ''}
                    onChange={(e) => handleMetadataChange(fileData.id, 'notes', e.target.value)}
                  />
                </div>

                <div className="metadata-field">
                  <label>Year:</label>
                  <input
                    type="number"
                    min="2020"
                    max={new Date().getFullYear() + 1}
                    value={fileData.metadata.year}
                    onChange={(e) => handleMetadataChange(fileData.id, 'year', parseInt(e.target.value))}
                  />
                </div>

                <div className="metadata-field">
                  <label>Location:</label>
                  <input
                    type="text"
                    value={fileData.metadata.location}
                    onChange={(e) => handleMetadataChange(fileData.id, 'location', e.target.value)}
                    placeholder="e.g., Kyiv"
                  />
                </div>

                <button
                  onClick={() => handleRemoveFile(fileData.id)}
                  className="remove-button"
                  disabled={uploading}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {results.length > 0 && (
        <div className="upload-results">
          <h3>Upload Results:</h3>
          {results.map((result, index) => (
            <div key={index} className={`result-item ${result.success ? 'success' : 'error'}`}>
              {result.success ? (
                <span>✅ {result.result.public_id}</span>
              ) : (
                <span>❌ {result.fileName}: {result.error.message}</span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ImageUploader