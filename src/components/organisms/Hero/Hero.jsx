import React from 'react'
import Button from '../../atoms/Button/Button'
import useLanguageStore from '../../../stores/languageStore'

const Hero = () => {
  const { currentLanguage } = useLanguageStore()
  
  // Temporary text data (will be moved to i18n in Phase 2)
  const heroContent = {
    en: {
      title: 'Premium Granite Products',
      subtitle: 'for European Markets',
      description: 'Leading manufacturer of high-quality granite products with over 15 years of experience serving European customers. ISO certified quality and environmental responsibility.',
      ctaPrimary: 'View Catalog',
      ctaSecondary: 'Get Quote',
      stats: [
        { number: '15+', label: 'Years Experience' },
        { number: '500+', label: 'Projects' },
        { number: '25', label: 'EU Countries' }
      ]
    },
    ua: {
      title: 'Преміальні гранітні вироби',
      subtitle: 'для Європейських ринків',
      description: 'Провідний виробник високоякісної гранітної продукції з 15-річним досвідом обслуговування європейських клієнтів. ISO сертифікована якість та екологічна відповідальність.',
      ctaPrimary: 'Переглянути каталог',
      ctaSecondary: 'Отримати пропозицію',
      stats: [
        { number: '15+', label: 'Років досвіду' },
        { number: '500+', label: 'Проектів' },
        { number: '25', label: 'Країн ЄС' }
      ]
    },
    de: {
      title: 'Premium Granitprodukte',
      subtitle: 'für Europäische Märkte',
      description: 'Führender Hersteller hochwertiger Granitprodukte mit über 15 Jahren Erfahrung im Service für europäische Kunden. ISO-zertifizierte Qualität und Umweltverantwortung.',
      ctaPrimary: 'Katalog ansehen',
      ctaSecondary: 'Angebot erhalten',
      stats: [
        { number: '15+', label: 'Jahre Erfahrung' },
        { number: '500+', label: 'Projekte' },
        { number: '25', label: 'EU-Länder' }
      ]
    },
    pl: {
      title: 'Produkty Granitowe Premium',
      subtitle: 'dla Rynków Europejskich',
      description: 'Wiodący producent wysokiej jakości produktów granitowych z ponad 15-letnim doświadczeniem w obsłudze klientów europejskich. Jakość certyfikowana ISO i odpowiedzialność środowiskowa.',
      ctaPrimary: 'Zobacz Katalog',
      ctaSecondary: 'Otrzymaj Ofertę',
      stats: [
        { number: '15+', label: 'Lat Doświadczenia' },
        { number: '500+', label: 'Projektów' },
        { number: '25', label: 'Krajów UE' }
      ]
    }
  }
  
  const content = heroContent[currentLanguage] || heroContent.en
  
  const handleCatalogClick = () => {
    // Navigate to products section
    const element = document.getElementById('products')
    element?.scrollIntoView({ behavior: 'smooth' })
  }
  
  const handleQuoteClick = () => {
    // Navigate to contact section  
    const element = document.getElementById('contact')
    element?.scrollIntoView({ behavior: 'smooth' })
  }
  
  return (
    <section className="hero-section">
      <div className="hero-container">
        <div className="hero-grid">
          
          {/* Left side - Content */}
          <div className="hero-content">
            <h1 className="hero-title">
              <span className="hero-title-main">{content.title}</span>
              <span className="hero-title-accent">{content.subtitle}</span>
            </h1>
            
            <p className="hero-description">
              {content.description}
            </p>
            
            {/* CTA Buttons */}
            <div className="hero-buttons">
              <Button 
                variant="primary"
                size="large"
                onClick={handleCatalogClick}
              >
                {content.ctaPrimary}
              </Button>
              <Button 
                variant="outline"
                size="large"
                onClick={handleQuoteClick}
                className="hero-button-outline"
              >
                {content.ctaSecondary}
              </Button>
            </div>
            
            {/* Stats */}
            <div className="hero-stats">
              {content.stats.map((stat, index) => (
                <div key={index} className="hero-stat-item">
                  <div className="hero-stat-number">
                    {stat.number}
                  </div>
                  <div className="hero-stat-label">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Right side - Image placeholder */}
          <div className="hero-image">
            <div className="hero-image-placeholder">
              {/* Placeholder for granite/factory image */}
              <div className="hero-image-content">
                <svg className="hero-image-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="hero-image-text">Production Facility</p>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="hero-decoration hero-decoration-1"></div>
            <div className="hero-decoration hero-decoration-2"></div>
          </div>
          
        </div>
      </div>
    </section>
  )
}

export default Hero