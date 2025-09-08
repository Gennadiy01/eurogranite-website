import React, { useEffect, useMemo } from 'react'
import useGraniteSystemStore from '../../../stores/graniteSystemStore'
import useLanguageStore from '../../../stores/languageStore'
import { graniteTypes } from '../../../constants/graniteData'
import TextureViewer from './TextureViewer'
import TextureNavigation from './TextureNavigation'

const TextureGalleryModal = () => {
  const { language } = useLanguageStore()
  const { 
    gallery, 
    closeGallery, 
    selectTexture, 
    navigateTexture,
    addToComparison,
    comparison 
  } = useGraniteSystemStore()

  // Localization for modal UI
  const modalLabels = {
    en: {
      closeAria: 'Close gallery',
      addToCompare: 'Add to Compare',
      addedToCompare: 'Added',
      technicalProperties: 'Technical Properties',
      maxCompareTooltip: 'Maximum 4 textures for comparison',
      alreadyInComparisonTooltip: 'Already in comparison',
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
      closeAria: 'Закрити галерею',
      addToCompare: 'Додати до порівняння',
      addedToCompare: 'Додано',
      technicalProperties: 'Технічні характеристики',
      maxCompareTooltip: 'Максимум 4 текстури для порівняння',
      alreadyInComparisonTooltip: 'Вже додано до порівняння',
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
      closeAria: 'Galerie schließen',
      addToCompare: 'Zum Vergleich hinzufügen',
      addedToCompare: 'Hinzugefügt',
      technicalProperties: 'Technische Eigenschaften',
      maxCompareTooltip: 'Maximal 4 Texturen zum Vergleichen',
      alreadyInComparisonTooltip: 'Bereits im Vergleich',
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
      closeAria: 'Zamknij galerię',
      addToCompare: 'Dodaj do porównania',
      addedToCompare: 'Dodano',
      technicalProperties: 'Właściwości techniczne',
      maxCompareTooltip: 'Maksymalnie 4 tekstury do porównania',
      alreadyInComparisonTooltip: 'Już w porównaniu',
      propertyLabels: {
        density: 'Gęstość',
        hardness: 'Twardość',
        pattern: 'Wzór',
        finish: 'Wykończenie',
        maplePattern: 'Wzór klonowy',
        quarry: 'Kamieniołom',
        heritage: 'Dziedzictwo',
        warmth: 'Ciepłota',
        quality: 'Jakość',
        earthyTones: 'Tony ziemiste',
        strength: 'Wytrzymałość',
        frostResistance: 'Odporność na mróz',
        waterAbsorption: 'Nasiąkliwość',
        labradorescence: 'Labradorescencja',
        colorTransitions: 'Przejścia kolorów',
        forestTones: 'Tony leśne'
      }
    }
  }

  const labels = modalLabels[language] || modalLabels.en

  // Get current granite group and textures
  const currentGroup = useMemo(() => {
    if (!gallery.currentGroup) return null
    return graniteTypes.find(type => type.id === gallery.currentGroup)
  }, [gallery.currentGroup])

  const currentTextures = useMemo(() => {
    return currentGroup?.textures || []
  }, [currentGroup])

  const currentTexture = useMemo(() => {
    return currentTextures[gallery.currentTextureIndex] || null
  }, [currentTextures, gallery.currentTextureIndex])

  // Handle keyboard navigation
  useEffect(() => {
    if (!gallery.isOpen) return

    const handleKeyDown = (e) => {
      switch (e.key) {
        case 'Escape':
          closeGallery()
          break
        case 'ArrowLeft':
          e.preventDefault()
          if (gallery.currentTextureIndex > 0) {
            navigateTexture('prev')
          }
          break
        case 'ArrowRight':
          e.preventDefault()
          if (gallery.currentTextureIndex < currentTextures.length - 1) {
            navigateTexture('next')
          }
          break
        default:
          break
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [gallery.isOpen, gallery.currentTextureIndex, currentTextures.length, closeGallery, navigateTexture])

  // Select texture when index changes
  useEffect(() => {
    if (currentTexture) {
      selectTexture(currentTexture)
    }
  }, [currentTexture, selectTexture])

  // Handle backdrop click
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      closeGallery()
    }
  }

  // Handle add to comparison
  const handleAddToComparison = () => {
    if (currentTexture) {
      addToComparison(currentTexture)
    }
  }

  // Check if texture is already in comparison
  const isInComparison = currentTexture ? 
    comparison.selectedTextures.some(t => t.id === currentTexture.id) : false

  if (!gallery.isOpen || !currentGroup || !currentTexture) {
    return null
  }

  return (
    <div className="texture-gallery-modal-overlay" onClick={handleBackdropClick}>
      <div className="texture-gallery-modal">
        {/* Header */}
        <div className="texture-gallery-header">
          <div className="texture-gallery-title">
            <h2>{currentGroup.name[language]}</h2>
            <span className="texture-counter">
              {gallery.currentTextureIndex + 1} / {currentTextures.length}
            </span>
          </div>
          <button 
            className="texture-gallery-close"
            onClick={closeGallery}
            aria-label={labels.closeAria}
          >
            ✕
          </button>
        </div>

        {/* Main content */}
        <div className="texture-gallery-content">
          {/* Texture Viewer */}
          <div className="texture-gallery-viewer">
            <TextureViewer texture={currentTexture} />
          </div>

          {/* Texture Info Panel */}
          <div className="texture-gallery-info">
            <div className="texture-info-header">
              <h3>{currentTexture.name[language]}</h3>
              <div className="texture-actions">
                <button
                  className={`texture-btn ${isInComparison ? 'texture-btn-disabled' : 'texture-btn-primary'}`}
                  onClick={handleAddToComparison}
                  disabled={isInComparison || comparison.selectedTextures.length >= 4}
                  title={
                    isInComparison ? 
                      labels.alreadyInComparisonTooltip : 
                      comparison.selectedTextures.length >= 4 ? 
                        labels.maxCompareTooltip : 
                        labels.addToCompare
                  }
                >
                  {isInComparison ? labels.addedToCompare : labels.addToCompare}
                </button>
              </div>
            </div>

            <div className="texture-description">
              <p>{currentTexture.description[language]}</p>
            </div>

            {/* Texture Properties */}
            <div className="texture-properties">
              <h4>{labels.technicalProperties}</h4>
              <div className="properties-grid">
                {Object.entries(currentTexture.properties).map(([key, value]) => (
                  <div key={key} className="property-item">
                    <span className="property-label">
                      {labels.propertyLabels[key] || key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}:
                    </span>
                    <span className="property-value">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="texture-gallery-navigation">
          <TextureNavigation 
            textures={currentTextures}
            currentIndex={gallery.currentTextureIndex}
            onTextureSelect={(index) => {
              useGraniteSystemStore.setState(state => ({
                gallery: {
                  ...state.gallery,
                  currentTextureIndex: index
                }
              }))
            }}
            onNavigate={navigateTexture}
          />
        </div>
      </div>
    </div>
  )
}

export default TextureGalleryModal