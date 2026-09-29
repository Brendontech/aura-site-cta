import React from 'react'
import logo from '../assets/logo.png'

// Logo única do site — para trocar, substitua src/assets/logo.png
export default function Logo({ className = 'h-11' }) {
  return <img src={logo} alt="Aura Homecare" className={`${className} w-auto rounded-lg`} />
}
