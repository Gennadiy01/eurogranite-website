import React from 'react'
import { BASE_URL } from '../../config/siteConfig'

const WebsiteSchema = () => {

  // Website Schema with Search Action
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${BASE_URL}/#website`,
    "name": "EuroGranite",
    "alternateName": "EuroGranite Ukraine",
    "description": "Premium granite products from Ukraine for European markets. High-quality granite pavers, slabs, and custom processing services.",
    "url": `${BASE_URL}/`,
    "inLanguage": [
      {
        "@type": "Language",
        "name": "English",
        "alternateName": "en"
      },
      {
        "@type": "Language",
        "name": "Ukrainian",
        "alternateName": "uk"
      },
      {
        "@type": "Language",
        "name": "German",
        "alternateName": "de"
      },
      {
        "@type": "Language",
        "name": "Polish",
        "alternateName": "pl"
      }
    ],
    "publisher": {
      "@type": "Organization",
      "@id": `${BASE_URL}/#organization`
    },
    "copyrightHolder": {
      "@type": "Organization",
      "@id": `${BASE_URL}/#organization`
    },
    "copyrightYear": 2025,
    "potentialAction": [
      {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": `${BASE_URL}/products?search={search_term_string}`
        },
        "query-input": "required name=search_term_string"
      }
    ],
    "mainEntity": {
      "@type": "Organization",
      "@id": `${BASE_URL}/#organization`
    }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(websiteSchema, null, 2)
      }}
    />
  )
}

export default WebsiteSchema