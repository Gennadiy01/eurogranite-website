import React from 'react'
import './minimal-internal-links.css'

const MinimalInternalLinks = ({ currentLanguage = 'en' }) => {
  const content = {
    en: {
      title: 'Learn More',
      links: [
        { text: 'Products', url: '/eurogranite-website/en/products' },
        { text: 'About', url: '/eurogranite-website/en/about' },
        { text: 'Gallery', url: '/eurogranite-website/en/gallery' },
        { text: 'Contact', url: '/eurogranite-website/en/contact' }
      ]
    },
    ua: {
      title: 'Дізнайтеся більше',
      links: [
        { text: 'Продукція', url: '/eurogranite-website/ua/products' },
        { text: 'Про нас', url: '/eurogranite-website/ua/about' },
        { text: 'Галерея', url: '/eurogranite-website/ua/gallery' },
        { text: 'Контакти', url: '/eurogranite-website/ua/contact' }
      ]
    },
    de: {
      title: 'Mehr erfahren',
      links: [
        { text: 'Produkte', url: '/eurogranite-website/de/products' },
        { text: 'Über uns', url: '/eurogranite-website/de/about' },
        { text: 'Galerie', url: '/eurogranite-website/de/gallery' },
        { text: 'Kontakt', url: '/eurogranite-website/de/contact' }
      ]
    },
    pl: {
      title: 'Dowiedz się więcej',
      links: [
        { text: 'Produkty', url: '/eurogranite-website/pl/products' },
        { text: 'O nas', url: '/eurogranite-website/pl/about' },
        { text: 'Galeria', url: '/eurogranite-website/pl/gallery' },
        { text: 'Kontakt', url: '/eurogranite-website/pl/contact' }
      ]
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
              {link.text}
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

export default MinimalInternalLinks