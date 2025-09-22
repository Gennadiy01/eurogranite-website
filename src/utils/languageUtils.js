export const getLanguageFromPath = (path) => {
  if (!path || typeof path !== 'string') {
    return 'ua' // default to Ukrainian
  }
  const match = path.match(/^\/(ua|en|de|pl)/)
  return match ? match[1] : 'ua' // default to Ukrainian
}

export const getSupportedLanguages = () => ['ua', 'en', 'de', 'pl']

export const isValidLanguage = (lang) => getSupportedLanguages().includes(lang)