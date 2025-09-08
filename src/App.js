import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Products from './pages/Products'
import About from './pages/About'
import Gallery from './pages/Gallery'
import Articles from './pages/Articles'
import Contact from './pages/Contact'
import Footer from './components/organisms/Footer/Footer'
import UniversalTextureGallery from './components/granite-system/gallery/UniversalTextureGallery'

function App() {
  return (
    <div className="App">
      <Router basename="/eurogranite-website">
        <Routes>
          <Route path="/" element={<><Home /><Footer /></>} />
          <Route path="/products" element={<><Products /><Footer /></>} />
          <Route path="/about" element={<><About /><Footer /></>} />
          <Route path="/gallery" element={<><Gallery /><Footer /></>} />
          <Route path="/articles" element={<><Articles /><Footer /></>} />
          <Route path="/contact" element={<><Contact /><Footer /></>} />
        </Routes>
        
        {/* Global Modal Components */}
        <UniversalTextureGallery />
      </Router>
    </div>
  )
}

export default App
