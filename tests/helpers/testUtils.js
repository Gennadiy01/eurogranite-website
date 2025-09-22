import React from 'react'
import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'

// Custom render function with router context
export const renderWithRouter = (ui, { initialEntries = ['/ua'], ...options } = {}) => {
  const Wrapper = ({ children }) => (
    <MemoryRouter initialEntries={initialEntries}>
      {children}
    </MemoryRouter>
  )

  return render(ui, { wrapper: Wrapper, ...options })
}

// Mock component factory for lazy loading tests
export const createMockComponent = (testId, displayName = 'MockComponent') => {
  const MockComponent = React.forwardRef((props, ref) => (
    React.createElement('div', { ref, 'data-testid': testId }, displayName)
  ))
  MockComponent.displayName = displayName
  return MockComponent
}

// Mock store helper for Zustand stores
export const createMockStore = (initialState = {}) => {
  return {
    getState: () => initialState,
    setState: jest.fn(),
    subscribe: jest.fn(),
    destroy: jest.fn(),
    ...initialState
  }
}

// Language test helpers
export const mockLanguageStore = {
  currentLanguage: 'ua',
  setLanguage: jest.fn(),
  getBrowserLanguage: () => 'ua',
  isSupportedLanguage: (lang) => ['ua', 'en', 'de', 'pl'].includes(lang),
  getCurrentLanguage: () => ({ code: 'ua', name: 'Українська', flag: '🇺🇦' }),
  availableLanguages: [
    { code: 'ua', name: 'Українська', flag: '🇺🇦' },
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'pl', name: 'Polski', flag: '🇵🇱' }
  ]
}

// Common test data
export const testData = {
  routes: {
    home: '/ua',
    products: '/ua/products',
    about: '/ua/about',
    contact: '/ua/contact',
    gallery: '/ua/gallery',
    articles: '/ua/articles'
  },
  languages: ['ua', 'en', 'de', 'pl'],
  supportedLanguageCodes: ['ua', 'en', 'de', 'pl'],
  unsupportedLanguageCodes: ['fr', 'es', 'it', 'ru']
}

// Wait for async operations in tests
export const waitForAsyncOperation = (timeout = 1000) => {
  return new Promise(resolve => setTimeout(resolve, timeout))
}

// Console error suppressor for tests
export const suppressConsoleError = () => {
  const originalError = console.error
  const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {})

  return {
    restore: () => {
      consoleSpy.mockRestore()
      console.error = originalError
    }
  }
}