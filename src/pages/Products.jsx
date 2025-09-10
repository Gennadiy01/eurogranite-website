import React from 'react';
import useLanguageStore from '../stores/languageStore';
import { productsData } from '../constants/productsData';
import ProductCard from '../components/molecules/ProductCard';
import Header from '../components/organisms/Header/Header';

const Products = () => {
  const { currentLanguage } = useLanguageStore();

  return (
    <div className="products-page">
      <Header />
      <main className="pt-32">
      {/* Hero Section */}
      <section className="py-20 bg-neutral-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="hero-title mb-8">
              {productsData.categoryName[currentLanguage]}
            </h1>
            <p className="text-xl leading-relaxed text-neutral-700">
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
                <div className="customization-icon-wrapper">
                  <span className="customization-option-icon">🎨</span>
                </div>
                <h3 className="heading-3 mb-4">
                  {currentLanguage === 'ua' 
                    ? 'Текстури' 
                    : currentLanguage === 'en'
                    ? 'Textures'
                    : currentLanguage === 'de'
                    ? 'Texturen'
                    : 'Tekstury'
                  }
                </h3>
                <p className="text-neutral-700">
                  {productsData.customizationOptions.textures[currentLanguage]}
                </p>
              </div>

              {/* Surface Finishes */}
              <div className="customization-option">
                <div className="customization-icon-wrapper">
                  <span className="customization-option-icon">⚙️</span>
                </div>
                <h3 className="heading-3 mb-4">
                  {currentLanguage === 'ua' 
                    ? 'Обробка поверхні' 
                    : currentLanguage === 'en'
                    ? 'Surface Finishes'
                    : currentLanguage === 'de'
                    ? 'Oberflächenbearbeitungen'
                    : 'Wykończenia powierzchni'
                  }
                </h3>
                <p className="text-neutral-700">
                  {productsData.customizationOptions.finishes[currentLanguage]}
                </p>
              </div>

              {/* Custom Sizes */}
              <div className="customization-option">
                <div className="customization-icon-wrapper">
                  <span className="customization-option-icon">📐</span>
                </div>
                <h3 className="heading-3 mb-4">
                  {currentLanguage === 'ua' 
                    ? 'Розміри' 
                    : currentLanguage === 'en'
                    ? 'Dimensions'
                    : currentLanguage === 'de'
                    ? 'Abmessungen'
                    : 'Wymiary'
                  }
                </h3>
                <p className="text-neutral-700">
                  {productsData.customizationOptions.sizes[currentLanguage]}
                </p>
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
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a
                href="tel:+380733864041"
                className="btn btn-primary"
              >
                {currentLanguage === 'ua' 
                  ? 'Зателефонувати' 
                  : currentLanguage === 'en'
                  ? 'Call Us'
                  : currentLanguage === 'de'
                  ? 'Anrufen'
                  : 'Zadzwoń'
                }
              </a>
              <a
                href="/contact"
                className="btn btn-outline"
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
    </div>
  );
};

export default Products;