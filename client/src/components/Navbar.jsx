import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import logo from '../assets/logo.png'

const links = [
  { to: '/',        label: 'Home'    },
  { to: '/chat',    label: 'Chat'    },
  { to: '/pricing', label: 'Pricing' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setOpen(false) }, [pathname])

  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-white/95 backdrop-blur-md shadow-card border-b border-sage' : 'bg-transparent'
    }`}>
      <div className="max-w-6xl mx-auto px-5 lg:px-8 flex items-center justify-between h-16">

        {/* Logo */}
        <Link to="/" className="flex-shrink-0">
          <img src={logo} alt="CueHealth" className="h-8 w-auto" />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {links.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors duration-150 ${
                pathname === to
                  ? 'text-forest bg-sage'
                  : 'text-charcoal hover:text-forest hover:bg-sage/60'
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            to="/pricing"
            className="text-sm font-medium text-forest hover:text-forest-dark transition-colors"
          >
            View Plans
          </Link>
          <Link
            to="/chat"
            className="px-5 py-2 rounded-xl bg-forest text-white text-sm font-semibold
                       hover:bg-forest-dark transition-all duration-150 shadow-btn hover:shadow-card-hover"
          >
            Start Free
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 rounded-xl text-charcoal hover:bg-sage transition-colors"
          onClick={() => setOpen(o => !o)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-white border-t border-sage px-5 py-4 space-y-1 shadow-card animate-fade-in">
          {links.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className={`block px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                pathname === to ? 'text-forest bg-sage' : 'text-charcoal hover:bg-sage/60'
              }`}
            >
              {label}
            </Link>
          ))}
          <div className="pt-3 border-t border-sage">
            <Link
              to="/chat"
              className="block text-center px-4 py-3 rounded-xl bg-forest text-white text-sm font-semibold"
            >
              Start Free
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
