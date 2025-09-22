import React, { useEffect } from 'react'
import Header from '../components/organisms/Header/Header'
import ProjectGallery from '../components/organisms/ProjectGallery/ProjectGallery'
import useLanguageStore from '../stores/languageStore'
import { getLanguageFromPath } from '../utils/languageUtils'
import { getSEOData } from '../constants/seoData'
import SEO from '../components/atoms/SEO'
import { OrganizationSchema, BreadcrumbSchema } from '../components/atoms/StructuredData'
import Footer from '../components/organisms/Footer/Footer'
import '../styles/components/organisms/ProjectGallery.scss'
import './About.css'

const Gallery = () => {
  const { currentLanguage, setLanguage } = useLanguageStore()

  // Language is managed by App.js for hash routing, no need to set it here

  const seoData = getSEOData('gallery', currentLanguage)

  const content = {
    en: {
      title: "Landscape Solutions Gallery",
      subtitle: "Discover endless possibilities of landscape design. Our gallery showcases options for creating harmonious spaces for pathways, streets and plazas. Wide product range allows you to implement any landscaping ideas to your taste."
    },
    ua: {
      title: "Галерея ландшафтних рішень",
      subtitle: "Відкрийте безмежні можливості ландшафтного дизайну. Наша галерея демонструє варіанти створення гармонійних просторів для доріжок, вулиць та майданчиків. Широкий асортимент продукції дозволяє реалізувати будь-які ідеї благоустрою на ваш смак."
    },
    de: {
      title: "Galerie der Landschaftslösungen",
      subtitle: "Entdecken Sie die endlosen Möglichkeiten der Landschaftsgestaltung. Unsere Galerie zeigt Optionen für die Schaffung harmonischer Räume für Wege, Straßen und Plätze. Das breite Produktsortiment ermöglicht es, alle Landschaftsideen nach Ihrem Geschmack umzusetzen."
    },
    pl: {
      title: "Galeria Rozwiązań Krajobrazowych",
      subtitle: "Odkryj nieskończone możliwości projektowania krajobrazu. Nasza galeria prezentuje opcje tworzenia harmonijnych przestrzeni dla ścieżek, ulic i placów. Szeroka gama produktów pozwala na realizację wszelkich pomysłów zagospodarowania według Twojego gustu."
    }
  }

  const text = content[currentLanguage] || content.en

  return (
    <>
      <div className="gallery-page">
      <SEO
        title={seoData?.title}
        description={seoData?.description}
        keywords={seoData?.keywords}
        canonical={seoData?.canonical}
        ogImage={seoData?.ogImage}
        currentLanguage={currentLanguage}
        hreflang={seoData?.hreflang}
      />
      <OrganizationSchema />
      <BreadcrumbSchema />
      <Header />

      {/* Hero Section */}
      <section className="page-hero page-hero--fullscreen">
        <div className="page-hero-background">
          <div className="page-hero-overlay"></div>
        </div>
        <div className="container">
          <div className="page-hero-content">
            <h1 className="page-hero-title">{text.title}</h1>
            <p className="page-hero-subtitle">{text.subtitle}</p>
          </div>
        </div>
      </section>

      <main>
        <ProjectGallery />
      </main>
      </div>
      <Footer />
    </>
  )
}

export default Gallery