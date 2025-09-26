import React from 'react'
import { Helmet } from 'react-helmet-async'
import Footer from '../components/organisms/Footer/Footer'
import Button from '../components/atoms/Button/Button'
import useLanguageStore from '../stores/languageStore'
import { createLocalizedPath } from '../utils/urlUtils'

const NotFound = () => {
  const { currentLanguage } = useLanguageStore()

  // Language is already set by App.js, so we don't need to set it again here

  const content = {
    ua: {
      title: 'Сторінка не знайдена | EuroGranite',
      errorCode: '404',
      heading: 'Сторінка не знайдена',
      description: 'На жаль, сторінка, яку ви шукаєте, не існує або була переміщена.',
      subtitle: 'Можливо, ви шукали щось зі списку нижче?',
      homeLink: 'Головна сторінка',
      productsLink: 'Каталог граніту',
      contactLink: 'Контакти',
      backButton: 'Повернутися назад',
      companyName: 'EuroGranite'
    },
    en: {
      title: 'Page Not Found | EuroGranite',
      errorCode: '404',
      heading: 'Page Not Found',
      description: 'Sorry, the page you are looking for does not exist or has been moved.',
      subtitle: 'Maybe you were looking for something from the list below?',
      homeLink: 'Home Page',
      productsLink: 'Granite Catalog',
      contactLink: 'Contact',
      backButton: 'Go Back',
      companyName: 'EuroGranite'
    },
    de: {
      title: 'Seite nicht gefunden | EuroGranite',
      errorCode: '404',
      heading: 'Seite nicht gefunden',
      description: 'Entschuldigung, die gesuchte Seite existiert nicht oder wurde verschoben.',
      subtitle: 'Vielleicht haben Sie nach etwas aus der Liste unten gesucht?',
      homeLink: 'Startseite',
      productsLink: 'Granit-Katalog',
      contactLink: 'Kontakt',
      backButton: 'Zurück',
      companyName: 'EuroGranite'
    },
    pl: {
      title: 'Strona nie znaleziona | EuroGranite',
      errorCode: '404',
      heading: 'Strona nie znaleziona',
      description: 'Przepraszamy, strona której szukasz nie istnieje lub została przeniesiona.',
      subtitle: 'Może szukałeś czegoś z poniższej listy?',
      homeLink: 'Strona główna',
      productsLink: 'Katalog granitu',
      contactLink: 'Kontakt',
      backButton: 'Wróć',
      companyName: 'EuroGranite'
    }
  }

  const t = content[currentLanguage] || content.ua

  const handleGoBack = () => {
    if (window.history.length > 1) {
      window.history.back()
    } else {
      window.location.href = createLocalizedPath('', currentLanguage)
    }
  }

  return (
    <>
      <Helmet>
        <title>{t.title}</title>
        <meta name="description" content={t.description} />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      {/* Hero-style section with dark background */}
      <section style={{ backgroundColor: 'var(--neutral-900)', minHeight: '100vh' }} className="flex items-center justify-center">
        <div className="container">
          <div className="text-center" style={{ color: 'var(--white)' }}>

            {/* Error Code - Large granite-style number */}
            <div className="content-spacing-large">
              <h1 style={{
                fontSize: '8rem',
                fontWeight: '800',
                color: 'var(--accent-orange-bright)',
                textShadow: '0 4px 8px rgba(0,0,0,0.3)',
                letterSpacing: '-0.05em'
              }}>
                {t.errorCode}
              </h1>
            </div>

            {/* Main content */}
            <div className="max-w-2xl mx-auto content-spacing-section">
              {/* Company branding */}
              <div className="content-spacing-medium">
                <div style={{ color: 'var(--accent-orange-bright)', fontWeight: '700', fontSize: '1.125rem' }}>
                  {t.companyName}
                </div>
              </div>

              {/* Heading */}
              <h2 className="heading-2 content-spacing-base" style={{ color: 'var(--white)', fontSize: '2.5rem' }}>
                {t.heading}
              </h2>

              {/* Description */}
              <p className="description-text content-spacing-medium" style={{
                color: 'var(--neutral-200)',
                fontSize: '1.25rem',
                lineHeight: '1.7'
              }}>
                {t.description}
              </p>

              {/* Subtitle */}
              <p style={{
                color: 'var(--neutral-300)',
                fontWeight: '600',
                fontSize: '1.125rem'
              }} className="content-spacing-large">
                {t.subtitle}
              </p>
            </div>

            {/* Navigation buttons */}
            <div className="flex flex-col items-center gap-4 max-w-md mx-auto content-spacing-xl notfound-buttons">
              <Button
                variant="primary"
                size="large"
                onClick={() => window.location.href = createLocalizedPath('', currentLanguage)}
                className="notfound-button"
              >
                {t.homeLink}
              </Button>

              <Button
                variant="outline"
                size="large"
                onClick={() => window.location.href = createLocalizedPath('products', currentLanguage)}
                className="notfound-button"
                style={{
                  borderColor: 'var(--neutral-400)',
                  color: 'var(--white)'
                }}
              >
                {t.productsLink}
              </Button>

              <Button
                variant="outline"
                size="large"
                onClick={() => window.location.href = createLocalizedPath('contact', currentLanguage)}
                className="notfound-button"
                style={{
                  borderColor: 'var(--neutral-400)',
                  color: 'var(--white)'
                }}
              >
                {t.contactLink}
              </Button>
            </div>

            {/* Back button */}
            <div className="content-spacing-xl">
              <button
                onClick={handleGoBack}
                style={{
                  color: 'var(--accent-orange-bright)',
                  textDecoration: 'underline',
                  fontWeight: '500',
                  fontSize: '1rem',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'color 0.3s ease'
                }}
                onMouseEnter={(e) => e.target.style.color = 'var(--accent-orange-light)'}
                onMouseLeave={(e) => e.target.style.color = 'var(--accent-orange-bright)'}
              >
                ← {t.backButton}
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}

export default NotFound