import React, { useEffect } from 'react';
import useLanguageStore from '../stores/languageStore';
import { getLanguageFromPath } from '../utils/languageUtils';
import { productsData, TextureIcon, SurfaceIcon, DimensionIcon } from '../constants/productsData';
import { getSEOData } from '../constants/seoData';
import ProductCard from '../components/molecules/ProductCard';
import Header from '../components/organisms/Header/Header';
import OptimizedSEO from '../components/atoms/SEO/OptimizedSEO';
import LazySchemaLoader from '../components/atoms/StructuredData/LazySchemaLoader';
import UniversalTextureGallery from '../components/granite-system/gallery/UniversalTextureGallery';
import Footer from '../components/organisms/Footer/Footer';

const Products = () => {
  const { currentLanguage, setLanguage } = useLanguageStore();

  useEffect(() => {
    const language = getLanguageFromPath(window.location.pathname)
    if (currentLanguage !== language) {
      setLanguage(language)
    }
  }, [currentLanguage, setLanguage])

  const seoData = getSEOData('products', currentLanguage);

  useEffect(() => {
    // Scroll to top when page loads
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <>
      <div className="products-page">
      <OptimizedSEO
        title={seoData?.title}
        description={seoData?.description}
        keywords={seoData?.keywords}
        canonical={seoData?.canonical}
        ogImage={seoData?.ogImage}
        currentLanguage={currentLanguage}
        pagePath={seoData?.pagePath}
      />
      <LazySchemaLoader
        schemas={['organization', 'product', 'breadcrumb']}
        currentLanguage={currentLanguage}
        pagePath="/products"
      />
      <Header />
      <main>
      {/* Hero Section */}
      <section className="page-hero">
        <div className="page-hero-background">
          <div className="page-hero-overlay"></div>
        </div>
        <div className="container">
          <div className="page-hero-content">
            <h1 className="page-hero-title">
              {productsData.categoryName[currentLanguage]}
            </h1>
            <p className="page-hero-subtitle">
              {productsData.categoryDescription[currentLanguage]}
            </p>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          {/* Section Title */}
          <div className="text-center mb-16">
            <h2 className="heading-2 mb-6">
              {currentLanguage === 'ua' 
                ? 'Зразки продукції' 
                : currentLanguage === 'en'
                ? 'Product Samples'
                : currentLanguage === 'de'
                ? 'Produktmuster'
                : 'Próbki produktów'
              }
            </h2>
            <p className="text-lg text-neutral-700 max-w-3xl mx-auto leading-relaxed">
              {currentLanguage === 'ua' 
                ? 'Представлені зразки демонструють різні комбінації текстур граніту та типів обробки поверхні. Кожен виріб можна виготовити під замовлення з будь-якої доступної текстури та обробки.'
                : currentLanguage === 'en'
                ? 'Featured samples demonstrate different combinations of granite textures and surface treatment types. Each product can be custom-made from any available texture and treatment.'
                : currentLanguage === 'de'
                ? 'Die vorgestellten Muster zeigen verschiedene Kombinationen von Granittexturen und Oberflächenbehandlungstypen. Jedes Produkt kann nach Maß aus jeder verfügbaren Textur und Behandlung hergestellt werden.'
                : 'Prezentowane próbki pokazują różne kombinacje tekstur granitu i rodzajów obróbki powierzchni. Każdy produkt może być wykonany na zamówienie z dowolnej dostępnej tekstury i obróbki.'
              }
            </p>
          </div>

          {/* Products Grid */}
          <div className="products-grid">
            {productsData.samples.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product} 
              />
            ))}
          </div>
        </div>
      </section>

      {/* Customization Info Section */}
      <section className="py-16 bg-neutral-100">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="heading-2 mb-6">
                {currentLanguage === 'ua' 
                  ? 'Можливості кастомізації' 
                  : currentLanguage === 'en'
                  ? 'Customization Options'
                  : currentLanguage === 'de'
                  ? 'Anpassungsoptionen'
                  : 'Opcje dostosowania'
                }
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Textures */}
              <div className="customization-option">
                {/* Перший рядок - іконка і заголовок */}
                <div className="flex items-center gap-3 mb-3">
                  <span className="customization-option-icon">
                    <TextureIcon size={24} />
                  </span>
                  <h3 className="heading-3">
                    {productsData.customizationOptions.textures.title[currentLanguage]}
                  </h3>
                </div>

                {/* Другий рядок - опис */}
                <div className="mb-4">
                  <p>
                    {productsData.customizationOptions.textures.description[currentLanguage]}
                  </p>
                </div>

                {/* Третій рядок - контент у колонках */}
                <div className="text-sm text-neutral-600 text-left customization-features-grid">
                  {productsData.customizationOptions.textures.features[currentLanguage].map((feature, index) => (
                    <div key={index} className="customization-feature-item">
                      <span className="w-2 h-2 bg-accent-orange rounded-full mr-3 flex-shrink-0"></span>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Surface Finishes */}
              <div className="customization-option">
                {/* Перший рядок - іконка і заголовок */}
                <div className="flex items-center gap-3 mb-3">
                  <span className="customization-option-icon">
                    <SurfaceIcon size={24} />
                  </span>
                  <h3 className="heading-3">
                    {productsData.customizationOptions.finishes.title[currentLanguage]}
                  </h3>
                </div>

                {/* Другий рядок - опис */}
                <div className="mb-4">
                  <p>
                    {productsData.customizationOptions.finishes.description[currentLanguage]}
                  </p>
                </div>

                {/* Третій рядок - контент у колонках */}
                <div className="text-sm text-neutral-600 text-left customization-features-grid">
                  {productsData.customizationOptions.finishes.features[currentLanguage].map((feature, index) => (
                    <div key={index} className="customization-feature-item">
                      <span className="w-2 h-2 bg-accent-orange rounded-full mr-3 flex-shrink-0"></span>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Custom Sizes */}
              <div className="customization-option">
                {/* Перший рядок - іконка і заголовок */}
                <div className="flex items-center gap-3 mb-3">
                  <span className="customization-option-icon">
                    <DimensionIcon size={24} />
                  </span>
                  <h3 className="heading-3">
                    {productsData.customizationOptions.sizes.title[currentLanguage]}
                  </h3>
                </div>

                {/* Другий рядок - опис */}
                <div className="mb-4">
                  <p>
                    {productsData.customizationOptions.sizes.description[currentLanguage]}
                  </p>
                </div>

                {/* Третій рядок - контент у колонках */}
                <div className="text-sm text-neutral-600 text-left customization-features-grid">
                  {productsData.customizationOptions.sizes.features[currentLanguage].map((feature, index) => (
                    <div key={index} className="customization-feature-item">
                      <span className="w-2 h-2 bg-accent-orange rounded-full mr-3 flex-shrink-0"></span>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-neutral-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="heading-2 mb-6">
              {currentLanguage === 'ua' 
                ? 'Потрібна консультація?' 
                : currentLanguage === 'en'
                ? 'Need Consultation?'
                : currentLanguage === 'de'
                ? 'Beratung benötigt?'
                : 'Potrzebujesz konsultacji?'
              }
            </h2>
            <p className="text-xl text-neutral-700 mb-8 leading-relaxed">
              {currentLanguage === 'ua' 
                ? 'Наші експерти допоможуть підібрати оптимальне рішення для вашого проекту' 
                : currentLanguage === 'en'
                ? 'Our experts will help you choose the optimal solution for your project'
                : currentLanguage === 'de'
                ? 'Unsere Experten helfen Ihnen bei der Auswahl der optimalen Lösung für Ihr Projekt'
                : 'Nasi eksperci pomogą Ci wybrać optymalne rozwiązanie dla Twojego projektu'
              }
            </p>
            <div className="flex justify-center">
              <a
                href="/contact#contact-form"
                className="custom-button custom-button--primary px-8 py-4"
              >
                {currentLanguage === 'ua'
                  ? 'Написати повідомлення'
                  : currentLanguage === 'en'
                  ? 'Send Message'
                  : currentLanguage === 'de'
                  ? 'Nachricht senden'
                  : 'Wyślij wiadomość'
                }
              </a>
            </div>
          </div>
        </div>
      </section>
      </main>

      {/* Universal Texture Gallery Modal */}
      <UniversalTextureGallery />
      </div>
      <Footer />
    </>
  );
};

export default Products;