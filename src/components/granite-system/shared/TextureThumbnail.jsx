import { useState } from 'react'
import useLanguageStore from '../../../stores/languageStore'
import useGraniteSystemStore from '../../../stores/graniteSystemStore'

const TextureThumbnail = ({
  texture,
  groupId,
  size = 'medium',
  showInfo = true,
  showActions = true,
  className = '',
  onClick = null,
  onCompareClick = null,
  onMockupClick = null,
  isDraggable = false,
  isSelected = false,
  isInComparison = false
}) => {
  const currentLanguage = useLanguageStore(state => state.currentLanguage)
  const { addToComparison, removeFromComparison, setDraggedTexture } = useGraniteSystemStore()
  
  const [isImageLoading, setIsImageLoading] = useState(true)
  const [hasImageError, setHasImageError] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  // Size configurations
  const sizeConfig = {
    small: {
      container: 'w-8 h-8',
      image: 'w-full h-full',
      info: 'text-xs',
      actions: 'w-4 h-4'
    },
    medium: {
      container: 'w-32 h-32',
      image: 'w-full h-full',
      info: 'text-sm',
      actions: 'w-5 h-5'
    },
    large: {
      container: 'w-48 h-48',
      image: 'w-full h-full',
      info: 'text-base',
      actions: 'w-6 h-6'
    }
  }

  const config = sizeConfig[size] || sizeConfig.medium

  const handleImageLoad = () => {
    setIsImageLoading(false)
    setHasImageError(false)
  }

  const handleImageError = () => {
    console.log('Image load error for:', texture.thumbUrl || texture.imageUrl)
    setIsImageLoading(false)
    setHasImageError(true)
  }

  const handleClick = (e) => {
    if (onClick) {
      onClick(texture, groupId)
    }
    e.stopPropagation()
  }

  const handleCompareToggle = (e) => {
    e.stopPropagation()
    if (isInComparison) {
      removeFromComparison(texture.id)
    } else {
      addToComparison({ ...texture, groupId })
    }
    
    if (onCompareClick) {
      onCompareClick(texture, !isInComparison)
    }
  }

  const handleMockupApply = (e) => {
    e.stopPropagation()
    if (onMockupClick) {
      onMockupClick(texture, groupId)
    }
  }

  const handleDragStart = (e) => {
    if (isDraggable) {
      setDraggedTexture({ ...texture, groupId })
      e.dataTransfer.setData('texture', JSON.stringify({ ...texture, groupId }))
      e.dataTransfer.effectAllowed = 'copy'
    }
  }

  const handleDragEnd = () => {
    if (isDraggable) {
      setDraggedTexture(null)
    }
  }

  const imageUrl = texture.thumbUrl || texture.imageUrl
  
  return (
    <div
      className={`texture-thumbnail relative ${config.container} rounded-lg overflow-hidden cursor-pointer transition-all duration-300 ${
        isSelected ? 'ring-2 ring-orange-500 ring-offset-2' : ''
      } ${
        isHovered ? 'transform scale-105 shadow-lg' : 'shadow-md'
      } ${className}`}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      draggable={isDraggable}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      {/* Image Container */}
      <div className="relative w-full h-full bg-neutral-100">
        {isImageLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
          </div>
        )}
        
        {!hasImageError && (
          <img
            src={imageUrl}
            alt={texture.description[currentLanguage] || texture.name[currentLanguage]}
            className={`${config.image} transition-opacity duration-300 ${
              isImageLoading ? 'opacity-0' : 'opacity-100'
            }`}
            style={{
              objectFit: 'cover'
            }}
            onLoad={handleImageLoad}
            onError={handleImageError}
            loading="lazy"
          />
        )}
        
        {hasImageError && (
          <div className="absolute inset-0 bg-gradient-to-br from-neutral-200 to-neutral-300 flex items-center justify-center">
            <svg className="w-6 h-6 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}

        {/* Overlay on Hover */}
        {isHovered && showActions && (
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
            <div className="flex space-x-2">
              {/* Compare Button */}
              <button
                onClick={handleCompareToggle}
                className={`p-2 rounded-full transition-colors duration-200 ${
                  isInComparison 
                    ? 'bg-orange-500 text-white' 
                    : 'bg-white text-neutral-700 hover:bg-orange-50'
                }`}
                title={isInComparison ? 'Remove from comparison' : 'Add to comparison'}
              >
                <svg className={config.actions} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
                </svg>
              </button>

              {/* Mockup Button */}
              <button
                onClick={handleMockupApply}
                className="p-2 bg-white text-neutral-700 rounded-full hover:bg-orange-50 transition-colors duration-200"
                title="Apply to mockup"
              >
                <svg className={config.actions} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </button>
            </div>
          </div>
        )}

        {/* Selection Indicator */}
        {isSelected && (
          <div className="absolute top-2 right-2 w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        )}

        {/* Comparison Badge */}
        {isInComparison && (
          <div className="absolute top-2 left-2 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
            </svg>
          </div>
        )}

        {/* Drag Indicator */}
        {isDraggable && (
          <div className="absolute bottom-2 right-2 opacity-50">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </div>
        )}
      </div>

      {/* Info Panel */}
      {showInfo && (
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/70 to-transparent text-white p-2">
          {hasImageError ? (
            <div className="text-center">
              <h4 className={`${config.info} font-medium truncate text-neutral-300`}>
                {texture.name[currentLanguage]}
              </h4>
              <span className="text-xs text-neutral-400">Preview Coming Soon</span>
            </div>
          ) : (
            <>
              <h4 className={`${config.info} font-medium truncate`}>
                {texture.name[currentLanguage]}
              </h4>
              {size !== 'small' && texture.properties && (
                <p className="text-xs opacity-75 truncate">
                  {texture.properties.density} • {texture.properties.hardness}
                </p>
              )}
            </>
          )}
        </div>
      )}
    </div>
  )
}

export default TextureThumbnail