import React, { useRef, useEffect } from 'react'
import useLanguageStore from '../../../stores/languageStore'

const TextureNavigation = ({ textures, currentIndex, onTextureSelect, onNavigate }) => {
  const { language } = useLanguageStore()
  const thumbnailsRef = useRef(null)
  const activeThumbnailRef = useRef(null)

  // Localization for navigation UI
  const navLabels = {
    en: {
      previousTexture: 'Previous texture',
      nextTexture: 'Next texture',
      navigate: 'Navigate',
      close: 'Close'
    },
    ua: {
      previousTexture: 'Попередня текстура',
      nextTexture: 'Наступна текстура',
      navigate: 'Навігація',
      close: 'Закрити'
    },
    de: {
      previousTexture: 'Vorherige Textur',
      nextTexture: 'Nächste Textur',
      navigate: 'Navigieren',
      close: 'Schließen'
    },
    pl: {
      previousTexture: 'Poprzednia tekstura',
      nextTexture: 'Następna tekstura',
      navigate: 'Nawigacja',
      close: 'Zamknij'
    }
  }

  const labels = navLabels[language] || navLabels.en

  // Auto-scroll to active thumbnail
  useEffect(() => {
    if (activeThumbnailRef.current && thumbnailsRef.current) {
      const thumbnail = activeThumbnailRef.current
      const container = thumbnailsRef.current
      const containerRect = container.getBoundingClientRect()
      const thumbnailRect = thumbnail.getBoundingClientRect()
      
      // Check if thumbnail is outside visible area
      if (thumbnailRect.left < containerRect.left || thumbnailRect.right > containerRect.right) {
        thumbnail.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center'
        })
      }
    }
  }, [currentIndex])

  // Handle keyboard navigation within thumbnails
  const handleThumbnailKeyDown = (e, index) => {
    switch (e.key) {
      case 'ArrowLeft':
        e.preventDefault()
        if (index > 0) {
          onTextureSelect(index - 1)
        }
        break
      case 'ArrowRight':
        e.preventDefault()
        if (index < textures.length - 1) {
          onTextureSelect(index + 1)
        }
        break
      case 'Enter':
      case ' ':
        e.preventDefault()
        onTextureSelect(index)
        break
      default:
        break
    }
  }

  if (!textures || textures.length === 0) {
    return null
  }

  const canNavigatePrev = currentIndex > 0
  const canNavigateNext = currentIndex < textures.length - 1

  return (
    <div className="texture-navigation">
      {/* Navigation arrows */}
      <div className="texture-nav-controls">
        <button
          className={`texture-nav-btn texture-nav-prev ${!canNavigatePrev ? 'disabled' : ''}`}
          onClick={() => canNavigatePrev && onNavigate('prev')}
          disabled={!canNavigatePrev}
          title={labels.previousTexture}
          aria-label={labels.previousTexture}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path 
              d="M15 18L9 12L15 6" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <button
          className={`texture-nav-btn texture-nav-next ${!canNavigateNext ? 'disabled' : ''}`}
          onClick={() => canNavigateNext && onNavigate('next')}
          disabled={!canNavigateNext}
          title={labels.nextTexture}
          aria-label={labels.nextTexture}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path 
              d="M9 18L15 12L9 6" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      {/* Thumbnail strip */}
      <div className="texture-thumbnails-container">
        <div className="texture-thumbnails" ref={thumbnailsRef}>
          {textures.map((texture, index) => (
            <button
              key={texture.id}
              ref={index === currentIndex ? activeThumbnailRef : null}
              className={`texture-thumbnail ${index === currentIndex ? 'active' : ''}`}
              onClick={() => onTextureSelect(index)}
              onKeyDown={(e) => handleThumbnailKeyDown(e, index)}
              title={texture.name[language]}
              aria-label={`${texture.name[language]} - ${index + 1} of ${textures.length}`}
            >
              <div className="texture-thumbnail-image">
                <img
                  src={texture.thumbUrl}
                  alt={texture.name[language]}
                  loading="lazy"
                  onError={(e) => {
                    // Fallback to full image if thumbnail fails
                    e.target.src = texture.imageUrl
                  }}
                />
                
                {/* Loading overlay */}
                <div className="texture-thumbnail-loading">
                  <div className="thumbnail-loading-spinner"></div>
                </div>
              </div>
              
              {/* Texture name */}
              {texture.name && texture.name[language] && (
                <div className="texture-thumbnail-name">
                  <span>{texture.name[language]}</span>
                </div>
              )}
              
              {/* Active indicator */}
              {index === currentIndex && (
                <div className="texture-thumbnail-indicator">
                  <div className="indicator-dot"></div>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Progress indicator */}
      <div className="texture-navigation-progress">
        <div className="progress-bar">
          <div 
            className="progress-fill"
            style={{
              width: `${((currentIndex + 1) / textures.length) * 100}%`
            }}
          />
        </div>
        
        <div className="progress-text">
          <span className="current-number">{currentIndex + 1}</span>
          <span className="separator">/</span>
          <span className="total-number">{textures.length}</span>
        </div>
      </div>

      {/* Keyboard shortcuts hint */}
      <div className="texture-nav-hints">
        <div className="nav-hint">
          <kbd>←</kbd> <kbd>→</kbd>
          <span>{labels.navigate}</span>
        </div>
        <div className="nav-hint">
          <kbd>Esc</kbd>
          <span>{labels.close}</span>
        </div>
      </div>
    </div>
  )
}

export default TextureNavigation