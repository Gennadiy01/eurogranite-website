import React from 'react';

const StaticFAQ = ({ currentLanguage = 'en', placement = 'home' }) => {
  // Static FAQ data - could be moved to separate file later
  const faqData = {
    en: [
      {
        question: "What types of granite do you offer?",
        answer: "We specialize in premium Ukrainian granite including Pokost granite (dark grey), Maslavske granite (medium grey), Verde Oliva (green), Rosso Santiago (red), and many other natural stone varieties. Each type has unique characteristics and applications for construction and decoration projects."
      },
      {
        question: "Do you export granite to European countries?",
        answer: "Yes, EuroGranite has been successfully exporting high-quality granite products to over 25 European countries for more than 15 years. We have established partnerships with distributors and contractors across Germany, Poland, Czech Republic, and other EU markets."
      },
      {
        question: "What are the technical specifications of your granite?",
        answer: "Our granite products meet European quality standards with bulk density ranging from 2.6-2.8 g/cm³, compressive strength of 150-250 MPa, and water absorption less than 0.5%. All products undergo rigorous quality control and testing before shipment."
      },
      {
        question: "What granite products do you manufacture?",
        answer: "We produce a wide range of granite products including paving stones, slabs, tiles, countertops, curb stones, cobblestones, and custom architectural elements. All products can be manufactured to specific dimensions and finishes according to customer requirements."
      },
      {
        question: "How do I request a quote for granite products?",
        answer: "You can request a free quote by contacting us through our contact form, email, or phone. Please provide details about the type of granite, quantities needed, dimensions, and delivery location. Our sales team will respond within 24 hours with a detailed quotation."
      },
      {
        question: "What is your minimum order quantity?",
        answer: "Minimum order quantities vary depending on the product type and granite variety. For paving stones, the minimum is typically 100-200 m², while for slabs it's usually 50-100 m². Contact us to discuss specific requirements for your project."
      }
    ],
    ua: [
      {
        question: "Які типи граніту ви пропонуєте?",
        answer: "Ми спеціалізуємося на преміум українському граніті, включаючи граніт Покостівський (темно-сірий), граніт Маславський (середньо-сірий), Verde Oliva (зелений), Rosso Santiago (червоний) та багато інших сортів натурального каменю. Кожен тип має унікальні характеристики та застосування для будівельних і декоративних проектів."
      },
      {
        question: "Чи експортуєте ви граніт до європейських країн?",
        answer: "Так, EuroGranite успішно експортує високоякісні гранітні вироби до понад 25 європейських країн протягом більш ніж 15 років. Ми маємо встановлені партнерські відносини з дистриб'юторами та підрядниками в Німеччині, Польщі, Чехії та інших країнах ЄС."
      },
      {
        question: "Які технічні характеристики вашого граніту?",
        answer: "Наші гранітні вироби відповідають європейським стандартам якості з об'ємною вагою 2,6-2,8 г/см³, міцністю на стиск 150-250 МПа та водопоглинанням менше 0,5%. Всі вироби проходять ретельний контроль якості та тестування перед відвантаженням."
      },
      {
        question: "Які гранітні вироби ви виготовляєте?",
        answer: "Ми виробляємо широкий асортимент гранітних виробів, включаючи бруківку, плити, плитку, стільниці, бордюрний камінь, бруківку та індивідуальні архітектурні елементи. Всі вироби можуть бути виготовлені за конкретними розмірами та обробкою згідно з вимогами замовника."
      },
      {
        question: "Як запросити ціну на гранітні вироби?",
        answer: "Ви можете запросити безкоштовну пропозицію, зв'язавшись з нами через контактну форму, електронну пошту або телефон. Будь ласка, надайте деталі про тип граніту, необхідну кількість, розміри та місце доставки. Наш відділ продажів відповість протягом 24 годин з детальною пропозицією."
      },
      {
        question: "Яка ваша мінімальна кількість замовлення?",
        answer: "Мінімальна кількість замовлення варіюється залежно від типу продукту та різновиду граніту. Для бруківки мінімум зазвичай становить 100-200 м², а для плит - 50-100 м². Зв'яжіться з нами для обговорення конкретних вимог вашого проекту."
      }
    ],
    de: [
      {
        question: "Welche Granitarten bieten Sie an?",
        answer: "Wir spezialisieren uns auf hochwertigen ukrainischen Granit, einschließlich Pokost-Granit (dunkelgrau), Maslavske-Granit (mittelgrau), Verde Oliva (grün), Rosso Santiago (rot) und viele andere Natursteinvarianten. Jeder Typ hat einzigartige Eigenschaften und Anwendungen für Bau- und Dekorationsprojekte."
      },
      {
        question: "Exportieren Sie Granit in europäische Länder?",
        answer: "Ja, EuroGranite exportiert seit über 15 Jahren erfolgreich hochwertige Granitprodukte in über 25 europäische Länder. Wir haben Partnerschaften mit Distributoren und Auftragnehmern in Deutschland, Polen, Tschechien und anderen EU-Märkten etabliert."
      },
      {
        question: "Was sind die technischen Spezifikationen Ihres Granits?",
        answer: "Unsere Granitprodukte entsprechen europäischen Qualitätsstandards mit einer Rohdichte von 2,6-2,8 g/cm³, einer Druckfestigkeit von 150-250 MPa und einer Wasseraufnahme von weniger als 0,5%. Alle Produkte durchlaufen vor dem Versand eine strenge Qualitätskontrolle und Prüfung."
      },
      {
        question: "Welche Granitprodukte stellen Sie her?",
        answer: "Wir produzieren eine breite Palette von Granitprodukten, einschließlich Pflastersteinen, Platten, Fliesen, Arbeitsplatten, Randsteinen, Kopfsteinpflaster und maßgeschneiderten architektonischen Elementen. Alle Produkte können nach spezifischen Abmessungen und Oberflächen entsprechend den Kundenanforderungen hergestellt werden."
      },
      {
        question: "Wie kann ich ein Angebot für Granitprodukte anfordern?",
        answer: "Sie können ein kostenloses Angebot anfordern, indem Sie uns über unser Kontaktformular, E-Mail oder Telefon kontaktieren. Bitte geben Sie Details über den Granittyp, benötigte Mengen, Abmessungen und Lieferort an. Unser Verkaufsteam wird innerhalb von 24 Stunden mit einem detaillierten Angebot antworten."
      },
      {
        question: "Was ist Ihre Mindestbestellmenge?",
        answer: "Die Mindestbestellmengen variieren je nach Produkttyp und Granitvarietät. Für Pflastersteine beträgt das Minimum typischerweise 100-200 m², während es für Platten normalerweise 50-100 m² sind. Kontaktieren Sie uns, um spezifische Anforderungen für Ihr Projekt zu besprechen."
      }
    ],
    pl: [
      {
        question: "Jakie rodzaje granitu oferujecie?",
        answer: "Specjalizujemy się w wysokiej jakości ukraińskim granicie, w tym granit Pokost (ciemnoszary), granit Maslavske (średnioszary), Verde Oliva (zielony), Rosso Santiago (czerwony) i wiele innych odmian kamienia naturalnego. Każdy typ ma unikalne cechy i zastosowania w projektach budowlanych i dekoracyjnych."
      },
      {
        question: "Czy eksportujecie granit do krajów europejskich?",
        answer: "Tak, EuroGranite od ponad 15 lat z powodzeniem eksportuje wysokiej jakości produkty granitowe do ponad 25 krajów europejskich. Mamy ustalone partnerstwa z dystrybutorami i wykonawcami w Niemczech, Polsce, Czechach i innych rynkach UE."
      },
      {
        question: "Jakie są specyfikacje techniczne waszego granitu?",
        answer: "Nasze produkty granitowe spełniają europejskie standardy jakości z gęstością objętościową 2,6-2,8 g/cm³, wytrzymałością na ściskanie 150-250 MPa i nasiąkliwością wodną poniżej 0,5%. Wszystkie produkty przechodzą rygorystyczną kontrolę jakości i testy przed wysyłką."
      },
      {
        question: "Jakie produkty granitowe wytwarzacie?",
        answer: "Produkujemy szeroką gamę produktów granitowych, w tym kostka brukowa, płyty, płytki, blaty, krawężniki, kostka granitowa i niestandardowe elementy architektoniczne. Wszystkie produkty mogą być wykonane według określonych wymiarów i wykończeń zgodnie z wymaganiami klienta."
      },
      {
        question: "Jak mogę poprosić o wycenę produktów granitowych?",
        answer: "Możesz poprosić o bezpłatną wycenę, kontaktując się z nami przez formularz kontaktowy, e-mail lub telefon. Proszę podać szczegóły dotyczące rodzaju granitu, potrzebnych ilości, wymiarów i miejsca dostawy. Nasz zespół sprzedaży odpowie w ciągu 24 godzin ze szczegółową wyceną."
      },
      {
        question: "Jaka jest wasza minimalna ilość zamówienia?",
        answer: "Minimalne ilości zamówienia różnią się w zależności od typu produktu i odmiany granitu. Dla kostki brukowej minimum wynosi zazwyczaj 100-200 m², podczas gdy dla płyt to zwykle 50-100 m². Skontaktuj się z nami, aby omówić konkretne wymagania dla twojego projektu."
      }
    ]
  };

  const currentFAQ = faqData[currentLanguage] || faqData.en;

  // Generate FAQ Schema.org structured data
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": currentFAQ.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <>
      {/* FAQ Schema.org structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema)
        }}
      />

      {/* FAQ UI Component */}
      <section className={`static-faq-section static-faq-section--${placement}`}>
        <div className="container">
          <div className="static-faq-content">
            <h2 className="static-faq-title">
              {currentLanguage === 'ua' && 'Часті запитання'}
              {currentLanguage === 'en' && 'Frequently Asked Questions'}
              {currentLanguage === 'de' && 'Häufig gestellte Fragen'}
              {currentLanguage === 'pl' && 'Najczęściej zadawane pytania'}
            </h2>

            <div className="static-faq-list">
              {currentFAQ.map((faq, index) => (
                <details key={index} className="static-faq-item">
                  <summary className="static-faq-question">
                    {faq.question}
                    <svg
                      className="static-faq-icon"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                    >
                      <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                    </svg>
                  </summary>
                  <div className="static-faq-answer">
                    <p>{faq.answer}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default StaticFAQ;