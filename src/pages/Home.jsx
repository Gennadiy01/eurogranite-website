import React, { useEffect } from 'react'
import useLanguageStore from '../stores/languageStore'
import { getSEOData } from '../constants/seoData'
import { getLanguageFromPath } from '../utils/languageUtils'
import Header from '../components/organisms/Header/Header'
import Hero from '../components/organisms/Hero/Hero'
import UniqueProposition from '../components/organisms/UniqueProposition/UniqueProposition'
import GraniteColors from '../components/organisms/GraniteColors/GraniteColors'
import ModalManager from '../components/organisms/ModalManager/ModalManager'
import OptimizedSEO from '../components/atoms/SEO/OptimizedSEO'
import LazySchemaLoader from '../components/atoms/StructuredData/LazySchemaLoader'
import Footer from '../components/organisms/Footer/Footer'

const Home = () => {
  const { currentLanguage, setLanguage } = useLanguageStore()

  useEffect(() => {
    const language = getLanguageFromPath(window.location.pathname)
    if (currentLanguage !== language) {
      setLanguage(language)
    }
  }, [currentLanguage, setLanguage])

  const seoData = getSEOData('home', currentLanguage)

  return (
    <>
      <div className="home-page">
        <OptimizedSEO
          title={seoData?.title}
          description={seoData?.description}
          keywords={seoData?.keywords}
          canonical={seoData?.canonical}
          ogImage={seoData?.ogImage}
          currentLanguage={currentLanguage}
          pagePath={seoData?.pagePath}
        />
        {/* Optimized Lazy-loaded Structured Data */}
        <LazySchemaLoader
          schemas={['organization', 'localbusiness', 'breadcrumb']}
          currentLanguage={currentLanguage}
          pagePath="/"
        />
        <Header />
        <main>
          <Hero />
          <UniqueProposition />
          <GraniteColors />
        </main>
        <ModalManager />
      </div>
      <Footer />
    </>
  )
}

export default Home