/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        teal:  { DEFAULT: '#2BBFB3', light: '#4DD9CE', dark: '#1A9B90', soft: '#E6FAF8' },
        green: { DEFAULT: '#52C48A', light: '#7ED9A8' },
        navy:  { DEFAULT: '#0D1B2A', 2: '#122337',     3: '#1C3448' },
      },
      fontFamily: {
        display: ['Sora', 'sans-serif'],
        body:    ['DM Sans', 'sans-serif'],
      },
      backgroundImage: {
        'aura-grad':   'linear-gradient(135deg, #2BBFB3 0%, #52C48A 100%)',
        'dark-grad':   'linear-gradient(135deg, #0D1B2A 0%, #1A3A52 100%)',
        'hero-mesh':   'radial-gradient(ellipse at 20% 50%, rgba(43,191,179,0.15) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(82,196,138,0.1) 0%, transparent 50%)',
      },
      animation: {
        'float':        'float 4s ease-in-out infinite',
        'float-slow':   'float 7s ease-in-out infinite',
        'float-fast':   'float 3s ease-in-out infinite',
        'pulse-glow':   'pulseGlow 2.5s ease-in-out infinite',
        'slide-up':     'slideUp 0.6s ease both',
        'fade-in':      'fadeIn 0.5s ease both',
        'counter':      'counter 1.5s ease both',
        'scan':         'scan 2s ease-in-out infinite',
        'ping-slow':    'ping 2s cubic-bezier(0,0,0.2,1) infinite',
        'bounce-slow':  'bounce 3s infinite',
        'gradient-x':   'gradientX 4s ease infinite',
        'scroll-left':  'scrollLeft 40s linear infinite',
        'scroll-right': 'scrollLeft 40s linear infinite reverse',
        'spin-slow':    'spin 18s linear infinite',
        'swap-in':      'swapIn .6s cubic-bezier(.16,1,.3,1) both',
        'fade-up':      'slideUp 0.9s cubic-bezier(.16,1,.3,1) both',
        'tab-progress': 'tabProgress linear forwards',
      },
      keyframes: {
        float:      { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-14px)' } },
        pulseGlow:  { '0%,100%': { boxShadow: '0 0 20px rgba(43,191,179,0.3)' }, '50%': { boxShadow: '0 0 50px rgba(43,191,179,0.6)' } },
        slideUp:    { from: { opacity: '0', transform: 'translateY(30px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        fadeIn:     { from: { opacity: '0' }, to: { opacity: '1' } },
        scan:       { '0%,100%': { top: '0%' }, '50%': { top: '90%' } },
        gradientX:  { '0%,100%': { backgroundPosition: '0% 50%' }, '50%': { backgroundPosition: '100% 50%' } },
        scrollLeft: { from: { transform: 'translateX(0)' }, to: { transform: 'translateX(-50%)' } },
        tabProgress:{ from: { transform: 'scaleX(0)' }, to: { transform: 'scaleX(1)' } },
        swapIn:     { from: { opacity: '0', transform: 'translateY(16px) scale(.98)' }, to: { opacity: '1', transform: 'none' } },
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(.16,1,.3,1)',
      },
      boxShadow: {
        'teal':   '0 4px 24px rgba(43,191,179,0.35)',
        'teal-lg':'0 8px 40px rgba(43,191,179,0.45)',
        'card':   '0 2px 20px rgba(13,27,42,0.08)',
        'card-lg':'0 8px 40px rgba(13,27,42,0.12)',
      },
    },
  },
  plugins: [],
}
