import React from 'react'
import useLanguageStore from '../stores/languageStore'
import { getSEOData } from '../constants/seoData'
import Header from '../components/organisms/Header/Header'
import Hero from '../components/organisms/Hero/Hero'
import UniqueProposition from '../components/organisms/UniqueProposition/UniqueProposition'
import GraniteColors from '../components/organisms/GraniteColors/GraniteColors'
import ModalManager from '../components/organisms/ModalManager/ModalManager'
import SEO from '../components/atoms/SEO'
import { OrganizationSchema, LocalBusinessSchema, BreadcrumbSchema } from '../components/atoms/StructuredData'

const Home = () => {
  const { currentLanguage } = useLanguageStore()
  const seoData = getSEOData('home', currentLanguage)

  return (
    <div className="home-page">
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
      <LocalBusinessSchema />
      <BreadcrumbSchema />
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