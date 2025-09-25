import React from 'react'
import { Link } from 'react-router-dom'
import useLanguageStore from '../../../stores/languageStore'
import { createLocalizedPath } from '../../../utils/urlUtils'
import './breadcrumb.css'

const Breadcrumb = ({ currentPage }) => {
  const { currentLanguage } = useLanguageStore()

  // Breadcrumb translations
  const breadcrumbLabels = {
    ua: {
      home: 'Головна',
      products: 'Продукція',
      about: 'Про нас',
      contact: 'Контакти',
      gallery: 'Галерея',
      articles: 'Статті'
    },
    en: {
      home: 'Home',
      products: 'Products',
      about: 'About Us',
      contact: 'Contact',
      gallery: 'Gallery',
      articles: 'Articles'
    },
    de: {
      home: 'Startseite',
      products: 'Produkte',
      about: 'Über uns',
      contact: 'Kontakt',
      gallery: 'Galerie',
      articles: 'Artikel'
    },
    pl: {
      home: 'Główna',
      products: 'Produkty',
      about: 'O nas',
      contact: 'Kontakt',
      gallery: 'Galeria',
      articles: 'Artykuły'
    }
  }

  const labels = breadcrumbLabels[currentLanguage] || breadcrumbLabels.ua

  // Don't show breadcrumb on home page
  if (!currentPage || currentPage === 'home') {
    return null
  }

  return (
    <nav className="breadcrumb-nav" aria-label="Breadcrumb">
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <Link
            to={createLocalizedPath('/', currentLanguage)}
            className="breadcrumb-link"
          >
            {labels.home}
          </Link>
        </li>
        <li className="breadcrumb-separator" aria-hidden="true">
          <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 1L5 5L1 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </li>
        <li className="breadcrumb-item breadcrumb-current" aria-current="page">
          <span className="breadcrumb-text">
            {labels[currentPage]}
          </span>
        </li>
      </ol>
    </nav>
  )
}

export default Breadcrumb