// SEO данні для всіх сторінок
import { BASE_URL } from '../config/siteConfig'

export const seoData = {
  home: {
    title: {
      ua: 'Головна',
      en: 'Home',
      de: 'Startseite',
      pl: 'Strona główna'
    },
    description: {
      ua: 'EuroGranite - провідний виробник гранітної бруківки та виробів з високоякісного українського граніту. Експорт на європейські ринки з індивідуальною обробкою.',
      en: 'EuroGranite - leading manufacturer of granite pavers and products from high-quality Ukrainian granite. Export to European markets with custom processing options.',
      de: 'EuroGranite - führender Hersteller von Granit-Pflastersteinen und -produkten aus hochwertigem ukrainischem Granit. Export auf europäische Märkte mit individueller Bearbeitung.',
      pl: 'EuroGranite - wiodący producent kostki granitowej i produktów z wysokiej jakości ukraińskiego granitu. Eksport na rynki europejskie z opcjami indywidualnej obróbki.'
    },
    keywords: {
      ua: 'граніт, гранітна бруківка, український граніт, виробництво граніту, бруківка на замовлення, гранітні вироби, експорт граніту',
      en: 'granite, granite pavers, Ukrainian granite, granite manufacturing, custom pavers, granite products, granite export, EuroGranite',
      de: 'Granit, Granit-Pflastersteine, ukrainischer Granit, Granit-Herstellung, individuelle Pflastersteine, Granit-Produkte, Granit-Export',
      pl: 'granit, kostka granitowa, ukraiński granit, produkcja granitu, kostka na zamówienie, produkty granitowe, eksport granitu'
    },
    canonical: '/',
    ogImage: `${BASE_URL}/images/og-image-home.jpg`
  },

  products: {
    title: {
      ua: 'Продукція',
      en: 'Products',
      de: 'Produkte',
      pl: 'Produkty'
    },
    description: {
      ua: 'Каталог гранітної бруківки з різними типами обробки поверхні. Габро, Рожевий граніт, Лабрадорит - високоякісні текстури з українських родовищ.',
      en: 'Catalog of granite pavers with various surface processing types. Gabbro, Pink granite, Labradorite - high-quality textures from Ukrainian quarries.',
      de: 'Katalog von Granit-Pflastersteinen mit verschiedenen Oberflächenbehandlungen. Gabbro, Rosa Granit, Labradorit - hochwertige Texturen aus ukrainischen Steinbrüchen.',
      pl: 'Katalog kostki granitowej z różnymi rodzajami obróbki powierzchni. Gabro, Różowy granit, Labradoryt - wysokiej jakości tekstury z ukraińskich kamieniołomów.'
    },
    keywords: {
      ua: 'гранітна бруківка, каталог граніту, колота бруківка, пиляна бруківка, термооброблена бруківка, габро, рожевий граніт, лабрадорит',
      en: 'granite pavers, granite catalog, split pavers, sawn pavers, thermal pavers, gabbro, pink granite, labradorite, paving stones',
      de: 'Granit-Pflastersteine, Granit-Katalog, gespaltene Pflastersteine, gesägte Pflastersteine, thermische Pflastersteine, Gabbro, rosa Granit, Labradorit',
      pl: 'kostka granitowa, katalog granitu, łupana kostka, piłowana kostka, termiczna kostka, gabro, różowy granit, labradoryt'
    },
    canonical: '/products',
    ogImage: `${BASE_URL}/images/og-image-products.jpg`
  },

  about: {
    title: {
      ua: 'Про нас',
      en: 'About Us',
      de: 'Über uns',
      pl: 'O nas'
    },
    description: {
      ua: 'EuroGranite - 15+ років досвіду в гранітній індустрії. 12 сортів граніту, 25+ країн експорту. Видобуток в Житомирській, Кіровоградській та Рівненській областях.',
      en: 'EuroGranite - 15+ years of experience in granite industry. 12 granite varieties, 25+ export countries. Quarrying in Zhytomyr, Kirovohrad and Rivne regions.',
      de: 'EuroGranite - 15+ Jahre Erfahrung in der Granitindustrie. 12 Granitsorten, 25+ Exportländer. Abbau in den Regionen Schytomyr, Kirowohrad und Riwne.',
      pl: 'EuroGranite - ponad 15 lat doświadczenia w branży granitowej. 12 odmian granitu, 25+ krajów eksportu. Wydobycie w obwodach żytomierskim, kirowohradzkim i rówieńskim.'
    },
    keywords: {
      ua: 'про EuroGranite, історія компанії, гранітні родовища України, Житомир граніт, Кіровоград граніт, Рівне граніт, виробник граніту',
      en: 'about EuroGranite, company history, Ukrainian granite quarries, Zhytomyr granite, Kirovohrad granite, Rivne granite, granite manufacturer',
      de: 'über EuroGranite, Unternehmensgeschichte, ukrainische Granitsteinbrüche, Schytomyr Granit, Kirowohrad Granit, Riwne Granit, Granithersteller',
      pl: 'o EuroGranite, historia firmy, ukraińskie kamieniołomy granitu, granit żytomierski, granit kirowohradzki, granit rówieński, producent granitu'
    },
    canonical: '/about',
    ogImage: `${BASE_URL}/images/og-image-about.jpg`
  },

  contact: {
    title: {
      ua: 'Контакти',
      en: 'Contact',
      de: 'Kontakt',
      pl: 'Kontakt'
    },
    description: {
      ua: 'Зв\'яжіться з EuroGranite для консультації та замовлення гранітної продукції. Житомир, Україна. Телефон: +380733864041, Email: info@euro-granite.com',
      en: 'Contact EuroGranite for consultation and granite products orders. Zhytomyr, Ukraine. Phone: +380733864041, Email: info@euro-granite.com',
      de: 'Kontaktieren Sie EuroGranite für Beratung und Granitproduktbestellungen. Schytomyr, Ukraine. Telefon: +380733864041, E-Mail: info@euro-granite.com',
      pl: 'Skontaktuj się z EuroGranite w sprawie konsultacji i zamówień produktów granitowych. Żytomierz, Ukraina. Telefon: +380733864041, Email: info@euro-granite.com'
    },
    keywords: {
      ua: 'контакти EuroGranite, замовити граніт, консультація граніт, Житомир граніт, телефон граніт, email граніт',
      en: 'EuroGranite contacts, order granite, granite consultation, Zhytomyr granite, granite phone, granite email',
      de: 'EuroGranite Kontakt, Granit bestellen, Granit-Beratung, Schytomyr Granit, Granit Telefon, Granit E-Mail',
      pl: 'kontakt EuroGranite, zamówić granit, konsultacja granitowa, żytomierz granit, telefon granit, email granit'
    },
    canonical: '/contact',
    ogImage: `${BASE_URL}/images/og-image-contact.jpg`
  },

  gallery: {
    title: {
      ua: 'Галерея',
      en: 'Gallery',
      de: 'Galerie',
      pl: 'Galeria'
    },
    description: {
      ua: 'Галерея текстур граніту EuroGranite. Перегляньте детальні зображення всіх доступних текстур: чорний граніт, сірий, червоно-коричневий, рожево-сірий, зелений, лабрадорит.',
      en: 'EuroGranite granite textures gallery. View detailed images of all available textures: black granite, gray, red-brown, pink-gray, green, labradorite.',
      de: 'EuroGranite Granittexturen-Galerie. Betrachten Sie detaillierte Bilder aller verfügbaren Texturen: schwarzer Granit, grau, rot-braun, rosa-grau, grün, Labradorit.',
      pl: 'Galeria tekstur granitu EuroGranite. Zobacz szczegółowe zdjęcia wszystkich dostępnych tekstur: czarny granit, szary, czerwono-brązowy, różowo-szary, zielony, labradoryt.'
    },
    keywords: {
      ua: 'галерея граніту, текстури граніту, фото граніту, зразки граніту, чорний граніт фото, сірий граніт фото, червоний граніт фото',
      en: 'granite gallery, granite textures, granite photos, granite samples, black granite photos, gray granite photos, red granite photos',
      de: 'Granit-Galerie, Granittexturen, Granitfotos, Granitproben, schwarzer Granit Fotos, grauer Granit Fotos, roter Granit Fotos',
      pl: 'galeria granitu, tekstury granitu, zdjęcia granitu, próbki granitu, czarny granit zdjęcia, szary granit zdjęcia, czerwony granit zdjęcia'
    },
    canonical: '/gallery',
    ogImage: `${BASE_URL}/images/og-image-gallery.jpg`
  }
};

// Функція для отримання SEO даних для конкретної сторінки
export const getSEOData = (page, language = 'en', currentPath = '') => {
  const pageData = seoData[page];
  if (!pageData) return null;

  // Use currentPath if provided, otherwise use canonical from pageData
  const pagePath = currentPath || pageData.canonical;

  return {
    title: pageData.title[language],
    description: pageData.description[language],
    keywords: pageData.keywords[language],
    canonical: pagePath, // Will be processed by SEO component with language prefix
    ogImage: pageData.ogImage,
    pagePath: pagePath, // Pass to SEO component for hreflang generation
    // Remove old hreflang object as it's now handled automatically by SEO component
  };
};

export default seoData;