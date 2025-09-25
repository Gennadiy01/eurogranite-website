import React from 'react'
import { Link } from 'react-router-dom'
import { createLocalizedPath } from '../../../utils/urlUtils'
import './static-breadcrumb.css'

const StaticBreadcrumb = ({
  currentPage,
  currentLanguage,
  parentPages = []
}) => {
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

  // Use passed language or fallback to 'en'
  const language = currentLanguage || 'en'
  const labels = breadcrumbLabels[language] || breadcrumbLabels.en

  // Build breadcrumb data statically
  const buildStaticBreadcrumbs = () => {
    const breadcrumbs = []

    // Always add home as first item
    breadcrumbs.push({
      label: labels.home,
      path: createLocalizedPath('/', language),
      isActive: false
    })

    // Add parent pages if provided
    parentPages.forEach(parent => {
      breadcrumbs.push({
        label: labels[parent.page] || parent.label,
        path: createLocalizedPath(`/${parent.page}`, language),
        isActive: false
      })
    })

    // Add current page if not home
    if (currentPage && currentPage !== 'home') {
      breadcrumbs.push({
        label: labels[currentPage] || currentPage,
        path: createLocalizedPath(`/${currentPage}`, language),
        isActive: true
      })
    }

    return breadcrumbs
  }

  const breadcrumbData = buildStaticBreadcrumbs()

  // Don't render if only home page
  if (breadcrumbData.length <= 1) {
    return null
  }

  return (
    <nav className="static-breadcrumb" aria-label="Breadcrumb">
      <ol className="static-breadcrumb__list">
        {breadcrumbData.map((item, index) => (
          <li key={index} className="static-breadcrumb__item">
            {item.isActive ? (
              <span className="static-breadcrumb__current" aria-current="page">
                {item.label}
              </span>
            ) : (
              <Link
                to={item.path}
                className="static-breadcrumb__link"
              >
                {item.label}
              </Link>
            )}
            {index < breadcrumbData.length - 1 && (
              <svg
                className="static-breadcrumb__separator"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 3L11 8L6 13"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}

StaticBreadcrumb.displayName = 'StaticBreadcrumb'

export default StaticBreadcrumb