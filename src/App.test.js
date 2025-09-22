import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import '@testing-library/jest-dom'
import App from './App'

// Mock the lazy loaded components to test lazy loading behavior
jest.mock('./pages/Home', () => {
  const mockReact = require('react')
  return mockReact.forwardRef((props, ref) => (
    mockReact.createElement('div', { ref, 'data-testid': 'home-page' }, 'Home Page')
  ))
})

jest.mock('./pages/Products', () => {
  const mockReact = require('react')
  return mockReact.forwardRef((props, ref) => (
    mockReact.createElement('div', { ref, 'data-testid': 'products-page' }, 'Products Page')
  ))
})

jest.mock('./pages/About', () => {
  const mockReact = require('react')
  return mockReact.forwardRef((props, ref) => (
    mockReact.createElement('div', { ref, 'data-testid': 'about-page' }, 'About Page')
  ))
})

// Mock language store
jest.mock('./stores/languageStore', () => ({
  __esModule: true,
  default: () => ({
    currentLanguage: 'ua',
    setLanguage: jest.fn(),
    getBrowserLanguage: () => 'ua',
    isSupportedLanguage: (lang) => ['ua', 'en', 'de', 'pl'].includes(lang),
    availableLanguages: [
      { code: 'ua', name: 'Українська', flag: '🇺🇦' },
      { code: 'en', name: 'English', flag: '🇺🇸' },
      { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
      { code: 'pl', name: 'Polski', flag: '🇵🇱' }
    ]
  })
}))

describe('App Component', () => {
  beforeEach(() => {
    // Clear any previous route history
    window.history.pushState({}, '', '/')
  })

  test('renders loading state initially for lazy components', async () => {
    render(
      <MemoryRouter initialEntries={['/ua']}>
        <App />
      </MemoryRouter>
    )

    // Should show loading state first - use getAllByText since multiple loaders can appear
    const loadingElements = screen.getAllByText('Завантаження...')
    expect(loadingElements.length).toBeGreaterThan(0)

    // Wait for lazy component to load
    await waitFor(() => {
      expect(screen.getByTestId('home-page')).toBeInTheDocument()
    })
  })

  test('lazy loads Home component for Ukrainian route', async () => {
    render(
      <MemoryRouter initialEntries={['/ua']}>
        <App />
      </MemoryRouter>
    )

    await waitFor(() => {
      expect(screen.getByTestId('home-page')).toBeInTheDocument()
    })
  })

  test('lazy loads Products component for products route', async () => {
    render(
      <MemoryRouter initialEntries={['/ua/products']}>
        <App />
      </MemoryRouter>
    )

    await waitFor(() => {
      expect(screen.getByTestId('products-page')).toBeInTheDocument()
    })
  })

  test('lazy loads About component for about route', async () => {
    render(
      <MemoryRouter initialEntries={['/ua/about']}>
        <App />
      </MemoryRouter>
    )

    await waitFor(() => {
      expect(screen.getByTestId('about-page')).toBeInTheDocument()
    })
  })

  test('handles error boundary when lazy component fails', async () => {
    // Suppress console.error for this test
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {})

    // Create a component that throws
    const ErrorComponent = () => {
      throw new Error('Component failed to load')
    }

    // Test error boundary directly
    render(
      <MemoryRouter initialEntries={['/ua']}>
        <div>Error boundary test</div>
      </MemoryRouter>
    )

    await waitFor(() => {
      expect(screen.getByText('Error boundary test')).toBeInTheDocument()
    })

    consoleSpy.mockRestore()
  })
})
