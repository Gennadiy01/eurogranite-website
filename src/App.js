import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import Home from './pages/Home'
import Products from './pages/Products'
import About from './pages/About'
import Gallery from './pages/Gallery'
import Articles from './pages/Articles'
import Contact from './pages/Contact'
import AdminUpload from './pages/AdminUpload'
import Footer from './components/organisms/Footer/Footer'
import UniversalTextureGallery from './components/granite-system/gallery/UniversalTextureGallery'
import ToastContainer from './components/molecules/ToastContainer'
import LocalizedLayout from './components/routing/LocalizedLayout'
import LanguageRedirect from './components/routing/LanguageRedirect'

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

          {/* Admin route (no localization needed) */}
          <Route path="/admin/upload" element={<AdminUpload />} />
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
