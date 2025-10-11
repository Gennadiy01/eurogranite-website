/**
 * ImageUploadField Component
 *
 * Reusable image upload field with preview for admin panel
 */

import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import styles from './ImageUploadField.module.scss';

const ImageUploadField = ({
  value,
  onChange,
  label = 'Зображення продукту',
  required = false
}) => {
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(value || '');
  const [imageLoadError, setImageLoadError] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  // Update preview when value prop changes (e.g., when editing a product)
  useEffect(() => {
    if (value !== previewUrl) {
      setPreviewUrl(value || '');
      setImageLoadError(false); // Reset error when URL changes
    }
  }, [value, previewUrl]);

  // Handle file selection
  const handleFileSelect = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      setError('Тільки зображення дозволені (JPEG, PNG, GIF, WebP)');
      return;
    }

    // Validate file size (5MB max)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      setError('Максимальний розмір файлу: 5MB');
      return;
    }

    // Clear previous error
    setError(null);

    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreviewUrl(e.target.result);
      setImageLoadError(false); // Reset error on new upload
    };
    reader.readAsDataURL(file);

    // Upload to server
    await uploadFile(file);
  };

  // Upload file to backend
  const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append('image', file);

    setUploading(true);
    setUploadProgress(0);

    // Get API URL from environment
    const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

    try {
      const response = await axios.post(`${API_URL}/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: (progressEvent) => {
          const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress(percent);
        }
      });

      if (response.data.success) {
        const imageUrl = response.data.data.url;
        setPreviewUrl(imageUrl); // Update preview with server URL
        setImageLoadError(false); // Reset error on successful upload
        onChange(imageUrl); // Notify parent component
        setError(null);
      } else {
        setError('Помилка завантаження зображення');
      }
    } catch (err) {
      console.error('Upload error:', err);
      setError(err.response?.data?.message || 'Не вдалося завантажити зображення');
      setPreviewUrl(value || ''); // Reset to original
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  // Handle remove image
  const handleRemove = () => {
    setPreviewUrl('');
    setImageLoadError(false);
    onChange('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Handle click on upload area
  const handleUploadAreaClick = () => {
    if (fileInputRef.current && !uploading) {
      fileInputRef.current.click();
    }
  };

  // Handle drag events
  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!uploading) {
      setIsDragging(true);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();

    // Only set dragging to false if leaving the upload area itself
    // (not when moving over child elements)
    if (e.currentTarget === e.target) {
      setIsDragging(false);
    }
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (uploading) return;

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      const file = files[0];

      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
      if (!allowedTypes.includes(file.type)) {
        setError('Тільки зображення дозволені (JPEG, PNG, GIF, WebP)');
        return;
      }

      // Validate file size (5MB max)
      const maxSize = 5 * 1024 * 1024; // 5MB
      if (file.size > maxSize) {
        setError('Максимальний розмір файлу: 5MB');
        return;
      }

      // Clear previous error
      setError(null);

      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewUrl(e.target.result);
        setImageLoadError(false);
      };
      reader.readAsDataURL(file);

      // Upload to server
      await uploadFile(file);
    }
  };

  return (
    <div className={styles.imageUploadField}>
      <label className={styles.label}>
        {label}
        {required && <span className={styles.required}>*</span>}
      </label>

      {/* Upload Area */}
      <div
        className={`${styles.uploadArea} ${uploading ? styles.uploading : ''} ${isDragging ? styles.dragging : ''}`}
        onClick={handleUploadAreaClick}
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {previewUrl && !imageLoadError ? (
          // Preview Mode
          <div className={styles.preview}>
            <img
              src={
                previewUrl.startsWith('http')
                  ? previewUrl // Already full URL (e.g., data:image or http://...)
                  : previewUrl.startsWith('/uploads')
                  ? (() => {
                      const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
                      const backendBase = apiUrl.replace('/api', '');
                      return `${backendBase}${previewUrl}`;
                    })() // Uploaded images
                  : previewUrl.replace('/eurogranite-website', '') // Static images from public/
              }
              alt="Preview"
              className={styles.previewImage}
              onError={() => setImageLoadError(true)}
            />
            {!uploading && (
              <div className={styles.previewOverlay}>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleUploadAreaClick();
                  }}
                  className={styles.changeButton}
                >
                  Змінити
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemove();
                  }}
                  className={styles.removeButton}
                >
                  Видалити
                </button>
              </div>
            )}
          </div>
        ) : (
          // Upload Mode
          <div className={styles.uploadPrompt}>
            <div className={styles.uploadIcon}>📤</div>
            <div className={styles.uploadText}>
              <div className={styles.uploadTitle}>
                {isDragging ? 'Відпустіть файл для завантаження' : 'Натисніть або перетягніть зображення'}
              </div>
              <div className={styles.uploadHint}>JPEG, PNG, GIF, WebP (макс. 5MB)</div>
            </div>
          </div>
        )}

        {/* Upload Progress */}
        {uploading && (
          <div className={styles.uploadProgress}>
            <div className={styles.progressBar}>
              <div
                className={styles.progressFill}
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
            <div className={styles.progressText}>{uploadProgress}%</div>
          </div>
        )}
      </div>

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
        onChange={handleFileSelect}
        className={styles.fileInput}
      />

      {/* Error Message */}
      {error && (
        <div className={styles.error}>
          ⚠️ {error}
        </div>
      )}
    </div>
  );
};

export default ImageUploadField;
