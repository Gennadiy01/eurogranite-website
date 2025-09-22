import React, { Suspense, lazy, useEffect } from 'react'
import { HelmetProvider } from 'react-helmet-async'
import LazyLoadErrorBoundary from './components/atoms/ErrorBoundary'
import PageLoader from './components/atoms/PageLoader'
import UniversalTextureGallery from './components/granite-system/gallery/UniversalTextureGallery'
import ToastContainer from './components/molecules/ToastContainer'
import useLanguageStore from './stores/languageStore'
import { getLanguageFromPath } from './utils/languageUtils'

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

  // Check for hash-based routing from 404.html redirects
  const [currentPath, setCurrentPath] = React.useState(
    window.location.hash ? window.location.hash.substring(1) : window.location.pathname
  )

  // Listen for hash changes
  useEffect(() => {
    const handleHashChange = () => {
      const newPath = window.location.hash ? window.location.hash.substring(1) : window.location.pathname
      setCurrentPath(newPath)
    }

    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  // Update language store based on current path
  useEffect(() => {
    const detectedLanguage = getLanguageFromPath(currentPath)
    const { currentLanguage } = useLanguageStore.getState()

    console.log('Language detection:', {
      currentPath,
      detectedLanguage,
      storedLanguage: currentLanguage,
      willUpdate: detectedLanguage !== currentLanguage
    })

    // Always update language based on URL, even if different from stored
    if (detectedLanguage !== currentLanguage) {
      setLanguage(detectedLanguage)
    }
  }, [currentPath, setLanguage])

  // Determine which page to render based on current path
  const getCurrentPage = () => {
    const path = currentPath.replace(/^\/(ua|en|de|pl)/, '') || '/'

    switch (path) {
      case '/':
        return <Home />
      case '/products':
        return <Products />
      case '/about':
        return <About />
      case '/gallery':
        return <Gallery />
      case '/articles':
        return <Articles />
      case '/contact':
        return <Contact />
      case '/admin/upload':
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
