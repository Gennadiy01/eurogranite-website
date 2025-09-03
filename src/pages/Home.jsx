import React from 'react'
import Header from '../components/organisms/Header/Header'
import Hero from '../components/organisms/Hero/Hero'
import GraniteColorSection from '../components/organisms/GraniteColorSection/GraniteColorSection'
import ModalManager from '../components/organisms/ModalManager/ModalManager'

const Home = () => {
  return (
    <div className="home-page">
      <Header />
      <main>
        <Hero />
        <GraniteColorSection />
      </main>
      <ModalManager />
    </div>
  )
}

export default Home