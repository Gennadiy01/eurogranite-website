import { getLanguageFromPath, getSupportedLanguages, isValidLanguage } from './languageUtils'

describe('Language Utilities', () => {
  describe('getLanguageFromPath', () => {
    test('extracts Ukrainian language from path', () => {
      expect(getLanguageFromPath('/ua')).toBe('ua')
      expect(getLanguageFromPath('/ua/')).toBe('ua')
      expect(getLanguageFromPath('/ua/products')).toBe('ua')
      expect(getLanguageFromPath('/ua/about')).toBe('ua')
    })

    test('extracts English language from path', () => {
      expect(getLanguageFromPath('/en')).toBe('en')
      expect(getLanguageFromPath('/en/')).toBe('en')
      expect(getLanguageFromPath('/en/products')).toBe('en')
      expect(getLanguageFromPath('/en/contact')).toBe('en')
    })

    test('extracts German language from path', () => {
      expect(getLanguageFromPath('/de')).toBe('de')
      expect(getLanguageFromPath('/de/')).toBe('de')
      expect(getLanguageFromPath('/de/gallery')).toBe('de')
    })

    test('extracts Polish language from path', () => {
      expect(getLanguageFromPath('/pl')).toBe('pl')
      expect(getLanguageFromPath('/pl/')).toBe('pl')
      expect(getLanguageFromPath('/pl/articles')).toBe('pl')
    })

    test('returns default language for paths without language prefix', () => {
      expect(getLanguageFromPath('/')).toBe('en')
      expect(getLanguageFromPath('/products')).toBe('en')
      expect(getLanguageFromPath('/about')).toBe('en')
      expect(getLanguageFromPath('/contact')).toBe('en')
    })

    test('returns default language for invalid language codes', () => {
      expect(getLanguageFromPath('/fr')).toBe('en')
      expect(getLanguageFromPath('/es')).toBe('en')
      expect(getLanguageFromPath('/it')).toBe('en')
      expect(getLanguageFromPath('/ru')).toBe('en')
    })

    test('handles empty or undefined paths', () => {
      expect(getLanguageFromPath('')).toBe('en')
      expect(getLanguageFromPath(undefined)).toBe('en')
      expect(getLanguageFromPath(null)).toBe('en')
    })

    test('handles complex paths with subdirectories', () => {
      expect(getLanguageFromPath('/ua/products/granite')).toBe('ua')
      expect(getLanguageFromPath('/en/about/company')).toBe('en')
      expect(getLanguageFromPath('/de/contact/form')).toBe('de')
    })

    test('handles paths with query parameters and hash', () => {
      expect(getLanguageFromPath('/ua/products?category=granite')).toBe('ua')
      expect(getLanguageFromPath('/en/contact#form')).toBe('en')
      expect(getLanguageFromPath('/de/gallery?page=2#top')).toBe('de')
    })
  })

  describe('getSupportedLanguages', () => {
    test('returns array of supported language codes', () => {
      const languages = getSupportedLanguages()
      expect(languages).toEqual(['en', 'ua', 'de', 'pl'])
      expect(Array.isArray(languages)).toBe(true)
      expect(languages.length).toBe(4)
    })

    test('includes all expected languages', () => {
      const languages = getSupportedLanguages()
      expect(languages).toContain('ua')
      expect(languages).toContain('en')
      expect(languages).toContain('de')
      expect(languages).toContain('pl')
    })
  })

  describe('isValidLanguage', () => {
    test('returns true for supported languages', () => {
      expect(isValidLanguage('ua')).toBe(true)
      expect(isValidLanguage('en')).toBe(true)
      expect(isValidLanguage('de')).toBe(true)
      expect(isValidLanguage('pl')).toBe(true)
    })

    test('returns false for unsupported languages', () => {
      expect(isValidLanguage('fr')).toBe(false)
      expect(isValidLanguage('es')).toBe(false)
      expect(isValidLanguage('it')).toBe(false)
      expect(isValidLanguage('ru')).toBe(false)
      expect(isValidLanguage('zh')).toBe(false)
    })

    test('returns false for invalid inputs', () => {
      expect(isValidLanguage('')).toBe(false)
      expect(isValidLanguage(null)).toBe(false)
      expect(isValidLanguage(undefined)).toBe(false)
      expect(isValidLanguage(123)).toBe(false)
      expect(isValidLanguage({})).toBe(false)
      expect(isValidLanguage([])).toBe(false)
    })

    test('is case sensitive', () => {
      expect(isValidLanguage('UA')).toBe(false)
      expect(isValidLanguage('EN')).toBe(false)
      expect(isValidLanguage('De')).toBe(false)
      expect(isValidLanguage('Pl')).toBe(false)
    })
  })
})