import React from 'react'
import Hero from '../components/Hero'
import ModulesMarquee from '../components/ModulesMarquee'
import Features from '../components/Features'
import CheckinSection from '../components/CheckinSection'
import Benefits from '../components/Benefits'
import Pricing from '../components/Pricing'

export default function HomePage() {
  return (
    <>
      <Hero />
      <ModulesMarquee />
      <Features />
      <CheckinSection />
      <Benefits />
      <Pricing />
    </>
  )
}
