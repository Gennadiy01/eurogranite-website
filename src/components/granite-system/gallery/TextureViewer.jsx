import React, { useState, useRef, useEffect, useCallback } from 'react'
import useLanguageStore from '../../../stores/languageStore'

const TextureViewer = ({ texture }) => {
  const { language } = useLanguageStore()
  const [isZoomed, setIsZoomed] = useState(false)
  const [zoomLevel, setZoomLevel] = useState(1)
  const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [isLoading, setIsLoading] = useState(!!texture)
  const [hasError, setHasError] = useState(false)

  const imageRef = useRef(null)
  const containerRef = useRef(null)

  // Reset state when texture changes
  useEffect(() => {
    setIsZoomed(false)
    setZoomLevel(1)
    setImagePosition({ x: 0, y: 0 })
    setIsDragging(false)
    setIsLoading(true)
    setHasError(false)
  }, [texture?.id])

  // Handle image load
  const handleImageLoad = useCallback(() => {
    setIsLoading(false)
    setHasError(false)
  }, [])

  // Check if image is already loaded (from cache) when component mounts or texture changes
  useEffect(() => {
    if (texture?.imageUrl && imageRef.current) {
      const img = imageRef.current
      if (img.complete && img.naturalHeight !== 0) {
        // Image is already loaded
        setIsLoading(false)
        setHasError(false)
      }
    }
  }, [texture?.imageUrl])

  // Additional check on component mount - delayed to ensure DOM is ready
  useEffect(() => {
    const checkImageLoaded = () => {
      if (texture?.imageUrl && imageRef.current) {
        const img = imageRef.current
        if (img.complete && img.naturalHeight !== 0) {
          setIsLoading(false)
          setHasError(false)
        }
      }
    }

    // Check immediately and after a small delay
    checkImageLoaded()
    const timeoutId = setTimeout(checkImageLoaded, 100)

    return () => clearTimeout(timeoutId)
  }, [texture?.imageUrl])

  // Handle image error
  const handleImageError = useCallback(() => {
    setIsLoading(false)
    setHasError(true)
  }, [])

  // Toggle zoom
  const handleZoomToggle = useCallback((e) => {
    e.preventDefault()
    
    if (isZoomed) {
      // Zoom out
      setIsZoomed(false)
      setZoomLevel(1)
      setImagePosition({ x: 0, y: 0 })
    } else {
      // Zoom in
      const rect = containerRef.current?.getBoundingClientRect()
      const centerX = e.clientX - rect.left
      const centerY = e.clientY - rect.top
      
      const newZoomLevel = 2
      const newX = (rect.width / 2 - centerX) * (newZoomLevel - 1)
      const newY = (rect.height / 2 - centerY) * (newZoomLevel - 1)
      
      setIsZoomed(true)
      setZoomLevel(newZoomLevel)
      setImagePosition({ x: newX, y: newY })
    }
  }, [isZoomed])

  // Handle mouse down for dragging
  const handleMouseDown = useCallback((e) => {
    if (!isZoomed) return
    
    e.preventDefault()
    setIsDragging(true)
    setDragStart({
      x: e.clientX - imagePosition.x,
      y: e.clientY - imagePosition.y
    })
  }, [isZoomed, imagePosition])

  // Handle mouse move for dragging
  const handleMouseMove = useCallback((e) => {
    if (!isDragging || !isZoomed) return
    
    e.preventDefault()
    const newX = e.clientX - dragStart.x
    const newY = e.clientY - dragStart.y
    
    // Constrain movement to container bounds
    const container = containerRef.current
    const image = imageRef.current
    
    if (container && image) {
      const containerRect = container.getBoundingClientRect()
      const imageRect = image.getBoundingClientRect()
      
      const maxX = Math.max(0, (imageRect.width * zoomLevel - containerRect.width) / 2)
      const maxY = Math.max(0, (imageRect.height * zoomLevel - containerRect.height) / 2)
      
      const constrainedX = Math.max(-maxX, Math.min(maxX, newX))
      const constrainedY = Math.max(-maxY, Math.min(maxY, newY))
      
      setImagePosition({ x: constrainedX, y: constrainedY })
    }
  }, [isDragging, isZoomed, dragStart, zoomLevel])

  // Handle mouse up
  const handleMouseUp = useCallback(() => {
    setIsDragging(false)
  }, [])

  // Handle wheel zoom
  const handleWheel = useCallback((e) => {
    e.preventDefault()
    
    const delta = e.deltaY > 0 ? -0.2 : 0.2
    const newZoomLevel = Math.max(0.5, Math.min(4, zoomLevel + delta))
    
    if (newZoomLevel === 1) {
      setIsZoomed(false)
      setZoomLevel(1)
      setImagePosition({ x: 0, y: 0 })
    } else {
      setIsZoomed(true)
      setZoomLevel(newZoomLevel)
      
      // For wheel zoom, always keep image centered
      // This provides predictable zoom behavior
      setImagePosition({ x: 0, y: 0 })
    }
  }, [zoomLevel])

  // Attach global mouse events for dragging
  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove, { passive: false })
      document.addEventListener('mouseup', handleMouseUp)
      document.body.style.cursor = 'grabbing'

      return () => {
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
        document.body.style.cursor = ''
      }
    }
  }, [isDragging, handleMouseMove, handleMouseUp])

  // Handle keyboard controls
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isZoomed) return
      
      const step = 20
      let newX = imagePosition.x
      let newY = imagePosition.y
      
      switch (e.key) {
        case 'ArrowUp':
          e.preventDefault()
          newY += step
          break
        case 'ArrowDown':
          e.preventDefault()
          newY -= step
          break
        case 'ArrowLeft':
          e.preventDefault()
          newX += step
          break
        case 'ArrowRight':
          e.preventDefault()
          newX -= step
          break
        default:
          return
      }
      
      setImagePosition({ x: newX, y: newY })
    }
    
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isZoomed, imagePosition])

  // Add wheel event listener with proper passive: false
  useEffect(() => {
    const container = containerRef.current
    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false })
      return () => {
        container.removeEventListener('wheel', handleWheel)
      }
    }
  }, [handleWheel])

  if (!texture) {
    return (
      <div className="texture-viewer texture-viewer-empty">
        <div className="texture-viewer-placeholder">
          <div className="placeholder-icon">🖼️</div>
          <p>No texture selected</p>
        </div>
      </div>
    )
  }

  return (
    <div
      className="texture-viewer"
      ref={containerRef}
    >
      {/* Loading state */}
      {isLoading && (
        <div className="texture-viewer-loading">
          <div className="loading-spinner"></div>
          <p>Loading texture...</p>
        </div>
      )}

      {/* Error state */}
      {hasError && (
        <div className="texture-viewer-error">
          <div className="error-icon">⚠️</div>
          <p>Failed to load texture</p>
          <button 
            className="texture-btn texture-btn-outline"
            onClick={() => {
              setHasError(false)
              setIsLoading(true)
            }}
          >
            Retry
          </button>
        </div>
      )}

      {/* Image */}
      {!hasError && (
        <>
          <div 
            className={`texture-viewer-image-container ${isZoomed ? 'zoomed' : ''}`}
            onClick={handleZoomToggle}
            onMouseDown={handleMouseDown}
            style={{
              cursor: isZoomed ? (isDragging ? 'grabbing' : 'grab') : 'zoom-in'
            }}
          >
            <img
              ref={imageRef}
              src={texture.imageUrl}
              alt={texture.name[language]}
              className="texture-viewer-image"
              onLoad={handleImageLoad}
              onError={handleImageError}
              style={{
                transform: `scale(${zoomLevel}) translate(${imagePosition.x / zoomLevel}px, ${imagePosition.y / zoomLevel}px)`,
                transformOrigin: '50% 50%',
                transition: isDragging ? 'none' : 'transform 0.3s ease-out'
              }}
              draggable={false}
            />
          </div>

          {/* Zoom controls */}
          <div className="texture-viewer-controls">
            <button
              className="texture-control-btn"
              onClick={() => handleWheel({ deltaY: -100, preventDefault: () => {} })}
              title="Zoom in"
              disabled={zoomLevel >= 4}
            >
              🔍+
            </button>
            
            <span className="zoom-level">
              {Math.round(zoomLevel * 100)}%
            </span>
            
            <button
              className="texture-control-btn"
              onClick={() => handleWheel({ deltaY: 100, preventDefault: () => {} })}
              title="Zoom out"
              disabled={zoomLevel <= 0.5}
            >
              🔍-
            </button>
            
            {isZoomed && (
              <button
                className="texture-control-btn"
                onClick={() => {
                  setIsZoomed(false)
                  setZoomLevel(1)
                  setImagePosition({ x: 0, y: 0 })
                }}
                title="Reset zoom"
              >
                ⟲
              </button>
            )}
          </div>

          {/* Zoom hint */}
          {!isZoomed && (
            <div className="texture-viewer-hint">
              <p>Click to zoom • Scroll to zoom • Drag to pan when zoomed</p>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default TextureViewer