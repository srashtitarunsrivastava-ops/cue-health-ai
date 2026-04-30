import { Link } from 'react-router-dom'
import { Heart } from 'lucide-react'
import logo from '../assets/logo.png'

const cols = [
  {
    title: 'Product',
    links: [
      { label: 'Home',         to: '/'        },
      { label: 'Chat',         to: '/chat'    },
      { label: 'Pricing',      to: '/pricing' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy',    to: '#' },
      { label: 'Terms of Service',  to: '#' },
      { label: 'Medical Disclaimer',to: '#' },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'Help Center', to: '#' },
      { label: 'Contact Us',  to: '#' },
      { label: 'Feedback',    to: '#' },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="bg-charcoal text-white">
      <div className="max-w-6xl mx-auto px-5 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <img src={logo} alt="CueHealth" className="h-8 w-auto bg-white rounded-lg px-2 py-1 mb-4" />
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              AI-powered health guidance to help you understand your symptoms and make better decisions.
            </p>
            <p className="mt-4 text-xs text-gray-500 italic">
              Not a substitute for professional medical advice.
            </p>
          </div>

          {/* Columns */}
          {cols.map(col => (
            <div key={col.title}>
              <h3 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">{col.title}</h3>
              <ul className="space-y-3">
                {col.links.map(l => (
                  <li key={l.label}>
                    <Link
                      to={l.to}
                      className="text-sm text-gray-400 hover:text-vital transition-colors duration-150"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} CueHealth. All rights reserved.
          </p>
          <p className="text-gray-500 text-sm flex items-center gap-1.5">
            Made with <Heart size={13} className="text-vital fill-vital" /> for better health
          </p>
        </div>
      </div>
    </footer>
  )
}
