import React, { useState, useRef, useEffect } from 'react'

const OptimizedImage = ({ 
  src, 
  alt, 
  className = '', 
  responsive = false,
  lazy = true,
  placeholder = null,
  onLoad = null,
  onError = null,
  ...props 
}) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isInView, setIsInView] = useState(!lazy)
  const [hasError, setHasError] = useState(false)
  const imgRef = useRef(null)
  const observerRef = useRef(null)

  // Intersection Observer для lazy loading
  useEffect(() => {
    if (!lazy || isInView) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.disconnect()
        }
      },
      { 
        threshold: 0.1,
        rootMargin: '50px' // Завантажуємо трохи раніше появи в viewport
      }
    )

    if (imgRef.current) {
      observer.observe(imgRef.current)
      observerRef.current = observer
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [lazy, isInView])

  // Обробка завантаження
  const handleLoad = () => {
    setIsLoaded(true)
    if (onLoad) onLoad()
  }

  const handleError = () => {
    setHasError(true)
    if (onError) onError()
  }

  // Генерація responsive srcSet
  const generateSrcSet = () => {
    if (!responsive || typeof src !== 'string') return ''
    
    const basePath = src.replace(/\.[^/.]+$/, '') // Видаляємо розширення
    return `
      ${basePath}-mobile.jpg 768w,
      ${basePath}-tablet.jpg 1024w,
      ${basePath}-desktop.jpg 1920w
    `.trim()
  }

  // Відображення placeholder під час завантаження
  const renderPlaceholder = () => {
    if (hasError) {
      return (
        <div className={`optimized-image-error ${className}`} {...props}>
          <div className="error-content">
            <svg width="48" height="48" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>Image not found</span>
          </div>
        </div>
      )
    }

    if (placeholder) {
      return <div className={`optimized-image-placeholder ${className}`}>{placeholder}</div>
    }

    return (
      <div className={`optimized-image-skeleton ${className}`} {...props}>
        <div className="skeleton-content">
          <svg width="48" height="48" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
      </div>
    )
  }

  return (
    <div className="optimized-image-container" ref={imgRef}>
      {/* Показуємо placeholder доки зображення не завантажилось */}
      {(!isInView || !isLoaded) && !hasError && renderPlaceholder()}
      
      {/* Показуємо помилку якщо зображення не завантажилось */}
      {hasError && renderPlaceholder()}
      
      {/* Основне зображення */}
      {isInView && !hasError && (
        <img
          src={src}
          srcSet={responsive ? generateSrcSet() : undefined}
          sizes={responsive ? "(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw" : undefined}
          alt={alt}
          className={`optimized-image ${className} ${isLoaded ? 'loaded' : 'loading'}`}
          onLoad={handleLoad}
          onError={handleError}
          loading={lazy ? 'lazy' : 'eager'}
          {...props}
        />
      )}
    </div>
  )
}

export default OptimizedImage