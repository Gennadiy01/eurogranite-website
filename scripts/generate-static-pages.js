const fs = require('fs')
const path = require('path')

const buildDir = path.join(__dirname, '..', 'build')
const languages = ['en', 'ua', 'de', 'pl']
const pages = ['', 'products', 'about', 'contact', 'gallery', 'articles']

// Import SEO data (we'll implement this as a simple object since it's a build script)
// Function to generate Schema.org JSON-LD data
const generateSchemaData = (language, page) => {
  const organizationData = {
    ua: {
      name: "EuroGranite",
      description: "Провідний постачальник високоякісного граніту з українських кар'єрів. Спеціалізуємося на гранітній бруківці, плитці та інших будівельних матеріалах з граніту.",
      addressLocality: "Житомир",
      addressRegion: "Житомирська область",
      addressCountry: "UA"
    },
    en: {
      name: "EuroGranite",
      description: "Leading supplier of high-quality granite from Ukrainian quarries. We specialize in granite pavers, tiles, and other granite building materials.",
      addressLocality: "Zhytomyr",
      addressRegion: "Zhytomyr Oblast",
      addressCountry: "UA"
    },
    de: {
      name: "EuroGranite",
      description: "Führender Anbieter von hochwertigem Granit aus ukrainischen Steinbrüchen. Wir spezialisieren uns auf Granitpflaster, Fliesen und andere Granit-Baumaterialien.",
      addressLocality: "Zhytomyr",
      addressRegion: "Oblast Zhytomyr",
      addressCountry: "UA"
    },
    pl: {
      name: "EuroGranite",
      description: "Wiodący dostawca wysokiej jakości granitu z ukraińskich kamieniołomów. Specjalizujemy się w kostce granitowej, płytkach i innych materiałach budowlanych z granitu.",
      addressLocality: "Żytomierz",
      addressRegion: "Obwód żytomierski",
      addressCountry: "UA"
    }
  }

  const currentData = organizationData[language] || organizationData.en

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": currentData.name,
    "description": currentData.description,
    "url": "https://gennadiy01.github.io/",
    "logo": "https://gennadiy01.github.io/logo192.png",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": currentData.addressLocality,
      "addressRegion": currentData.addressRegion,
      "addressCountry": currentData.addressCountry
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+380733864041",
      "email": "sales@euro-granite.com",
      "contactType": "sales"
    }
  }

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": currentData.name,
    "description": currentData.description,
    "url": "https://gennadiy01.github.io/",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": currentData.addressLocality,
      "addressRegion": currentData.addressRegion,
      "addressCountry": currentData.addressCountry
    }
  }

  return {
    organization: organizationSchema,
    localbusiness: localBusinessSchema
  }
}

const staticSeoData = {
  ua: {
    home: {
      title: 'EuroGranite - Українські граніт та природний камінь | Бруківка з граніту',
      description: 'Висококалісний граніт з українських кар\'єрів. Гранітна бруківка, плити, облицювальний камінь. Експорт в Європу. Індивідуальна обробка граніту.',
      keywords: 'граніт україна, бруківка граніт, природний камінь, гранітні плити, облицювальний граніт, експорт граніту'
    },
    products: {
      title: 'Продукція з граніту - Бруківка, плити, облицювання | EuroGranite',
      description: 'Широкий асортимент гранітної продукції: бруківка різних розмірів, облицювальні плити, елементи декору. Якість європейського рівня.',
      keywords: 'гранітна бруківка, гранітні плити, облицювальний граніт, гранітні вироби україна'
    },
    about: {
      title: 'Про компанію EuroGranite - Виробник граніту в Україні',
      description: 'EuroGranite - провідний виробник гранітної продукції в Україні. Власні кар\'єри, сучасне обладнання, експорт у 15+ країн Європи.',
      keywords: 'eurogranite компанія, виробник граніту україна, гранітний завод, експорт граніту'
    },
    contact: {
      title: 'Контакти EuroGranite - Замовити граніт з доставкою',
      description: 'Зв\'яжіться з EuroGranite для замовлення гранітної продукції. Безкоштовна консультація, розрахунок вартості, доставка по Європі.',
      keywords: 'контакти eurogranite, замовити граніт, купити бруківку, доставка граніту європа'
    },
    gallery: {
      title: 'Галерея проектів з граніту - Реалізовані об\'єкти | EuroGranite',
      description: 'Фотогалерея наших гранітних проектів: мощення площ, фасади будівель, ландшафтний дизайн. Приклади використання української гранітної продукції.',
      keywords: 'галерея граніту, проекти з граніту, мощення граніт, фасади граніт'
    },
    articles: {
      title: 'Статті про граніт - Поради та інформація | EuroGranite',
      description: 'Корисні статті про граніт: вибір матеріалу, особливості укладання, догляд за гранітом. Експертні поради від фахівців EuroGranite.',
      keywords: 'статті про граніт, поради граніт, властивості граніту, укладання бруківки'
    }
  },
  en: {
    home: {
      title: 'EuroGranite - Premium Ukrainian Granite Products | Granite Pavers',
      description: 'High-quality granite from Ukrainian quarries. Granite pavers, slabs, facing stone. Export to Europe. Custom granite processing.',
      keywords: 'granite ukraine, granite pavers, natural stone, granite slabs, granite facing, granite export'
    },
    products: {
      title: 'Granite Products - Pavers, Slabs, Cladding | EuroGranite',
      description: 'Wide range of granite products: pavers of various sizes, facing slabs, decorative elements. European quality standards.',
      keywords: 'granite pavers, granite slabs, granite cladding, granite products ukraine'
    },
    about: {
      title: 'About EuroGranite - Leading Granite Producer in Ukraine',
      description: 'EuroGranite - leading granite producer in Ukraine. Own quarries, modern equipment, export to 15+ European countries.',
      keywords: 'eurogranite company, granite producer ukraine, granite factory, granite export'
    },
    contact: {
      title: 'Contact EuroGranite - Order Granite with Delivery',
      description: 'Contact EuroGranite to order granite products. Free consultation, cost calculation, delivery across Europe.',
      keywords: 'eurogranite contact, order granite, buy pavers, granite delivery europe'
    },
    gallery: {
      title: 'Granite Projects Gallery - Completed Objects | EuroGranite',
      description: 'Photo gallery of our granite projects: paving squares, building facades, landscape design. Examples of Ukrainian granite products usage.',
      keywords: 'granite gallery, granite projects, granite paving, granite facades'
    },
    articles: {
      title: 'Granite Articles - Tips and Information | EuroGranite',
      description: 'Useful articles about granite: material selection, installation features, granite care. Expert advice from EuroGranite specialists.',
      keywords: 'granite articles, granite tips, granite properties, paving installation'
    }
  },
  de: {
    home: {
      title: 'EuroGranite - Premium Ukrainische Granitprodukte | Granit Pflastersteine',
      description: 'Hochwertiger Granit aus ukrainischen Steinbrüchen. Granit Pflastersteine, Platten, Verblendsteine. Export nach Europa. Individuelle Granitbearbeitung.',
      keywords: 'granit ukraine, granit pflastersteine, naturstein, granit platten, granit verblendung, granit export'
    },
    products: {
      title: 'Granit Produkte - Pflastersteine, Platten, Verkleidung | EuroGranite',
      description: 'Breites Sortiment an Granitprodukten: Pflastersteine verschiedener Größen, Verblendplatten, Dekorelemente. Europäische Qualitätsstandards.',
      keywords: 'granit pflastersteine, granit platten, granit verkleidung, granit produkte ukraine'
    },
    about: {
      title: 'Über EuroGranite - Führender Granithersteller in der Ukraine',
      description: 'EuroGranite - führender Granithersteller in der Ukraine. Eigene Steinbrüche, moderne Ausrüstung, Export in 15+ europäische Länder.',
      keywords: 'eurogranite unternehmen, granithersteller ukraine, granitwerk, granit export'
    },
    contact: {
      title: 'Kontakt EuroGranite - Granit bestellen mit Lieferung',
      description: 'Kontaktieren Sie EuroGranite zur Bestellung von Granitprodukten. Kostenlose Beratung, Kostenberechnung, Lieferung in ganz Europa.',
      keywords: 'eurogranite kontakt, granit bestellen, pflastersteine kaufen, granit lieferung europa'
    },
    gallery: {
      title: 'Granit Projekte Galerie - Realisierte Objekte | EuroGranite',
      description: 'Fotogalerie unserer Granitprojekte: Platzpflasterung, Gebäudefassaden, Landschaftsgestaltung. Beispiele für ukrainische Granitprodukte.',
      keywords: 'granit galerie, granit projekte, granit pflasterung, granit fassaden'
    },
    articles: {
      title: 'Granit Artikel - Tipps und Informationen | EuroGranite',
      description: 'Nützliche Artikel über Granit: Materialauswahl, Verlegeeigenschaften, Granitpflege. Expertenrat von EuroGranite Spezialisten.',
      keywords: 'granit artikel, granit tipps, granit eigenschaften, pflasterverlegung'
    }
  },
  pl: {
    home: {
      title: 'EuroGranite - Premium Ukraińskie Produkty Granitowe | Kostka Granitowa',
      description: 'Wysokiej jakości granit z ukraińskich kamieniołomów. Kostka granitowa, płyty, kamień elewacyjny. Eksport do Europy. Indywidualna obróbka granitu.',
      keywords: 'granit ukraina, kostka granitowa, kamień naturalny, płyty granitowe, okładzina granitowa, eksport granitu'
    },
    products: {
      title: 'Produkty Granitowe - Kostka, Płyty, Okładziny | EuroGranite',
      description: 'Szeroki asortyment produktów granitowych: kostka różnych rozmiarów, płyty elewacyjne, elementy dekoracyjne. Standardy jakości europejskiej.',
      keywords: 'kostka granitowa, płyty granitowe, okładzina granitowa, produkty granitowe ukraina'
    },
    about: {
      title: 'O EuroGranite - Wiodący Producent Granitu na Ukrainie',
      description: 'EuroGranite - wiodący producent produktów granitowych na Ukrainie. Własne kamieniołomy, nowoczesne wyposażenie, eksport do 15+ krajów Europy.',
      keywords: 'eurogranite firma, producent granitu ukraina, zakład granitowy, eksport granitu'
    },
    contact: {
      title: 'Kontakt EuroGranite - Zamów Granit z Dostawą',
      description: 'Skontaktuj się z EuroGranite w celu zamówienia produktów granitowych. Bezpłatna konsultacja, kalkulacja kosztów, dostawa w całej Europie.',
      keywords: 'eurogranite kontakt, zamówić granit, kupić kostkę, dostawa granitu europa'
    },
    gallery: {
      title: 'Galeria Projektów Granitowych - Zrealizowane Obiekty | EuroGranite',
      description: 'Galeria fotograficzna naszych projektów granitowych: brukowanie placów, elewacje budynków, architektura krajobrazu. Przykłady zastosowania ukraińskich produktów granitowych.',
      keywords: 'galeria granitu, projekty granitowe, brukowanie granit, elewacje granit'
    },
    articles: {
      title: 'Artykuły o Granicie - Porady i Informacje | EuroGranite',
      description: 'Przydatne artykuły o granicie: wybór materiału, właściwości układania, pielęgnacja granitu. Eksperche porady od specjalistów EuroGranite.',
      keywords: 'artykuły granit, porady granit, właściwości granitu, układanie kostki'
    }
  }
}

// Функція для отримання SEO даних
const getSeoData = (language, page) => {
  const pageName = page === '' ? 'home' : page
  return staticSeoData[language]?.[pageName] || staticSeoData.ua.home
}

// Функція для генерації hreflang тегів
const generateHreflangTags = (page) => {
  const baseUrl = 'https://eurogranite.com.ua'

  return languages.map(lang => {
    // All languages now have their own subdirectories
    const url = `${baseUrl}/${lang}/${page ? page + '/' : ''}`

    const hreflang = lang === 'ua' ? 'uk' : lang
    return `<link rel="alternate" hreflang="${hreflang}" href="${url}" />`
  }).join('\n    ')
}

// Function to generate page-specific HTML with SEO optimization
const generatePageHTML = (language, page) => {
  // Find the main JS and CSS files dynamically
  const staticDir = path.join(buildDir, 'static')
  const jsDir = path.join(staticDir, 'js')
  const cssDir = path.join(staticDir, 'css')

  let mainJsFile = ''
  let mainCssFile = ''

  if (fs.existsSync(jsDir)) {
    const jsFiles = fs.readdirSync(jsDir)
    mainJsFile = jsFiles.find(file => file.startsWith('main.') && file.endsWith('.js'))
  }

  if (fs.existsSync(cssDir)) {
    const cssFiles = fs.readdirSync(cssDir)
    mainCssFile = cssFiles.find(file => file.startsWith('main.') && file.endsWith('.css'))
  }

  // Get SEO data for current page and language
  const seoData = getSeoData(language, page)
  const hreflangTags = generateHreflangTags(page)

  // Get Schema.org JSON-LD data for SEO
  const schemaData = generateSchemaData(language, page)

  // Set canonical URL
  const baseUrl = 'https://eurogranite.com.ua'
  const canonicalUrl = `${baseUrl}/${language}/${page ? page + '/' : ''}`

  // Set language codes
  const langCode = language === 'ua' ? 'uk' : language
  const ogLocale = language === 'ua' ? 'uk_UA' : language === 'en' ? 'en_US' : language === 'de' ? 'de_DE' : 'pl_PL'

  return `<!DOCTYPE html>
<html lang="${langCode}">
<head>
    <meta charset="utf-8" />
    <link rel="icon" href="/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />

    <!-- SEO Meta Tags -->
    <title>${seoData.title}</title>
    <meta name="description" content="${seoData.description}" />
    <meta name="keywords" content="${seoData.keywords}" />
    <meta name="author" content="EuroGranite" />
    <meta name="robots" content="index, follow" />
    <link rel="canonical" href="${canonicalUrl}" />

    <!-- Open Graph Meta Tags -->
    <meta property="og:title" content="${seoData.title}" />
    <meta property="og:description" content="${seoData.description}" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="${canonicalUrl}" />
    <meta property="og:site_name" content="EuroGranite" />
    <meta property="og:locale" content="${ogLocale}" />

    <!-- Twitter Meta Tags -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${seoData.title}" />
    <meta name="twitter:description" content="${seoData.description}" />

    <!-- Hreflang tags for multilingual SEO -->
    ${hreflangTags}

    <!-- Preload critical fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link rel="preload" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" as="style" onload="this.onload=null;this.rel='stylesheet'">
    <noscript><link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet"></noscript>

    <link rel="apple-touch-icon" href="/logo192.png" />
    <link rel="manifest" href="/manifest.json" />

    <!-- Preload critical assets -->
    ${mainCssFile ? `<link href="/static/css/${mainCssFile}" rel="stylesheet">` : ''}

    <!-- Schema.org JSON-LD Structured Data -->
    <script type="application/ld+json">
    ${JSON.stringify(schemaData.organization)}
    </script>
    <script type="application/ld+json">
    ${JSON.stringify(schemaData.localbusiness)}
    </script>

    <!-- Set initial language and page for React -->
    <script>
        window.__INITIAL_STATE__ = {
            language: '${language}',
            page: '${page}',
            route: '${language === 'en' ? (page ? '/' + page : '/') : '/' + language + (page ? '/' + page : '')}'
        };
    </script>
</head>
<body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
    ${mainJsFile ? `<script defer="defer" src="/static/js/${mainJsFile}"></script>` : ''}
</body>
</html>`
}

// Create directories and files for each language and page
languages.forEach(lang => {
  pages.forEach(page => {
    let targetDir, targetFile

    if (lang === 'en') {
      // English pages go to en subdirectory
      targetDir = page === ''
        ? path.join(buildDir, 'en')
        : path.join(buildDir, 'en', page)
      targetFile = path.join(targetDir, 'index.html')
    } else {
      // Other languages go to language subdirectories
      targetDir = page === ''
        ? path.join(buildDir, lang)
        : path.join(buildDir, lang, page)
      targetFile = path.join(targetDir, 'index.html')
    }

    // Create directory if it doesn't exist
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true })
    }

    // Generate page-specific HTML content
    const pageContent = generatePageHTML(lang, page)

    // Create index.html in the directory
    fs.writeFileSync(targetFile, pageContent)

    console.log(`Created: ${path.relative(buildDir, targetFile)}`)
  })
})

// Create root index.html that defaults to English content
const rootIndexPath = path.join(buildDir, 'index.html')
const rootPageContent = generatePageHTML('en', '')
fs.writeFileSync(rootIndexPath, rootPageContent)
console.log('Created root index.html (English default)')

// Create 404.html that loads the React app
const notFoundTemplate = () => {
  const staticDir = path.join(buildDir, 'static')
  const jsDir = path.join(staticDir, 'js')
  const cssDir = path.join(staticDir, 'css')

  let mainJsFile = ''
  let mainCssFile = ''

  if (fs.existsSync(jsDir)) {
    const jsFiles = fs.readdirSync(jsDir)
    mainJsFile = jsFiles.find(file => file.startsWith('main.') && file.endsWith('.js'))
  }

  if (fs.existsSync(cssDir)) {
    const cssFiles = fs.readdirSync(cssDir)
    mainCssFile = cssFiles.find(file => file.startsWith('main.') && file.endsWith('.css'))
  }

  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8" />
    <link rel="icon" href="/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <meta name="description" content="Page Not Found - EuroGranite" />
    <meta name="robots" content="noindex, nofollow" />

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link rel="preload" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" as="style" onload="this.onload=null;this.rel='stylesheet'">
    <noscript><link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet"></noscript>

    <link rel="apple-touch-icon" href="/logo192.png" />
    <link rel="manifest" href="/manifest.json" />
    <title>Page Not Found | EuroGranite</title>

    ${mainCssFile ? `<link href="/static/css/${mainCssFile}" rel="stylesheet">` : ''}

    <!-- Set initial state for React to show 404 page -->
    <script>
        // Detect language from URL path for 404 pages
        function detectLanguageFromPath() {
            const path = window.location.pathname;
            const segments = path.replace('/eurogranite-website', '').split('/').filter(Boolean);

            // Check if first segment is a language code
            const supportedLanguages = ['ua', 'de', 'pl'];
            if (segments.length > 0 && supportedLanguages.includes(segments[0])) {
                return segments[0];
            }

            // Default to English
            return 'en';
        }

        const detectedLanguage = detectLanguageFromPath();

        window.__INITIAL_STATE__ = {
            language: detectedLanguage,
            page: '404',
            route: '/404'
        };
    </script>
</head>
<body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
    ${mainJsFile ? `<script defer="defer" src="/static/js/${mainJsFile}"></script>` : ''}
</body>
</html>`
}

const notFoundPath = path.join(buildDir, '404.html')
fs.writeFileSync(notFoundPath, notFoundTemplate())
console.log('Created 404.html')

console.log('Static pages generated successfully!')