import React from 'react'
import Hero from '../components/Hero'
import StatsBar from '../components/StatsBar'
import Features from '../components/Features'
import IntelligenceBanner from '../components/IntelligenceBanner'
import Benefits from '../components/Benefits'
import Pricing from '../components/Pricing'

export default function HomePage() {
  return (
    <>
      <Hero />
      <StatsBar />
      <Features />
      <IntelligenceBanner />
      <Benefits />
      <Pricing />
    </>
  )
}
