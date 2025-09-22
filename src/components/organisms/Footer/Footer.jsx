import React from 'react'
import useLanguageStore from '../../../stores/languageStore'

const Footer = () => {
  const { currentLanguage } = useLanguageStore()

  const footerContent = {
    en: {
      company: 'Eurogranite',
      description: 'Premium granite products for European markets. Guaranteed quality manufacturing with environmental responsibility.',
      quickLinks: 'Quick Links',
      contact: 'Contact Information',
      address: 'Ukraine, 10001, Zhytomyr, Maidan Zgody, build. 6, office 7',
      phone: '+380733864041',
      email: 'info@euro-granite.com',
      copyright: '2025 Eurogranite. All rights reserved.',
      links: [
        { name: 'Home', href: '/' },
        { name: 'Products', href: '/products' },
        { name: 'About', href: '/about' },
        { name: 'Contact', href: '/contact' }
      ]
    },
    ua: {
      company: 'Єврограніт',
      description: 'Преміальні гранітні вироби для Європейських ринків. Гарантована якість виробництва з екологічною відповідальністю.',
      quickLinks: 'Швидкі посилання',
      contact: 'Контактна інформація',
      address: 'Україна, 10001, Житомир, Майдан Згоди, буд. 6, офіс 7',
      phone: '+380733864041',
      email: 'info@euro-granite.com',
      copyright: '2025 Єврограніт. Всі права захищені.',
      links: [
        { name: 'Головна', href: '/' },
        { name: 'Продукція', href: '/products' },
        { name: 'Про нас', href: '/about' },
        { name: 'Контакти', href: '/contact' }
      ]
    },
    de: {
      company: 'Eurogranite',
      description: 'Premium Granitprodukte für europäische Märkte. Garantierte Qualität der Fertigung mit Umweltverantwortung.',
      quickLinks: 'Schnelle Links',
      contact: 'Kontaktinformationen',
      address: 'Ukraine, 10001, Zhytomyr, Maidan Zgody, Geb. 6, Büro 7',
      phone: '+380733864041',
      email: 'info@euro-granite.com',
      copyright: '2025 Eurogranite. Alle Rechte vorbehalten.',
      links: [
        { name: 'Startseite', href: '/' },
        { name: 'Produkte', href: '/products' },
        { name: 'Über uns', href: '/about' },
        { name: 'Kontakt', href: '/contact' }
      ]
    },
    pl: {
      company: 'Eurogranite',
      description: 'Produkty granitowe premium dla rynków europejskich. Gwarantowana jakość produkcji z odpowiedzialnością środowiskową.',
      quickLinks: 'Szybkie linki',
      contact: 'Informacje kontaktowe',
      address: 'Ukraina, 10001, Żytomierz, Plac Zgody, bud. 6, biuro 7',
      phone: '+380733864041',
      email: 'info@euro-granite.com',
      copyright: '2025 Eurogranite. Wszelkie prawa zastrzeżone.',
      links: [
        { name: 'Strona główna', href: '/' },
        { name: 'Produkty', href: '/products' },
        { name: 'O nas', href: '/about' },
        { name: 'Kontakt', href: '/contact' }
      ]
    }
  }

  const content = footerContent[currentLanguage] || footerContent.en


  return (
    <footer className="footer-section">
      <div className="footer-container">
        <div className="footer-grid">
          
          {/* Company Info */}
          <div className="footer-column">
            <a href="/" className="footer-title logo-text">
              EuroGranite
            </a>
            <p className="footer-description">
              {content.description}
            </p>
            
            {/* Social Links */}
            <div className="footer-social">
              <a 
                href="viber://chat?number=+380503864041"
                className="footer-social-link" 
                aria-label="Viber"
                title="Viber"
              >
                <svg className="footer-social-icon" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M11.398.002c-6.559 0-11.88 5.32-11.88 11.88 0 2.089.545 4.049 1.497 5.751l-1.497 5.751 5.751-1.497c1.702.952 3.662 1.497 5.751 1.497 6.559 0 11.88-5.32 11.88-11.88-.001-6.559-5.321-11.879-11.88-11.879zm5.58 16.87c-.434.617-1.026 1.094-1.722 1.325-.319.106-.735.191-1.233.191-.357 0-.79-.043-1.317-.172-1.524-.373-3.375-1.348-5.261-3.235-1.887-1.887-2.862-3.738-3.235-5.261-.129-.527-.172-.96-.172-1.317 0-.498.085-.914.191-1.233.231-.696.708-1.288 1.325-1.722.26-.183.434-.183.651-.183.216 0 .391 0 .564.086.173.086.26.259.39.564.13.305.434.956.52 1.152.086.195.173.326.173.52 0 .26-.13.564-.304.825-.173.26-.325.434-.499.651-.173.216-.347.434-.217.825.129.39.564 1.194 1.325 1.955.761.761 1.564 1.195 1.955 1.325.39.13.608-.044.825-.217.216-.173.434-.325.651-.499.26-.173.564-.304.825-.304.195 0 .325.087.52.173.195.087.847.39 1.152.52.305.13.478.217.564.39.087.173.087.348.087.564 0 .217 0 .391-.183.651z"/>
                </svg>
              </a>
              
              <a 
                href="https://wa.me/380503864041"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-link" 
                aria-label="WhatsApp"
                title="WhatsApp"
              >
                <svg className="footer-social-icon" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
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
                  <a
                    href={link.href}
                    className="footer-link"
                  >
                    {link.name}
                  </a>
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
              <div className="footer-contact-item group" style={{alignItems: 'flex-start'}}>
                <svg className="footer-contact-icon group-hover:text-accent-orange transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{marginTop: '2px'}}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
                <span className="group-hover:text-accent-orange transition-colors">{content.address}</span>
              </div>
              <a href={`tel:${content.phone}`} className="footer-contact-item group footer-contact-link">
                <svg className="footer-contact-icon group-hover:text-accent-orange transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                </svg>
                <span className="group-hover:text-accent-orange transition-colors">
                  {content.phone}
                </span>
              </a>
              <a href={`mailto:${content.email}`} className="footer-contact-item group footer-contact-link">
                <svg className="footer-contact-icon group-hover:text-accent-orange transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
                <span className="group-hover:text-accent-orange transition-colors">
                  {content.email}
                </span>
              </a>
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