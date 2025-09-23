import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import App from './App'

// Mock window.location.pathname
const mockLocation = {
  pathname: '/ua',
  href: 'http://localhost:3000/ua'
}

// Store original location
const originalLocation = window.location

beforeAll(() => {
  delete window.location
  window.location = mockLocation
})

afterAll(() => {
  window.location = originalLocation
})

// Mock the lazy loaded components
jest.mock('./pages/Home', () => {
  const mockReact = require('react')
  return function MockHome() {
    return mockReact.createElement('div', { 'data-testid': 'home-page' }, 'Home Page')
  }
})

jest.mock('./pages/Products', () => {
  const mockReact = require('react')
  return function MockProducts() {
    return mockReact.createElement('div', { 'data-testid': 'products-page' }, 'Products Page')
  }
})

jest.mock('./pages/About', () => {
  const mockReact = require('react')
  return function MockAbout() {
    return mockReact.createElement('div', { 'data-testid': 'about-page' }, 'About Page')
  }
})

jest.mock('./pages/Contact', () => {
  const mockReact = require('react')
  return function MockContact() {
    return mockReact.createElement('div', { 'data-testid': 'contact-page' }, 'Contact Page')
  }
})

jest.mock('./pages/Gallery', () => {
  const mockReact = require('react')
  return function MockGallery() {
    return mockReact.createElement('div', { 'data-testid': 'gallery-page' }, 'Gallery Page')
  }
})

jest.mock('./pages/Articles', () => {
  const mockReact = require('react')
  return function MockArticles() {
    return mockReact.createElement('div', { 'data-testid': 'articles-page' }, 'Articles Page')
  }
})

jest.mock('./pages/AdminUpload', () => {
  const mockReact = require('react')
  return function MockAdminUpload() {
    return mockReact.createElement('div', { 'data-testid': 'admin-page' }, 'Admin Page')
  }
})

jest.mock('./pages/NotFound', () => {
  const mockReact = require('react')
  return function MockNotFound() {
    return mockReact.createElement('div', { 'data-testid': 'not-found-page' }, '404 Not Found Page')
  }
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

describe('App Component - Static Architecture', () => {
  beforeEach(() => {
    // Reset location before each test
    window.location.pathname = '/ua'
  })

  test('renders without crashing', () => {
    render(<App />)
    // App should render successfully
    expect(document.querySelector('.App')).toBeInTheDocument()
  })

  test('renders loading state initially for lazy components', async () => {
    render(<App />)

    // Should eventually show the component
    await waitFor(() => {
      expect(screen.getByTestId('home-page')).toBeInTheDocument()
    }, { timeout: 3000 })
  })

  test('shows Home component for root Ukrainian path', async () => {
    window.location.pathname = '/ua'
    render(<App />)

    await waitFor(() => {
      expect(screen.getByTestId('home-page')).toBeInTheDocument()
    }, { timeout: 3000 })
  })

  test('shows Products component for Ukrainian products path', async () => {
    window.__INITIAL_STATE__ = {
      language: 'ua',
      page: 'products',
      route: '/ua/products'
    }
    render(<App />)

    await waitFor(() => {
      expect(screen.getByTestId('products-page')).toBeInTheDocument()
    }, { timeout: 3000 })

    // Cleanup
    delete window.__INITIAL_STATE__
  })

  test('shows About component for Ukrainian about path', async () => {
    window.__INITIAL_STATE__ = {
      language: 'ua',
      page: 'about',
      route: '/ua/about'
    }
    render(<App />)

    await waitFor(() => {
      expect(screen.getByTestId('about-page')).toBeInTheDocument()
    }, { timeout: 3000 })

    // Cleanup
    delete window.__INITIAL_STATE__
  })

  test('shows Contact component for Ukrainian contact path', async () => {
    window.__INITIAL_STATE__ = {
      language: 'ua',
      page: 'contact',
      route: '/ua/contact'
    }
    render(<App />)

    await waitFor(() => {
      expect(screen.getByTestId('contact-page')).toBeInTheDocument()
    }, { timeout: 3000 })

    // Cleanup
    delete window.__INITIAL_STATE__
  })

  test('shows Gallery component for Ukrainian gallery path', async () => {
    window.__INITIAL_STATE__ = {
      language: 'ua',
      page: 'gallery',
      route: '/ua/gallery'
    }
    render(<App />)

    await waitFor(() => {
      expect(screen.getByTestId('gallery-page')).toBeInTheDocument()
    }, { timeout: 3000 })

    // Cleanup
    delete window.__INITIAL_STATE__
  })

  test('shows Articles component for Ukrainian articles path', async () => {
    window.__INITIAL_STATE__ = {
      language: 'ua',
      page: 'articles',
      route: '/ua/articles'
    }
    render(<App />)

    await waitFor(() => {
      expect(screen.getByTestId('articles-page')).toBeInTheDocument()
    }, { timeout: 3000 })

    // Cleanup
    delete window.__INITIAL_STATE__
  })

  test('shows Admin component for admin upload path', async () => {
    window.__INITIAL_STATE__ = {
      language: 'en',
      page: 'admin/upload',
      route: '/admin/upload'
    }
    render(<App />)

    await waitFor(() => {
      expect(screen.getByTestId('admin-page')).toBeInTheDocument()
    }, { timeout: 3000 })

    // Cleanup
    delete window.__INITIAL_STATE__
  })

  test('shows Home component for English root path', async () => {
    window.__INITIAL_STATE__ = {
      language: 'en',
      page: '',
      route: '/en'
    }
    render(<App />)

    await waitFor(() => {
      expect(screen.getByTestId('home-page')).toBeInTheDocument()
    }, { timeout: 3000 })

    // Cleanup
    delete window.__INITIAL_STATE__
  })

  test('shows Products component for English products path', async () => {
    window.__INITIAL_STATE__ = {
      language: 'en',
      page: 'products',
      route: '/en/products'
    }
    render(<App />)

    await waitFor(() => {
      expect(screen.getByTestId('products-page')).toBeInTheDocument()
    }, { timeout: 3000 })

    // Cleanup
    delete window.__INITIAL_STATE__
  })

  test('shows 404 page for unknown paths', async () => {
    window.__INITIAL_STATE__ = {
      language: 'ua',
      page: 'unknown-path',
      route: '/ua/unknown-path'
    }
    render(<App />)

    await waitFor(() => {
      expect(screen.getByTestId('not-found-page')).toBeInTheDocument()
    }, { timeout: 3000 })

    // Cleanup
    delete window.__INITIAL_STATE__
  })

  test('handles paths without language prefix', async () => {
    window.__INITIAL_STATE__ = {
      language: 'en',
      page: 'products',
      route: '/products'
    }
    render(<App />)

    await waitFor(() => {
      expect(screen.getByTestId('products-page')).toBeInTheDocument()
    }, { timeout: 3000 })

    // Cleanup
    delete window.__INITIAL_STATE__
  })

  test('shows 404 page for completely invalid paths', async () => {
    window.__INITIAL_STATE__ = {
      language: 'en',
      page: 'fhjtuky/tyylu',
      route: '/fhjtuky/tyylu'
    }
    render(<App />)

    await waitFor(() => {
      expect(screen.getByTestId('not-found-page')).toBeInTheDocument()
    }, { timeout: 3000 })

    // Cleanup
    delete window.__INITIAL_STATE__
  })

  test('shows 404 page for invalid language prefix paths', async () => {
    window.__INITIAL_STATE__ = {
      language: 'en',
      page: 'fr/products',
      route: '/fr/products'
    }
    render(<App />)

    await waitFor(() => {
      expect(screen.getByTestId('not-found-page')).toBeInTheDocument()
    }, { timeout: 3000 })

    // Cleanup
    delete window.__INITIAL_STATE__
  })
})