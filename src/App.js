import React, { Suspense, lazy, useEffect } from 'react'
import { HelmetProvider } from 'react-helmet-async'
import LazyLoadErrorBoundary from './components/atoms/ErrorBoundary'
import PageLoader from './components/atoms/PageLoader'
import UniversalTextureGallery from './components/granite-system/gallery/UniversalTextureGallery'
import ToastContainer from './components/molecules/ToastContainer'
import useLanguageStore from './stores/languageStore'

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

  // Get initial state from static HTML generation
  const getInitialState = () => {
    // For static sites, always use window.__INITIAL_STATE__ set by static page generation
    if (typeof window !== 'undefined' && window.__INITIAL_STATE__) {
      return window.__INITIAL_STATE__
    }

    // Fallback for development
    return {
      language: 'en',
      page: '',
      route: '/'
    }
  }

  const appState = getInitialState()

  // Set language once on mount
  useEffect(() => {
    console.log('Static page loaded:', {
      language: appState.language,
      page: appState.page,
      route: appState.route
    })

    setLanguage(appState.language)
  }, [appState.language, appState.page, appState.route, setLanguage])

  // Determine which page to render based on static generation
  const getCurrentPage = () => {
    const page = appState.page || ''

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
      case '404':
        return <NotFound />
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
