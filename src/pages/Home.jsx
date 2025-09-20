import React from 'react'
import useLanguageStore from '../stores/languageStore'
import { getSEOData } from '../constants/seoData'
import Header from '../components/organisms/Header/Header'
import Hero from '../components/organisms/Hero/Hero'
import UniqueProposition from '../components/organisms/UniqueProposition/UniqueProposition'
import GraniteColors from '../components/organisms/GraniteColors/GraniteColors'
import ModalManager from '../components/organisms/ModalManager/ModalManager'
import OptimizedSEO from '../components/atoms/SEO/OptimizedSEO'
import LazySchemaLoader from '../components/atoms/StructuredData/LazySchemaLoader'

const Home = () => {
  const { currentLanguage } = useLanguageStore()
  const seoData = getSEOData('home', currentLanguage)

  return (
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
  )
}

export default Home