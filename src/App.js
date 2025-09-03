import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Products from './pages/Products'
import Contact from './pages/Contact'
import Footer from './components/organisms/Footer/Footer'

function App() {
  return (
    <div className="App">
      <Router basename="/eurogranite-website">
        <Routes>
          <Route path="/" element={<><Home /><Footer /></>} />
          <Route path="/products" element={<><Products /><Footer /></>} />
          <Route path="/contact" element={<><Contact /><Footer /></>} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
