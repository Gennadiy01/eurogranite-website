import React, { useState, useRef, useEffect } from 'react'
import useLanguageStore from '../../../stores/languageStore'
import { createLocalizedPath } from '../../../utils/urlUtils'
import { parseRoute, getCurrentPath } from '../../../utils/routingUtils'

// Hook for safe router location usage
const useRouterLocationSafe = () => {
  const [location, setLocation] = useState(null)

  useEffect(() => {
    // Check if we're in a router context
    if (typeof window !== 'undefined' && window.__INITIAL_STATE__) {
      // Static mode - no router
      setLocation(null)
      return
    }

    // Try to get router location dynamically
    try {
      require('react-router-dom')
      // In development mode with router, we can access location differently
      setLocation({ pathname: window.location.pathname })
    } catch (error) {
      setLocation(null)
    }
  }, [])

  return location
}

const LanguageSwitcher = ({ className = '' }) => {
  const { currentLanguage, availableLanguages } = useLanguageStore()
  const [isOpen, setIsOpen] = useState(false)
  const timeoutRef = useRef(null)
  const [isTouchDevice, setIsTouchDevice] = useState(false)
  const location = useRouterLocationSafe()

  const currentLang = availableLanguages.find(lang => lang.code === currentLanguage)
  const otherLanguages = availableLanguages.filter(lang => lang.code !== currentLanguage)

  // Get current page - hybrid approach for both static and dynamic modes
  const getCurrentPage = () => {
    // For static mode (production)
    if (typeof window !== 'undefined' && window.__INITIAL_STATE__) {
      return window.__INITIAL_STATE__.page || ''
    }

    // For dynamic mode (development) - try router location first
    if (location && location.pathname) {
      const route = parseRoute(location.pathname)
      return route.page || ''
    }

    // Fallback: parse current URL path directly
    const currentPath = getCurrentPath()
    const route = parseRoute(currentPath)
    return route.page || ''
  }

  // Create language URL for a specific language - preserving current page
  const createLanguageUrl = (languageCode) => {
    const currentPage = getCurrentPage()
    return createLocalizedPath(currentPage, languageCode)
  }
  
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
            <a
              key={language.code}
              href={createLanguageUrl(language.code)}
              className="w-full px-4 py-2 text-sm font-medium text-white hover:text-accent-orange hover:bg-neutral-700 transition-colors text-left block no-underline"
              style={{ padding: '8px 16px', display: 'block' }}
              onClick={() => setIsOpen(false)}
            >
              {language.code.toUpperCase()}
            </a>
          ))}
        </div>
      )}
    </div>
  )
}

export default LanguageSwitcher