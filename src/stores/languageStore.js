import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// Helper function to detect browser language
const detectBrowserLanguage = () => {
  const supportedLanguages = ['en', 'ua', 'de', 'pl']
  const defaultLanguage = 'en'

  // Check browser language
  const browserLang = navigator.language?.split('-')[0] || navigator.language

  // Return supported language or default
  return supportedLanguages.includes(browserLang) ? browserLang : defaultLanguage
}

const useLanguageStore = create(
  persist(
    (set, get) => ({
      // State - Default to English
      currentLanguage: 'en',
      availableLanguages: [
        { code: 'en', name: 'English', flag: '🇺🇸' },
        { code: 'ua', name: 'Українська', flag: '🇺🇦' },
        { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
        { code: 'pl', name: 'Polski', flag: '🇵🇱' }
      ],
      
      // Actions
      setLanguage: (languageCode) => {
        const { availableLanguages } = get()
        const language = availableLanguages.find(lang => lang.code === languageCode)

        if (language) {
          set({ currentLanguage: languageCode })
          // Update document lang attribute (map ua to uk for HTML)
          const htmlLang = languageCode === 'ua' ? 'uk' : languageCode
          document.documentElement.lang = htmlLang
        }
      },

      // Initialize language based on browser detection (for first-time users)
      initializeLanguage: () => {
        const { currentLanguage } = get()

        // Only detect browser language if no language is persisted
        if (!currentLanguage || currentLanguage === 'en') {
          const detectedLang = detectBrowserLanguage()
          if (detectedLang !== currentLanguage) {
            get().setLanguage(detectedLang)
          }
        }
      },

      // Get browser-preferred language
      getBrowserLanguage: () => {
        return detectBrowserLanguage()
      },

      getCurrentLanguage: () => {
        const { currentLanguage, availableLanguages } = get()
        return availableLanguages.find(lang => lang.code === currentLanguage)
      },

      // Check if language is supported
      isSupportedLanguage: (languageCode) => {
        const { availableLanguages } = get()
        return availableLanguages.some(lang => lang.code === languageCode)
      },

      // Get text by key for current language (placeholder for i18n)
      getText: (key) => {
        // This will be implemented with proper i18n in Phase 2
        return key
      }
    }),
    {
      name: 'eurogranite-language',
      partialize: (state) => ({ currentLanguage: state.currentLanguage })
    }
  )
)

export default useLanguageStore