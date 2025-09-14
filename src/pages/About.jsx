import React from 'react'
import { Link } from 'react-router-dom'
import useLanguageStore from '../stores/languageStore'
import { getSEOData } from '../constants/seoData'
import Header from '../components/organisms/Header/Header'
import SEO from '../components/atoms/SEO'
import './About.css'

const About = () => {
  const { currentLanguage } = useLanguageStore()
  const lang = currentLanguage || 'en'
  const seoData = getSEOData('about', currentLanguage)

  const content = {
    en: {
      title: "About EuroGranite",
      subtitle: "Leading supplier of premium Ukrainian granite and natural stone",
      hero: {
        headline: "Excellence in Stone",
        description: "For over a decade, EuroGranite has been at the forefront of granite extraction and processing, bringing the finest Ukrainian natural stone to markets across Europe and beyond."
      },
      about: {
        title: "Our Company",
        description: "EuroGranite specializes in the extraction, processing, and supply of premium Ukrainian granite. Our quarries are located in the heart of Ukraine's granite-rich regions, particularly in Zhytomyr, Kirovohrad, and Rivne oblasts. We pride ourselves on sustainable mining practices and delivering stone products of exceptional quality.",
        mission: {
          title: "Our Mission",
          text: "To create world-class granite products while adhering to the highest standards of quality, sustainability, and customer care."
        },
        vision: {
          title: "Our Vision", 
          text: "To be the leading European supplier of Ukrainian granite, recognized for innovation, reliability, and environmental responsibility."
        }
      },
      services: {
        title: "Our Services",
        items: [
          {
            title: "Granite Extraction",
            description: "Direct extraction from our own quarries ensures quality control from source to final product."
          },
          {
            title: "Custom Processing",
            description: "Advanced cutting, polishing, and finishing services to meet specific project requirements."
          },
          {
            title: "European Distribution",
            description: "Delivery throughout Europe with well-organized supply process."
          },
          {
            title: "Technical Support",
            description: "Expert guidance on granite selection, installation techniques, and maintenance."
          }
        ]
      },
      values: {
        title: "Our Values",
        items: [
          {
            title: "Quality First",
            description: "Every piece of granite undergoes inspection for compliance with our stringent quality standards before leaving our facilities."
          },
          {
            title: "Sustainability",
            description: "Responsible mining practices that protect the environment for future generations."
          },
          {
            title: "Innovation",
            description: "Continuous investment in modern technology and processing techniques."
          },
          {
            title: "Customer Focus",
            description: "Forming partnerships for years through impeccable service and customer care."
          }
        ]
      },
      stats: {
        title: "EuroGranite by Numbers",
        items: [
          { number: "15+", label: "Years of Experience" },
          { number: "12", label: "Granite Varieties" },
          { number: "25+", label: "Countries Served" },
          { number: "500+", label: "Projects Completed" }
        ]
      },
      cta: {
        title: "Ready to Work with Us?",
        description: "Contact our team today to discuss your granite needs and discover the EuroGranite advantages.",
        button: "Get in Touch"
      }
    },
    ua: {
      title: "Про EuroGranite",
      subtitle: "Провідний постачальник преміум українського граніту та природного каменю",
      hero: {
        headline: "Досконалість у камені",
        description: "Понад десятиліття EuroGranite перебуває в авангарді видобутку та обробки граніту, представляючи найкращий український природний камінь на ринках Європи та за її межами."
      },
      about: {
        title: "Наша компанія",
        description: "EuroGranite спеціалізується на видобутку, обробці та постачанні преміум українського граніту. Наші кар'єри розташовані в серці гранітних регіонів України, зокрема в Житомирській, Кіровоградській та Рівненській областях. Ми пишаємося сталими практиками видобутку та доставкою кам'яних виробів виняткової якості.",
        mission: {
          title: "Наша місія",
          text: "Створювати гранітні вироби світового рівня, дотримуючись найвищих стандартів якості, сталого розвитку та турботи про клієнтів."
        },
        vision: {
          title: "Наше бачення",
          text: "Бути провідним європейським постачальником українського граніту, визнаним за інновації, надійність та екологічну відповідальність."
        }
      },
      services: {
        title: "Наші послуги",
        items: [
          {
            title: "Видобуток граніту",
            description: "Прямий видобуток з наших власних кар'єрів забезпечує контроль якості від джерела до кінцевого продукту."
          },
          {
            title: "Індивідуальна обробка",
            description: "Сучасні послуги різання, полірування та фінішної обробки відповідно до специфічних вимог проекту."
          },
          {
            title: "Європейська дистрибуція",
            description: "Доставка по всій Європі з чітко організованим процесом постачання."
          },
          {
            title: "Технічна підтримка",
            description: "Експертне керівництво з вибору граніту, технік установки та обслуговування."
          }
        ]
      },
      values: {
        title: "Наші цінності",
        items: [
          {
            title: "Якість понад усе",
            description: "Кожен шматок граніту проходить перевірку на відповідність нашим суворим стандартам якості перед відправкою з наших підприємств."
          },
          {
            title: "Сталість",
            description: "Відповідальні практики видобутку, які захищають довкілля для майбутніх поколінь."
          },
          {
            title: "Інновації",
            description: "Постійні інвестиції в сучасні технології та методи обробки."
          },
          {
            title: "Орієнтація на клієнта",
            description: "Формування партнерських зв'язків на роки через бездоганне обслуговування та турботу про клієнтів."
          }
        ]
      },
      stats: {
        title: "EuroGranite в цифрах",
        items: [
          { number: "15+", label: "Років досвіду" },
          { number: "12", label: "Сортів граніту" },
          { number: "25+", label: "Обслуговуваних країн" },
          { number: "500+", label: "Завершених проектів" }
        ]
      },
      cta: {
        title: "Готові працювати з нами?",
        description: "Зв'яжіться з нашою командою сьогодні, щоб обговорити ваші потреби в граніті та відкрити для себе переваги EuroGranite.",
        button: "Зв'язатися"
      }
    },
    de: {
      title: "Über EuroGranite",
      subtitle: "Führender Lieferant von Premium-ukrainischem Granit und Naturstein",
      hero: {
        headline: "Exzellenz in Stein",
        description: "Seit über einem Jahrzehnt steht EuroGranite an der Spitze der Granitgewinnung und -verarbeitung und bringt die besten ukrainischen Natursteine auf die Märkte Europas und darüber hinaus."
      },
      about: {
        title: "Unser Unternehmen",
        description: "EuroGranite spezialisiert sich auf Gewinnung, Verarbeitung und Lieferung von Premium-ukrainischem Granit. Unsere Steinbrüche befinden sich im Herzen der granitreichen Regionen der Ukraine, insbesondere in den Oblasten Zhytomyr, Kirovohrad und Rivne. Wir sind stolz auf nachhaltige Abbaumethoden und die Lieferung von Steinprodukten außergewöhnlicher Qualität.",
        mission: {
          title: "Unsere Mission",
          text: "Weltklasse-Granitprodukte zu schaffen und dabei höchste Standards für Qualität, Nachhaltigkeit und Kundenfürsorge einzuhalten."
        },
        vision: {
          title: "Unsere Vision",
          text: "Der führende europäische Lieferant für ukrainischen Granit zu sein, anerkannt für Innovation, Zuverlässigkeit und Umweltverantwortung."
        }
      },
      services: {
        title: "Unsere Dienstleistungen",
        items: [
          {
            title: "Granitgewinnung",
            description: "Direkter Abbau aus unseren eigenen Steinbrüchen gewährleistet Qualitätskontrolle von der Quelle bis zum Endprodukt."
          },
          {
            title: "Maßgeschneiderte Verarbeitung",
            description: "Moderne Schneide-, Polier- und Veredelungsdienstleistungen für spezifische Projektanforderungen."
          },
          {
            title: "Europäischer Vertrieb",
            description: "Lieferung in ganz Europa mit gut organisierten Lieferprozessen."
          },
          {
            title: "Technischer Support",
            description: "Fachkundige Beratung bei Granitauswahl, Installationstechniken und Wartung."
          }
        ]
      },
      values: {
        title: "Unsere Werte",
        items: [
          {
            title: "Qualität zuerst",
            description: "Jedes Granitstück wird auf Einhaltung unserer strengen Qualitätsstandards überprüft, bevor es unsere Anlagen verlässt."
          },
          {
            title: "Nachhaltigkeit",
            description: "Verantwortliche Abbaumethoden, die die Umwelt für zukünftige Generationen schützen."
          },
          {
            title: "Innovation",
            description: "Kontinuierliche Investitionen in moderne Technologie und Verarbeitungstechniken."
          },
          {
            title: "Kundenfokus",
            description: "Aufbau von Partnerschaften für Jahre durch tadellosen Service und Kundenfürsorge."
          }
        ]
      },
      stats: {
        title: "EuroGranite in Zahlen",
        items: [
          { number: "15+", label: "Jahre Erfahrung" },
          { number: "12", label: "Granitsorten" },
          { number: "25+", label: "Belieferte Länder" },
          { number: "500+", label: "Abgeschlossene Projekte" }
        ]
      },
      cta: {
        title: "Bereit, mit uns zu arbeiten?",
        description: "Kontaktieren Sie unser Team noch heute, um Ihre Granitbedürfnisse zu besprechen und die EuroGranite-Vorteile zu entdecken.",
        button: "Kontakt aufnehmen"
      }
    },
    pl: {
      title: "O EuroGranite",
      subtitle: "Wiodący dostawca premium ukraińskiego granitu i kamienia naturalnego",
      hero: {
        headline: "Doskonałość w kamieniu",
        description: "Od ponad dekady EuroGranite jest liderem w wydobyciu i przetwórstwie granitu, dostarczając najlepszy ukraiński kamień naturalny na rynki europejskie i nie tylko."
      },
      about: {
        title: "Nasza firma",
        description: "EuroGranite specjalizuje się w wydobyciu, przetwórstwie i dostawie premium ukraińskiego granitu. Nasze kamieniołomy znajdują się w sercu bogatych w granit regionów Ukrainy, szczególnie w obwodach żytomierskim, kirowohradskim i rówieńskim. Szczycimy się zrównoważonymi praktykami wydobywczymi i dostarczaniem produktów kamiennych wyjątkowej jakości.",
        mission: {
          title: "Nasza misja",
          text: "Tworzenie światowej klasy produktów granitowych przy zachowaniu najwyższych standardów jakości, zrównoważonego rozwoju i opieki nad klientem."
        },
        vision: {
          title: "Nasja wizja",
          text: "Być wiodącym europejskim dostawcą ukraińskiego granitu, uznawanym za innowacyjność, niezawodność i odpowiedzialność środowiskową."
        }
      },
      services: {
        title: "Nasze usługi",
        items: [
          {
            title: "Wydobycie granitu",
            description: "Bezpośrednie wydobycie z naszych własnych kamieniołomów zapewnia kontrolę jakości od źródła do produktu końcowego."
          },
          {
            title: "Przetwórstwo na zamówienie",
            description: "Zaawansowane usługi cięcia, polerowania i wykańczania dostosowane do specyficznych wymagań projektu."
          },
          {
            title: "Dystrybucja europejska",
            description: "Dostawa w całej Europie z dobrze zorganizowanymi procesami dostaw."
          },
          {
            title: "Wsparcie techniczne",
            description: "Eksperckie doradztwo w zakresie wyboru granitu, technik instalacji i konserwacji."
          }
        ]
      },
      values: {
        title: "Nasze wartości",
        items: [
          {
            title: "Jakość przede wszystkim",
            description: "Każdy kawałek granitu przechodzi kontrole zgodności z naszymi rygorystycznymi standardami jakości przed opuszczeniem naszych zakładów."
          },
          {
            title: "Zrównoważoność",
            description: "Odpowiedzialne praktyki wydobywcze chroniące środowisko dla przyszłych pokoleń."
          },
          {
            title: "Innowacyjność",
            description: "Ciągłe inwestycje w nowoczesną technologię i techniki przetwórstwa."
          },
          {
            title: "Koncentracja na kliencie",
            description: "Budowanie partnerstw na lata poprzez nienaganną obsługę i opiekę nad klientem."
          }
        ]
      },
      stats: {
        title: "EuroGranite w liczbach",
        items: [
          { number: "15+", label: "Lat doświadczenia" },
          { number: "12", label: "Odmian granitu" },
          { number: "25+", label: "Obsługiwanych krajów" },
          { number: "500+", label: "Ukończonych projektów" }
        ]
      },
      cta: {
        title: "Gotowi do współpracy?",
        description: "Skontaktuj się z naszym zespołem już dziś, aby omówić swoje potrzeby granitowe i odkryć zalety EuroGranite.",
        button: "Skontaktuj się"
      }
    }
  }

  const text = content[lang] || content.en

  return (
    <div className="about-page">
      <SEO
        title={seoData?.title}
        description={seoData?.description}
        keywords={seoData?.keywords}
        canonical={seoData?.canonical}
        ogImage={seoData?.ogImage}
        currentLanguage={currentLanguage}
        hreflang={seoData?.hreflang}
      />
      <Header />
      
      {/* Hero Section */}
      <section className="page-hero page-hero--compact">
        <div className="page-hero-background">
          <div className="page-hero-overlay"></div>
        </div>
        <div className="container">
          <div className="page-hero-content">
            <h1 className="page-hero-title">{text.title}</h1>
            <p className="page-hero-subtitle">{text.subtitle}</p>
          </div>
        </div>
      </section>

      {/* Company Overview */}
      <section className="about-overview">
        <div className="container">
          <div className="about-overview-content">
            <div className="about-overview-text">
              <h2 className="about-section-title">{text.hero.headline}</h2>
              <p className="about-overview-description">{text.hero.description}</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Company */}
      <section className="about-company">
        <div className="container">
          <div className="about-company-grid">
            <div className="about-company-main">
              <h2 className="about-section-title">{text.about.title}</h2>
              <p className="about-company-description">{text.about.description}</p>
            </div>
            
            <div className="about-mission-vision">
              <div className="about-mission">
                <h3 className="about-subsection-title">{text.about.mission.title}</h3>
                <p className="about-subsection-text">{text.about.mission.text}</p>
              </div>
              
              <div className="about-vision">
                <h3 className="about-subsection-title">{text.about.vision.title}</h3>
                <p className="about-subsection-text">{text.about.vision.text}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="about-services">
        <div className="container">
          <h2 className="about-section-title">{text.services.title}</h2>
          <div className="about-services-grid">
            {text.services.items.map((service, index) => (
              <div key={index} className="about-service-card">
                <h3 className="about-service-title">{service.title}</h3>
                <p className="about-service-description">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="about-values">
        <div className="container">
          <h2 className="about-section-title">{text.values.title}</h2>
          <div className="about-values-grid">
            {text.values.items.map((value, index) => (
              <div key={index} className="about-value-card">
                <h3 className="about-value-title">{value.title}</h3>
                <p className="about-value-description">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="about-stats">
        <div className="container">
          <h2 className="about-section-title">{text.stats.title}</h2>
          <div className="about-stats-grid">
            {text.stats.items.map((stat, index) => (
              <div key={index} className="about-stat-card">
                <div className="about-stat-number">{stat.number}</div>
                <div className="about-stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="about-cta">
        <div className="container">
          <div className="about-cta-content">
            <div className="about-cta-title-column">
              <h2 className="about-cta-title">{text.cta.title}</h2>
            </div>
            <div className="about-cta-content-column">
              <p className="about-cta-description">{text.cta.description}</p>
              <Link to="/contact#contact-form" className="about-cta-button">{text.cta.button}</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default About