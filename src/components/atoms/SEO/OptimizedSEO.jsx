import { useEffect, useMemo, useCallback } from 'react';

const OptimizedSEO = ({
  title,
  description,
  keywords,
  canonical,
  ogImage,
  currentLanguage = 'en',
  pagePath = ''
}) => {
  // Мемоїзуємо обчислення для уникнення повторних розрахунків
  const canonicalUrl = useMemo(() => canonical || pagePath, [canonical, pagePath]);

  const fullCanonicalPath = useMemo(() => {
    if (canonicalUrl === undefined) return '';
    const languagePrefix = `/${currentLanguage}`;
    return canonicalUrl === '/' || canonicalUrl === ''
      ? `${languagePrefix}/`
      : `${languagePrefix}${canonicalUrl.startsWith('/') ? canonicalUrl : '/' + canonicalUrl}`;
  }, [canonicalUrl, currentLanguage]);

  const hreflangLinks = useMemo(() => {
    const supportedLanguages = ['ua', 'en', 'de', 'pl'];
    const currentPath = canonicalUrl || '';

    return supportedLanguages.map(lang => {
      const fullPath = currentPath === '/' || currentPath === ''
        ? `/${lang}/`
        : `/${lang}${currentPath.startsWith('/') ? currentPath : '/' + currentPath}`;

      return {
        lang: lang === 'ua' ? 'uk' : lang,
        href: `https://gennadiy01.github.io/eurogranite-website${fullPath}`
      };
    });
  }, [canonicalUrl]);

  // Optimized DOM updates - батчуємо зміни
  const updateMetaTags = useCallback(() => {
    // Batch DOM updates using requestAnimationFrame для кращої performance
    requestAnimationFrame(() => {
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

      // Update meta keywords (only if exists, no creation for performance)
      if (keywords) {
        const metaKeywords = document.querySelector('meta[name="keywords"]');
        if (metaKeywords) {
          metaKeywords.setAttribute('content', keywords);
        }
      }

      // Update canonical link
      if (fullCanonicalPath) {
        let canonicalLink = document.querySelector('link[rel="canonical"]');
        if (!canonicalLink) {
          canonicalLink = document.createElement('link');
          canonicalLink.setAttribute('rel', 'canonical');
          document.head.appendChild(canonicalLink);
        }
        canonicalLink.setAttribute('href', `https://gennadiy01.github.io/eurogranite-website${fullCanonicalPath}`);
      }

      // Update Open Graph meta tags (batch update)
      const ogTitleElement = document.querySelector('meta[property="og:title"]');
      const ogDescElement = document.querySelector('meta[property="og:description"]');
      const ogUrlElement = document.querySelector('meta[property="og:url"]');

      if (title && ogTitleElement) {
        ogTitleElement.setAttribute('content', `${title} - EuroGranite`);
      }
      if (description && ogDescElement) {
        ogDescElement.setAttribute('content', description);
      }
      if (fullCanonicalPath && ogUrlElement) {
        ogUrlElement.setAttribute('content', `https://gennadiy01.github.io/eurogranite-website${fullCanonicalPath}`);
      }

      // Update Twitter meta tags (batch update)
      const twitterTitleElement = document.querySelector('meta[name="twitter:title"]');
      const twitterDescElement = document.querySelector('meta[name="twitter:description"]');

      if (title && twitterTitleElement) {
        twitterTitleElement.setAttribute('content', `${title} - EuroGranite`);
      }
      if (description && twitterDescElement) {
        twitterDescElement.setAttribute('content', description);
      }
    });
  }, [title, description, keywords, fullCanonicalPath]);

  // Optimized hreflang updates
  const updateHreflangLinks = useCallback(() => {
    requestAnimationFrame(() => {
      // Remove existing hreflang links in one batch
      const existingLinks = document.querySelectorAll('link[hreflang]');
      existingLinks.forEach(link => link.remove());

      // Create document fragment для batch DOM insertion
      const fragment = document.createDocumentFragment();

      // Add hreflang links for all supported languages
      hreflangLinks.forEach(({ lang, href }) => {
        const hreflangLink = document.createElement('link');
        hreflangLink.setAttribute('rel', 'alternate');
        hreflangLink.setAttribute('hreflang', lang);
        hreflangLink.setAttribute('href', href);
        fragment.appendChild(hreflangLink);
      });

      // Add x-default hreflang
      const xDefaultLink = document.createElement('link');
      xDefaultLink.setAttribute('rel', 'alternate');
      xDefaultLink.setAttribute('hreflang', 'x-default');
      const defaultPath = (canonicalUrl || '') === '/' || (canonicalUrl || '') === ''
        ? '/en/'
        : `/en${(canonicalUrl || '').startsWith('/') ? canonicalUrl : '/' + canonicalUrl}`;
      xDefaultLink.setAttribute('href', `https://gennadiy01.github.io/eurogranite-website${defaultPath}`);
      fragment.appendChild(xDefaultLink);

      // Single DOM insertion
      document.head.appendChild(fragment);
    });
  }, [hreflangLinks, canonicalUrl]);

  // Update html lang attribute
  const updateHtmlLang = useCallback(() => {
    const langMap = {
      ua: 'uk',
      en: 'en',
      de: 'de',
      pl: 'pl'
    };
    document.documentElement.setAttribute('lang', langMap[currentLanguage] || 'en');
  }, [currentLanguage]);

  useEffect(() => {
    updateMetaTags();
  }, [updateMetaTags]);

  useEffect(() => {
    updateHreflangLinks();
  }, [updateHreflangLinks]);

  useEffect(() => {
    updateHtmlLang();
  }, [updateHtmlLang]);

  return null; // This component doesn't render anything
};

export default OptimizedSEO;