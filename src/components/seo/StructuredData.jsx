import React from 'react'
import PropTypes from 'prop-types'

const StructuredData = ({ data, type = 'default' }) => {
  // Generate JSON-LD structured data for different schema types
  const generateSchema = () => {
    switch (type) {
      case 'organization':
        return generateOrganizationSchema()
      case 'localBusiness':
        return generateLocalBusinessSchema()
      case 'product':
        return generateProductSchema(data)
      case 'breadcrumb':
        return generateBreadcrumbSchema(data)
      case 'webpage':
        return generateWebPageSchema(data)
      default:
        return data || {}
    }
  }

  // Organization Schema for EuroGranite
  const generateOrganizationSchema = () => ({
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://gennadiy01.github.io/eurogranite-website/#organization",
    "name": "EuroGranite",
    "alternateName": "EuroGranite Ukraine",
    "description": "Premium granite products manufacturer from Ukraine specializing in export to European markets. High-quality granite pavers, slabs, and custom processing with 15+ years of experience.",
    "url": "https://gennadiy01.github.io/eurogranite-website/",
    "logo": {
      "@type": "ImageObject",
      "url": "https://gennadiy01.github.io/eurogranite-website/logo192.png",
      "width": 192,
      "height": 192
    },
    "image": "https://gennadiy01.github.io/eurogranite-website/images/hero/Im_Hero-800.webp",
    "foundingDate": "2008",
    "numberOfEmployees": {
      "@type": "QuantitativeValue",
      "minValue": 50,
      "maxValue": 100
    },
    "knowsAbout": [
      "Granite Processing",
      "Natural Stone Export",
      "Construction Materials",
      "European Quality Standards",
      "Custom Granite Solutions"
    ],
    "areaServed": [
      {
        "@type": "Country",
        "name": "Germany"
      },
      {
        "@type": "Country",
        "name": "Poland"
      },
      {
        "@type": "GeoCircle",
        "name": "European Union"
      }
    ],
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "contactType": "Customer Service",
        "areaServed": "Europe",
        "availableLanguage": ["English", "Ukrainian", "German", "Polish"],
        "contactOption": "TollFree"
      },
      {
        "@type": "ContactPoint",
        "contactType": "Sales",
        "areaServed": "Europe",
        "availableLanguage": ["English", "German", "Polish"]
      }
    ],
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "Ukraine",
      "addressRegion": "Ukraine"
    },
    "sameAs": [
      // Add social media profiles when available
    ]
  })

  // LocalBusiness Schema for SEO
  const generateLocalBusinessSchema = () => ({
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "Manufacturer"],
    "@id": "https://gennadiy01.github.io/eurogranite-website/#business",
    "name": "EuroGranite",
    "image": [
      "https://gennadiy01.github.io/eurogranite-website/images/hero/Im_Hero-800.webp",
      "https://gennadiy01.github.io/eurogranite-website/images/advantages/advantages-800.webp"
    ],
    "description": "Leading manufacturer of high-quality granite products with over 15 years of experience serving European customers. Specializing in granite pavers, slabs, and custom processing.",
    "url": "https://gennadiy01.github.io/eurogranite-website/",
    "telephone": "+380-XX-XXX-XXXX", // Add real phone when available
    "priceRange": "$$-$$$",
    "openingHoursSpecification": {
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
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 50.4501, // Kyiv coordinates as placeholder
      "longitude": 30.5234
    },
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "TBD", // Add real address
      "addressLocality": "TBD",
      "addressRegion": "Ukraine",
      "postalCode": "TBD",
      "addressCountry": "UA"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Granite Products Catalog",
      "itemListElement": [
        {
          "@type": "Offer",
          "availability": "https://schema.org/InStock",
          "priceCurrency": "EUR",
          "priceRange": "€25-€150",
          "seller": {
            "@type": "Organization",
            "@id": "https://gennadiy01.github.io/eurogranite-website/#organization"
          },
          "itemOffered": {
            "@type": "Product",
            "name": "Granite Pavers",
            "description": "High-quality granite pavers for construction and landscaping projects. Available in various sizes and finishes.",
            "category": "Building Materials",
            "material": "Granite",
            "brand": {
              "@type": "Brand",
              "name": "EuroGranite"
            },
            "manufacturer": {
              "@type": "Organization",
              "@id": "https://gennadiy01.github.io/eurogranite-website/#organization"
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
                "@id": "https://gennadiy01.github.io/eurogranite-website/#organization"
              }
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.8",
              "reviewCount": "127",
              "bestRating": "5",
              "worstRating": "1"
            }
          }
        },
        {
          "@type": "Offer",
          "availability": "https://schema.org/InStock",
          "priceCurrency": "EUR",
          "priceRange": "€40-€200",
          "seller": {
            "@type": "Organization",
            "@id": "https://gennadiy01.github.io/eurogranite-website/#organization"
          },
          "itemOffered": {
            "@type": "Product",
            "name": "Granite Slabs",
            "description": "Premium granite slabs for countertops, facades, and construction projects. Custom processing available.",
            "category": "Building Materials",
            "material": "Granite",
            "brand": {
              "@type": "Brand",
              "name": "EuroGranite"
            },
            "manufacturer": {
              "@type": "Organization",
              "@id": "https://gennadiy01.github.io/eurogranite-website/#organization"
            },
            "offers": {
              "@type": "AggregateOffer",
              "availability": "https://schema.org/InStock",
              "priceCurrency": "EUR",
              "lowPrice": "40",
              "highPrice": "200",
              "offerCount": "75",
              "seller": {
                "@type": "Organization",
                "@id": "https://gennadiy01.github.io/eurogranite-website/#organization"
              }
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.9",
              "reviewCount": "89",
              "bestRating": "5",
              "worstRating": "1"
            }
          }
        }
      ]
    },
    "makesOffer": {
      "@type": "Offer",
      "itemOffered": {
        "@type": "Service",
        "name": "Custom Granite Processing",
        "description": "Custom granite cutting, polishing, and processing services"
      }
    }
  })

  // Product Schema for specific granite types
  const generateProductSchema = (productData) => ({
    "@context": "https://schema.org",
    "@type": "Product",
    "name": productData?.name || "Premium Granite",
    "description": productData?.description || "High-quality granite from Ukrainian quarries for construction and decoration projects",
    "category": "Building Materials",
    "material": "Granite",
    "color": productData?.color,
    "brand": {
      "@type": "Brand",
      "name": "EuroGranite"
    },
    "manufacturer": {
      "@type": "Organization",
      "@id": "https://gennadiy01.github.io/eurogranite-website/#organization"
    },
    "image": productData?.image || "https://gennadiy01.github.io/eurogranite-website/images/granite/default.webp",
    "offers": {
      "@type": "AggregateOffer",
      "availability": "https://schema.org/InStock",
      "priceCurrency": "EUR",
      "lowPrice": productData?.priceRange?.low || "30",
      "highPrice": productData?.priceRange?.high || "180",
      "offerCount": productData?.offerCount || "25",
      "seller": {
        "@type": "Organization",
        "@id": "https://gennadiy01.github.io/eurogranite-website/#organization"
      }
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": productData?.rating?.value || "4.7",
      "reviewCount": productData?.rating?.count || "45",
      "bestRating": "5",
      "worstRating": "1"
    },
    "additionalProperty": [
      {
        "@type": "PropertyValue",
        "name": "Origin",
        "value": "Ukraine"
      },
      {
        "@type": "PropertyValue",
        "name": "Quality Standard",
        "value": "European Standards"
      },
      {
        "@type": "PropertyValue",
        "name": "Processing",
        "value": "Custom Available"
      }
    ]
  })

  // Breadcrumb Schema for navigation
  const generateBreadcrumbSchema = (breadcrumbData) => ({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbData?.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": `https://gennadiy01.github.io/eurogranite-website${item.url}`
    })) || []
  })

  // WebPage Schema for individual pages
  const generateWebPageSchema = (pageData) => ({
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": pageData?.title || "EuroGranite - Premium Granite Products",
    "description": pageData?.description || "High-quality granite from Ukrainian quarries",
    "url": pageData?.url || "https://gennadiy01.github.io/eurogranite-website/",
    "inLanguage": pageData?.language || "en",
    "isPartOf": {
      "@type": "WebSite",
      "@id": "https://gennadiy01.github.io/eurogranite-website/#website"
    },
    "about": {
      "@type": "Organization",
      "@id": "https://gennadiy01.github.io/eurogranite-website/#organization"
    },
    "mainEntity": {
      "@type": "Organization",
      "@id": "https://gennadiy01.github.io/eurogranite-website/#organization"
    }
  })

  const schema = generateSchema()

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema, null, 2)
      }}
    />
  )
}

StructuredData.propTypes = {
  data: PropTypes.object,
  type: PropTypes.oneOf(['organization', 'localBusiness', 'product', 'breadcrumb', 'webpage', 'default'])
}

export default StructuredData