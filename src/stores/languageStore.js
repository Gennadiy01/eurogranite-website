import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useLanguageStore = create(
  persist(
    (set, get) => ({
      // State
      currentLanguage: 'en', // Default language
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
          // Update document lang attribute
          document.documentElement.lang = languageCode
        }
      },
      
      getCurrentLanguage: () => {
        const { currentLanguage, availableLanguages } = get()
        return availableLanguages.find(lang => lang.code === currentLanguage)
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