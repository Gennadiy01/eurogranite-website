import React, { useState } from 'react'
import Button from '../../atoms/Button/Button'
import AnimatedCounter from '../../atoms/AnimatedCounter/AnimatedCounter'
import OptimizedImage from '../../atoms/OptimizedImage/OptimizedImage'
import useLanguageStore from '../../../stores/languageStore'

const Hero = () => {
  const { currentLanguage } = useLanguageStore()
  const [completedCounters, setCompletedCounters] = useState(0)
  
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
      subtitle: 'для ринків Європи',
      description: 'Провідний виробник високоякісного граніту з 15-річним досвідом. ISO сертифікована якість та екологічна відповідальність.',
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
      title: 'Premium Granit',
      subtitle: 'dla Europy',
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
  
  const handleCounterComplete = () => {
    setCompletedCounters(prev => prev + 1)
  }
  
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
            <section className="hero-stats" aria-label="Company achievements and statistics">
              {content.stats.map((stat, index) => {
                // Determine animation parameters based on the number
                const isLargeNumber = stat.number.includes('500')
                const step = isLargeNumber ? 10 : 1 // Count by tens for 500+
                const delay = index === 0 ? 0 : index === 1 ? 800 : 1200 // First: 0ms, Second: 800ms, Third: 1200ms
                const duration = isLargeNumber ? 1500 : 1000 // Longer duration for larger numbers
                
                return (
                  <div key={index} className="hero-stat-item" role="group" aria-labelledby={`stat-${index}`}>
                    <div id={`stat-${index}`}>
                      <AnimatedCounter 
                        targetNumber={stat.number}
                        duration={duration}
                        delay={delay}
                        step={step}
                        suffix={stat.number.includes('+') ? '+' : ''}
                        onComplete={handleCounterComplete}
                      />
                    </div>
                    <div className="hero-stat-label" aria-describedby={`stat-${index}`}>
                      {stat.label}
                    </div>
                  </div>
                )
              })}
            </section>
          </div>
          
          {/* Right side - Optimized Image */}
          <div className="hero-image">
            <OptimizedImage
              src="/images/hero/production-facility.jpg"
              alt="Modern granite production facility with advanced equipment and skilled workers"
              className="hero-main-image"
              responsive={true}
              lazy={true}
            />
            
            {/* Decorative elements */}
            <div className="hero-decoration hero-decoration-1" role="presentation" aria-hidden="true"></div>
            <div className="hero-decoration hero-decoration-2" role="presentation" aria-hidden="true"></div>
          </div>
          
        </div>
      </div>
    </section>
  )
}

export default Hero