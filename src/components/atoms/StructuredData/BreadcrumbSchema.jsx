import React from 'react'
import { Helmet } from 'react-helmet-async'
import useLanguageStore from '../../../stores/languageStore'

const BreadcrumbSchema = ({ currentLanguage: propLanguage, pagePath }) => {
  const { currentLanguage } = useLanguageStore()

  // Use prop language or store language
  const currentLang = propLanguage || currentLanguage || 'en'
  const baseUrl = 'https://gennadiy01.github.io/eurogranite-website'

  // Parse current path from window.location or use prop
  const getCurrentPath = () => {
    if (pagePath) {
      return pagePath
    }
    if (typeof window !== 'undefined') {
      return window.location.pathname
    }
    return '/'
  }

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

  const labels = breadcrumbLabels[currentLang] || breadcrumbLabels.ua

  // Parse current path to build breadcrumbs
  const buildBreadcrumbs = () => {
    const path = getCurrentPath().replace('/eurogranite-website', '')
    const segments = path.split('/').filter(segment => segment !== '')

    const breadcrumbs = []

    // Always add home
    breadcrumbs.push({
      "@type": "ListItem",
      "position": 1,
      "name": labels.home,
      "item": `${baseUrl}/${currentLang}/`
    })

    // If we're not on home page, add current page
    if (segments.length > 1 || (segments.length === 1 && segments[0] !== currentLang)) {
      const currentPage = segments.length > 1 ? segments[1] : segments[0]
      if (labels[currentPage]) {
        breadcrumbs.push({
          "@type": "ListItem",
          "position": 2,
          "name": labels[currentPage],
          "item": `${baseUrl}/${currentLang}/${currentPage}/`
        })
      }
    }

    return breadcrumbs
  }

  const breadcrumbList = buildBreadcrumbs()

  // Only render if we have more than just home
  if (breadcrumbList.length <= 1) {
    return null
  }

  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbList
  }

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  )
}

export default BreadcrumbSchema