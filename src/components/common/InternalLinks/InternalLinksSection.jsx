import React from 'react'
import { Link } from 'react-router-dom'
import useLanguageStore from '../../../stores/languageStore'
import { createLocalizedPath } from '../../../utils/urlUtils'
import './internal-links.css'

const InternalLinksSection = ({ placement = 'home' }) => {
  const { currentLanguage } = useLanguageStore()

  const linksData = {
    ua: {
      title: 'Дізнайтеся більше',
      subtitle: 'Корисна інформація про наші продукти та послуги',
      links: [
        {
          title: 'Наша продукція',
          description: 'Огляд асортименту українського граніту',
          path: '/products',
          icon: 'products'
        },
        {
          title: 'Про компанію',
          description: '15+ років досвіду у гранітній індустрії',
          path: '/about',
          icon: 'about'
        },
        {
          title: 'Галерея проектів',
          description: 'Реалізовані проекти по всій Європі',
          path: '/gallery',
          icon: 'gallery'
        },
        {
          title: 'Зв\'язатись з нами',
          description: 'Отримати консультацію та розрахунок вартості',
          path: '/contact',
          icon: 'contact'
        }
      ]
    },
    en: {
      title: 'Learn More',
      subtitle: 'Useful information about our products and services',
      links: [
        {
          title: 'Our Products',
          description: 'Overview of Ukrainian granite assortment',
          path: '/products',
          icon: 'products'
        },
        {
          title: 'About Company',
          description: '15+ years of experience in granite industry',
          path: '/about',
          icon: 'about'
        },
        {
          title: 'Project Gallery',
          description: 'Completed projects across Europe',
          path: '/gallery',
          icon: 'gallery'
        },
        {
          title: 'Contact Us',
          description: 'Get consultation and cost estimation',
          path: '/contact',
          icon: 'contact'
        }
      ]
    },
    de: {
      title: 'Mehr erfahren',
      subtitle: 'Nützliche Informationen über unsere Produkte und Dienstleistungen',
      links: [
        {
          title: 'Unsere Produkte',
          description: 'Übersicht des ukrainischen Granit-Sortiments',
          path: '/products',
          icon: 'products'
        },
        {
          title: 'Über das Unternehmen',
          description: '15+ Jahre Erfahrung in der Granitindustrie',
          path: '/about',
          icon: 'about'
        },
        {
          title: 'Projekt-Galerie',
          description: 'Abgeschlossene Projekte in ganz Europa',
          path: '/gallery',
          icon: 'gallery'
        },
        {
          title: 'Kontaktieren Sie uns',
          description: 'Beratung und Kostenvoranschlag erhalten',
          path: '/contact',
          icon: 'contact'
        }
      ]
    },
    pl: {
      title: 'Dowiedz się więcej',
      subtitle: 'Przydatne informacje o naszych produktach i usługach',
      links: [
        {
          title: 'Nasze produkty',
          description: 'Przegląd asortymentu ukraińskiego granitu',
          path: '/products',
          icon: 'products'
        },
        {
          title: 'O firmie',
          description: '15+ lat doświadczenia w branży granitowej',
          path: '/about',
          icon: 'about'
        },
        {
          title: 'Galeria projektów',
          description: 'Zrealizowane projekty w całej Europie',
          path: '/gallery',
          icon: 'gallery'
        },
        {
          title: 'Skontaktuj się z nami',
          description: 'Otrzymaj konsultację i kosztorys',
          path: '/contact',
          icon: 'contact'
        }
      ]
    }
  }

  const content = linksData[currentLanguage] || linksData.en

  // Render appropriate SVG icon based on type
  const renderIcon = (iconType) => {
    switch (iconType) {
      case 'products':
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Granite paver/brick pattern */}
            <rect x="2" y="4" width="8" height="4" rx="0.5" stroke="currentColor" strokeWidth="1.5" fill="none"/>
            <rect x="12" y="4" width="6" height="4" rx="0.5" stroke="currentColor" strokeWidth="1.5" fill="none"/>
            <rect x="20" y="4" width="2" height="4" rx="0.5" stroke="currentColor" strokeWidth="1.5" fill="none"/>
            <rect x="2" y="10" width="6" height="4" rx="0.5" stroke="currentColor" strokeWidth="1.5" fill="none"/>
            <rect x="10" y="10" width="8" height="4" rx="0.5" stroke="currentColor" strokeWidth="1.5" fill="none"/>
            <rect x="20" y="10" width="2" height="4" rx="0.5" stroke="currentColor" strokeWidth="1.5" fill="none"/>
            <rect x="2" y="16" width="8" height="4" rx="0.5" stroke="currentColor" strokeWidth="1.5" fill="none"/>
            <rect x="12" y="16" width="6" height="4" rx="0.5" stroke="currentColor" strokeWidth="1.5" fill="none"/>
            <rect x="20" y="16" width="2" height="4" rx="0.5" stroke="currentColor" strokeWidth="1.5" fill="none"/>
          </svg>
        )
      case 'about':
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 21H21V3H3V21ZM5 5H19V19H5V5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M9 9H15M9 13H15M9 17H13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )
      case 'gallery':
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" stroke="currentColor" strokeWidth="2"/>
            <circle cx="8.5" cy="8.5" r="1.5" stroke="currentColor" strokeWidth="2"/>
            <polyline points="21,15 16,10 5,21" stroke="currentColor" strokeWidth="2"/>
          </svg>
        )
      case 'contact':
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22 16.92V19C22 20.11 21.11 21 20 21C10.61 21 3 13.39 3 4C3 2.89 3.89 2 5 2H7.08C7.6 2 8.04 2.37 8.13 2.88L8.87 7.58C8.95 8.06 8.75 8.54 8.34 8.84L6.12 10.38C7.42 13.06 10.94 16.58 13.62 17.88L15.16 15.66C15.46 15.25 15.94 15.05 16.42 15.13L21.12 15.87C21.63 15.96 22 16.4 22 16.92Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )
      default:
        return null
    }
  }

  return (
    <section className={`internal-links-section internal-links-section--${placement}`}>
      <div className="container">
        <div className="internal-links-header">
          <h2 className="internal-links-title">{content.title}</h2>
          <p className="internal-links-subtitle">{content.subtitle}</p>
        </div>

        <div className="internal-links-grid">
          {content.links.map((link, index) => (
            <Link
              key={index}
              to={createLocalizedPath(link.path, currentLanguage)}
              className="internal-link-card"
              aria-label={`${link.title}: ${link.description}`}
              onClick={() => {
                // Scroll to top when navigating
                setTimeout(() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }, 100);
              }}
            >
              <div className="internal-link-icon">
                {renderIcon(link.icon)}
              </div>
              <div className="internal-link-content">
                <h3 className="internal-link-title">{link.title}</h3>
                <p className="internal-link-description">{link.description}</p>
              </div>
              <div className="internal-link-arrow">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default InternalLinksSection