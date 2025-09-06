import React from 'react'
import Button from '../../atoms/Button/Button'
import useLanguageStore from '../../../stores/languageStore'

const GraniteColors = () => {
  const { currentLanguage } = useLanguageStore()
  
  const content = {
    en: {
      title: 'Premium-Class Materials',
      subtitle: 'Elite granite varieties of the highest quality for the most demanding projects.\nEach granite type is carefully selected and processed according to European quality standards.',
      products: [
        {
          name: 'Black\nGranite',
          tag: 'TOP Choice',
          englishName: 'Black Granite Premium',
          description: 'Elite black granite with deep saturated color and mirror polishing'
        },
        {
          name: 'Gray\nGranite',
          tag: 'Universal',
          englishName: 'Gray Granite Classic',
          description: 'Classic gray granite for universal use with excellent durability'
        },
        {
          name: 'Red-Brown\nGranite',
          tag: 'Unique',
          englishName: 'Red-Brown Granite Elite',
          description: 'Warm red-brown shade with natural texture and unique pattern'
        },
        {
          name: 'Gray-Green\nGranite',
          tag: 'Rare',
          englishName: 'Gray-Green Granite Rare',
          description: 'Unique gray-greenish granite with natural inclusions and noble shade'
        },
        {
          name: 'Black-Green\nGranite',
          tag: 'Exclusive',
          englishName: 'Black-Green Granite Exclusive',
          description: 'Premium black-greenish granite for the most special and exclusive projects'
        }
      ],
      cta: {
        title: 'Need consultation?',
        subtitle: 'Our experts will help you choose the perfect granite type for your project',
        primaryButton: 'Free Consultation',
        secondaryButton: 'View Catalog'
      },
      buttonText: 'Learn More'
    },
    ua: {
      title: 'Матеріали преміум-класу',
      subtitle: 'Елітні сорти граніту найвищої якості для найвимогливіших проектів.\nКожен тип граніту ретельно відібраний та оброблений згідно з європейськими стандартами якості.',
      products: [
        {
          name: 'Чорний\nграніт',
          tag: 'ТОП вибір',
          englishName: 'Black Granite Premium',
          description: 'Елітний чорний граніт з глибоким насиченим кольором та дзеркальним поліруванням'
        },
        {
          name: 'Сірий\nграніт',
          tag: 'Універсальний',
          englishName: 'Gray Granite Classic',
          description: 'Класичний сірий граніт для універсального використання з відмінною стійкістю'
        },
        {
          name: 'Червоно-коричневий\nграніт',
          tag: 'Унікальний',
          englishName: 'Red-Brown Granite Elite',
          description: 'Теплий червоно-коричневий відтінок з природною текстурою та унікальним візерунком'
        },
        {
          name: 'Сіро-зелений\nграніт',
          tag: 'Рідкісний',
          englishName: 'Gray-Green Granite Rare',
          description: 'Унікальний сіро-зеленуватий граніт з природними включеннями та благородним відтінком'
        },
        {
          name: 'Чорно-зелений\nграніт',
          tag: 'Ексклюзивний',
          englishName: 'Black-Green Granite Exclusive',
          description: 'Преміальний чорно-зеленуватий граніт для найособливіших та ексклюзивних проектів'
        }
      ],
      cta: {
        title: 'Потрібна консультація?',
        subtitle: 'Наші експерти допоможуть вибрати ідеальний тип граніту для вашого проекту',
        primaryButton: 'Безкоштовна консультація',
        secondaryButton: 'Переглянути каталог'
      },
      buttonText: 'Детальніше'
    },
    de: {
      title: 'Premium-Klasse Materialien',
      subtitle: 'Elite-Granitsorten höchster Qualität für anspruchsvollste Projekte.\nJede Granitart wird sorgfältig ausgewählt und nach europäischen Qualitätsstandards verarbeitet.',
      products: [
        {
          name: 'Schwarzer\nGranit',
          tag: 'TOP Wahl',
          englishName: 'Black Granite Premium',
          description: 'Elite schwarzer Granit mit tiefer gesättigter Farbe und Spiegelpolierung'
        },
        {
          name: 'Grauer\nGranit',
          tag: 'Universell',
          englishName: 'Gray Granite Classic',
          description: 'Klassischer grauer Granit für universelle Verwendung mit ausgezeichneter Haltbarkeit'
        },
        {
          name: 'Rotbrauner\nGranit',
          tag: 'Einzigartig',
          englishName: 'Red-Brown Granite Elite',
          description: 'Warmer rotbrauner Farbton mit natürlicher Textur und einzigartigem Muster'
        },
        {
          name: 'Graugrüner\nGranit',
          tag: 'Selten',
          englishName: 'Gray-Green Granite Rare',
          description: 'Einzigartiger graugrünlicher Granit mit natürlichen Einschlüssen und edlem Farbton'
        },
        {
          name: 'Schwarzgrüner\nGranit',
          tag: 'Exklusiv',
          englishName: 'Black-Green Granite Exclusive',
          description: 'Premium schwarzgrünlicher Granit für die besonderen und exklusiven Projekte'
        }
      ],
      cta: {
        title: 'Beratung benötigt?',
        subtitle: 'Unsere Experten helfen Ihnen bei der Auswahl der perfekten Granitart für Ihr Projekt',
        primaryButton: 'Kostenlose Beratung',
        secondaryButton: 'Katalog ansehen'
      },
      buttonText: 'Mehr erfahren'
    },
    pl: {
      title: 'Materiały Klasy Premium',
      subtitle: 'Elitarne odmiany granitu najwyższej jakości do najbardziej wymagających projektów.\nKażdy typ granitu jest starannie wyselekcjonowany i przetworzony zgodnie z europejskimi standardami jakości.',
      products: [
        {
          name: 'Czarny\nGranit',
          tag: 'TOP Wybór',
          englishName: 'Black Granite Premium',
          description: 'Elitarny czarny granit z głębokim nasyconym kolorem i lustrzanym polerowanием'
        },
        {
          name: 'Szary\nGranit',
          tag: 'Uniwersalny',
          englishName: 'Gray Granite Classic',
          description: 'Klasyczny szary granit do uniwersalnego użytku o doskonałej trwałości'
        },
        {
          name: 'Czerwono-brązowy\nGranit',
          tag: 'Unikalny',
          englishName: 'Red-Brown Granite Elite',
          description: 'Ciepły czerwono-brązowy odcień z naturalną teksturą i unikalnym wzorem'
        },
        {
          name: 'Szaro-zielony\nGranit',
          tag: 'Rzadki',
          englishName: 'Gray-Green Granite Rare',
          description: 'Unikalny szaro-zielonkawy granit z naturalnymi wtrąceniami i szlachetnym odcieniem'
        },
        {
          name: 'Czarno-zielony\nGranit',
          tag: 'Ekskluzywny',
          englishName: 'Black-Green Granite Exclusive',
          description: 'Premium czarno-zielonkawy granit do najbardziej wyjątkowych i ekskluzywnych projektów'
        }
      ],
      cta: {
        title: 'Potrzebujesz konsultacji?',
        subtitle: 'Nasi eksperci pomogą wybrać idealny typ granitu dla Twojego projektu',
        primaryButton: 'Bezpłatna Konsultacja',
        secondaryButton: 'Zobacz Katalog'
      },
      buttonText: 'Dowiedz się więcej'
    }
  }

  const currentContent = content[currentLanguage] || content.en

  const graniteClasses = [
    'granite-black',
    'granite-gray', 
    'granite-red-brown',
    'granite-gray-green',
    'granite-black-green'
  ]

  const handleConsultationClick = () => {
    const element = document.getElementById('contact')
    element?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleCatalogClick = () => {
    const element = document.getElementById('products')
    element?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="granite-colors-section">
      <div className="granite-colors-container">
        
        {/* Header */}
        <div className="granite-colors-header">
          <h2 className="granite-colors-title">
            {currentContent.title}
          </h2>
          <p className="granite-colors-subtitle">
            {currentContent.subtitle.split('\n').map((line, index) => (
              <span key={index}>
                {line}
                {index < currentContent.subtitle.split('\n').length - 1 && <br />}
              </span>
            ))}
          </p>
        </div>
        
        {/* Products Grid */}
        <div className="granite-colors-grid">
          {/* First row - 3 cards */}
          <div className="granite-colors-row">
            {currentContent.products.slice(0, 3).map((product, index) => (
              <div key={index} className="granite-color-card card-hover">
                <div className={`granite-texture granite-color-image ${graniteClasses[index]}`}>
                  <div className="gradient-overlay"></div>
                </div>
                <div className="granite-color-content">
                  <div className="granite-color-content-top">
                    <h3 className="granite-color-name">
                      {product.name.split('\n').map((line, lineIndex) => (
                        <span key={lineIndex}>
                          {line}
                          {lineIndex < product.name.split('\n').length - 1 && <br />}
                        </span>
                      ))}
                    </h3>
                    <span className="granite-color-tag">
                      {product.tag}
                    </span>
                    <p className="granite-color-english">
                      {product.englishName}
                    </p>
                    <p className="granite-color-description">
                      {product.description}
                    </p>
                  </div>
                  <div className="granite-color-button-container">
                    <Button 
                      variant="primary"
                      size="small"
                    >
                      {currentContent.buttonText}
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Second row - 2 cards */}
          <div className="granite-colors-row granite-colors-row-two">
            {currentContent.products.slice(3, 5).map((product, index) => (
              <div key={index + 3} className="granite-color-card card-hover">
                <div className={`granite-texture granite-color-image ${graniteClasses[index + 3]}`}>
                  <div className="gradient-overlay"></div>
                </div>
                <div className="granite-color-content">
                  <div className="granite-color-content-top">
                    <h3 className="granite-color-name">
                      {product.name.split('\n').map((line, lineIndex) => (
                        <span key={lineIndex}>
                          {line}
                          {lineIndex < product.name.split('\n').length - 1 && <br />}
                        </span>
                      ))}
                    </h3>
                    <span className="granite-color-tag">
                      {product.tag}
                    </span>
                    <p className="granite-color-english">
                      {product.englishName}
                    </p>
                    <p className="granite-color-description">
                      {product.description}
                    </p>
                  </div>
                  <div className="granite-color-button-container">
                    <Button 
                      variant="primary"
                      size="small"
                    >
                      {currentContent.buttonText}
                    </Button>
                  </div>
                </div>
              </div>
            ))}
            <div className="granite-colors-empty"></div>
          </div>
        </div>
        
        {/* Call to Action */}
        <div className="granite-colors-cta">
          <div className="granite-colors-cta-content">
            <h3 className="granite-colors-cta-title">
              {currentContent.cta.title}
            </h3>
            <p className="granite-colors-cta-subtitle">
              {currentContent.cta.subtitle}
            </p>
            <div className="granite-colors-cta-buttons">
              <Button 
                variant="primary"
                size="large"
                onClick={handleConsultationClick}
              >
                {currentContent.cta.primaryButton}
              </Button>
              <Button 
                variant="outline"
                size="large"
                onClick={handleCatalogClick}
              >
                {currentContent.cta.secondaryButton}
              </Button>
            </div>
          </div>
        </div>
        
      </div>
    </section>
  )
}

export default GraniteColors