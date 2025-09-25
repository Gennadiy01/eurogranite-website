import React from 'react'
import './minimal-internal-links.css'

const MinimalInternalLinks = ({ currentLanguage = 'en' }) => {
  const content = {
    en: { title: 'Learn More', links: ['Products', 'About', 'Gallery', 'Contact'] },
    ua: { title: 'Дізнайтеся більше', links: ['Продукція', 'Про нас', 'Галерея', 'Контакти'] },
    de: { title: 'Mehr erfahren', links: ['Produkte', 'Über uns', 'Galerie', 'Kontakt'] },
    pl: { title: 'Dowiedz się więcej', links: ['Produkty', 'O nas', 'Galeria', 'Kontakt'] }
  }

  const lang = content[currentLanguage] || content.en

  return (
    <section className="minimal-internal-links-section">
      <div className="container">
        <h2 className="minimal-internal-links-title">{lang.title}</h2>
        <div className="minimal-internal-links-grid">
          {lang.links.map((link, index) => (
            <div key={index} className="minimal-internal-link-card">
              {link}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default MinimalInternalLinks