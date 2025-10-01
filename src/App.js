import React, { Suspense, lazy, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import './styles/button-fix.css'
import LazyLoadErrorBoundary from './components/atoms/ErrorBoundary'
import PageLoader from './components/atoms/PageLoader'
import Footer from './components/organisms/Footer/Footer'
import UniversalTextureGallery from './components/granite-system/gallery/UniversalTextureGallery'
import ToastContainer from './components/molecules/ToastContainer'
import LocalizedLayout from './components/routing/LocalizedLayout'
import LanguageRedirect from './components/routing/LanguageRedirect'
import useLanguageStore from './stores/languageStore'
import { StructuredData, WebsiteSchema } from './components/seo'

// Lazy load all page components
const Home = lazy(() => import('./pages/Home'))
const Products = lazy(() => import('./pages/Products'))
const About = lazy(() => import('./pages/About'))
const Gallery = lazy(() => import('./pages/Gallery'))
const Articles = lazy(() => import('./pages/Articles'))
const Contact = lazy(() => import('./pages/Contact'))
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'))
const AdminUpload = lazy(() => import('./pages/AdminUpload'))
const NotFound = lazy(() => import('./pages/NotFound'))

// Check if we're in static mode (for production builds)
const isStaticMode = () => {
  return typeof window !== 'undefined' && window.__INITIAL_STATE__
}

// Static App component for production
const StaticApp = () => {
  const { setLanguage } = useLanguageStore()

  // Get initial state from static HTML generation
  const getInitialState = () => {
    if (typeof window !== 'undefined' && window.__INITIAL_STATE__) {
      return window.__INITIAL_STATE__
    }
    return {
      language: 'en',
      page: '',
      route: '/'
    }
  }

  const appState = getInitialState()

  // Set language once on mount
  useEffect(() => {
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
        {/* SEO Structured Data */}
        <WebsiteSchema />
        <StructuredData type="organization" />
        <StructuredData type="localBusiness" />

        <LazyLoadErrorBoundary>
          <Suspense fallback={<PageLoader />}>
            {getCurrentPage()}
            <Footer />
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

// Dynamic App component for development
const DynamicApp = () => {
  // Dynamic basename based on environment - for development use no basename
  // Changed to empty string for Hostinger deployment
  const basename = ''

  return (
    <HelmetProvider>
      <div className="App">
        {/* SEO Structured Data */}
        <WebsiteSchema />
        <StructuredData type="organization" />
        <StructuredData type="localBusiness" />

        <Router basename={basename}>
          <LazyLoadErrorBoundary>
            <Suspense fallback={<PageLoader />}>
              <Routes>
                {/* Language redirect for non-localized URLs */}
                <Route path="/" element={<LanguageRedirect />} />
                <Route path="/products" element={<LanguageRedirect />} />
                <Route path="/about" element={<LanguageRedirect />} />
                <Route path="/gallery" element={<LanguageRedirect />} />
                <Route path="/articles" element={<LanguageRedirect />} />
                <Route path="/contact" element={<LanguageRedirect />} />
                <Route path="/privacy-policy" element={<LanguageRedirect />} />

                {/* Localized routes */}
                <Route path="/:lang" element={
                  <LocalizedLayout>
                    <Home />
                    <Footer />
                  </LocalizedLayout>
                } />
                <Route path="/:lang/products" element={
                  <LocalizedLayout>
                    <Products />
                    <Footer />
                  </LocalizedLayout>
                } />
                <Route path="/:lang/about" element={
                  <LocalizedLayout>
                    <About />
                    <Footer />
                  </LocalizedLayout>
                } />
                <Route path="/:lang/gallery" element={
                  <LocalizedLayout>
                    <Gallery />
                    <Footer />
                  </LocalizedLayout>
                } />
                <Route path="/:lang/articles" element={
                  <LocalizedLayout>
                    <Articles />
                    <Footer />
                  </LocalizedLayout>
                } />
                <Route path="/:lang/contact" element={
                  <LocalizedLayout>
                    <Contact />
                    <Footer />
                  </LocalizedLayout>
                } />
                <Route path="/:lang/privacy-policy" element={
                  <LocalizedLayout>
                    <PrivacyPolicy />
                    <Footer />
                  </LocalizedLayout>
                } />

                {/* Admin route (no localization needed) */}
                <Route path="/admin/upload" element={<AdminUpload />} />

                {/* 404 route */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </LazyLoadErrorBoundary>

          {/* Global Modal Components */}
          <UniversalTextureGallery />

          {/* Global Toast Container */}
          <ToastContainer />
        </Router>
      </div>
    </HelmetProvider>
  )
}

// Main App component that chooses between static and dynamic mode
function App() {
  // Always use dynamic mode with React Router for proper navigation
  return <DynamicApp />
}

export default App
