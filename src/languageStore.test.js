import { renderHook, act } from '@testing-library/react'
import useLanguageStore from './stores/languageStore'

// Mock navigator.language
Object.defineProperty(navigator, 'language', {
  writable: true,
  value: 'en-US'
})

describe('useLanguageStore', () => {
  beforeEach(() => {
    // Reset store state before each test
    useLanguageStore.setState({
      currentLanguage: 'ua',
      availableLanguages: [
        { code: 'ua', name: 'Українська', flag: '🇺🇦' },
        { code: 'en', name: 'English', flag: '🇺🇸' },
        { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
        { code: 'pl', name: 'Polski', flag: '🇵🇱' }
      ]
    })
  })

  afterEach(() => {
    // Clean up localStorage
    localStorage.clear()
  })

  test('has correct initial state', () => {
    const { result } = renderHook(() => useLanguageStore())

    expect(result.current.currentLanguage).toBe('ua')
    expect(result.current.availableLanguages).toHaveLength(4)
  })

  test('setLanguage updates current language', () => {
    const { result } = renderHook(() => useLanguageStore())

    act(() => {
      result.current.setLanguage('en')
    })

    expect(result.current.currentLanguage).toBe('en')
  })

  test('setLanguage updates document.documentElement.lang', () => {
    const { result } = renderHook(() => useLanguageStore())

    act(() => {
      result.current.setLanguage('ua')
    })

    expect(document.documentElement.lang).toBe('uk')

    act(() => {
      result.current.setLanguage('en')
    })

    expect(document.documentElement.lang).toBe('en')
  })

  test('setLanguage ignores unsupported languages', () => {
    const { result } = renderHook(() => useLanguageStore())

    act(() => {
      result.current.setLanguage('fr') // Unsupported
    })

    expect(result.current.currentLanguage).toBe('ua') // Should remain unchanged
  })

  test('getBrowserLanguage returns supported browser language', () => {
    const { result } = renderHook(() => useLanguageStore())

    // Mock navigator.language to English
    Object.defineProperty(navigator, 'language', {
      value: 'en-US',
      writable: true
    })

    expect(result.current.getBrowserLanguage()).toBe('en')
  })

  test('getBrowserLanguage returns default for unsupported language', () => {
    const { result } = renderHook(() => useLanguageStore())

    // Mock navigator.language to unsupported language
    Object.defineProperty(navigator, 'language', {
      value: 'fr-FR',
      writable: true
    })

    expect(result.current.getBrowserLanguage()).toBe('en')
  })

  test('isSupportedLanguage correctly identifies supported languages', () => {
    const { result } = renderHook(() => useLanguageStore())

    expect(result.current.isSupportedLanguage('ua')).toBe(true)
    expect(result.current.isSupportedLanguage('en')).toBe(true)
    expect(result.current.isSupportedLanguage('de')).toBe(true)
    expect(result.current.isSupportedLanguage('pl')).toBe(true)
    expect(result.current.isSupportedLanguage('fr')).toBe(false)
    expect(result.current.isSupportedLanguage('es')).toBe(false)
  })

  test('getCurrentLanguage returns current language object', () => {
    const { result } = renderHook(() => useLanguageStore())

    act(() => {
      result.current.setLanguage('en')
    })

    const currentLang = result.current.getCurrentLanguage()
    expect(currentLang).toEqual({
      code: 'en',
      name: 'English',
      flag: '🇺🇸'
    })
  })

  test('language persists in localStorage', () => {
    const { result } = renderHook(() => useLanguageStore())

    act(() => {
      result.current.setLanguage('de')
    })

    // Check if language is saved in localStorage
    const stored = JSON.parse(localStorage.getItem('eurogranite-language'))
    expect(stored.state.currentLanguage).toBe('de')
  })
})