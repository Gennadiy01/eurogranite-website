import React from 'react'
import Header from '../components/organisms/Header/Header'
import GraniteColorSection from '../components/organisms/GraniteColorSection/GraniteColorSection'
import ModalManager from '../components/organisms/ModalManager/ModalManager'
import useLanguageStore from '../stores/languageStore'

const Products = () => {
  const { currentLanguage } = useLanguageStore()
  
  const pageContent = {
    en: {
      title: 'Premium-Class Materials',
      subtitle: 'Premium granite products for European markets'
    },
    ua: {
      title: 'Матеріали преміум-класу',
      subtitle: 'Преміальні гранітні вироби для європейських ринків'
    },
    de: {
      title: 'Premium-Klasse Materialien',
      subtitle: 'Premium Granit-Produkte für europäische Märkte'
    },
    pl: {
      title: 'Materiały Klasy Premium',
      subtitle: 'Premium produkty granitowe dla rynków europejskich'
    }
  }
  
  const content = pageContent[currentLanguage] || pageContent.en

  return (
    <div className="products-page">
      <Header />
      <main className="pt-24">
        <section className="py-20 bg-neutral-50">
          <div className="container text-center mb-16">
            <h1 className="heading-2 mb-6 text-neutral-900 tracking-tight">
              {content.title}
            </h1>
            <p className="description-text text-neutral-600 max-w-4xl mx-auto leading-relaxed">
              {content.subtitle}
            </p>
          </div>
        </section>
        <GraniteColorSection />
      </main>
      <ModalManager />
    </div>
  )
}

export default Products