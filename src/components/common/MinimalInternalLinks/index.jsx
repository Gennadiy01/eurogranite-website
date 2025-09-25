import React from 'react'

const MinimalInternalLinks = ({ currentLanguage = 'en' }) => {
  const content = {
    en: { title: 'Learn More', links: ['Products', 'About', 'Gallery', 'Contact'] },
    ua: { title: 'Дізнайтеся більше', links: ['Продукція', 'Про нас', 'Галерея', 'Контакти'] },
    de: { title: 'Mehr erfahren', links: ['Produkte', 'Über uns', 'Galerie', 'Kontakt'] },
    pl: { title: 'Dowiedz się więcej', links: ['Produkty', 'O nas', 'Galeria', 'Kontakt'] }
  }

  const lang = content[currentLanguage] || content.en

  return (
    <section style={{ padding: '2rem 0', textAlign: 'center' }}>
      <h2>{lang.title}</h2>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
        {lang.links.map((link, index) => (
          <div key={index} style={{
            padding: '1rem',
            border: '1px solid #ccc',
            borderRadius: '8px',
            background: '#f9f9f9'
          }}>
            {link}
          </div>
        ))}
      </div>
    </section>
  )
}

export default MinimalInternalLinks