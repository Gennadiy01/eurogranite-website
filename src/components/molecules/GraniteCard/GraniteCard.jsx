import React from 'react'
import PropTypes from 'prop-types'
import Button from '../../atoms/Button'
import useLanguageStore from '../../../stores/languageStore'
import useModalStore from '../../../stores/modalStore'

const GraniteCard = ({ granite }) => {
  const { currentLanguage } = useLanguageStore()
  const { openGraniteModal } = useModalStore()
  
  const lang = currentLanguage || 'en'
  
  const handleDetailsClick = () => {
    openGraniteModal(granite)
  }
  
  return (
    <div className="bg-white rounded-3xl shadow-xl overflow-hidden card-hover">
      {/* Granite texture sample */}
      <div className={`granite-texture h-64 relative ${granite.colorClass}`}>
        <div className="absolute inset-0 gradient-overlay"></div>
        {/* Badge */}
        <div className="absolute top-4 right-4">
          <span className="product-badge accent">
            {granite.badge[lang]}
          </span>
        </div>
      </div>
      
      {/* Card content */}
      <div className="p-6 flex flex-col card-content">
        {/* Title */}
        <h3 className="font-bold mb-1 text-gray-900 leading-tight title-height">
          {granite.name[lang]}
        </h3>
        
        {/* Subtitle */}
        <p className="text-sm font-medium text-gray-500 mb-3">
          {granite.subtitle[lang]}
        </p>
        
        {/* Description */}
        <p className="text-gray-600 text-sm description-text flex-grow">
          {granite.description[lang]}
        </p>
        
        {/* Button */}
        <div className="flex items-center justify-center mt-8 mb-4">
          <Button 
            variant="outline"
            size="small"
            onClick={handleDetailsClick}
          >
            {lang === 'en' ? 'Details' : 
             lang === 'ua' ? 'Детальніше' :
             lang === 'de' ? 'Details' :
             lang === 'pl' ? 'Szczegóły' : 'Details'}
          </Button>
        </div>
      </div>
    </div>
  )
}

GraniteCard.propTypes = {
  granite: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.object.isRequired,
    subtitle: PropTypes.object.isRequired,
    badge: PropTypes.object.isRequired,
    description: PropTypes.object.isRequired,
    colorClass: PropTypes.string.isRequired,
    materials: PropTypes.array.isRequired
  }).isRequired
}

export default GraniteCard