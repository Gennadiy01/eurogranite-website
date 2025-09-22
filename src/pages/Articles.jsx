import React from 'react'
import Header from '../components/organisms/Header/Header'
import useLanguageStore from '../stores/languageStore'
import Footer from '../components/organisms/Footer/Footer'

const Articles = () => {
  const { currentLanguage } = useLanguageStore()

  // Language is managed by App.js for hash routing, no need to set it here

  const lang = currentLanguage || 'en'

  const content = {
    en: {
      title: "Articles",
      subtitle: "Expert insights on granite and natural stone",
      description: "Coming soon - informative articles about granite care, installation tips, and industry trends."
    },
    ua: {
      title: "Статті",
      subtitle: "Експертні поради щодо граніту та природного каменю",
      description: "Скоро - інформативні статті про догляд за гранітом, поради з монтажу та тенденції в індустрії."
    },
    de: {
      title: "Artikel",
      subtitle: "Experteneinblicke in Granit und Naturstein",
      description: "Demnächst - informative Artikel über Granitpflege, Installationstipps und Branchentrends."
    },
    pl: {
      title: "Artykuły",
      subtitle: "Eksperckie spostrzeżenia na temat granitu i kamienia naturalnego",
      description: "Wkrótce - pouczające artykuły o pielęgnacji granitu, wskazówkach instalacyjnych i trendach branżowych."
    }
  }

  const text = content[lang] || content.en

  return (
    <>
      <div className="articles-page">
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
      <Footer />
    </>
  )
}

export default Articles