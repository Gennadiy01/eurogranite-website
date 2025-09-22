import React, { Suspense, lazy } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import LazyLoadErrorBoundary from './components/atoms/ErrorBoundary'
import PageLoader from './components/atoms/PageLoader'
import UniversalTextureGallery from './components/granite-system/gallery/UniversalTextureGallery'
import ToastContainer from './components/molecules/ToastContainer'
import LocalizedLayout from './components/routing/LocalizedLayout'
import LanguageRedirect from './components/routing/LanguageRedirect'

// Lazy load all page components
const Home = lazy(() => import('./pages/Home'))
const Products = lazy(() => import('./pages/Products'))
const About = lazy(() => import('./pages/About'))
const Gallery = lazy(() => import('./pages/Gallery'))
const Articles = lazy(() => import('./pages/Articles'))
const Contact = lazy(() => import('./pages/Contact'))
const AdminUpload = lazy(() => import('./pages/AdminUpload'))

function App() {
  return (
    <HelmetProvider>
      <div className="App">
        <Router basename="/eurogranite-website">
        <Routes>
          {/* Language redirect for non-localized URLs */}
          <Route path="/" element={<LanguageRedirect />} />
          <Route path="/products" element={<LanguageRedirect />} />
          <Route path="/about" element={<LanguageRedirect />} />
          <Route path="/gallery" element={<LanguageRedirect />} />
          <Route path="/articles" element={<LanguageRedirect />} />
          <Route path="/contact" element={<LanguageRedirect />} />

          {/* Localized routes with lazy loading */}
          <Route path="/:lang" element={
            <LazyLoadErrorBoundary>
              <Suspense fallback={<PageLoader />}>
                <LocalizedLayout>
                  <Home />
                </LocalizedLayout>
              </Suspense>
            </LazyLoadErrorBoundary>
          } />
          <Route path="/:lang/products" element={
            <LazyLoadErrorBoundary>
              <Suspense fallback={<PageLoader />}>
                <LocalizedLayout>
                  <Products />
                </LocalizedLayout>
              </Suspense>
            </LazyLoadErrorBoundary>
          } />
          <Route path="/:lang/about" element={
            <LazyLoadErrorBoundary>
              <Suspense fallback={<PageLoader />}>
                <LocalizedLayout>
                  <About />
                </LocalizedLayout>
              </Suspense>
            </LazyLoadErrorBoundary>
          } />
          <Route path="/:lang/gallery" element={
            <LazyLoadErrorBoundary>
              <Suspense fallback={<PageLoader />}>
                <LocalizedLayout>
                  <Gallery />
                </LocalizedLayout>
              </Suspense>
            </LazyLoadErrorBoundary>
          } />
          <Route path="/:lang/articles" element={
            <LazyLoadErrorBoundary>
              <Suspense fallback={<PageLoader />}>
                <LocalizedLayout>
                  <Articles />
                </LocalizedLayout>
              </Suspense>
            </LazyLoadErrorBoundary>
          } />
          <Route path="/:lang/contact" element={
            <LazyLoadErrorBoundary>
              <Suspense fallback={<PageLoader />}>
                <LocalizedLayout>
                  <Contact />
                </LocalizedLayout>
              </Suspense>
            </LazyLoadErrorBoundary>
          } />

          {/* Admin route (no localization needed) */}
          <Route path="/admin/upload" element={
            <LazyLoadErrorBoundary>
              <Suspense fallback={<PageLoader />}>
                <AdminUpload />
              </Suspense>
            </LazyLoadErrorBoundary>
          } />

          {/* Catch-all route for any unmatched paths */}
          <Route path="*" element={<LanguageRedirect />} />
        </Routes>

        {/* Global Modal Components */}
        <UniversalTextureGallery />

        {/* Global Toast Container */}
        <ToastContainer />
        </Router>
      </div>
    </HelmetProvider>
  )
}

export default App
