import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import LanguageSwitcher from '../../molecules/LanguageSwitcher/LanguageSwitcher'
import useLanguageStore from '../../../stores/languageStore'

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { currentLanguage } = useLanguageStore()
  const location = useLocation()
  const lang = currentLanguage || 'en'
  
  
  // Navigation items
  const navItems = {
    en: [
      { to: '/', label: 'Home' },
      { to: '/products', label: 'Products' },
      { to: '/contact', label: 'Contact' }
    ],
    ua: [
      { to: '/', label: 'Головна' },
      { to: '/products', label: 'Продукція' },
      { to: '/contact', label: 'Контакти' }
    ],
    de: [
      { to: '/', label: 'Startseite' },
      { to: '/products', label: 'Produkte' },
      { to: '/contact', label: 'Kontakt' }
    ],
    pl: [
      { to: '/', label: 'Główna' },
      { to: '/products', label: 'Produkty' },
      { to: '/contact', label: 'Kontakt' }
    ]
  }
  
  const navigation = navItems[lang] || navItems.en
  
  
  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-neutral-900 shadow-lg">
      <nav className="max-w-7xl mx-auto px-6">
        {/* Основний ряд для екранів 1024+ */}
        <div className="lg-flex items-center py-4 min-h-60px gap-6 lg-gap-8 xl-gap-10 xxl-gap-12">
          
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="logo-text">
              EuroGranite
            </Link>
          </div>
          
          {/* Desktop Navigation (1024+) */}
          <div className="lg-flex items-center space-x-8 lg-space-x-12 xl-space-x-16 xxl-space-x-18 whitespace-nowrap flex-1 justify-center">
            {navigation.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={`nav-menu-item ${location.pathname === item.to ? 'text-accent-orange' : ''}`}
              >
                {item.label}
              </Link>
            ))}
          </div>
          
          {/* Right Section (1024+) */}
          <div className="lg-flex items-center gap-4 lg-gap-6 xl-gap-8">
            {/* Language Switcher */}
            <div className="flex items-center">
              <LanguageSwitcher />
            </div>
            
            {/* Contact Info */}
            <div className="xl-flex flex-col space-y-1">
              <a 
                href="tel:+380441234567" 
                className="flex items-center space-x-1 text-white hover:text-accent-orange transition-colors no-underline whitespace-nowrap"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="text-sm font-medium">+38 044 123 45 67</span>
              </a>
              
              <a 
                href="mailto:sales@euro-granite.com" 
                className="flex items-center space-x-1 text-white hover:text-accent-orange transition-colors no-underline whitespace-nowrap"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 7.89a2 2 0 002.83 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="text-sm font-medium">sales@euro-granite.com</span>
              </a>
            </div>
            
            {/* Social Media */}
            <div className="flex items-center space-x-4 lg-space-x-5 xl-space-x-6">
            <a 
              href="viber://chat?number=+380441234567"
              className="text-white hover:text-accent-orange transition-colors no-underline"
              title="Viber"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M11.398.002c-6.559 0-11.88 5.32-11.88 11.88 0 2.089.545 4.049 1.497 5.751l-1.497 5.751 5.751-1.497c1.702.952 3.662 1.497 5.751 1.497 6.559 0 11.88-5.32 11.88-11.88-.001-6.559-5.321-11.879-11.88-11.879zm5.58 16.87c-.434.617-1.026 1.094-1.722 1.325-.319.106-.735.191-1.233.191-.357 0-.79-.043-1.317-.172-1.524-.373-3.375-1.348-5.261-3.235-1.887-1.887-2.862-3.738-3.235-5.261-.129-.527-.172-.96-.172-1.317 0-.498.085-.914.191-1.233.231-.696.708-1.288 1.325-1.722.26-.183.434-.183.651-.183.216 0 .391 0 .564.086.173.086.26.259.39.564.13.305.434.956.52 1.152.086.195.173.326.173.52 0 .26-.13.564-.304.825-.173.26-.325.434-.499.651-.173.216-.347.434-.217.825.129.39.564 1.194 1.325 1.955.761.761 1.564 1.195 1.955 1.325.39.13.608-.044.825-.217.216-.173.434-.325.651-.499.26-.173.564-.304.825-.304.195 0 .325.087.52.173.195.087.847.39 1.152.52.305.13.478.217.564.39.087.173.087.348.087.564 0 .217 0 .391-.183.651z"/>
              </svg>
            </a>
            
            <a 
              href="https://wa.me/380441234567"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-accent-orange transition-colors no-underline"
              title="WhatsApp"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
              </svg>
            </a>
            </div>
          </div>
          
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md-hidden p-2 text-white hover:text-accent-orange transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
          
        </div>
        
        {/* Додатковий ряд для екранів 768-1024 */}
        <div className="md-flex lg-hidden flex-col py-2">
          
          {/* Верхній рядок - логотип, навігація, бургер */}
          <div className="flex items-center justify-between gap-4 mb-2">
            {/* Logo */}
            <div className="flex items-center">
              <Link to="/" className="logo-text">
                EuroGranite
              </Link>
            </div>
            
            {/* Desktop Navigation (768-1024) */}
            <div className="flex items-center space-x-4 md-space-x-6 whitespace-nowrap">
              {navigation.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`nav-menu-item ${location.pathname === item.to ? 'text-accent-orange' : ''}`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
          
          {/* Нижній рядок - Language Switcher, контакти, соцмережі */}
          <div className="flex items-center justify-between gap-4">
            {/* Language Switcher */}
            <div className="flex items-center">
              <LanguageSwitcher />
            </div>
            
            {/* Contact Info та Social Media */}
            <div className="flex items-center gap-4">
              {/* Contact Info */}
              <div className="flex items-center gap-3">
                <a 
                  href="tel:+380441234567" 
                  className="flex items-center space-x-1 text-white hover:text-accent-orange transition-colors no-underline whitespace-nowrap"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span className="text-sm font-medium">+38 044 123 45 67</span>
                </a>
                
                <a 
                  href="mailto:sales@euro-granite.com" 
                  className="flex items-center space-x-1 text-white hover:text-accent-orange transition-colors no-underline whitespace-nowrap"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 7.89a2 2 0 002.83 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="text-sm font-medium">sales@euro-granite.com</span>
                </a>
              </div>
              
              {/* Social Media */}
              <div className="flex items-center space-x-3">
                <a 
                  href="viber://chat?number=+380441234567"
                  className="text-white hover:text-accent-orange transition-colors no-underline"
                  title="Viber"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M11.398.002c-6.559 0-11.88 5.32-11.88 11.88 0 2.089.545 4.049 1.497 5.751l-1.497 5.751 5.751-1.497c1.702.952 3.662 1.497 5.751 1.497 6.559 0 11.88-5.32 11.88-11.88-.001-6.559-5.321-11.879-11.88-11.879zm5.58 16.87c-.434.617-1.026 1.094-1.722 1.325-.319.106-.735.191-1.233.191-.357 0-.79-.043-1.317-.172-1.524-.373-3.375-1.348-5.261-3.235-1.887-1.887-2.862-3.738-3.235-5.261-.129-.527-.172-.96-.172-1.317 0-.498.085-.914.191-1.233.231-.696.708-1.288 1.325-1.722.26-.183.434-.183.651-.183.216 0 .391 0 .564.086.173.086.26.259.39.564.13.305.434.956.52 1.152.086.195.173.326.173.52 0 .26-.13.564-.304.825-.173.26-.325.434-.499.651-.173.216-.347.434-.217.825.129.39.564 1.194 1.325 1.955.761.761 1.564 1.195 1.955 1.325.39.13.608-.044.825-.217.216-.173.434-.325.651-.499.26-.173.564-.304.825-.304.195 0 .325.087.52.173.195.087.847.39 1.152.52.305.13.478.217.564.39.087.173.087.348.087.564 0 .217 0 .391-.183.651z"/>
                  </svg>
                </a>
                
                <a 
                  href="https://wa.me/380441234567"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-accent-orange transition-colors no-underline"
                  title="WhatsApp"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
          
        </div>
        
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md-hidden bg-neutral-800 shadow-lg rounded-lg mt-2 py-4">
            <div className="flex flex-col space-y-2 px-4">
              {navigation.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`text-left py-2 font-medium transition-colors ${
                    location.pathname === item.to 
                      ? 'text-accent-orange' 
                      : 'text-white hover:text-accent-orange'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <div className="border-t border-neutral-600 pt-4 mt-4">
                <LanguageSwitcher className="mb-4" />
                
                {/* Mobile Social Media */}
                <div className="flex items-center space-x-3 mb-3">
                  <a 
                    href="viber://chat?number=+380441234567"
                    className="text-white hover:text-accent-orange transition-colors no-underline"
                    title="Viber"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M11.398.002c-6.559 0-11.88 5.32-11.88 11.88 0 2.089.545 4.049 1.497 5.751l-1.497 5.751 5.751-1.497c1.702.952 3.662 1.497 5.751 1.497 6.559 0 11.88-5.32 11.88-11.88-.001-6.559-5.321-11.879-11.88-11.879zm5.58 16.87c-.434.617-1.026 1.094-1.722 1.325-.319.106-.735.191-1.233.191-.357 0-.79-.043-1.317-.172-1.524-.373-3.375-1.348-5.261-3.235-1.887-1.887-2.862-3.738-3.235-5.261-.129-.527-.172-.96-.172-1.317 0-.498.085-.914.191-1.233.231-.696.708-1.288 1.325-1.722.26-.183.434-.183.651-.183.216 0 .391 0 .564.086.173.086.26.259.39.564.13.305.434.956.52 1.152.086.195.173.326.173.52 0 .26-.13.564-.304.825-.173.26-.325.434-.499.651-.173.216-.347.434-.217.825.129.39.564 1.194 1.325 1.955.761.761 1.564 1.195 1.955 1.325.39.13.608-.044.825-.217.216-.173.434-.325.651-.499.26-.173.564-.304.825-.304.195 0 .325.087.52.173.195.087.847.39 1.152.52.305.13.478.217.564.39.087.173.087.348.087.564 0 .217 0 .391-.183.651z"/>
                    </svg>
                  </a>
                  
                  <a 
                    href="https://wa.me/380441234567"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-accent-orange transition-colors no-underline"
                    title="WhatsApp"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                    </svg>
                  </a>
                </div>
                
                {/* Mobile Contact */}
                <div className="space-y-2">
                  <a 
                    href="tel:+380441234567" 
                    className="flex items-center space-x-2 text-white hover:text-accent-orange transition-colors no-underline group"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span className="text-sm font-medium group-hover:text-accent-orange">+38 044 123 45 67</span>
                  </a>
                  
                  <a 
                    href="mailto:sales@euro-granite.com" 
                    className="flex items-center space-x-2 text-white hover:text-accent-orange transition-colors no-underline group"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 7.89a2 2 0 002.83 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span className="text-sm font-medium group-hover:text-accent-orange">sales@euro-granite.com</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
        
      </nav>
    </header>
  )
}

export default Header