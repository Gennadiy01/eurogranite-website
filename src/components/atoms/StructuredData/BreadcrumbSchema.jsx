import React from 'react'
import { Helmet } from 'react-helmet-async'
import { useParams, useLocation } from 'react-router-dom'
import useLanguageStore from '../../../stores/languageStore'

const BreadcrumbSchema = () => {
  const { lang } = useParams()
  const location = useLocation()
  const { currentLanguage } = useLanguageStore()

  const currentLang = lang || currentLanguage || 'ua'
  const baseUrl = 'https://gennadiy01.github.io/eurogranite-website'

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
    const path = location.pathname.replace('/eurogranite-website', '')
    const segments = path.split('/').filter(segment => segment !== '')

    const breadcrumbs = []

    // Always add home
    breadcrumbs.push({
      "@type": "ListItem",
      "position": 1,
      "name": labels.home,
      "item": `${baseUrl}/${currentLang}`
    })

    // If we're not on home page, add current page
    if (segments.length > 1) {
      const currentPage = segments[1]
      if (labels[currentPage]) {
        breadcrumbs.push({
          "@type": "ListItem",
          "position": 2,
          "name": labels[currentPage],
          "item": `${baseUrl}/${currentLang}/${currentPage}`
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