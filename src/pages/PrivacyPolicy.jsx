import React from 'react'
import useLanguageStore from '../stores/languageStore'
import { Helmet } from 'react-helmet-async'
import { BASE_URL } from '../config/siteConfig'
import './About.css'

const PrivacyPolicy = () => {
  const { currentLanguage } = useLanguageStore()

  const privacyContent = {
    ua: {
      title: 'Політика конфіденційності',
      sections: [
        {
          title: 'Вступ',
          content: 'Ця Політика конфіденційності описує, як ми збираємо, використовуємо, зберігаємо та захищаємо ваші персональні дані, коли ви відвідуєте наш вебсайт або взаємодієте з нами через форму зворотного зв\'язку. Ми прагнемо забезпечити захист вашої конфіденційності та відповідність вимогам законодавства, зокрема Закону України «Про захист персональних даних».'
        },
        {
          title: 'Які дані ми збираємо?',
          content: 'Ми можемо збирати такі персональні дані, коли ви заповнюєте форму на нашому сайті:',
          list: [
            'Ім\'я',
            'Адреса електронної пошти',
            'Номер телефону',
            'Текст вашого повідомлення'
          ],
          extra: 'Ці дані надаються вами добровільно через форму зворотного зв\'язку.'
        },
        {
          title: 'Для чого ми використовуємо ваші дані?',
          content: 'Ми обробляємо ваші персональні дані для таких цілей:',
          list: [
            'Надання зворотного зв\'язку електронною поштою або телефоном',
            'Обробка вашого запиту щодо придбання наших товарів чи послуг',
            'Надсилання інформації про наші продукти чи послуги (за вашої згоди)'
          ]
        },
        {
          title: 'Правова основа обробки даних',
          content: 'Ми обробляємо ваші дані на основі:',
          list: [
            'Вашої згоди, наданої через форму на сайті',
            'Необхідності виконання договору, якщо ви замовляєте наші товари чи послуги'
          ]
        },
        {
          title: 'Як довго ми зберігаємо ваші дані?',
          content: 'Ми зберігаємо ваші персональні дані лише протягом періоду, необхідного для досягнення цілей, описаних у цій Політиці, або відповідно до вимог законодавства. Зазвичай дані зберігаються не довше 3 років з моменту останньої взаємодії з вами, якщо інше не передбачено законом.'
        },
        {
          title: 'Передача даних третім особам',
          content: 'Ми не передаємо ваші персональні дані третім особам, за винятком випадків, коли:',
          list: [
            'Це необхідно для виконання вашого замовлення (наприклад, службам доставки)',
            'Цього вимагає законодавство'
          ],
          extra: 'У таких випадках ми забезпечуємо, щоб треті особи дотримувалися належних заходів захисту даних.'
        },
        {
          title: 'Ваші права',
          content: 'Ви маєте такі права щодо ваших персональних даних:',
          list: [
            'Право на доступ до даних',
            'Право на виправлення неточних даних',
            'Право на видалення даних',
            'Право на обмеження обробки даних',
            'Право на відкликання згоди в будь-який час'
          ],
          extra: 'Для реалізації цих прав звертайтеся до нас за контактними даними, зазначеними нижче.'
        },
        {
          title: 'Захист ваших даних',
          content: 'Ми вживаємо технічні та організаційні заходи для захисту ваших даних, зокрема:',
          list: [
            'Використання шифрування для передачі даних',
            'Обмеження доступу до даних лише уповноваженим особам',
            'Регулярне оновлення систем безпеки'
          ]
        },
        {
          title: 'Контактна інформація',
          content: 'Якщо у вас є запитання щодо цієї Політики конфіденційності або обробки ваших даних, зв\'яжіться з нами:',
          contact: {
            email: 'info@euro-granite.com',
            phone: '+380733864041',
            address: 'Україна, 10001, Житомир, Майдан Згоди, буд. 6, офіс 7'
          }
        },
        {
          title: 'Зміни до Політики конфіденційності',
          content: 'Ми можемо періодично оновлювати цю Політику. У разі суттєвих змін ми повідомимо вас через наш вебсайт або електронною поштою.',
          extra: 'Останнє оновлення: 26 вересня 2025 року.'
        }
      ]
    },
    en: {
      title: 'Privacy Policy',
      sections: [
        {
          title: 'Introduction',
          content: 'This Privacy Policy describes how we collect, use, store and protect your personal data when you visit our website or interact with us through our contact form. We strive to ensure the protection of your privacy and compliance with legislation, including the Ukrainian Law "On Personal Data Protection".'
        },
        {
          title: 'What data do we collect?',
          content: 'We may collect the following personal data when you fill out the form on our website:',
          list: [
            'Name',
            'Email address',
            'Phone number',
            'Text of your message'
          ],
          extra: 'This data is provided by you voluntarily through the contact form.'
        },
        {
          title: 'What do we use your data for?',
          content: 'We process your personal data for the following purposes:',
          list: [
            'Providing feedback via email or phone',
            'Processing your request regarding the purchase of our goods or services',
            'Sending information about our products or services (with your consent)'
          ]
        },
        {
          title: 'Legal basis for data processing',
          content: 'We process your data based on:',
          list: [
            'Your consent provided through the form on the website',
            'The necessity of contract performance if you order our goods or services'
          ]
        },
        {
          title: 'How long do we keep your data?',
          content: 'We keep your personal data only for the period necessary to achieve the purposes described in this Policy, or in accordance with the requirements of the law. Usually, data is stored for no more than 3 years from the moment of last interaction with you, unless otherwise provided by law.'
        },
        {
          title: 'Transfer of data to third parties',
          content: 'We do not transfer your personal data to third parties, except in cases when:',
          list: [
            'It is necessary to fulfill your order (for example, to delivery services)',
            'This is required by law'
          ],
          extra: 'In such cases, we ensure that third parties comply with appropriate data protection measures.'
        },
        {
          title: 'Your rights',
          content: 'You have the following rights regarding your personal data:',
          list: [
            'Right to access data',
            'Right to correct inaccurate data',
            'Right to delete data',
            'Right to restrict data processing',
            'Right to withdraw consent at any time'
          ],
          extra: 'To exercise these rights, please contact us using the contact details provided below.'
        },
        {
          title: 'Protection of your data',
          content: 'We take technical and organizational measures to protect your data, including:',
          list: [
            'Using encryption for data transmission',
            'Restricting access to data to authorized persons only',
            'Regular security system updates'
          ]
        },
        {
          title: 'Contact information',
          content: 'If you have questions about this Privacy Policy or the processing of your data, please contact us:',
          contact: {
            email: 'info@euro-granite.com',
            phone: '+380733864041',
            address: 'Ukraine, 10001, Zhytomyr, Maidan Zgody, build. 6, office 7'
          }
        },
        {
          title: 'Changes to Privacy Policy',
          content: 'We may periodically update this Policy. In case of significant changes, we will notify you through our website or by email.',
          extra: 'Last updated: September 26, 2025.'
        }
      ]
    },
    de: {
      title: 'Datenschutzrichtlinie',
      sections: [
        {
          title: 'Einführung',
          content: 'Diese Datenschutzrichtlinie beschreibt, wie wir Ihre persönlichen Daten sammeln, verwenden, speichern und schützen, wenn Sie unsere Website besuchen oder über unser Kontaktformular mit uns interagieren. Wir sind bestrebt, den Schutz Ihrer Privatsphäre und die Einhaltung der Gesetzgebung, einschließlich des ukrainischen Gesetzes "Über den Schutz personenbezogener Daten", zu gewährleisten.'
        },
        {
          title: 'Welche Daten sammeln wir?',
          content: 'Wir können die folgenden persönlichen Daten sammeln, wenn Sie das Formular auf unserer Website ausfüllen:',
          list: [
            'Name',
            'E-Mail-Adresse',
            'Telefonnummer',
            'Text Ihrer Nachricht'
          ],
          extra: 'Diese Daten werden von Ihnen freiwillig über das Kontaktformular bereitgestellt.'
        },
        {
          title: 'Wofür verwenden wir Ihre Daten?',
          content: 'Wir verarbeiten Ihre persönlichen Daten für folgende Zwecke:',
          list: [
            'Bereitstellung von Feedback per E-Mail oder Telefon',
            'Bearbeitung Ihrer Anfrage bezüglich des Kaufs unserer Waren oder Dienstleistungen',
            'Versendung von Informationen über unsere Produkte oder Dienstleistungen (mit Ihrer Zustimmung)'
          ]
        },
        {
          title: 'Rechtsgrundlage für die Datenverarbeitung',
          content: 'Wir verarbeiten Ihre Daten auf Basis von:',
          list: [
            'Ihrer über das Formular auf der Website erteilten Einwilligung',
            'Der Notwendigkeit der Vertragserfüllung, wenn Sie unsere Waren oder Dienstleistungen bestellen'
          ]
        },
        {
          title: 'Wie lange speichern wir Ihre Daten?',
          content: 'Wir speichern Ihre persönlichen Daten nur für den Zeitraum, der zur Erreichung der in dieser Richtlinie beschriebenen Zwecke erforderlich ist, oder gemäß den gesetzlichen Anforderungen. In der Regel werden Daten nicht länger als 3 Jahre ab dem Zeitpunkt der letzten Interaktion mit Ihnen gespeichert, sofern gesetzlich nicht anders vorgesehen.'
        },
        {
          title: 'Übertragung von Daten an Dritte',
          content: 'Wir übertragen Ihre persönlichen Daten nicht an Dritte, außer in Fällen, in denen:',
          list: [
            'Dies zur Erfüllung Ihrer Bestellung erforderlich ist (z.B. an Lieferdienste)',
            'Dies gesetzlich vorgeschrieben ist'
          ],
          extra: 'In solchen Fällen stellen wir sicher, dass Dritte angemessene Datenschutzmaßnahmen einhalten.'
        },
        {
          title: 'Ihre Rechte',
          content: 'Sie haben folgende Rechte bezüglich Ihrer persönlichen Daten:',
          list: [
            'Recht auf Datenzugriff',
            'Recht auf Berichtigung unrichtiger Daten',
            'Recht auf Löschung von Daten',
            'Recht auf Einschränkung der Datenverarbeitung',
            'Recht auf jederzeitigen Widerruf der Einwilligung'
          ],
          extra: 'Zur Ausübung dieser Rechte kontaktieren Sie uns bitte unter den unten angegebenen Kontaktdaten.'
        },
        {
          title: 'Schutz Ihrer Daten',
          content: 'Wir ergreifen technische und organisatorische Maßnahmen zum Schutz Ihrer Daten, einschließlich:',
          list: [
            'Verwendung von Verschlüsselung für die Datenübertragung',
            'Beschränkung des Datenzugriffs nur auf autorisierte Personen',
            'Regelmäßige Aktualisierung der Sicherheitssysteme'
          ]
        },
        {
          title: 'Kontaktinformationen',
          content: 'Wenn Sie Fragen zu dieser Datenschutzrichtlinie oder zur Verarbeitung Ihrer Daten haben, kontaktieren Sie uns bitte:',
          contact: {
            email: 'info@euro-granite.com',
            phone: '+380733864041',
            address: 'Ukraine, 10001, Zhytomyr, Maidan Zgody, Geb. 6, Büro 7'
          }
        },
        {
          title: 'Änderungen der Datenschutzrichtlinie',
          content: 'Wir können diese Richtlinie regelmäßig aktualisieren. Bei wesentlichen Änderungen werden wir Sie über unsere Website oder per E-Mail benachrichtigen.',
          extra: 'Letzte Aktualisierung: 26. September 2025.'
        }
      ]
    },
    pl: {
      title: 'Polityka Prywatności',
      sections: [
        {
          title: 'Wprowadzenie',
          content: 'Ta Polityka Prywatności opisuje, jak gromadzimy, wykorzystujemy, przechowujemy i chronimy Twoje dane osobowe, gdy odwiedzasz naszą stronę internetową lub kontaktujesz się z nami za pomocą formularza kontaktowego. Dążymy do zapewnienia ochrony Twojej prywatności i zgodności z przepisami prawa, w tym ukraińską ustawą "O ochronie danych osobowych".'
        },
        {
          title: 'Jakie dane gromadzimy?',
          content: 'Możemy gromadzić następujące dane osobowe, gdy wypełniasz formularz na naszej stronie internetowej:',
          list: [
            'Imię',
            'Adres e-mail',
            'Numer telefonu',
            'Treść Twojej wiadomości'
          ],
          extra: 'Te dane są przekazywane przez Ciebie dobrowolnie za pośrednictwem formularza kontaktowego.'
        },
        {
          title: 'Do czego wykorzystujemy Twoje dane?',
          content: 'Przetwarzamy Twoje dane osobowe w następujących celach:',
          list: [
            'Udzielanie informacji zwrotnych drogą e-mailową lub telefoniczną',
            'Przetwarzanie Twojego zapytania dotyczącego zakupu naszych towarów lub usług',
            'Wysyłanie informacji o naszych produktach lub usługach (za Twoją zgodą)'
          ]
        },
        {
          title: 'Podstawa prawna przetwarzania danych',
          content: 'Przetwarzamy Twoje dane na podstawie:',
          list: [
            'Twojej zgody udzielonej za pośrednictwem formularza na stronie internetowej',
            'Konieczności wykonania umowy, jeśli zamawiasz nasze towary lub usługi'
          ]
        },
        {
          title: 'Jak długo przechowujemy Twoje dane?',
          content: 'Przechowujemy Twoje dane osobowe tylko przez okres niezbędny do osiągnięcia celów opisanych w tej Polityce lub zgodnie z wymogami prawa. Zazwyczaj dane są przechowywane nie dłużej niż 3 lata od momentu ostatniej interakcji z Tobą, chyba że prawo stanowi inaczej.'
        },
        {
          title: 'Przekazywanie danych stronom trzecim',
          content: 'Nie przekazujemy Twoich danych osobowych stronom trzecim, z wyjątkiem przypadków, gdy:',
          list: [
            'Jest to konieczne do realizacji Twojego zamówienia (np. firmom kurierskim)',
            'Wymaga tego prawo'
          ],
          extra: 'W takich przypadkach zapewniamy, że strony trzecie przestrzegają odpowiednich środków ochrony danych.'
        },
        {
          title: 'Twoje prawa',
          content: 'Masz następujące prawa dotyczące Twoich danych osobowych:',
          list: [
            'Prawo dostępu do danych',
            'Prawo do sprostowania nieprawidłowych danych',
            'Prawo do usunięcia danych',
            'Prawo do ograniczenia przetwarzania danych',
            'Prawo do wycofania zgody w dowolnym momencie'
          ],
          extra: 'Aby skorzystać z tych praw, skontaktuj się z nami, korzystając z danych kontaktowych podanych poniżej.'
        },
        {
          title: 'Ochrona Twoich danych',
          content: 'Podejmujemy techniczne i organizacyjne środki w celu ochrony Twoich danych, w tym:',
          list: [
            'Używanie szyfrowania do przesyłania danych',
            'Ograniczenie dostępu do danych tylko dla upoważnionych osób',
            'Regularne aktualizacje systemów bezpieczeństwa'
          ]
        },
        {
          title: 'Informacje kontaktowe',
          content: 'Jeśli masz pytania dotyczące tej Polityki Prywatności lub przetwarzania Twoich danych, skontaktuj się z nami:',
          contact: {
            email: 'info@euro-granite.com',
            phone: '+380733864041',
            address: 'Ukraina, 10001, Żytomierz, Plac Zgody, bud. 6, biuro 7'
          }
        },
        {
          title: 'Zmiany w Polityce Prywatności',
          content: 'Możemy okresowo aktualizować tę Politykę. W przypadku istotnych zmian powiadomimy Cię za pośrednictwem naszej strony internetowej lub pocztą elektroniczną.',
          extra: 'Ostatnia aktualizacja: 26 września 2025 r.'
        }
      ]
    }
  }

  const content = privacyContent[currentLanguage] || privacyContent.en

  return (
    <>
      <Helmet>
        <title>{content.title} - EuroGranite</title>
        <meta name="description" content="EuroGranite privacy policy - how we collect, use and protect your personal data when you contact us through our website." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={`${BASE_URL}/${currentLanguage}/privacy-policy/`} />
      </Helmet>

      <div className="about-page">
        {/* Hero Section */}
        <section className="page-hero page-hero--compact">
          <div className="page-hero-background"></div>
          <div className="page-hero-overlay"></div>
          <div className="container">
            <div className="page-hero-content">
              <h1 className="page-hero-title">{content.title}</h1>
              <p className="page-hero-subtitle">
                {currentLanguage === 'ua' ? 'Інформація про збір, використання та захист ваших персональних даних' :
                 currentLanguage === 'de' ? 'Informationen über die Erhebung, Nutzung und den Schutz Ihrer persönlichen Daten' :
                 currentLanguage === 'pl' ? 'Informacje o gromadzeniu, wykorzystywaniu i ochronie Twoich danych osobowych' :
                 'Information about collection, use and protection of your personal data'}
              </p>
            </div>
          </div>
        </section>

        {/* Privacy Policy Content */}
        <section className="about-overview">
          <div className="container">
            <div className="privacy-policy-content">
              {content.sections.map((section, index) => (
                <div key={index} className="privacy-policy-section" style={{ marginBottom: '3rem' }}>
                  <h2 className="about-subsection-title" style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>
                    {section.title}
                  </h2>

                  <div className="about-subsection-text" style={{ marginBottom: '1rem' }}>
                    {section.content}
                  </div>

                  {section.list && (
                    <ul style={{
                      marginLeft: '1.5rem',
                      marginBottom: '1rem',
                      listStyleType: 'disc',
                      color: 'var(--neutral-600)'
                    }}>
                      {section.list.map((item, idx) => (
                        <li key={idx} style={{ marginBottom: '0.5rem', fontSize: '1.125rem' }}>
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}

                  {section.extra && (
                    <div className="about-subsection-text" style={{ fontStyle: 'italic' }}>
                      {section.extra}
                    </div>
                  )}

                  {section.contact && (
                    <div style={{
                      backgroundColor: 'var(--neutral-100)',
                      padding: '1.5rem',
                      borderRadius: '0.5rem',
                      marginTop: '1rem'
                    }}>
                      <div style={{ marginBottom: '0.75rem' }}>
                        <strong>
                          {currentLanguage === 'ua' ? 'Електронна пошта:' :
                           currentLanguage === 'de' ? 'E-Mail:' :
                           currentLanguage === 'pl' ? 'E-mail:' :
                           'Email:'}
                        </strong>
                        <a href={`mailto:${section.contact.email}`} style={{
                          color: 'var(--accent-orange)',
                          textDecoration: 'none',
                          marginLeft: '0.5rem'
                        }}>
                          {section.contact.email}
                        </a>
                      </div>
                      <div style={{ marginBottom: '0.75rem' }}>
                        <strong>
                          {currentLanguage === 'ua' ? 'Телефон:' :
                           currentLanguage === 'de' ? 'Telefon:' :
                           currentLanguage === 'pl' ? 'Telefon:' :
                           'Phone:'}
                        </strong>
                        <a href={`tel:${section.contact.phone}`} style={{
                          color: 'var(--accent-orange)',
                          textDecoration: 'none',
                          marginLeft: '0.5rem'
                        }}>
                          {section.contact.phone}
                        </a>
                      </div>
                      <div>
                        <strong>
                          {currentLanguage === 'ua' ? 'Поштова адреса:' :
                           currentLanguage === 'de' ? 'Postanschrift:' :
                           currentLanguage === 'pl' ? 'Adres pocztowy:' :
                           'Address:'}
                        </strong>
                        <span style={{ marginLeft: '0.5rem' }}>{section.contact.address}</span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

export default PrivacyPolicy