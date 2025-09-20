import React from 'react'
import { Helmet } from 'react-helmet-async'
import useLanguageStore from '../../../stores/languageStore'

const OrganizationSchema = () => {
  const { currentLanguage } = useLanguageStore()

  const organizationData = {
    ua: {
      name: "EuroGranite",
      description: "Провідний постачальник високоякісного граніту з українських кар'єрів. Спеціалізуємося на гранітній бруківці, плитці та інших будівельних матеріалах з граніту.",
      addressLocality: "Житомир",
      addressRegion: "Житомирська область",
      addressCountry: "UA"
    },
    en: {
      name: "EuroGranite",
      description: "Leading supplier of high-quality granite from Ukrainian quarries. We specialize in granite pavers, tiles, and other granite building materials.",
      addressLocality: "Zhytomyr",
      addressRegion: "Zhytomyr Oblast",
      addressCountry: "UA"
    },
    de: {
      name: "EuroGranite",
      description: "Führender Anbieter von hochwertigem Granit aus ukrainischen Steinbrüchen. Wir spezialisieren uns auf Granitpflaster, Fliesen und andere Granit-Baumaterialien.",
      addressLocality: "Zhytomyr",
      addressRegion: "Oblast Zhytomyr",
      addressCountry: "UA"
    },
    pl: {
      name: "EuroGranite",
      description: "Wiodący dostawca wysokiej jakości granitu z ukraińskich kamieniołomów. Specjalizujemy się w kostce granitowej, płytkach i innych materiałach budowlanych z granitu.",
      addressLocality: "Żytomierz",
      addressRegion: "Obwód żytomierski",
      addressCountry: "UA"
    }
  }

  const currentData = organizationData[currentLanguage] || organizationData.en

  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": currentData.name,
    "description": currentData.description,
    "url": "https://gennadiy01.github.io/eurogranite-website/",
    "logo": "https://gennadiy01.github.io/eurogranite-website/logo192.png",
    "image": "https://gennadiy01.github.io/eurogranite-website/logo512.png",
    "foundingDate": "2020",
    "numberOfEmployees": "10-50",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": currentData.addressLocality,
      "addressRegion": currentData.addressRegion,
      "addressCountry": currentData.addressCountry
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+380733864041",
      "email": "sales@euro-granite.com",
      "contactType": "sales",
      "availableLanguage": ["uk", "en", "de", "pl"]
    },
    "sameAs": [
      "https://www.facebook.com/eurogranite",
      "https://www.linkedin.com/company/eurogranite"
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Granite Products",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Product",
            "name": "Granite Pavers",
            "category": "Building Materials"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Product",
            "name": "Granite Tiles",
            "category": "Building Materials"
          }
        }
      ]
    }
  }

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  )
}

export default OrganizationSchema