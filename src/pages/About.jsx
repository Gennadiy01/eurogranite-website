import React from 'react'
import Header from '../components/organisms/Header/Header'
import useLanguageStore from '../stores/languageStore'

const About = () => {
  const { currentLanguage } = useLanguageStore()
  const lang = currentLanguage || 'en'

  const content = {
    en: {
      title: "About Us",
      subtitle: "Leading supplier of premium granite and natural stone",
      description: "Coming soon - detailed information about our company, history, mission and values."
    },
    ua: {
      title: "Про нас",
      subtitle: "Провідний постачальник преміум граніту та природного каменю",
      description: "Скоро - детальна інформація про нашу компанію, історію, місію та цінності."
    },
    de: {
      title: "Über uns",
      subtitle: "Führender Lieferant von Premium-Granit und Naturstein",
      description: "Demnächst - detaillierte Informationen über unser Unternehmen, Geschichte, Mission und Werte."
    },
    pl: {
      title: "O nas",
      subtitle: "Wiodący dostawca granitu premium i kamienia naturalnego",
      description: "Wkrótce - szczegółowe informacje o naszej firmie, historii, misji i wartościach."
    }
  }

  const text = content[lang] || content.en

  return (
    <div className="about-page">
      <Header />
      <main className="pt-32">
        <section className="py-20 bg-neutral-50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
              <h1 className="text-4xl lg:text-5xl font-bold text-neutral-900 mb-4">{text.title}</h1>
              <h2 className="text-xl lg:text-2xl text-neutral-600 mb-8">{text.subtitle}</h2>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-4xl mx-auto">
              <p className="text-lg text-neutral-700 text-center leading-relaxed">{text.description}</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default About