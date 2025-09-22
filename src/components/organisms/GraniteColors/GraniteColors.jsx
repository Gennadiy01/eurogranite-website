import React from 'react'
import Button from '../../atoms/Button/Button'
import useLanguageStore from '../../../stores/languageStore'
import useGraniteSystemStore from '../../../stores/graniteSystemStore'
import { graniteTypes } from '../../../constants/graniteData'

const GraniteColors = () => {
  const { currentLanguage } = useLanguageStore()
  const { openUniversalGallery } = useGraniteSystemStore()
  
  const content = {
    en: {
      title: 'Premium-Class Materials',
      subtitle: 'Elite granite varieties of the highest quality for the most demanding projects.\nWe work exclusively with carefully selected raw materials and process them according to European quality standards.',
      products: [
        {
          name: 'Black\nGranite',
          tag: 'TOP Choice',
          englishName: 'Black Granite Premium',
          description: 'Elite black granite with deep saturated color and perfect processing quality'
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
          name: 'Green\nGranite',
          tag: 'Natural',
          englishName: 'Green Granite Natural',
          description: 'Pure green granite with rich natural color and distinctive mineral patterns'
        },
        {
          name: 'Labradorite',
          tag: 'Mystical',
          englishName: 'Labradorite Mystical',
          description: 'Exceptional labradorite with iridescent play of colors and magical light reflections'
        }
      ],
      cta: {
        title: 'Need consultation?',
        subtitle: 'Our experts will help you choose the perfect granite type for your project',
        primaryButton: 'Free Consultation',
        secondaryButton: 'View Catalog'
      },
      buttonText: 'More Details'
    },
    ua: {
      title: 'Матеріали преміум класу',
      subtitle: 'Елітні сорти граніту найвищої якості для найвимогливіших проектів.\nМи працюємо тільки з ретельно відібраною сировиною та обробляємо її відповідно до вимог європейських стандартів якості.',
      products: [
        {
          name: 'Чорний\nграніт',
          tag: 'ТОП вибір',
          englishName: 'Black Granite Premium',
          description: 'Елітний чорний граніт з глибоким насиченим кольором та досконалою якістю обробки'
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
          name: 'Рожево-сірий\nграніт',
          tag: 'Елегантний',
          englishName: 'Pink-Gray Granite Elegant',
          description: 'Витончений рожево-сірий граніт з делікатними переходами кольорів та вишуканою текстурою'
        },
        {
          name: 'Зелений\nграніт',
          tag: 'Природний',
          englishName: 'Green Granite Natural',
          description: 'Чистий зелений граніт з насиченим природним кольором та характерними мінеральними візерунками'
        },
        {
          name: 'Лабрадорит',
          tag: 'Містичний',
          englishName: 'Labradorite Mystical',
          description: 'Винятковий лабрадорит з райдужною грою кольорів та магічними відблисками світла'
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
      subtitle: 'Elite-Granitsorten höchster Qualität für anspruchsvollste Projekte.\nWir arbeiten ausschließlich mit sorgfältig ausgewählten Rohstoffen und verarbeiten diese nach europäischen Qualitätsstandards.',
      products: [
        {
          name: 'Schwarzer\nGranit',
          tag: 'TOP Wahl',
          englishName: 'Black Granite Premium',
          description: 'Elite schwarzer Granit mit tiefer gesättigter Farbe und perfekter Verarbeitungsqualität'
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
          name: 'Rosa-grauer\nGranit',
          tag: 'Elegant',
          englishName: 'Pink-Gray Granite Elegant',
          description: 'Anspruchsvoller rosa-grauer Granit mit zarten Farbübergängen und raffinierter Textur'
        },
        {
          name: 'Grüner\nGranit',
          tag: 'Natürlich',
          englishName: 'Green Granite Natural',
          description: 'Reiner grüner Granit mit reichhaltiger natürlicher Farbe und markanten Mineralmustern'
        },
        {
          name: 'Labradorit',
          tag: 'Mystisch',
          englishName: 'Labradorite Mystical',
          description: 'Außergewöhnlicher Labradorit mit schillerndem Farbenspiel und magischen Lichtreflexionen'
        }
      ],
      cta: {
        title: 'Beratung benötigt?',
        subtitle: 'Unsere Experten helfen Ihnen bei der Auswahl der perfekten Granitart für Ihr Projekt',
        primaryButton: 'Kostenlose Beratung',
        secondaryButton: 'Katalog ansehen'
      },
      buttonText: 'Mehr Details'
    },
    pl: {
      title: 'Materiały Klasy Premium',
      subtitle: 'Elitarne odmiany granitu najwyższej jakości do najbardziej wymagających projektów.\nPracujemy wyłącznie z starannie wyselekcjonowanymi surowcami i przetwarzamy je zgodnie z europejskimi standardami jakości.',
      products: [
        {
          name: 'Czarny\nGranit',
          tag: 'TOP Wybór',
          englishName: 'Black Granite Premium',
          description: 'Elitarny czarny granit z głębokim nasyconym kolorem i doskonałą jakością obróbki'
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
          name: 'Różowo-szary\nGranit',
          tag: 'Elegancki',
          englishName: 'Pink-Gray Granite Elegant',
          description: 'Wyrafinowany różowo-szary granit z delikatnymi przejściami kolorów i wykwintną teksturą'
        },
        {
          name: 'Zielony\nGranit',
          tag: 'Naturalny',
          englishName: 'Green Granite Natural',
          description: 'Czysty zielony granit o bogatym naturalnym kolorze i charakterystycznych wzorach mineralnych'
        },
        {
          name: 'Labradoryt',
          tag: 'Mistyczny',
          englishName: 'Labradorite Mystical',
          description: 'Wyjątkowy labradoryt z tęczową grą kolorów i magicznymi odbiciami światła'
        }
      ],
      cta: {
        title: 'Potrzebujesz konsultacji?',
        subtitle: 'Nasi eksperci pomogą wybrać idealny typ granitu dla Twojego projektu',
        primaryButton: 'Bezpłatna Konsultacja',
        secondaryButton: 'Zobacz Katalog'
      },
      buttonText: 'Więcej szczegółów'
    }
  }

  const currentContent = content[currentLanguage] || content.en




  const handleViewTextures = (graniteType) => {
    // Open universal gallery with all textures visible, starting from the first texture (Gabbro)
    openUniversalGallery('all', 0)
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
            {graniteTypes.slice(0, 3).map((graniteType, index) => {
              return (
                <div key={graniteType.id} className="granite-color-card card-hover">
                  <div className={`granite-texture granite-color-image ${graniteType.colorClass}`}>
                    <div className="gradient-overlay"></div>
                  </div>
                  <div className="granite-color-content">
                    <div className="granite-color-content-top">
                      <h3 className="granite-color-name">
                        {graniteType.name[currentLanguage]}
                      </h3>
                      <span className="granite-color-tag">
                        {graniteType.badge[currentLanguage]}
                      </span>
                      <p className="granite-color-english">
                        {graniteType.subtitle[currentLanguage]}
                      </p>
                      <p className="granite-color-description">
                        {graniteType.description[currentLanguage]}
                      </p>
                    </div>
                    <div className="granite-color-button-container">
                      <Button 
                        variant="primary"
                        size="small"
                        onClick={() => handleViewTextures(graniteType)}
                      >
                        {currentContent.buttonText}
                      </Button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
          
          {/* Second row - 3 cards */}
          <div className="granite-colors-row granite-colors-row-two">
            {graniteTypes.slice(3, 6).map((graniteType, index) => {
              return (
                <div key={graniteType.id} className="granite-color-card card-hover">
                  <div className={`granite-texture granite-color-image ${graniteType.colorClass}`}>
                    <div className="gradient-overlay"></div>
                  </div>
                  <div className="granite-color-content">
                    <div className="granite-color-content-top">
                      <h3 className="granite-color-name">
                        {graniteType.name[currentLanguage]}
                      </h3>
                      <span className="granite-color-tag">
                        {graniteType.badge[currentLanguage]}
                      </span>
                      <p className="granite-color-english">
                        {graniteType.subtitle[currentLanguage]}
                      </p>
                      <p className="granite-color-description">
                        {graniteType.description[currentLanguage]}
                      </p>
                    </div>
                    <div className="granite-color-button-container">
                      <Button 
                        variant="primary"
                        size="small"
                        onClick={() => handleViewTextures(graniteType)}
                      >
                        {currentContent.buttonText}
                      </Button>
                    </div>
                  </div>
                </div>
              )
            })}
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
              <a href="/contact#contact-form">
                <Button
                  variant="primary"
                  size="large"
                >
                  {currentContent.cta.primaryButton}
                </Button>
              </a>
              <a href="/products">
                <Button
                  variant="outline"
                  size="large"
                >
                  {currentContent.cta.secondaryButton}
                </Button>
              </a>
            </div>
          </div>
        </div>
        
      </div>
    </section>
  )
}

export default GraniteColors