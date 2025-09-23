import React, { useEffect } from 'react'
import useLanguageStore from '../stores/languageStore'
import { getSEOData } from '../constants/seoData'
import Header from '../components/organisms/Header/Header'
import ContactForm from '../components/molecules/ContactForm'
import SEO from '../components/atoms/SEO'
import { contactInfoContent } from '../constants/contactFormData'
import { OrganizationSchema, LocalBusinessSchema, BreadcrumbSchema } from '../components/atoms/StructuredData'
import Footer from '../components/organisms/Footer/Footer'

const Contact = () => {
  const { currentLanguage } = useLanguageStore()
  const seoData = getSEOData('contact', currentLanguage)

  // Language is managed by App.js for hash routing, no need to set it here

  useEffect(() => {
    // Check for focus parameter and scroll to contact form
    const urlParams = new URLSearchParams(window.location.search)
    const shouldFocus = urlParams.get('focus') === 'form' || window.location.hash === '#contact-form'

    if (shouldFocus) {
      const isMobile = window.innerWidth <= 768 || 'ontouchstart' in window
      const isDevToolsMobile = window.innerWidth <= 768 && !('ontouchstart' in window) // Chrome DevTools mobile simulation

      const scrollToForm = () => {
        const element = document.getElementById('contact-form')
        if (element) {
          const headerHeight = isMobile || isDevToolsMobile ? 80 : 96
          const elementPosition = element.offsetTop - headerHeight - 20

          window.scrollTo({
            top: elementPosition,
            behavior: 'smooth'
          })
        }
      }

      // Scroll immediately without waiting
      setTimeout(scrollToForm, 100)

      const nameInput = document.getElementById('name')
      if (nameInput) {
        if (isDevToolsMobile) {
          // Chrome DevTools mobile simulation - try direct focus first, then visual indicator
          setTimeout(() => {
            try {
              nameInput.focus()
              // If focus worked, no need for animation
              console.log('DevTools: Focus successful')
            } catch (e) {
              console.log('DevTools: Focus failed, showing visual indicator')
              // Fall back to visual indicator
              showVisualIndicator(nameInput)
            }

            // Check if focus actually worked after a short delay
            setTimeout(() => {
              if (document.activeElement !== nameInput) {
                console.log('DevTools: Focus verification failed, showing visual indicator')
                showVisualIndicator(nameInput)
              }
            }, 200)
          }, 800)
        } else if (isMobile) {
          // Real mobile device - only visual indicator
          setTimeout(() => {
            showVisualIndicator(nameInput)
          }, 1000)
        } else {
          // Desktop: Direct focus
          setTimeout(() => {
            nameInput.focus()
          }, 800)
        }
      }
    }

    function showVisualIndicator(nameInput) {
      // Add pulsing animation to indicate where to tap
      nameInput.style.boxShadow = '0 0 0 4px rgba(255, 165, 0, 0.5)'
      nameInput.style.transition = 'box-shadow 0.3s ease'
      nameInput.style.animation = 'pulse 2s infinite'

      // Add CSS animation if not exists
      if (!document.getElementById('pulse-animation')) {
        const style = document.createElement('style')
        style.id = 'pulse-animation'
        style.textContent = `
          @keyframes pulse {
            0% { box-shadow: 0 0 0 0 rgba(255, 165, 0, 0.7); }
            70% { box-shadow: 0 0 0 10px rgba(255, 165, 0, 0); }
            100% { box-shadow: 0 0 0 0 rgba(255, 165, 0, 0); }
          }
        `
        document.head.appendChild(style)
      }

      // Remove animation after user interacts
      const removeAnimation = () => {
        nameInput.style.animation = ''
        nameInput.style.boxShadow = ''
        nameInput.removeEventListener('focus', removeAnimation)
        nameInput.removeEventListener('touchstart', removeAnimation)
        nameInput.removeEventListener('click', removeAnimation)
      }

      nameInput.addEventListener('focus', removeAnimation)
      nameInput.addEventListener('touchstart', removeAnimation)
      nameInput.addEventListener('click', removeAnimation)

      // Remove animation after 10 seconds
      setTimeout(removeAnimation, 10000)
    }
  }, [])
  
  const pageContent = {
    en: {
      title: 'Contact Us',
      subtitle: 'Get in touch with our team for your granite project needs',
      address: 'Ukraine, 10001, Zhytomyr, Maidan Zgody, build. 6, office 7',
      phone: '+380733864041',
      email: 'info@euro-granite.com'
    },
    ua: {
      title: 'Контакти',
      subtitle: 'Зв\'яжіться з нашою командою для вашого гранітного проекту',
      address: 'Україна, 10001, Житомир, Майдан Згоди, буд. 6, офіс 7',
      phone: '+380733864041',
      email: 'info@euro-granite.com'
    },
    de: {
      title: 'Kontakt',
      subtitle: 'Kontaktieren Sie unser Team für Ihre Granit-Projektanforderungen',
      address: 'Ukraine, 10001, Zhytomyr, Maidan Zgody, Geb. 6, Büro 7',
      phone: '+380733864041',
      email: 'info@euro-granite.com'
    },
    pl: {
      title: 'Kontakt',
      subtitle: 'Skontaktuj się z naszym zespołem w sprawie potrzeb projektu granitowego',
      address: 'Ukraina, 10001, Żytomierz, Plac Zgody, bud. 6, biuro 7',
      phone: '+380733864041',
      email: 'info@euro-granite.com'
    }
  }
  
  const content = pageContent[currentLanguage] || pageContent.en
  const infoContent = contactInfoContent[currentLanguage] || contactInfoContent.en

  return (
    <>
      <div className="contact-page">
      <SEO
        title={seoData?.title}
        description={seoData?.description}
        keywords={seoData?.keywords}
        canonical={seoData?.canonical}
        ogImage={seoData?.ogImage}
        currentLanguage={currentLanguage}
        hreflang={seoData?.hreflang}
      />
      <OrganizationSchema />
      <LocalBusinessSchema />
      <BreadcrumbSchema />
      <Header />
      <main>
        <section className="page-hero page-hero--light">
          <div className="page-hero-background"></div>
          <div className="container">
            <div className="page-hero-content">
              <h1 className="page-hero-title">
                {content.title}
              </h1>
              <p className="page-hero-subtitle">
                {content.subtitle}
              </p>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container px-4 md:px-6 lg:px-8">
            <div className="grid md-grid-cols-1 lg-grid-cols-3 gap-4 md:gap-6 lg:gap-8 max-w-6xl mx-auto lg-contact-layout">
              {/* Contact Information */}
              <div className="bg-white p-4 md:p-6 lg:p-8 rounded-2xl shadow-lg">
                <h2 className="heading-3 mb-6 text-neutral-900">
                  {infoContent.title}
                </h2>
                
                <div className="space-y-6">
                  {/* Address */}
                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-accent-orange mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <div>
                      <h3 className="text-sm font-semibold text-neutral-700 mb-1">
                        {currentLanguage === 'ua' ? 'Адреса' : currentLanguage === 'de' ? 'Adresse' : currentLanguage === 'pl' ? 'Adres' : 'Address'}
                      </h3>
                      <p className="text-neutral-600">{content.address}</p>
                    </div>
                  </div>
                  
                  {/* Phone */}
                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-accent-orange mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <div>
                      <h3 className="text-sm font-semibold text-neutral-700 mb-1">
                        {currentLanguage === 'ua' ? 'Телефон' : currentLanguage === 'de' ? 'Telefon' : currentLanguage === 'pl' ? 'Telefon' : 'Phone'}
                      </h3>
                      <a href={`tel:${content.phone}`} className="text-neutral-600 hover:text-accent-orange transition-colors">
                        {content.phone}
                      </a>
                    </div>
                  </div>
                  
                  {/* Email */}
                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-accent-orange mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 7.89a2 2 0 002.83 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <div>
                      <h3 className="text-sm font-semibold text-neutral-700 mb-1">Email</h3>
                      <a href={`mailto:${content.email}`} className="text-neutral-600 hover:text-accent-orange transition-colors">
                        {content.email}
                      </a>
                    </div>
                  </div>

                  {/* Working Hours */}
                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-accent-orange mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <h3 className="text-sm font-semibold text-neutral-700 mb-1">
                        {infoContent.workingHours}
                      </h3>
                      <p className="text-neutral-600">{infoContent.workingTime}</p>
                    </div>
                  </div>

                  {/* Social Media */}
                  <div className="pt-4 border-t border-neutral-200">
                    <h3 className="text-sm font-semibold text-neutral-700 mb-3">
                      {infoContent.socialMedia}
                    </h3>
                    <div className="flex gap-3">
                      <a 
                        href={`viber://chat?number=${content.phone}`} 
                        className="text-accent-orange hover:text-neutral-900 transition-colors no-underline"
                        aria-label="Viber"
                        title="Viber"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M11.398.002c-6.559 0-11.88 5.32-11.88 11.88 0 2.089.545 4.049 1.497 5.751l-1.497 5.751 5.751-1.497c1.702.952 3.662 1.497 5.751 1.497 6.559 0 11.88-5.32 11.88-11.88-.001-6.559-5.321-11.879-11.88-11.879zm5.58 16.87c-.434.617-1.026 1.094-1.722 1.325-.319.106-.735.191-1.233.191-.357 0-.79-.043-1.317-.172-1.524-.373-3.375-1.348-5.261-3.235-1.887-1.887-2.862-3.738-3.235-5.261-.129-.527-.172-.96-.172-1.317 0-.498.085-.914.191-1.233.231-.696.708-1.288 1.325-1.722.26-.183.434-.183.651-.183.216 0 .391 0 .564.086.173.086.26.259.39.564.13.305.434.956.52 1.152.086.195.173.326.173.52 0 .26-.13.564-.304.825-.173.26-.325.434-.499.651-.173.216-.347.434-.217.825.129.39.564 1.194 1.325 1.955.761.761 1.564 1.195 1.955 1.325.39.13.608-.044.825-.217.216-.173.434-.325.651-.499.26-.173.564-.304.825-.304.195 0 .325.087.52.173.195.087.847.39 1.152.52.305.13.478.217.564.39.087.173.087.348.087.564 0 .217 0 .391-.183.651z"/>
                        </svg>
                      </a>
                      <a 
                        href={`https://wa.me/${content.phone.replace(/[^\d]/g, '')}`} 
                        className="text-accent-orange hover:text-neutral-900 transition-colors no-underline"
                        aria-label="WhatsApp"
                        title="WhatsApp"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Contact Form */}
              <div id="contact-form">
                <ContactForm />
              </div>
            </div>
          </div>
        </section>
      </main>
      </div>
      <Footer />
    </>
  )
}

export default Contact