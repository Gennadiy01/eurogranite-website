import React, { useState, useRef, useEffect } from 'react'
import useLanguageStore from '../../../stores/languageStore'
import { getLanguageFromPath } from '../../../utils/languageUtils'

const LanguageSwitcher = ({ className = '' }) => {
  const { currentLanguage, availableLanguages, setLanguage } = useLanguageStore()
  const [isOpen, setIsOpen] = useState(false)
  const timeoutRef = useRef(null)
  const [isTouchDevice, setIsTouchDevice] = useState(false)
  
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
  
  const handleLanguageSelect = (languageCode) => {
    setLanguage(languageCode)
    setIsOpen(false) // Закриваємо меню після вибору

    // Navigate to the same page but with new language
    const currentPath = window.location.pathname
    const currentLang = getLanguageFromPath(currentPath)
    const pathWithoutLang = currentLang ? currentPath.replace(`/${currentLang}`, '') : currentPath
    const newPath = pathWithoutLang === '' || pathWithoutLang === '/' ? `/${languageCode}` : `/${languageCode}${pathWithoutLang}`

    // Navigate to new URL
    window.location.href = newPath

    // Очищуємо timeout якщо існує
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
  }
  
  // Detect touch device on mount
  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0)
  }, [])

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && !event.target.closest('.language-switcher')) {
        setIsOpen(false)
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])
  
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
      className={`relative language-switcher ${className}`}
      onMouseEnter={!isTouchDevice ? handleMouseEnter : undefined}
      onMouseLeave={!isTouchDevice ? handleMouseLeave : undefined}
    >
      {/* Active Language Display */}
      <div 
        className="cursor-pointer"
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          setIsOpen(!isOpen)
        }}
      >
        <span className="text-white hover:text-accent-orange text-sm font-medium transition-colors">
          {currentLang?.code.toUpperCase()}
        </span>
      </div>
      
      {/* Dropdown Menu */}
      {isOpen && (
        <div 
          className="fixed bg-neutral-800 rounded-lg shadow-xl py-2 min-w-[80px] border border-neutral-700"
          onMouseEnter={!isTouchDevice ? handleMouseEnter : undefined}
          onMouseLeave={!isTouchDevice ? handleMouseLeave : undefined}
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
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                handleLanguageSelect(language.code)
              }}
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