import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react'
import useGraniteSystemStore from '../../../stores/graniteSystemStore'
import useLanguageStore from '../../../stores/languageStore'
import { graniteTypes } from '../../../constants/graniteData'
import TextureViewer from './TextureViewer'
import { X } from 'lucide-react'

const UniversalTextureGallery = () => {
  const { language } = useLanguageStore()
  const { 
    gallery, 
    closeGallery, 
    addToComparison,
    comparison 
  } = useGraniteSystemStore()

  const [activeFilter, setActiveFilter] = useState('all')
  const [currentTextureIndex, setCurrentTextureIndex] = useState(0)
  const [sheetHeight, setSheetHeight] = useState(25) // 25%, 50%, 90%
  const [isDraggingSheet, setIsDraggingSheet] = useState(false)
  const filterButtonsRef = useRef(null)
  const filtersContainerRef = useRef(null)
  const sheetRef = useRef(null)
  const startTouchY = useRef(0)
  const startSheetHeight = useRef(25)
  const currentSheetHeight = useRef(25)
  const touchMoveHandler = useRef(null)
  const touchEndHandler = useRef(null)

  // Localization
  const modalLabels = {
    en: {
      title: 'Granite Texture Gallery',
      closeAria: 'Close gallery',
      addToCompare: 'Add to Compare',
      addedToCompare: 'Added',
      technicalProperties: 'Technical Properties',
      maxCompareTooltip: 'Maximum 4 textures for comparison',
      alreadyInComparisonTooltip: 'Already in comparison',
      allTextures: 'All Textures',
      filterByColor: 'Filter by Color Group',
      showingTextures: 'Showing {{count}} textures',
      textureOf: '{{current}} of {{total}}',
      propertyLabels: {
        density: 'Density',
        hardness: 'Hardness',
        pattern: 'Pattern',
        finish: 'Finish',
        maplePattern: 'Maple Pattern',
        quarry: 'Quarry',
        heritage: 'Heritage',
        warmth: 'Warmth',
        quality: 'Quality',
        earthyTones: 'Earthy Tones',
        strength: 'Strength',
        frostResistance: 'Frost Resistance',
        waterAbsorption: 'Water Absorption',
        labradorescence: 'Labradorescence',
        colorTransitions: 'Color Transitions',
        forestTones: 'Forest Tones'
      }
    },
    ua: {
      title: 'Галерея текстур граніту',
      closeAria: 'Закрити галерею',
      addToCompare: 'Додати до порівняння',
      addedToCompare: 'Додано',
      technicalProperties: 'Технічні характеристики',
      maxCompareTooltip: 'Максимум 4 текстури для порівняння',
      alreadyInComparisonTooltip: 'Вже додано до порівняння',
      allTextures: 'Всі текстури',
      filterByColor: 'Фільтр по кольоровій групі',
      showingTextures: 'Показано {{count}} текстур',
      textureOf: '{{current}} з {{total}}',
      propertyLabels: {
        density: 'Щільність',
        hardness: 'Твердість',
        pattern: 'Візерунок',
        finish: 'Обробка',
        maplePattern: 'Кленовий візерунок',
        quarry: 'Кар\'єр',
        heritage: 'Спадщина',
        warmth: 'Теплота',
        quality: 'Якість',
        earthyTones: 'Земляні тони',
        strength: 'Міцність',
        frostResistance: 'Морозостійкість',
        waterAbsorption: 'Водопоглинання',
        labradorescence: 'Лабрадоресценція',
        colorTransitions: 'Переходи кольорів',
        forestTones: 'Лісові тони'
      }
    },
    de: {
      title: 'Granit-Textur-Galerie',
      closeAria: 'Galerie schließen',
      addToCompare: 'Zum Vergleich hinzufügen',
      addedToCompare: 'Hinzugefügt',
      technicalProperties: 'Technische Eigenschaften',
      maxCompareTooltip: 'Maximal 4 Texturen zum Vergleichen',
      alreadyInComparisonTooltip: 'Bereits im Vergleich',
      allTextures: 'Alle Texturen',
      filterByColor: 'Nach Farbgruppe filtern',
      showingTextures: '{{count}} Texturen angezeigt',
      textureOf: '{{current}} von {{total}}',
      propertyLabels: {
        density: 'Dichte',
        hardness: 'Härte',
        pattern: 'Muster',
        finish: 'Oberfläche',
        maplePattern: 'Ahorn-Muster',
        quarry: 'Steinbruch',
        heritage: 'Herkunft',
        warmth: 'Wärme',
        quality: 'Qualität',
        earthyTones: 'Erdige Töne',
        strength: 'Festigkeit',
        frostResistance: 'Frostbeständigkeit',
        waterAbsorption: 'Wasseraufnahme',
        labradorescence: 'Labradoreszenz',
        colorTransitions: 'Farbübergänge',
        forestTones: 'Waldtöne'
      }
    },
    pl: {
      title: 'Galeria tekstur granitu',
      closeAria: 'Zamknij galerię',
      addToCompare: 'Dodaj do porównania',
      addedToCompare: 'Dodano',
      technicalProperties: 'Właściwości techniczne',
      maxCompareTooltip: 'Maksymalnie 4 tekstury do porównania',
      alreadyInComparisonTooltip: 'Już w porównaniu',
      allTextures: 'Wszystkie tekstury',
      filterByColor: 'Filtruj według grupy kolorowej',
      showingTextures: 'Wyświetlono {{count}} tekstur',
      textureOf: '{{current}} z {{total}}',
      propertyLabels: {
        density: 'Gęstość',
        hardness: 'Twardość',
        pattern: 'Wzór',
        finish: 'Wykończenie',
        maplePattern: 'Wzór klonowy',
        quarry: 'Kamieniołom',
        heritage: 'Dziedzictwo',
        warmth: 'Ciepło',
        quality: 'Jakość',
        earthyTones: 'Tony ziemi',
        strength: 'Wytrzymałość',
        frostResistance: 'Odporność na mróz',
        waterAbsorption: 'Chłonność wody',
        labradorescence: 'Labradorescencja',
        colorTransitions: 'Przejścia kolorów',
        forestTones: 'Tony leśne'
      }
    }
  }

  // Collect all textures from all granite types
  const allTextures = useMemo(() => {
    const textures = []
    graniteTypes.forEach(graniteType => {
      graniteType.textures.forEach(texture => {
        textures.push({
          ...texture,
          groupId: graniteType.id,
          groupName: graniteType.name[language] || graniteType.name.en,
          colorClass: graniteType.colorClass
        })
      })
    })
    return textures
  }, [language])

  // Filter textures based on active filter
  const filteredTextures = useMemo(() => {
    if (activeFilter === 'all') return allTextures
    return allTextures.filter(texture => texture.groupId === activeFilter)
  }, [allTextures, activeFilter])

  // Current texture from filtered list
  const currentTexture = filteredTextures[currentTextureIndex] || null

  // Handle navigation
  const handlePrevious = useCallback(() => {
    setCurrentTextureIndex(prev => prev > 0 ? prev - 1 : filteredTextures.length - 1)
  }, [filteredTextures.length])

  const handleNext = useCallback(() => {
    setCurrentTextureIndex(prev => prev < filteredTextures.length - 1 ? prev + 1 : 0)
  }, [filteredTextures.length])

  // Handle thumbnail click
  const handleThumbnailClick = (index) => {
    setCurrentTextureIndex(index)
  }

  // Handle filter change
  const handleFilterChange = (filterId) => {
    setActiveFilter(filterId)
    setCurrentTextureIndex(0) // Reset to first texture
  }

  // Check if filter buttons need scroll indicators
  useEffect(() => {
    const checkScrollable = () => {
      if (filterButtonsRef.current && filtersContainerRef.current && window.innerWidth >= 768) {
        const container = filterButtonsRef.current
        const isScrollable = container.scrollWidth > container.clientWidth
        
        if (isScrollable) {
          filtersContainerRef.current.classList.add('scrollable')
        } else {
          filtersContainerRef.current.classList.remove('scrollable')
        }
      }
    }

    checkScrollable()
    window.addEventListener('resize', checkScrollable)
    
    return () => window.removeEventListener('resize', checkScrollable)
  }, [gallery.isOpen, filteredTextures])

  // Handle horizontal scroll with mouse wheel
  useEffect(() => {
    const handleWheel = (e) => {
      if (filterButtonsRef.current && window.innerWidth >= 768) {
        const container = filterButtonsRef.current
        const isScrollable = container.scrollWidth > container.clientWidth
        
        if (isScrollable && Math.abs(e.deltaX) < Math.abs(e.deltaY)) {
          e.preventDefault()
          container.scrollLeft += e.deltaY
        }
      }
    }

    const container = filterButtonsRef.current
    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false })
      return () => container.removeEventListener('wheel', handleWheel)
    }
  }, [gallery.isOpen])

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!gallery.isOpen) return
      
      switch (e.key) {
        case 'Escape':
          closeGallery()
          break
        case 'ArrowLeft':
          e.preventDefault()
          handlePrevious()
          break
        case 'ArrowRight':
          e.preventDefault()
          handleNext()
          break
        default:
          break
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [gallery.isOpen, handlePrevious, handleNext, closeGallery])

  // Cleanup effect for touch handlers
  useEffect(() => {
    return () => {
      // Clean up any remaining event listeners when component unmounts
      if (touchMoveHandler.current) {
        document.removeEventListener('touchmove', touchMoveHandler.current)
      }
      if (touchEndHandler.current) {
        document.removeEventListener('touchend', touchEndHandler.current)
      }
    }
  }, [])

  // Check if texture is in comparison
  const isInComparison = (textureId) => {
    return comparison.selectedTextures.some(texture => texture.id === textureId)
  }

  // Handle add to comparison
  const handleAddToComparison = () => {
    if (!currentTexture) return
    
    if (comparison.selectedTextures.length >= 4) {
      // Show tooltip about max limit
      return
    }
    
    if (isInComparison(currentTexture.id)) {
      // Already in comparison
      return
    }
    
    addToComparison(currentTexture)
  }

  if (!gallery.isOpen) return null

  const labels = modalLabels[language] || modalLabels.en

  // Short names for filter buttons to save space
  const getShortGraniteName = (graniteType) => {
    const shortNames = {
      en: {
        'black': 'Black',
        'gray': 'Gray', 
        'red-brown': 'Red-Brown',
        'pink-gray': 'Pink-Gray',
        'green': 'Green',
        'labradorite': 'Labradorite'
      },
      ua: {
        'black': 'Чорний',
        'gray': 'Сірий',
        'red-brown': 'Червоно-корич.', 
        'pink-gray': 'Рожево-сірий',
        'green': 'Зелений',
        'labradorite': 'Лабрадорит'
      },
      de: {
        'black': 'Schwarz',
        'gray': 'Grau',
        'red-brown': 'Rotbraun',
        'pink-gray': 'Rosa-Grau', 
        'green': 'Grün',
        'labradorite': 'Labradorit'
      },
      pl: {
        'black': 'Czarny',
        'gray': 'Szary',
        'red-brown': 'Czerwono-brąz.',
        'pink-gray': 'Różowo-szary',
        'green': 'Zielony', 
        'labradorite': 'Labradoryt'
      }
    }
    
    return shortNames[language]?.[graniteType.id] || shortNames.en[graniteType.id] || graniteType.name[language] || graniteType.name.en
  }

  // Sheet Modal functions
  const snapToBreakpoint = (targetHeight) => {
    const breakpoints = [25, 50, 90]
    const closest = breakpoints.reduce((prev, curr) => 
      Math.abs(curr - targetHeight) < Math.abs(prev - targetHeight) ? curr : prev
    )
    currentSheetHeight.current = closest
    setSheetHeight(closest)
  }

  const handleSheetTouchStart = (e) => {
    if (e.touches && e.touches.length > 0) {
      e.preventDefault()
      setIsDraggingSheet(true)
      startTouchY.current = e.touches[0].clientY
      startSheetHeight.current = sheetHeight
      
      // Create handlers with proper context
      touchMoveHandler.current = (moveEvent) => {
        if (!moveEvent.touches || moveEvent.touches.length === 0) return
        
        moveEvent.preventDefault()
        const currentY = moveEvent.touches[0].clientY
        const deltaY = startTouchY.current - currentY
        const viewportHeight = window.innerHeight
        const deltaPercent = (deltaY / viewportHeight) * 100
        
        const newHeight = Math.max(15, Math.min(95, startSheetHeight.current + deltaPercent))
        currentSheetHeight.current = newHeight
        setSheetHeight(newHeight)
      }
      
      touchEndHandler.current = () => {
        setIsDraggingSheet(false)
        snapToBreakpoint(currentSheetHeight.current)
        
        // Remove event listeners
        if (touchMoveHandler.current) {
          document.removeEventListener('touchmove', touchMoveHandler.current)
        }
        if (touchEndHandler.current) {
          document.removeEventListener('touchend', touchEndHandler.current)
        }
        touchMoveHandler.current = null
        touchEndHandler.current = null
      }
      
      // Add event listeners to document
      document.addEventListener('touchmove', touchMoveHandler.current, { passive: false })
      document.addEventListener('touchend', touchEndHandler.current, { once: true })
    }
  }


  const toggleSheet = () => {
    let newHeight
    if (sheetHeight === 25) {
      newHeight = 50
    } else if (sheetHeight === 50) {
      newHeight = 90
    } else {
      newHeight = 25
    }
    currentSheetHeight.current = newHeight
    setSheetHeight(newHeight)
  }


  return (
    <div className="texture-gallery-modal">
      <div className="texture-gallery-overlay" onClick={closeGallery}></div>
      <div 
        className="texture-gallery-container" 
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="gallery-title"
      >
        {/* Header */}
        <div className="texture-gallery-header">
          <div className="texture-gallery-title-section">
            <h2 id="gallery-title" className="texture-gallery-title">
              {labels.title}
            </h2>
            <div className="texture-gallery-counter">
              {labels.textureOf
                .replace('{{current}}', currentTextureIndex + 1)
                .replace('{{total}}', filteredTextures.length)
              }
            </div>
          </div>
          <button
            className="texture-gallery-close"
            onClick={closeGallery}
            aria-label={labels.closeAria}
          >
            <X size={24} />
          </button>
        </div>

        {/* Color Filter Buttons */}
        <div className="texture-gallery-filters" ref={filtersContainerRef}>
          <div className="filter-label">{labels.filterByColor}:</div>
          <div className="filter-buttons" ref={filterButtonsRef}>
            <button
              className={`filter-button granite-filter-all ${activeFilter === 'all' ? 'active' : ''}`}
              onClick={() => handleFilterChange('all')}
            >
              {labels.allTextures} ({allTextures.length})
            </button>
            {graniteTypes.map(graniteType => (
              <button
                key={graniteType.id}
                className={`filter-button granite-filter-${graniteType.id} ${
                  activeFilter === graniteType.id ? 'active' : ''
                }`}
                onClick={() => handleFilterChange(graniteType.id)}
              >
                {getShortGraniteName(graniteType)} ({graniteType.textures.length})
              </button>
            ))}
          </div>
        </div>

        {/* Main Content - Desktop & Mobile Responsive */}
        <div className="texture-gallery-content">
          {/* Desktop: Three Column Layout */}
          <div className="texture-gallery-desktop-layout">
            {/* Left: Description Panel */}
            <div className="texture-gallery-description-section">
              {currentTexture && (
                <>
                  <div className="texture-info-header">
                    <h3 className="texture-name">
                      {currentTexture.name[language] || currentTexture.name.en}
                    </h3>
                    <div className="texture-group-badge">
                      {currentTexture.groupName}
                    </div>
                  </div>

                  <div className="texture-description">
                    {currentTexture.description[language] || currentTexture.description.en}
                  </div>

                  {/* Compare Button */}
                  <div className="texture-actions">
                    <button
                      className={`compare-button ${
                        isInComparison(currentTexture.id) ? 'added' : ''
                      } ${comparison.selectedTextures.length >= 4 ? 'disabled' : ''}`}
                      onClick={handleAddToComparison}
                      disabled={
                        isInComparison(currentTexture.id) || 
                        comparison.selectedTextures.length >= 4
                      }
                      title={
                        isInComparison(currentTexture.id) 
                          ? labels.alreadyInComparisonTooltip
                          : comparison.selectedTextures.length >= 4
                          ? labels.maxCompareTooltip
                          : ''
                      }
                    >
                      {isInComparison(currentTexture.id) ? labels.addedToCompare : labels.addToCompare}
                    </button>
                  </div>
                </>
              )}
            </div>

            {/* Center: Texture Viewer */}
            <div className="texture-gallery-viewer-section">
              {currentTexture && (
                <TextureViewer 
                  texture={currentTexture}
                  onPrevious={handlePrevious}
                  onNext={handleNext}
                  canGoPrevious={currentTextureIndex > 0}
                  canGoNext={currentTextureIndex < filteredTextures.length - 1}
                />
              )}
            </div>

            {/* Right: Properties Panel */}
            <div className="texture-gallery-properties-section">
              {currentTexture && (
                <>
                  {/* Technical Properties */}
                  {currentTexture.properties && (
                    <div className="texture-properties">
                      <h4>{labels.technicalProperties}</h4>
                      <div className="properties-list">
                        {Object.entries(currentTexture.properties).map(([key, value]) => (
                          <div key={key} className="property-item">
                            <span className="property-label">
                              {labels.propertyLabels[key] || key}:
                            </span>
                            <span className="property-value">{value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>

          {/* Mobile: Sheet Modal Layout */}
          <div className="texture-gallery-mobile-layout">
            {/* Full Screen Texture Viewer */}
            <div className="texture-gallery-mobile-viewer">
              {currentTexture && (
                <TextureViewer 
                  texture={currentTexture}
                  onPrevious={handlePrevious}
                  onNext={handleNext}
                  canGoPrevious={currentTextureIndex > 0}
                  canGoNext={currentTextureIndex < filteredTextures.length - 1}
                />
              )}
            </div>

            {/* Sheet Modal for Info & Properties */}
            <div 
              className={`texture-sheet-modal ${isDraggingSheet ? 'dragging' : ''}`}
              style={{ height: `${sheetHeight}%` }}
              ref={sheetRef}
            >
              {/* Sheet Handle */}
              <div 
                className="sheet-handle"
                onTouchStart={handleSheetTouchStart}
                onClick={toggleSheet}
              >
                <div className="sheet-handle-bar"></div>
              </div>

              {/* Sheet Content */}
              <div className="sheet-content">
                {currentTexture && (
                  <>
                    {/* Always visible header */}
                    <div className="sheet-header">
                      <div className="texture-info-header-mobile">
                        <h3 className="texture-name">
                          {currentTexture.name[language] || currentTexture.name.en}
                        </h3>
                        <div className="texture-group-badge">
                          {currentTexture.groupName}
                        </div>
                      </div>
                    </div>

                    {/* Expandable content */}
                    <div className="sheet-expandable-content">
                      {/* Description - visible at 50%+ */}
                      {sheetHeight >= 40 && (
                        <div className="texture-description-mobile">
                          <div className="texture-description">
                            {currentTexture.description[language] || currentTexture.description.en}
                          </div>

                          {/* Compare Button */}
                          <div className="texture-actions">
                            <button
                              className={`compare-button ${
                                isInComparison(currentTexture.id) ? 'added' : ''
                              } ${comparison.selectedTextures.length >= 4 ? 'disabled' : ''}`}
                              onClick={handleAddToComparison}
                              disabled={
                                isInComparison(currentTexture.id) || 
                                comparison.selectedTextures.length >= 4
                              }
                            >
                              {isInComparison(currentTexture.id) ? labels.addedToCompare : labels.addToCompare}
                            </button>
                          </div>
                        </div>
                      )}

                      {/* Technical Properties - visible at 80%+ */}
                      {sheetHeight >= 80 && currentTexture.properties && (
                        <div className="texture-properties-mobile">
                          <div className="texture-properties">
                            <h4>{labels.technicalProperties}</h4>
                            <div className="properties-list">
                              {Object.entries(currentTexture.properties).map(([key, value]) => (
                                <div key={key} className="property-item">
                                  <span className="property-label">
                                    {labels.propertyLabels[key] || key}:
                                  </span>
                                  <span className="property-value">{value}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Thumbnail Navigation */}
        <div className="texture-gallery-thumbnails">
          <div className="thumbnail-scroll">
            {filteredTextures.map((texture, index) => (
              <button
                key={texture.id}
                className={`texture-thumbnail ${
                  index === currentTextureIndex ? 'active' : ''
                }`}
                onClick={() => handleThumbnailClick(index)}
                aria-label={texture.name[language] || texture.name.en}
              >
                <img
                  src={texture.thumbUrl}
                  alt=""
                  loading="lazy"
                  onError={(e) => {
                    console.log('Image failed to load:', texture.thumbUrl);
                    e.target.style.display = 'none';
                  }}
                />
                <div className="thumbnail-overlay">
                  <div className={`group-indicator granite-${texture.groupId}`}></div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default UniversalTextureGallery