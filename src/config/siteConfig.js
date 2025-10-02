/**
 * Site Configuration
 *
 * Central configuration file for domain and site settings.
 * Change BASE_URL here to deploy to a different domain.
 */

// Determine base URL based on environment
const getBaseUrl = () => {
  // Production domain - change this when deploying to a new domain
  const PRODUCTION_DOMAIN = 'https://eg.yalivets.top'

  // For development, use localhost
  if (process.env.NODE_ENV === 'development') {
    return typeof window !== 'undefined'
      ? `${window.location.protocol}//${window.location.host}`
      : 'http://localhost:3000'
  }

  // For production, use configured domain
  return PRODUCTION_DOMAIN
}

export const BASE_URL = getBaseUrl()

// Site metadata
export const SITE_CONFIG = {
  name: 'EuroGranite',
  alternateName: 'EuroGranite Ukraine',
  description: 'Premium granite products manufacturer from Ukraine specializing in export to European markets.',
  foundingDate: '2008',

  // Contact information
  contact: {
    email: 'sales@euro-granite.com',
    phone: '+380733864041'
  },

  // Social media
  social: {
    // Add social media URLs here if needed
  },

  // Supported languages
  languages: ['en', 'ua', 'de', 'pl'],
  defaultLanguage: 'en',

  // SEO settings
  seo: {
    ogImagePath: '/images/og-image-home.jpg',
    logoPath: '/logo192.png',
    logo512Path: '/logo512.png'
  }
}

const config = {
  BASE_URL,
  SITE_CONFIG
}

export default config
