import React from 'react'
import Hero from '../components/Hero'
import ModulesMarquee from '../components/ModulesMarquee'
import Features from '../components/Features'
import CheckinSection from '../components/CheckinSection'
import Benefits from '../components/Benefits'
import Pricing from '../components/Pricing'
import StatsBar from '../components/StatsBar'
import Testimonials from '../components/Testimonials'
import HelpTeaser from '../components/HelpTeaser'

export default function HomePage() {
  return (
    <>
      <Hero />
      <ModulesMarquee />
      <StatsBar />
      <Features />
      <CheckinSection />
      <Benefits />
      <Testimonials />
      <Pricing />
      <HelpTeaser />
    </>
  )
}
