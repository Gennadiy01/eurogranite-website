const fs = require('fs');
const path = require('path');

// Import site configuration
// Note: Using require to load ES module config in CommonJS context
const getSiteConfig = () => {
  // For Node.js scripts, we need to read the config dynamically
  const configPath = path.join(__dirname, '..', 'src', 'config', 'siteConfig.js');

  // Since we can't directly import ES modules in CommonJS, we'll use a fallback
  // Production domain - update this to match src/config/siteConfig.js
  return {
    baseUrl: process.env.SITE_URL || 'https://eg.yalivets.top',
    languages: ['en', 'ua', 'de', 'pl']
  };
};

const config = getSiteConfig();
const baseUrl = config.baseUrl;
const languages = config.languages;
const routes = [
  { path: '', priority: '1.0', changefreq: 'weekly' },
  { path: 'products', priority: '0.9', changefreq: 'weekly' },
  { path: 'about', priority: '0.8', changefreq: 'monthly' },
  { path: 'contact', priority: '0.7', changefreq: 'monthly' },
  { path: 'gallery', priority: '0.8', changefreq: 'weekly' },
  { path: 'articles', priority: '0.6', changefreq: 'monthly' }
];

function getCurrentDate() {
  return new Date().toISOString().split('T')[0];
}

function generateHreflangLinks(routePath) {
  return languages.map(lang => {
    // English is the default without language prefix
    const href = lang === 'en'
      ? (routePath === '' ? `${baseUrl}/` : `${baseUrl}/${routePath}/`)
      : (routePath === '' ? `${baseUrl}/${lang}/` : `${baseUrl}/${lang}/${routePath}/`);

    // Use 'uk' for Ukrainian hreflang according to ISO 639-1
    const hreflang = lang === 'ua' ? 'uk' : lang;
    return `    <xhtml:link rel="alternate" hreflang="${hreflang}" href="${href}" />`;
  }).join('\n');
}

function generateUrlEntry(route, language) {
  // English is the default without language prefix
  const loc = language === 'en'
    ? (route.path === '' ? `${baseUrl}/` : `${baseUrl}/${route.path}/`)
    : (route.path === '' ? `${baseUrl}/${language}/` : `${baseUrl}/${language}/${route.path}/`);

  const hreflangLinks = generateHreflangLinks(route.path);

  return `  <url>
    <loc>${loc}</loc>
${hreflangLinks}
    <lastmod>${getCurrentDate()}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`;
}

function generateSitemap() {
  console.log('🚀 Generating sitemap.xml...');

  const xmlHeader = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">`;

  const xmlFooter = `
</urlset>`;

  let xmlContent = xmlHeader + '\n';

  // Generate URLs for each route and language combination
  routes.forEach(route => {
    const routeName = route.path === '' ? 'Home' : route.path.charAt(0).toUpperCase() + route.path.slice(1);
    xmlContent += `\n  <!-- ${routeName} Pages -->\n`;

    languages.forEach(language => {
      xmlContent += generateUrlEntry(route, language) + '\n';
      if (language !== languages[languages.length - 1]) {
        xmlContent += '\n';
      }
    });
  });

  xmlContent += xmlFooter;

  // Write sitemap to public directory
  const outputPath = path.join(__dirname, '..', 'public', 'sitemap.xml');

  try {
    fs.writeFileSync(outputPath, xmlContent, 'utf8');
    console.log(`✅ Sitemap successfully generated: ${outputPath}`);
    console.log(`📊 Generated ${routes.length * languages.length} URLs across ${languages.length} languages`);
    console.log(`🌍 Languages: ${languages.join(', ')}`);
    console.log(`📄 Routes: ${routes.map(r => r.path || 'home').join(', ')}`);
  } catch (error) {
    console.error('❌ Error generating sitemap:', error);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  generateSitemap();
}

module.exports = { generateSitemap };