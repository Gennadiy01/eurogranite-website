import React from 'react'
import GraniteCard from '../../molecules/GraniteCard'
import { graniteTypes } from '../../../constants/graniteData'
import useLanguageStore from '../../../stores/languageStore'

const GraniteColorSection = () => {
  const { currentLanguage } = useLanguageStore()
  const lang = currentLanguage || 'en'
  
  // Section content for different languages
  const sectionContent = {
    en: {
      title: 'Premium-Class Materials',
      subtitle: 'Elite granite varieties of the highest quality for the most demanding projects.\nEach type of granite is carefully selected and processed according to European quality standards.'
    },
    ua: {
      title: 'Матеріали преміум-класу',
      subtitle: 'Елітні сорти граніту найвищої якості для найвимогливіших проектів.\nКожен тип граніту ретельно відібраний та оброблений згідно з європейськими стандартами якості.'
    },
    de: {
      title: 'Premium-Klasse Materialien',
      subtitle: 'Elite Granitsorten höchster Qualität für anspruchsvollste Projekte.\nJede Granitart wird sorgfältig ausgewählt und nach europäischen Qualitätsstandards verarbeitet.'
    },
    pl: {
      title: 'Materiały Klasy Premium',
      subtitle: 'Elitarne odmiany granitu najwyższej jakości dla najbardziej wymagających projektów.\nKażdy typ granitu jest starannie wyselekcjonowany i przetwarzany zgodnie z europejskimi standardami jakości.'
    }
  }
  
  const content = sectionContent[lang] || sectionContent.en
  
  return (
    <section id="products" className="section-bg-primary py-20">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="heading-2 mb-6 text-neutral-900 tracking-tight">
            {content.title}
          </h2>
          <p className="description-text text-neutral-600 max-w-4xl mx-auto leading-relaxed">
            {content.subtitle.split('\n').map((line, index) => (
              <span key={index}>
                {line}
                {index < content.subtitle.split('\n').length - 1 && <br />}
              </span>
            ))}
          </p>
        </div>
        
        {/* Granite Cards Grid - 3+2 layout like in products color v3.html */}
        <div className="space-y-8 max-w-6xl mx-auto">
          
          {/* First row - 3 cards */}
          <div className="grid lg-grid-cols-3 md-grid-cols-3 sm-grid-cols-2 grid-cols-1 gap-8">
            {graniteTypes.slice(0, 3).map((granite) => (
              <GraniteCard key={granite.id} granite={granite} />
            ))}
          </div>
          
          {/* Second row - 2 cards */}
          <div className="grid lg-grid-cols-3 md-grid-cols-3 sm-grid-cols-2 grid-cols-1 gap-8">
            {graniteTypes.slice(3, 5).map((granite) => (
              <GraniteCard key={granite.id} granite={granite} />
            ))}
            {/* Empty space for alignment */}
            <div className="lg-block hidden"></div>
          </div>
          
        </div>
        
        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center space-x-4 bg-white rounded-2xl p-8 shadow-xl">
            <div>
              <h3 className="text-2xl font-bold text-neutral-900 mb-2">
                {lang === 'en' ? 'Need consultation?' :
                 lang === 'ua' ? 'Потрібна консультація?' :
                 lang === 'de' ? 'Beratung benötigt?' :
                 lang === 'pl' ? 'Potrzebujesz konsultacji?' : 'Need consultation?'}
              </h3>
              <p className="text-neutral-600 mb-6">
                {lang === 'en' ? 'Our experts will help you choose the perfect type of granite for your project' :
                 lang === 'ua' ? 'Наші експерти допоможуть вибрати ідеальний тип граніту для вашого проекту' :
                 lang === 'de' ? 'Unsere Experten helfen Ihnen bei der Auswahl des perfekten Granittyps für Ihr Projekt' :
                 lang === 'pl' ? 'Nasi eksperci pomogą Ci wybrać idealny typ granitu dla Twojego projektu' : 
                 'Our experts will help you choose the perfect type of granite for your project'}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="px-8 py-4 bg-accent-orange text-white rounded-lg font-semibold hover:bg-orange-600 transition-colors">
                  {lang === 'en' ? 'Free consultation' :
                   lang === 'ua' ? 'Безкоштовна консультація' :
                   lang === 'de' ? 'Kostenlose Beratung' :
                   lang === 'pl' ? 'Bezpłatna konsultacja' : 'Free consultation'}
                </button>
                <button className="px-8 py-4 border-2 border-neutral-300 text-neutral-700 rounded-lg font-semibold hover:border-neutral-400 transition-colors">
                  {lang === 'en' ? 'Download catalog' :
                   lang === 'ua' ? 'Завантажити каталог' :
                   lang === 'de' ? 'Katalog herunterladen' :
                   lang === 'pl' ? 'Pobierz katalog' : 'Download catalog'}
                </button>
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </section>
  )
}

export default GraniteColorSection