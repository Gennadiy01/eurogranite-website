import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Button from '../../atoms/Button'
import useLanguageStore from '../../../stores/languageStore'
import useModalStore from '../../../stores/modalStore'

const GraniteModal = ({ granite }) => {
  const { currentLanguage } = useLanguageStore()
  const { closeModal } = useModalStore()
  const [currentSlide, setCurrentSlide] = useState(0)
  
  const lang = currentLanguage || 'en'
  
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal()
    }
  }
  
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % granite.materials.length)
  }
  
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + granite.materials.length) % granite.materials.length)
  }
  
  const currentMaterial = granite.materials[currentSlide]
  
  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      onClick={handleOverlayClick}
    >
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-neutral-200">
          <h2 className="heading-2 text-neutral-900">
            {granite.name[lang]}
          </h2>
          <button
            onClick={closeModal}
            className="text-neutral-400 hover:text-neutral-600 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {/* Content */}
        <div className="p-6">
          {/* Granite overview */}
          <div className="mb-8">
            <div className="grid md-grid-cols-2 gap-6">
              {/* Granite sample */}
              <div className={`granite-texture h-80 relative ${granite.colorClass} rounded-xl`}>
                <div className="absolute inset-0 gradient-overlay rounded-xl"></div>
                <div className="absolute top-4 right-4">
                  <span className="product-badge accent">
                    {granite.badge[lang]}
                  </span>
                </div>
              </div>
              
              {/* Description */}
              <div>
                <p className="text-sm font-medium text-neutral-500 mb-4">
                  {granite.subtitle[lang]}
                </p>
                <p className="description-text text-neutral-600 mb-6">
                  {granite.description[lang]}
                </p>
              </div>
            </div>
          </div>
          
          {/* Materials slider */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="heading-3">
                {lang === 'en' ? 'Available Materials' :
                 lang === 'ua' ? 'Доступні матеріали' :
                 lang === 'de' ? 'Verfügbare Materialien' :
                 lang === 'pl' ? 'Dostępne Materiały' : 'Available Materials'}
              </h3>
              
              {granite.materials.length > 1 && (
                <div className="flex space-x-2">
                  <button
                    onClick={prevSlide}
                    className="p-2 rounded-full bg-neutral-100 hover:bg-neutral-200 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={nextSlide}
                    className="p-2 rounded-full bg-neutral-100 hover:bg-neutral-200 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              )}
            </div>
            
            {/* Current material */}
            <div className="bg-neutral-50 rounded-xl p-6">
              <div className="grid md-grid-cols-2 gap-6">
                {/* Material image placeholder */}
                <div className="aspect-[4/3] bg-gradient-to-br from-neutral-200 to-neutral-300 rounded-lg flex items-center justify-center">
                  <div className="text-center text-neutral-500">
                    <svg className="w-16 h-16 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="text-sm font-medium">
                      {currentMaterial.type === 'granite' ? 
                        (lang === 'en' ? 'Granite Sample' : 
                         lang === 'ua' ? 'Зразок граніту' :
                         lang === 'de' ? 'Granitprobe' :
                         lang === 'pl' ? 'Próbka granitu' : 'Granite Sample') :
                        (lang === 'en' ? 'Labradorite Sample' :
                         lang === 'ua' ? 'Зразок лабрадориту' :
                         lang === 'de' ? 'Labradorit-Probe' :
                         lang === 'pl' ? 'Próbka labradorytu' : 'Labradorite Sample')
                      }
                    </p>
                  </div>
                </div>
                
                {/* Material info */}
                <div>
                  <h4 className="text-xl font-bold text-neutral-900 mb-3">
                    {currentMaterial.name[lang]}
                  </h4>
                  <div>
                    <h5 className="font-semibold text-neutral-700 mb-2">
                      {lang === 'en' ? 'Characteristics:' :
                       lang === 'ua' ? 'Характеристики:' :
                       lang === 'de' ? 'Eigenschaften:' :
                       lang === 'pl' ? 'Charakterystyka:' : 'Characteristics:'}
                    </h5>
                    <ul className="list-disc list-inside space-y-1 text-neutral-600">
                      {currentMaterial.characteristics.map((char, index) => (
                        <li key={index} className="text-sm">{char}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Slide indicators */}
            {granite.materials.length > 1 && (
              <div className="flex justify-center space-x-2 mt-4">
                {granite.materials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentSlide ? 'bg-accent-orange' : 'bg-neutral-300'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
          
          {/* Actions */}
          <div className="flex justify-center space-x-4 pt-6 border-t border-neutral-200">
            <Button variant="primary" size="large">
              {lang === 'en' ? 'Request Quote' :
               lang === 'ua' ? 'Замовити' :
               lang === 'de' ? 'Angebot anfordern' :
               lang === 'pl' ? 'Zamów' : 'Request Quote'}
            </Button>
            <Button variant="outline" size="large" onClick={closeModal}>
              {lang === 'en' ? 'Close' :
               lang === 'ua' ? 'Закрити' :
               lang === 'de' ? 'Schließen' :
               lang === 'pl' ? 'Zamknij' : 'Close'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

GraniteModal.propTypes = {
  granite: PropTypes.object.isRequired
}

export default GraniteModal