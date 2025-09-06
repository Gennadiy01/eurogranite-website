import React from 'react'
import Header from '../components/organisms/Header/Header'
import Hero from '../components/organisms/Hero/Hero'
import UniqueProposition from '../components/organisms/UniqueProposition/UniqueProposition'
import GraniteColors from '../components/organisms/GraniteColors/GraniteColors'
import ModalManager from '../components/organisms/ModalManager/ModalManager'

const Home = () => {
  return (
    <div className="home-page">
      <Header />
      <main>
        <Hero />
        <UniqueProposition />
        <GraniteColors />
      </main>
      <ModalManager />
    </div>
  )
}

export default Home