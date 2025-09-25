import React from 'react'
import './minimal-internal-links.css'

const MinimalInternalLinks = ({ currentLanguage = 'en' }) => {
  // Detect if we're in development or production
  const isDev = process.env.NODE_ENV === 'development'
  const baseUrl = isDev ? '' : '/eurogranite-website'

  const content = {
    en: {
      title: 'Learn More',
      links: [
        { text: 'Products', url: `${baseUrl}/en/products`, icon: 'products' },
        { text: 'About', url: `${baseUrl}/en/about`, icon: 'about' },
        { text: 'Gallery', url: `${baseUrl}/en/gallery`, icon: 'gallery' },
        { text: 'Contact', url: `${baseUrl}/en/contact`, icon: 'contact' }
      ]
    },
    ua: {
      title: 'Дізнайтеся більше',
      links: [
        { text: 'Продукція', url: `${baseUrl}/ua/products`, icon: 'products' },
        { text: 'Про нас', url: `${baseUrl}/ua/about`, icon: 'about' },
        { text: 'Галерея', url: `${baseUrl}/ua/gallery`, icon: 'gallery' },
        { text: 'Контакти', url: `${baseUrl}/ua/contact`, icon: 'contact' }
      ]
    },
    de: {
      title: 'Mehr erfahren',
      links: [
        { text: 'Produkte', url: `${baseUrl}/de/products`, icon: 'products' },
        { text: 'Über uns', url: `${baseUrl}/de/about`, icon: 'about' },
        { text: 'Galerie', url: `${baseUrl}/de/gallery`, icon: 'gallery' },
        { text: 'Kontakt', url: `${baseUrl}/de/contact`, icon: 'contact' }
      ]
    },
    pl: {
      title: 'Dowiedz się więcej',
      links: [
        { text: 'Produkty', url: `${baseUrl}/pl/products`, icon: 'products' },
        { text: 'O nas', url: `${baseUrl}/pl/about`, icon: 'about' },
        { text: 'Galeria', url: `${baseUrl}/pl/gallery`, icon: 'gallery' },
        { text: 'Kontakt', url: `${baseUrl}/pl/contact`, icon: 'contact' }
      ]
    }
  }

  // Render appropriate SVG icon based on type
  const renderIcon = (iconType) => {
    switch (iconType) {
      case 'products':
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="2" y="4" width="8" height="4" rx="0.5" stroke="currentColor" strokeWidth="1.5" fill="none"/>
            <rect x="12" y="4" width="6" height="4" rx="0.5" stroke="currentColor" strokeWidth="1.5" fill="none"/>
            <rect x="20" y="4" width="2" height="4" rx="0.5" stroke="currentColor" strokeWidth="1.5" fill="none"/>
            <rect x="2" y="10" width="6" height="4" rx="0.5" stroke="currentColor" strokeWidth="1.5" fill="none"/>
            <rect x="10" y="10" width="8" height="4" rx="0.5" stroke="currentColor" strokeWidth="1.5" fill="none"/>
            <rect x="20" y="10" width="2" height="4" rx="0.5" stroke="currentColor" strokeWidth="1.5" fill="none"/>
            <rect x="2" y="16" width="8" height="4" rx="0.5" stroke="currentColor" strokeWidth="1.5" fill="none"/>
            <rect x="12" y="16" width="6" height="4" rx="0.5" stroke="currentColor" strokeWidth="1.5" fill="none"/>
            <rect x="20" y="16" width="2" height="4" rx="0.5" stroke="currentColor" strokeWidth="1.5" fill="none"/>
          </svg>
        )
      case 'about':
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 21H21V3H3V21ZM5 5H19V19H5V5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M9 9H15M9 13H15M9 17H13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )
      case 'gallery':
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" stroke="currentColor" strokeWidth="2"/>
            <circle cx="8.5" cy="8.5" r="1.5" stroke="currentColor" strokeWidth="2"/>
            <polyline points="21,15 16,10 5,21" stroke="currentColor" strokeWidth="2"/>
          </svg>
        )
      case 'contact':
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22 16.92V19C22 20.11 21.11 21 20 21C10.61 21 3 13.39 3 4C3 2.89 3.89 2 5 2H7.08C7.6 2 8.04 2.37 8.13 2.88L8.87 7.58C8.95 8.06 8.75 8.54 8.34 8.84L6.12 10.38C7.42 13.06 10.94 16.58 13.62 17.88L15.16 15.66C15.46 15.25 15.94 15.05 16.42 15.13L21.12 15.87C21.63 15.96 22 16.4 22 16.92Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )
      default:
        return null
    }
  }

  const lang = content[currentLanguage] || content.en

  return (
    <section className="minimal-internal-links-section">
      <div className="container">
        <h2 className="minimal-internal-links-title">{lang.title}</h2>
        <div className="minimal-internal-links-grid">
          {lang.links.map((link, index) => (
            <a
              key={index}
              href={link.url}
              className="minimal-internal-link-card minimal-internal-link-anchor"
            >
              <div className="minimal-internal-link-icon">
                {renderIcon(link.icon)}
              </div>
              <span className="minimal-internal-link-text">{link.text}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

export default MinimalInternalLinks