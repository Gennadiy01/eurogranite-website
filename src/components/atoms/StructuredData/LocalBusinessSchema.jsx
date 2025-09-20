import React from 'react'
import { Helmet } from 'react-helmet-async'
import useLanguageStore from '../../../stores/languageStore'

const LocalBusinessSchema = () => {
  const { currentLanguage } = useLanguageStore()

  const businessData = {
    ua: {
      name: "EuroGranite",
      description: "Місцевий постачальник граніту та будівельних матеріалів у Житомирі. Спеціалізуємося на гранітній бруківці, плитці та послугах мощення.",
      addressLocality: "Житомир",
      addressRegion: "Житомирська область",
      businessType: "Постачальник будівельних матеріалів",
      serviceArea: "Житомирська область, Київська область"
    },
    en: {
      name: "EuroGranite",
      description: "Local granite and building materials supplier in Zhytomyr. We specialize in granite pavers, tiles and paving services.",
      addressLocality: "Zhytomyr",
      addressRegion: "Zhytomyr Oblast",
      businessType: "Building Materials Supplier",
      serviceArea: "Zhytomyr Oblast, Kyiv Oblast"
    },
    de: {
      name: "EuroGranite",
      description: "Lokaler Granit- und Baumaterialienlieferant in Zhytomyr. Wir spezialisieren uns auf Granitpflaster, Fliesen und Pflasterdienstleistungen.",
      addressLocality: "Zhytomyr",
      addressRegion: "Oblast Zhytomyr",
      businessType: "Baumaterialienlieferant",
      serviceArea: "Oblast Zhytomyr, Oblast Kiew"
    },
    pl: {
      name: "EuroGranite",
      description: "Lokalny dostawca granitu i materiałów budowlanych w Żytomierzu. Specjalizujemy się w kostce granitowej, płytkach i usługach brukowania.",
      addressLocality: "Żytomierz",
      addressRegion: "Obwód żytomierski",
      businessType: "Dostawca materiałów budowlanych",
      serviceArea: "Obwód żytomierski, Obwód kijowski"
    }
  }

  const currentData = businessData[currentLanguage] || businessData.en

  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://gennadiy01.github.io/eurogranite-website/#organization",
    "name": currentData.name,
    "description": currentData.description,
    "image": "https://gennadiy01.github.io/eurogranite-website/logo512.png",
    "url": "https://gennadiy01.github.io/eurogranite-website/",
    "telephone": "+380733864041",
    "email": "sales@euro-granite.com",
    "priceRange": "€€",
    "currenciesAccepted": "EUR, USD, UAH",
    "paymentAccepted": "Cash, Credit Card, Bank Transfer",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": currentData.addressLocality,
      "addressRegion": currentData.addressRegion,
      "addressCountry": "UA"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "50.2547",
      "longitude": "28.6587"
    },
    "areaServed": {
      "@type": "Place",
      "name": currentData.serviceArea
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday"
        ],
        "opens": "08:00",
        "closes": "18:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Saturday",
        "opens": "09:00",
        "closes": "15:00"
      }
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Granite Products & Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Granite Paving Services",
            "description": "Professional granite paving and installation services"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Product",
            "name": "Granite Pavers",
            "description": "High-quality granite pavers in various sizes"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Product",
            "name": "Granite Tiles",
            "description": "Polished and natural granite tiles"
          }
        }
      ]
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+380733864041",
      "email": "sales@euro-granite.com",
      "contactType": "sales",
      "availableLanguage": ["uk", "en", "de", "pl"],
      "hoursAvailable": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday"
        ],
        "opens": "08:00",
        "closes": "18:00"
      }
    },
    "sameAs": [
      "https://www.facebook.com/eurogranite",
      "https://www.linkedin.com/company/eurogranite"
    ]
  }

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  )
}

export default LocalBusinessSchema