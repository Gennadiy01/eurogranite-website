import React, { Suspense, lazy, useEffect } from 'react'
import { HelmetProvider } from 'react-helmet-async'
import LazyLoadErrorBoundary from './components/atoms/ErrorBoundary'
import PageLoader from './components/atoms/PageLoader'
import UniversalTextureGallery from './components/granite-system/gallery/UniversalTextureGallery'
import ToastContainer from './components/molecules/ToastContainer'
import useLanguageStore from './stores/languageStore'
import { parseRoute, getCurrentPath, isValidPage, testRouteParsing } from './utils/routingUtils'

// Lazy load all page components
const Home = lazy(() => import('./pages/Home'))
const Products = lazy(() => import('./pages/Products'))
const About = lazy(() => import('./pages/About'))
const Gallery = lazy(() => import('./pages/Gallery'))
const Articles = lazy(() => import('./pages/Articles'))
const Contact = lazy(() => import('./pages/Contact'))
const AdminUpload = lazy(() => import('./pages/AdminUpload'))
const NotFound = lazy(() => import('./pages/NotFound'))

function App() {
  const { setLanguage } = useLanguageStore()

  // Get initial state from server-side generation or browser
  const getInitialState = () => {
    if (typeof window !== 'undefined' && window.__INITIAL_STATE__) {
      return window.__INITIAL_STATE__
    }

    // Fallback to current location parsing using centralized routing
    const currentPath = getCurrentPath()
    return parseRoute(currentPath)
  }

  const [appState, setAppState] = React.useState(getInitialState())

  // Check for hash-based routing from 404.html redirects (legacy support)
  const [, setCurrentPath] = React.useState(appState.route)

  // Listen for hash changes (legacy support)
  useEffect(() => {
    const handleHashChange = () => {
      const newPath = getCurrentPath()
      setCurrentPath(newPath)

      // Use centralized routing parsing
      const routeData = parseRoute(newPath)
      setAppState(routeData)
    }

    // Only add listener if no initial state (legacy mode)
    if (!window.__INITIAL_STATE__) {
      window.addEventListener('hashchange', handleHashChange)
      return () => window.removeEventListener('hashchange', handleHashChange)
    }
  }, [])

  // Update language store based on app state
  useEffect(() => {
    console.log('Language detection:', {
      currentPath: appState.route,
      detectedLanguage: appState.language,
      page: appState.page,
      initialState: !!window.__INITIAL_STATE__
    })

    // Always update language based on app state
    setLanguage(appState.language)
  }, [appState, setLanguage])

  // Test routing system on app load (development only)
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.log('🧪 Testing routing system...')
      testRouteParsing()
    }
  }, [])

  // Determine which page to render based on app state
  const getCurrentPage = () => {
    const page = appState.page

    // Validate page using centralized validation
    if (!isValidPage(page)) {
      console.warn(`Invalid page: "${page}". Rendering NotFound component.`)
      return <NotFound />
    }

    switch (page) {
      case '':
        return <Home />
      case 'products':
        return <Products />
      case 'about':
        return <About />
      case 'gallery':
        return <Gallery />
      case 'articles':
        return <Articles />
      case 'contact':
        return <Contact />
      case 'admin/upload':
        return <AdminUpload />
      default:
        return <NotFound />
    }
  }

  return (
    <HelmetProvider>
      <div className="App">
        <LazyLoadErrorBoundary>
          <Suspense fallback={<PageLoader />}>
            {getCurrentPage()}
          </Suspense>
        </LazyLoadErrorBoundary>

        {/* Global Modal Components */}
        <UniversalTextureGallery />

        {/* Global Toast Container */}
        <ToastContainer />
      </div>
    </HelmetProvider>
  )
}

export default App
