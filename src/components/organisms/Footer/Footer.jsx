import React from 'react'
import useLanguageStore from '../../../stores/languageStore'

const Footer = () => {
  const { currentLanguage } = useLanguageStore()

  const footerContent = {
    en: {
      company: 'Eurogranite',
      description: 'Premium granite products for European markets. Quality certified manufacturing with environmental responsibility.',
      quickLinks: 'Quick Links',
      contact: 'Contact Information',
      address: 'Ukraine, Kyiv',
      phone: '+38 044 123 45 67',
      email: 'info@eurogranite.com',
      copyright: '2025 Eurogranite. All rights reserved.',
      links: [
        { name: 'Home', href: '#home' },
        { name: 'Products', href: '#products' },
        { name: 'About', href: '#about' },
        { name: 'Gallery', href: '#gallery' },
        { name: 'Contact', href: '#contact' }
      ]
    },
    ua: {
      company: 'Єврограніт',
      description: 'Преміальні гранітні вироби для Європейських ринків. Сертифікована якість виробництва з екологічною відповідальністю.',
      quickLinks: 'Швидкі посилання',
      contact: 'Контактна інформація',
      address: 'Україна, Київ',
      phone: '+38 044 123 45 67',
      email: 'info@eurogranite.com',
      copyright: '2025 Єврограніт. Всі права захищені.',
      links: [
        { name: 'Головна', href: '#home' },
        { name: 'Продукція', href: '#products' },
        { name: 'Про нас', href: '#about' },
        { name: 'Галерея', href: '#gallery' },
        { name: 'Контакти', href: '#contact' }
      ]
    },
    de: {
      company: 'Eurogranite',
      description: 'Premium Granitprodukte für europäische Märkte. Qualitätszertifizierte Fertigung mit Umweltverantwortung.',
      quickLinks: 'Schnelle Links',
      contact: 'Kontaktinformationen',
      address: 'Ukraine, Kiew',
      phone: '+38 044 123 45 67',
      email: 'info@eurogranite.com',
      copyright: '2025 Eurogranite. Alle Rechte vorbehalten.',
      links: [
        { name: 'Startseite', href: '#home' },
        { name: 'Produkte', href: '#products' },
        { name: 'Über uns', href: '#about' },
        { name: 'Galerie', href: '#gallery' },
        { name: 'Kontakt', href: '#contact' }
      ]
    },
    pl: {
      company: 'Eurogranite',
      description: 'Produkty granitowe premium dla rynków europejskich. Certyfikowana jakość produkcji z odpowiedzialności środowiskowej.',
      quickLinks: 'Szybkie linki',
      contact: 'Informacje kontaktowe',
      address: 'Ukraina, Kijów',
      phone: '+38 044 123 45 67',
      email: 'info@eurogranite.com',
      copyright: '2025 Eurogranite. Wszelkie prawa zastrzeżone.',
      links: [
        { name: 'Strona główna', href: '#home' },
        { name: 'Produkty', href: '#products' },
        { name: 'O nas', href: '#about' },
        { name: 'Galeria', href: '#gallery' },
        { name: 'Kontakt', href: '#contact' }
      ]
    }
  }

  const content = footerContent[currentLanguage] || footerContent.en

  const handleNavClick = (href) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <footer className="footer-section">
      <div className="footer-container">
        <div className="footer-grid">
          
          {/* Company Info */}
          <div className="footer-column">
            <h3 className="footer-title">
              {content.company}
            </h3>
            <p className="footer-description">
              {content.description}
            </p>
            
            {/* Social Links placeholder */}
            <div className="footer-social">
              <a href="#" className="footer-social-link">
                <svg className="footer-social-icon" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </a>
              <a href="#" className="footer-social-link">
                <svg className="footer-social-icon" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-column">
            <h4 className="footer-subtitle">
              {content.quickLinks}
            </h4>
            <ul className="footer-links">
              {content.links.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => handleNavClick(link.href)}
                    className="footer-link"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div className="footer-column">
            <h4 className="footer-subtitle">
              {content.contact}
            </h4>
            <div className="footer-contacts">
              <div className="footer-contact-item">
                <svg className="footer-contact-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
                <span>{content.address}</span>
              </div>
              <div className="footer-contact-item">
                <svg className="footer-contact-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                </svg>
                <a href={`tel:${content.phone}`} className="footer-contact-link">
                  {content.phone}
                </a>
              </div>
              <div className="footer-contact-item">
                <svg className="footer-contact-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
                <a href={`mailto:${content.email}`} className="footer-contact-link">
                  {content.email}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <p className="footer-copyright">
            {content.copyright}
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer