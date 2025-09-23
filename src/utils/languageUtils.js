export const getLanguageFromPath = (path) => {
  if (!path || typeof path !== 'string') {
    return 'en' // default to English
  }

  // Remove base path if present
  const cleanPath = path.replace('/eurogranite-website', '') || '/'

  // Check for language prefix after base path
  const match = cleanPath.match(/^\/(ua|en|de|pl)/)
  return match ? match[1] : 'en' // default to English
}

export const getSupportedLanguages = () => ['en', 'ua', 'de', 'pl']

export const isValidLanguage = (lang) => getSupportedLanguages().includes(lang)