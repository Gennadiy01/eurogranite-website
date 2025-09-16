import React from 'react'
import Header from '../components/organisms/Header/Header'
import ProjectGallery from '../components/organisms/ProjectGallery/ProjectGallery'
import useLanguageStore from '../stores/languageStore'
import { getSEOData } from '../constants/seoData'
import SEO from '../components/atoms/SEO'
import '../styles/components/organisms/ProjectGallery.scss'
import './About.css'

const Gallery = () => {
  const { currentLanguage } = useLanguageStore()
  const seoData = getSEOData('gallery', currentLanguage)

  const content = {
    en: {
      title: "Our Gallery",
      subtitle: "Showcase of premium granite paving projects and installations"
    },
    ua: {
      title: "Наша галерея",
      subtitle: "Демонстрація проектів та установок преміум гранітної бруківки"
    },
    de: {
      title: "Unsere Galerie",
      subtitle: "Präsentation von Premium-Granitpflaster-Projekten und Installationen"
    },
    pl: {
      title: "Nasza galeria",
      subtitle: "Prezentacja projektów i instalacji premium granitowej kostki brukowej"
    }
  }

  const text = content[currentLanguage] || content.en

  return (
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
      <Header />

      {/* Hero Section */}
      <section className="page-hero page-hero--compact">
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
  )
}

export default Gallery