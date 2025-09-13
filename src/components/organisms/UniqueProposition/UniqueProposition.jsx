import React from 'react'
import { Link } from 'react-router-dom'
import Button from '../../atoms/Button/Button'
import useLanguageStore from '../../../stores/languageStore'
import { uniquePropositionContent } from '../../../constants/uniquePropositionData'
import advantagesImg from '../../../assets/images/advantages_img.webp'

const UniqueProposition = () => {
  const { currentLanguage } = useLanguageStore()
  const content = uniquePropositionContent[currentLanguage]
  
  return (
    <section 
      className="unique-proposition-section"
      style={{
        backgroundImage: `url(${advantagesImg})`
      }}
    >
      <div className="container">
        {/* Header */}
        <div className="unique-proposition-header content-spacing-section">
          <p className="unique-proposition-subtitle content-spacing-small">
            {content.subtitle}
          </p>
          <h2 className="unique-proposition-title content-spacing-base">
            {content.title}
          </h2>
          <p className="unique-proposition-description content-spacing-medium">
            {content.description}
          </p>
        </div>

        {/* Features Grid */}
        <div className="unique-proposition-features content-spacing-section">
          {content.features.map((feature, index) => (
            <div key={index} className="unique-proposition-feature">
              <div className="unique-proposition-feature-icon">
                {/* Іконка залежно від індексу */}
                {index === 0 && (
                  <svg className="feature-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                )}
                {index === 1 && (
                  <svg className="feature-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V6a2 2 0 012-2h2M4 16v2a2 2 0 002 2h2m8-16h2a2 2 0 012 2v2m-4 12h2a2 2 0 002-2v-2M9 12h6m-6-4h6m-6 8h6" />
                  </svg>
                )}
                {index === 2 && (
                  <svg className="feature-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
                  </svg>
                )}
                {index === 3 && (
                  <svg className="feature-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                )}
              </div>
              <div className="unique-proposition-feature-content">
                <h3 className="unique-proposition-feature-title">
                  {feature.title}
                </h3>
                <p className="unique-proposition-feature-description">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="unique-proposition-cta">
          <div className="unique-proposition-cta-content">
            <p className="unique-proposition-cta-text">
              {content.callToAction}
            </p>
            <div className="unique-proposition-cta-buttons">
              <Link to="/contact#contact-form">
                <Button variant="primary" size="large">
                  {content.buttons.contact}
                </Button>
              </Link>
              <Link to="/products">
                <Button variant="outline" size="large">
                  {content.buttons.catalog}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default UniqueProposition