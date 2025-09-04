import React, { useState, useRef, useEffect } from 'react'
import useLanguageStore from '../../../stores/languageStore'

const LanguageSwitcher = ({ className = '' }) => {
  const { currentLanguage, availableLanguages, setLanguage } = useLanguageStore()
  const [isOpen, setIsOpen] = useState(false)
  const timeoutRef = useRef(null)
  
  const currentLang = availableLanguages.find(lang => lang.code === currentLanguage)
  const otherLanguages = availableLanguages.filter(lang => lang.code !== currentLanguage)
  
  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    setIsOpen(true)
  }
  
  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false)
    }, 300) // 300ms затримка
  }
  
  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])
  
  return (
    <div 
      className={`relative ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Active Language Display */}
      <div className="cursor-pointer">
        <span className="text-white hover:text-accent-orange text-sm font-medium transition-colors">
          {currentLang?.code.toUpperCase()}
        </span>
      </div>
      
      {/* Dropdown Menu */}
      {isOpen && (
        <div 
          className="fixed bg-neutral-800 rounded-lg shadow-xl py-2 min-w-[80px] border border-neutral-700"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          style={{
            zIndex: 9999,
            top: '100%',
            left: '0',
            marginTop: '2px',
            position: 'absolute'
          }}
        >
          {otherLanguages.map((language) => (
            <button
              key={language.code}
              onClick={() => setLanguage(language.code)}
              className="w-full px-4 py-2 text-sm font-medium text-white hover:text-accent-orange hover:bg-neutral-700 transition-colors text-left block"
              style={{ padding: '8px 16px' }}
            >
              {language.code.toUpperCase()}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default LanguageSwitcher