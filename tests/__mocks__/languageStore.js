// Mock for language store used in tests
export default function useLanguageStore() {
  return {
    currentLanguage: 'en',
    setLanguage: jest.fn(),
    translations: {
      en: {},
      ua: {},
      de: {},
      pl: {}
    }
  }
}