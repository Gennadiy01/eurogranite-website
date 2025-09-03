import React from 'react'
import Header from './components/organisms/Header/Header'
import Hero from './components/organisms/Hero/Hero'
import Footer from './components/organisms/Footer/Footer'

function App() {
  return (
    <div className="App">
      <Header />
      <main id="home">
        <Hero />
      </main>
      <Footer />
    </div>
  )
}

export default App
