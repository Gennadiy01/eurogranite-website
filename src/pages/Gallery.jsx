import React from 'react'
import Header from '../components/organisms/Header/Header'
import useLanguageStore from '../stores/languageStore'

const Gallery = () => {
  const { currentLanguage } = useLanguageStore()
  const lang = currentLanguage || 'en'

  const content = {
    en: {
      title: "Gallery",
      subtitle: "Showcase of our premium granite and stone projects",
      description: "Coming soon - beautiful gallery of completed projects and material samples."
    },
    ua: {
      title: "Галерея",
      subtitle: "Приклади наших проектів з преміум граніту та каменю",
      description: "Скоро - красива галерея завершених проектів та зразків матеріалів."
    },
    de: {
      title: "Galerie",
      subtitle: "Showcase unserer Premium-Granit- und Steinprojekte",
      description: "Demnächst - schöne Galerie abgeschlossener Projekte und Materialproben."
    },
    pl: {
      title: "Galeria",
      subtitle: "Prezentacja naszych projektów z granitu premium i kamienia",
      description: "Wkrótce - piękna galeria ukończonych projektów i próbek materiałów."
    }
  }

  const text = content[lang] || content.en

  return (
    <div className="gallery-page">
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

export default Gallery