import React, { useState } from 'react'
import useLanguageStore from '../../../stores/languageStore'

const LanguageSwitcher = ({ className = '' }) => {
  const { currentLanguage, availableLanguages, setLanguage } = useLanguageStore()
  const [isOpen, setIsOpen] = useState(false)
  
  const currentLang = availableLanguages.find(lang => lang.code === currentLanguage)
  const otherLanguages = availableLanguages.filter(lang => lang.code !== currentLanguage)
  
  return (
    <div 
      className={`relative ${className}`}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      {/* Active Language Display */}
      <div className="cursor-pointer">
        <span className="text-white hover:text-accent-orange text-sm font-medium transition-colors">
          {currentLang?.code.toUpperCase()}
        </span>
      </div>
      
      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-1 bg-neutral-800 rounded-lg shadow-lg py-1 min-w-[60px] z-50">
          {otherLanguages.map((language) => (
            <button
              key={language.code}
              onClick={() => setLanguage(language.code)}
              className="w-full px-3 py-2 text-sm font-medium text-white hover:text-accent-orange hover:bg-neutral-700 transition-colors text-left"
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