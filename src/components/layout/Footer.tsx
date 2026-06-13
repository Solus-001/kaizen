import { Link } from 'react-router-dom'
import { Heart } from 'lucide-react'

const links = [
  { label: 'Home', to: '/' },
  { label: 'Grades', to: '/grades' },
  { label: 'Browse', to: '/browse' },
  { label: 'Quiz', to: '/quiz' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
]

export function Footer() {
  return (
    <footer
      className="mt-auto border-t"
      style={{ borderColor: 'var(--border)' }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div className="flex items-center gap-2">
            <div
              className="w-7 h-7 rounded-md flex items-center justify-center text-white font-bold text-xs"
              style={{ background: 'linear-gradient(135deg, var(--gradient-start), var(--gradient-end))' }}
            >
              K
            </div>
            <span className="text-base font-bold" style={{ color: 'var(--text-primary)' }}>
              Kaizen
            </span>
          </div>

          {/* Links */}
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
            {links.map(({ label, to }) => (
              <Link
                key={to}
                to={to}
                className="no-underline hover:underline transition-colors"
                style={{ color: 'var(--text-secondary)' }}
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Bottom bar */}
        <div
          className="border-t mt-6 pt-5 flex flex-col items-center gap-2 text-xs text-center"
          style={{ borderColor: 'var(--border)', color: 'var(--text-secondary)' }}
        >
          <p>
            Made with <Heart size={11} className="inline" style={{ color: 'var(--accent)' }} /> by{' '}
            <strong style={{ color: 'var(--accent)' }}>Ntokzin</strong> for SA students
          </p>
          <p>
            © {new Date().getFullYear()} Kaizen — Not affiliated with the Department of Basic Education (DBE).
          </p>
          <p>
            Past papers and study materials belong to their respective owners.
          </p>
        </div>
      </div>
    </footer>
  )
}
