import React, { useState } from 'react'
import useLanguageStore from '../../../stores/languageStore'
import FAQSchema from '../../atoms/StructuredData/FAQSchema'
import './faq-section.css'

const FAQSection = () => {
  const { currentLanguage } = useLanguageStore()
  const [openItems, setOpenItems] = useState(new Set())

  const toggleItem = (index) => {
    const newOpenItems = new Set(openItems)
    if (newOpenItems.has(index)) {
      newOpenItems.delete(index)
    } else {
      newOpenItems.add(index)
    }
    setOpenItems(newOpenItems)
  }

  const faqContent = {
    ua: {
      title: 'Часті питання',
      subtitle: 'Відповіді на найпоширеніші питання про нашу продукцію та послуги',
      questions: [
        {
          question: "Які види граніту ви пропонуєте?",
          answer: "Ми пропонуємо широкий асортимент українського граніту, включаючи Покостівський граніт, Масловський граніт, Maple Red граніт та інші високоякісні види з наших власних кар'єрів."
        },
        {
          question: "В які країни ви здійснюєте постачання?",
          answer: "Ми постачаємо нашу продукцію в 25+ країн Європи, включаючи Німеччину, Польщу, Францію, Італію та інші країни ЄС. Маємо налагоджену логістичну мережу по всій Європі."
        },
        {
          question: "Яка мінімальна партія для замовлення?",
          answer: "Мінімальна партія залежить від виду продукції та обробки. Зазвичай це 20-50 тонн готової продукції. Для точних умов зв'яжіться з нашими менеджерами."
        },
        {
          question: "Скільки часу займає виконання замовлення?",
          answer: "Термін виконання залежить від складності обробки та об'єму замовлення. Стандартні замовлення виконуються за 2-4 тижні, складні проекти можуть займати до 6-8 тижнів."
        },
        {
          question: "Надаєте ли ви сертифікати якості?",
          answer: "Так, вся наша продукція супроводжується необхідними сертифікатами якості та відповідності європейським стандартам. Ми маємо сертифікати CE та інші міжнародні стандарти."
        },
        {
          question: "Чи можете ви виконувати індивідуальні замовлення?",
          answer: "Абсолютно! Ми спеціалізуємося на виконанні індивідуальних замовлень з індивідуальними розмірами, формами та обробкою поверхні відповідно до ваших потреб."
        }
      ]
    },
    en: {
      title: 'Frequently Asked Questions',
      subtitle: 'Answers to the most common questions about our products and services',
      questions: [
        {
          question: "What types of granite do you offer?",
          answer: "We offer a wide range of Ukrainian granite including Pokost granite, Maslavske granite, Maple Red granite, and other high-quality varieties from our own quarries."
        },
        {
          question: "Which countries do you supply to?",
          answer: "We supply our products to 25+ European countries including Germany, Poland, France, Italy, and other EU countries. We have an established logistics network throughout Europe."
        },
        {
          question: "What is the minimum order quantity?",
          answer: "The minimum order depends on the type of product and processing. Typically it's 20-50 tons of finished products. Please contact our managers for exact conditions."
        },
        {
          question: "How long does order fulfillment take?",
          answer: "Delivery time depends on processing complexity and order volume. Standard orders are completed within 2-4 weeks, complex projects may take up to 6-8 weeks."
        },
        {
          question: "Do you provide quality certificates?",
          answer: "Yes, all our products are accompanied by necessary quality certificates and compliance with European standards. We have CE certificates and other international standards."
        },
        {
          question: "Can you fulfill custom orders?",
          answer: "Absolutely! We specialize in fulfilling custom orders with individual dimensions, shapes, and surface finishes according to your needs."
        }
      ]
    },
    de: {
      title: 'Häufig gestellte Fragen',
      subtitle: 'Antworten auf die häufigsten Fragen zu unseren Produkten und Dienstleistungen',
      questions: [
        {
          question: "Welche Granitarten bieten Sie an?",
          answer: "Wir bieten eine breite Palette von ukrainischem Granit, einschließlich Pokost-Granit, Maslavske-Granit, Maple Red-Granit und andere hochwertige Sorten aus unseren eigenen Steinbrüchen."
        },
        {
          question: "In welche Länder liefern Sie?",
          answer: "Wir liefern unsere Produkte in 25+ europäische Länder, darunter Deutschland, Polen, Frankreich, Italien und andere EU-Länder. Wir haben ein etabliertes Logistiknetzwerk in ganz Europa."
        },
        {
          question: "Wie hoch ist die Mindestbestellmenge?",
          answer: "Die Mindestbestellung hängt von der Produktart und Verarbeitung ab. Normalerweise sind es 20-50 Tonnen Fertigprodukte. Bitte kontaktieren Sie unsere Manager für genaue Bedingungen."
        },
        {
          question: "Wie lange dauert die Auftragserfüllung?",
          answer: "Die Lieferzeit hängt von der Verarbeitungskomplexität und dem Bestellvolumen ab. Standardbestellungen werden innerhalb von 2-4 Wochen abgeschlossen, komplexe Projekte können bis zu 6-8 Wochen dauern."
        },
        {
          question: "Stellen Sie Qualitätszertifikate bereit?",
          answer: "Ja, alle unsere Produkte werden von notwendigen Qualitätszertifikaten und Konformität mit europäischen Standards begleitet. Wir haben CE-Zertifikate und andere internationale Standards."
        },
        {
          question: "Können Sie kundenspezifische Bestellungen erfüllen?",
          answer: "Absolut! Wir spezialisieren uns auf die Erfüllung kundenspezifischer Bestellungen mit individuellen Abmessungen, Formen und Oberflächenveredelungen entsprechend Ihren Bedürfnissen."
        }
      ]
    },
    pl: {
      title: 'Często zadawane pytania',
      subtitle: 'Odpowiedzi na najczęściej zadawane pytania o nasze produkty i usługi',
      questions: [
        {
          question: "Jakie rodzaje granitu oferujecie?",
          answer: "Oferujemy szeroką gamę ukraińskiego granitu, w tym granit Pokost, granit Maslavske, granit Maple Red i inne wysokiej jakości odmiany z naszych własnych kamieniołomów."
        },
        {
          question: "Do jakich krajów dostarczacie?",
          answer: "Dostarczamy nasze produkty do 25+ krajów europejskich, w tym Niemiec, Polski, Francji, Włoch i innych krajów UE. Mamy ustaloną sieć logistyczną w całej Europie."
        },
        {
          question: "Jaka jest minimalna ilość zamówienia?",
          answer: "Minimalne zamówienie zależy od rodzaju produktu i przetwarzania. Zazwyczaj to 20-50 ton gotowych produktów. Prosimy o kontakt z naszymi menedżerami w sprawie dokładnych warunków."
        },
        {
          question: "Jak długo trwa realizacja zamówienia?",
          answer: "Czas dostawy zależy od złożoności przetwarzania i objętości zamówienia. Standardowe zamówienia są realizowane w ciągu 2-4 tygodni, złożone projekty mogą trwać do 6-8 tygodni."
        },
        {
          question: "Czy zapewniacie certyfikaty jakości?",
          answer: "Tak, wszystkie nasze produkty są accompagnowane niezbędnymi certyfikatami jakości i zgodnością z europejskimi standardami. Mamy certyfikaty CE i inne międzynarodowe standardy."
        },
        {
          question: "Czy możecie realizować zamówienia niestandardowe?",
          answer: "Absolutnie! Specjalizujemy się w realizacji zamówień niestandardowych o indywidualnych wymiarach, kształtach i wykończeniu powierzchni zgodnie z Waszymi potrzebami."
        }
      ]
    }
  }

  const content = faqContent[currentLanguage] || faqContent.en

  return (
    <section className="faq-section">
      <FAQSchema />
      <div className="container">
        <div className="faq-header">
          <h2 className="faq-title">{content.title}</h2>
          <p className="faq-subtitle">{content.subtitle}</p>
        </div>

        <div className="faq-list">
          {content.questions.map((item, index) => (
            <div
              key={index}
              className={`faq-item ${openItems.has(index) ? 'faq-item--open' : ''}`}
              id={`faq-${index + 1}`}
            >
              <button
                className="faq-question"
                onClick={() => toggleItem(index)}
                aria-expanded={openItems.has(index)}
                aria-controls={`faq-answer-${index}`}
              >
                <span className="faq-question-text">{item.question}</span>
                <span className="faq-toggle-icon">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 6L8 10L4 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </button>

              <div
                className="faq-answer-wrapper"
                id={`faq-answer-${index}`}
              >
                <div className="faq-answer">
                  <p>{item.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FAQSection