import React, { useEffect, useRef } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import FloatingButtons from './components/FloatingButtons'
import HomePage from './pages/HomePage'
import ContactPage from './pages/ContactPage'
import { DemoChooserProvider } from './context/DemoChooser'

// Vai para o topo ao trocar de página ou rola até a âncora (/#funcionalidades)
function ScrollManager() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (!hash) { window.scrollTo({ top: 0, behavior: 'instant' }); return }
    const t = setTimeout(() => document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'smooth' }), 60)
    return () => clearTimeout(t)
  }, [pathname, hash])
  return null
}

function ScrollProgress() {
  const ref = useRef(null)
  useEffect(() => {
    let raf = 0
    const update = () => {
      raf = 0
      const max = document.documentElement.scrollHeight - window.innerHeight
      ref.current?.style.setProperty('--p', max > 0 ? window.scrollY / max : 0)
    }
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update) }
    window.addEventListener('scroll', onScroll, { passive: true })
    update()
    return () => { window.removeEventListener('scroll', onScroll); cancelAnimationFrame(raf) }
  }, [])
  return <div ref={ref} className="scroll-progress fixed top-0 left-0 right-0 h-[3px] bg-aura-grad z-[60] pointer-events-none" />
}

export default function App() {
  return (
    <DemoChooserProvider>
      <ScrollManager />
      <ScrollProgress />
      <Navbar />
      <main>
        <Routes>
          <Route path="/"        element={<HomePage />} />
          <Route path="/contato" element={<ContactPage />} />
          <Route path="*"        element={<HomePage />} />
        </Routes>
      </main>
      <Footer />
      <FloatingButtons />
    </DemoChooserProvider>
  )
}
