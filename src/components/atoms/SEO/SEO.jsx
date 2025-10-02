import { useEffect } from 'react';
import { BASE_URL } from '../../../config/siteConfig';

const SEO = ({
  title,
  description,
  keywords,
  canonical,
  ogImage,
  currentLanguage = 'en',
  hreflang = {}, // { en: '/path', ua: '/path', de: '/path', pl: '/path' }
  pagePath = '' // current page path without language prefix
}) => {
  useEffect(() => {
    // Update title
    if (title) {
      document.title = `${title} - EuroGranite`;
    }

    // Update meta description
    if (description) {
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', description);
      }
    }

    // Update meta keywords
    if (keywords) {
      let metaKeywords = document.querySelector('meta[name="keywords"]');
      if (!metaKeywords) {
        metaKeywords = document.createElement('meta');
        metaKeywords.setAttribute('name', 'keywords');
        document.head.appendChild(metaKeywords);
      }
      metaKeywords.setAttribute('content', keywords);
    }

    // Update canonical link with automatic language prefix
    const canonicalUrl = canonical || pagePath;
    if (canonicalUrl !== undefined) {
      let canonicalLink = document.querySelector('link[rel="canonical"]');
      if (!canonicalLink) {
        canonicalLink = document.createElement('link');
        canonicalLink.setAttribute('rel', 'canonical');
        document.head.appendChild(canonicalLink);
      }

      // Generate canonical URL with language prefix
      const languagePrefix = `/${currentLanguage}`;
      const fullCanonicalPath = canonicalUrl === '/' || canonicalUrl === ''
        ? `${languagePrefix}/`
        : `${languagePrefix}${canonicalUrl.startsWith('/') ? canonicalUrl : '/' + canonicalUrl}`;

      canonicalLink.setAttribute('href', `${BASE_URL}${fullCanonicalPath}`);
    }

    // Update Open Graph meta tags
    if (title) {
      let ogTitle = document.querySelector('meta[property="og:title"]');
      if (ogTitle) {
        ogTitle.setAttribute('content', `${title} - EuroGranite`);
      }
    }

    if (description) {
      let ogDescription = document.querySelector('meta[property="og:description"]');
      if (ogDescription) {
        ogDescription.setAttribute('content', description);
      }
    }

    if (canonicalUrl !== undefined) {
      let ogUrl = document.querySelector('meta[property="og:url"]');
      if (ogUrl) {
        const languagePrefix = `/${currentLanguage}`;
        const fullCanonicalPath = canonicalUrl === '/' || canonicalUrl === ''
          ? `${languagePrefix}/`
          : `${languagePrefix}${canonicalUrl.startsWith('/') ? canonicalUrl : '/' + canonicalUrl}`;
        ogUrl.setAttribute('content', `${BASE_URL}${fullCanonicalPath}`);
      }
    }

    if (ogImage) {
      let ogImageMeta = document.querySelector('meta[property="og:image"]');
      if (!ogImageMeta) {
        ogImageMeta = document.createElement('meta');
        ogImageMeta.setAttribute('property', 'og:image');
        document.head.appendChild(ogImageMeta);
      }
      ogImageMeta.setAttribute('content', ogImage);
    }

    // Update Twitter meta tags
    if (title) {
      let twitterTitle = document.querySelector('meta[name="twitter:title"]');
      if (twitterTitle) {
        twitterTitle.setAttribute('content', `${title} - EuroGranite`);
      }
    }

    if (description) {
      let twitterDescription = document.querySelector('meta[name="twitter:description"]');
      if (twitterDescription) {
        twitterDescription.setAttribute('content', description);
      }
    }

    // Update hreflang links with proper language prefixes
    const supportedLanguages = ['ua', 'en', 'de', 'pl'];
    const currentPath = canonicalUrl || pagePath || '';

    // Remove existing hreflang links
    document.querySelectorAll('link[hreflang]').forEach(link => link.remove());

    // Add hreflang links for all supported languages
    supportedLanguages.forEach(lang => {
      const hreflangLink = document.createElement('link');
      hreflangLink.setAttribute('rel', 'alternate');
      hreflangLink.setAttribute('hreflang', lang === 'ua' ? 'uk' : lang); // ISO 639-1 code for Ukrainian

      // Generate proper language-prefixed URL
      const fullPath = currentPath === '/' || currentPath === ''
        ? `/${lang}/`
        : `/${lang}${currentPath.startsWith('/') ? currentPath : '/' + currentPath}`;

      hreflangLink.setAttribute('href', `${BASE_URL}${fullPath}`);
      document.head.appendChild(hreflangLink);
    });

    // Add x-default hreflang pointing to English version for international users
    const xDefaultLink = document.createElement('link');
    xDefaultLink.setAttribute('rel', 'alternate');
    xDefaultLink.setAttribute('hreflang', 'x-default');

    const defaultPath = currentPath === '/' || currentPath === ''
      ? '/en/'
      : `/en${currentPath.startsWith('/') ? currentPath : '/' + currentPath}`;

    xDefaultLink.setAttribute('href', `${BASE_URL}${defaultPath}`);
    document.head.appendChild(xDefaultLink);

    // Update html lang attribute
    if (currentLanguage) {
      const langMap = {
        ua: 'uk',
        en: 'en',
        de: 'de',
        pl: 'pl'
      };
      document.documentElement.setAttribute('lang', langMap[currentLanguage] || 'en');
    }

  }, [title, description, keywords, canonical, ogImage, currentLanguage, hreflang, pagePath]);

  return null; // This component doesn't render anything
};

export default SEO;