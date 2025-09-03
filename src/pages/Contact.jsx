import React from 'react'
import Header from '../components/organisms/Header/Header'
import useLanguageStore from '../stores/languageStore'

const Contact = () => {
  const { currentLanguage } = useLanguageStore()
  
  const pageContent = {
    en: {
      title: 'Contact Us',
      subtitle: 'Get in touch with our team for your granite project needs',
      address: '123 Industrial Avenue, Kyiv, Ukraine 01001',
      phone: '+38 044 123 45 67',
      email: 'sales@euro-granite.com'
    },
    ua: {
      title: 'Контакти',
      subtitle: 'Зв\'яжіться з нашою командою для вашого гранітного проекту',
      address: 'вул. Промислова, 123, Київ, Україна 01001',
      phone: '+38 044 123 45 67',
      email: 'sales@euro-granite.com'
    },
    de: {
      title: 'Kontakt',
      subtitle: 'Kontaktieren Sie unser Team für Ihre Granit-Projektanforderungen',
      address: 'Industriestraße 123, Kiew, Ukraine 01001',
      phone: '+38 044 123 45 67',
      email: 'sales@euro-granite.com'
    },
    pl: {
      title: 'Kontakt',
      subtitle: 'Skontaktuj się z naszym zespołem w sprawie potrzeb projektu granitowego',
      address: 'ul. Przemysłowa 123, Kijów, Ukraina 01001',
      phone: '+38 044 123 45 67',
      email: 'sales@euro-granite.com'
    }
  }
  
  const content = pageContent[currentLanguage] || pageContent.en

  return (
    <div className="contact-page">
      <Header />
      <main className="pt-24">
        <section className="py-20 bg-neutral-50">
          <div className="container">
            <div className="text-center mb-16">
              <h1 className="heading-2 mb-6 text-neutral-900 tracking-tight">
                {content.title}
              </h1>
              <p className="description-text text-neutral-600 max-w-4xl mx-auto leading-relaxed">
                {content.subtitle}
              </p>
            </div>
            
            <div className="grid md-grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Contact Information */}
              <div className="bg-white p-8 rounded-2xl shadow-lg">
                <h2 className="text-2xl font-bold text-neutral-900 mb-6">
                  {currentLanguage === 'ua' ? 'Контактна інформація' : 'Contact Information'}
                </h2>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-accent-orange mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <p className="text-neutral-600">{content.address}</p>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-accent-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <a href={`tel:${content.phone}`} className="text-neutral-600 hover:text-accent-orange transition-colors">
                      {content.phone}
                    </a>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-accent-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 7.89a2 2 0 002.83 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <a href={`mailto:${content.email}`} className="text-neutral-600 hover:text-accent-orange transition-colors">
                      {content.email}
                    </a>
                  </div>
                </div>
              </div>
              
              {/* Contact Form Placeholder */}
              <div className="bg-white p-8 rounded-2xl shadow-lg">
                <h2 className="text-2xl font-bold text-neutral-900 mb-6">
                  {currentLanguage === 'ua' ? 'Напишіть нам' : 'Send Message'}
                </h2>
                <p className="text-neutral-600">
                  {currentLanguage === 'ua' 
                    ? 'Форма зв\'язку буде додана в наступній версії.' 
                    : 'Contact form will be added in the next version.'
                  }
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default Contact