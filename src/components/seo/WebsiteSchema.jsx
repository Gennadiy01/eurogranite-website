import React from 'react'

const WebsiteSchema = () => {

  // Website Schema with Search Action
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://gennadiy01.github.io/#website",
    "name": "EuroGranite",
    "alternateName": "EuroGranite Ukraine",
    "description": "Premium granite products from Ukraine for European markets. High-quality granite pavers, slabs, and custom processing services.",
    "url": "https://gennadiy01.github.io/",
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
      "@id": "https://gennadiy01.github.io/#organization"
    },
    "copyrightHolder": {
      "@type": "Organization",
      "@id": "https://gennadiy01.github.io/#organization"
    },
    "copyrightYear": 2025,
    "potentialAction": [
      {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": "https://gennadiy01.github.io/products?search={search_term_string}"
        },
        "query-input": "required name=search_term_string"
      }
    ],
    "mainEntity": {
      "@type": "Organization",
      "@id": "https://gennadiy01.github.io/#organization"
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