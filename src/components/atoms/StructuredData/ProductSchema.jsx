import React from 'react'
import { Helmet } from 'react-helmet-async'
import { BASE_URL } from '../../../config/siteConfig'

const ProductSchema = ({ productType = 'general', currentLanguage, pagePath }) => {
  // Use passed prop or fallback to 'en'
  const language = currentLanguage || 'en'

  const productData = {
    general: {
      ua: {
        name: "Гранітна бруківка EuroGranite",
        description: "Високоякісна гранітна бруківка з українських кар'єрів. Ідеальна для мощення доріг, тротуарів, площ та ландшафтного дизайну.",
        category: "Будівельні матеріали",
        material: "Граніт",
        origin: "Україна"
      },
      en: {
        name: "EuroGranite Granite Pavers",
        description: "High-quality granite pavers from Ukrainian quarries. Perfect for paving roads, sidewalks, squares and landscape design.",
        category: "Building Materials",
        material: "Granite",
        origin: "Ukraine"
      },
      de: {
        name: "EuroGranite Granitpflaster",
        description: "Hochwertiges Granitpflaster aus ukrainischen Steinbrüchen. Perfekt für die Pflasterung von Straßen, Gehwegen, Plätzen und Landschaftsgestaltung.",
        category: "Baumaterialien",
        material: "Granit",
        origin: "Ukraine"
      },
      pl: {
        name: "Kostka granitowa EuroGranite",
        description: "Wysokiej jakości kostka granitowa z ukraińskich kamieniołomów. Idealna do brukowania dróg, chodników, placów i projektowania krajobrazu.",
        category: "Materiały budowlane",
        material: "Granit",
        origin: "Ukraina"
      }
    },
    pavers: {
      ua: {
        name: "Гранітна бруківка",
        description: "Міцна та довговічна гранітна бруківка різних розмірів та текстур для професійного мощення.",
        category: "Бруківка"
      },
      en: {
        name: "Granite Pavers",
        description: "Durable and long-lasting granite pavers in various sizes and textures for professional paving.",
        category: "Pavers"
      },
      de: {
        name: "Granitpflaster",
        description: "Langlebiges und widerstandsfähiges Granitpflaster in verschiedenen Größen und Texturen für professionelle Pflasterarbeiten.",
        category: "Pflastersteine"
      },
      pl: {
        name: "Kostka granitowa",
        description: "Trwała i długotrwała kostka granitowa w różnych rozmiarach i fakturach do profesjonalnego brukowania.",
        category: "Kostka brukowa"
      }
    }
  }

  const currentData = productData[productType][language] || productData[productType].en

  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": currentData.name,
    "description": currentData.description,
    "brand": {
      "@type": "Brand",
      "name": "EuroGranite"
    },
    "manufacturer": {
      "@type": "Organization",
      "name": "EuroGranite",
      "url": `${BASE_URL}/`
    },
    "material": currentData.material || "Granite",
    "category": currentData.category,
    "countryOfOrigin": {
      "@type": "Country",
      "name": currentData.origin || "Ukraine"
    },
    "offers": {
      "@type": "AggregateOffer",
      "availability": "https://schema.org/InStock",
      "priceCurrency": "EUR",
      "lowPrice": "25",
      "highPrice": "150",
      "offerCount": "50",
      "seller": {
        "@type": "Organization",
        "name": "EuroGranite"
      }
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "127",
      "bestRating": "5",
      "worstRating": "1"
    },
    "additionalProperty": [
      {
        "@type": "PropertyValue",
        "name": "Frost Resistance",
        "value": "F300"
      },
      {
        "@type": "PropertyValue",
        "name": "Compression Strength",
        "value": "> 160 MPa"
      },
      {
        "@type": "PropertyValue",
        "name": "Water Absorption",
        "value": "< 0.5%"
      }
    ],
    "hasEnergyConsumptionDetails": {
      "@type": "EnergyConsumptionDetails",
      "energyEfficiencyScaleMin": "A",
      "energyEfficiencyScaleMax": "G",
      "hasEnergyEfficiencyCategory": "A"
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

export default ProductSchema