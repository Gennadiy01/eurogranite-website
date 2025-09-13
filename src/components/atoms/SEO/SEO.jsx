import { useEffect } from 'react';

const SEO = ({
  title,
  description,
  keywords,
  canonical,
  ogImage,
  currentLanguage = 'en',
  hreflang = {} // { en: '/path', ua: '/path', de: '/path', pl: '/path' }
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

    // Update canonical link
    if (canonical) {
      let canonicalLink = document.querySelector('link[rel="canonical"]');
      if (!canonicalLink) {
        canonicalLink = document.createElement('link');
        canonicalLink.setAttribute('rel', 'canonical');
        document.head.appendChild(canonicalLink);
      }
      canonicalLink.setAttribute('href', `https://gennadiy01.github.io/eurogranite-website${canonical}`);
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

    if (canonical) {
      let ogUrl = document.querySelector('meta[property="og:url"]');
      if (ogUrl) {
        ogUrl.setAttribute('content', `https://gennadiy01.github.io/eurogranite-website${canonical}`);
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

    // Update hreflang links
    if (Object.keys(hreflang).length > 0) {
      // Remove existing hreflang links
      document.querySelectorAll('link[hreflang]').forEach(link => link.remove());

      // Add new hreflang links
      Object.entries(hreflang).forEach(([lang, path]) => {
        const hreflangLink = document.createElement('link');
        hreflangLink.setAttribute('rel', 'alternate');
        hreflangLink.setAttribute('hreflang', lang);
        hreflangLink.setAttribute('href', `https://gennadiy01.github.io/eurogranite-website${path}`);
        document.head.appendChild(hreflangLink);
      });
    }

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

  }, [title, description, keywords, canonical, ogImage, currentLanguage, hreflang]);

  return null; // This component doesn't render anything
};

export default SEO;