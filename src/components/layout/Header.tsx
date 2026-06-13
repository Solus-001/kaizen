import { Link, useLocation } from 'react-router-dom'
import { ThemeSwitcher } from '../ThemeSwitcher'
import { Menu, X, ChevronDown } from 'lucide-react'
import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const GRADES = [
  { id: '10', label: 'Grade 10' },
  { id: '11', label: 'Grade 11' },
  { id: '12', label: 'Grade 12' },
]

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/browse', label: 'Browse' },
  { to: '/quiz', label: 'Quiz' },
  { to: '/about', label: 'About' },
]

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [gradesOpen, setGradesOpen] = useState(false)
  const location = useLocation()
  const gradesTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)

  const isActive = (path: string) => location.pathname === path || location.pathname.startsWith(path + '/')

  const handleGradesEnter = () => {
    if (gradesTimeout.current) clearTimeout(gradesTimeout.current)
    setGradesOpen(true)
  }

  const handleGradesLeave = () => {
    gradesTimeout.current = setTimeout(() => setGradesOpen(false), 150)
  }

  return (
    <header
      className="sticky top-0 z-40 backdrop-blur-md border-b"
      style={{
        background: 'color-mix(in srgb, var(--bg-base) 85%, transparent)',
        borderColor: 'var(--border)',
      }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 no-underline">
          <motion.div
            className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-bold text-lg shrink-0"
            style={{ background: 'linear-gradient(135deg, var(--gradient-start), var(--gradient-end))' }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            K
          </motion.div>
          <span className="text-xl font-bold hidden sm:block" style={{ color: 'var(--text-primary)' }}>Kaizen</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="relative px-4 py-2 rounded-xl text-sm font-medium no-underline transition-colors"
              style={{
                color: isActive(link.to) ? 'var(--accent)' : 'var(--text-secondary)',
                background: isActive(link.to) ? 'var(--accent-muted)' : 'transparent',
              }}
            >
              {link.label}
            </Link>
          ))}

          {/* Grades Dropdown */}
          <div
            className="relative"
            onMouseEnter={handleGradesEnter}
            onMouseLeave={handleGradesLeave}
          >
            <button
              className="flex items-center gap-1 px-4 py-2 rounded-xl text-sm font-medium cursor-pointer transition-colors"
              style={{
                color: location.pathname.startsWith('/grade') ? 'var(--accent)' : 'var(--text-secondary)',
                background: location.pathname.startsWith('/grade') ? 'var(--accent-muted)' : 'transparent',
                border: 'none',
              }}
            >
              Grades <ChevronDown size={14} />
            </button>
            <AnimatePresence>
              {gradesOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 top-full mt-1 w-40 py-2 rounded-xl border shadow-xl z-50"
                  style={{ background: 'var(--bg-surface)', borderColor: 'var(--border)' }}
                >
                  {GRADES.map((g) => (
                    <Link
                      key={g.id}
                      to={`/grade/${g.id}`}
                      className="block px-4 py-2.5 text-sm font-medium no-underline transition-colors"
                      style={{ color: location.pathname === `/grade/${g.id}` ? 'var(--accent)' : 'var(--text-primary)' }}
                      onMouseEnter={(e) => { (e.target as HTMLElement).style.background = 'var(--bg-surface-hover)' }}
                      onMouseLeave={(e) => { (e.target as HTMLElement).style.background = 'transparent' }}
                    >
                      {g.label}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </nav>

        <div className="flex items-center gap-3">
          <ThemeSwitcher />
          <button
            className="md:hidden p-2 rounded-xl transition-colors"
            style={{ color: 'var(--text-primary)' }}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t overflow-hidden"
            style={{ borderColor: 'var(--border)', background: 'var(--bg-surface)' }}
          >
            <nav className="px-4 py-3 flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMenuOpen(false)}
                  className="px-4 py-2.5 rounded-xl text-sm font-medium no-underline transition-colors"
                  style={{
                    color: isActive(link.to) ? 'var(--accent)' : 'var(--text-primary)',
                    background: isActive(link.to) ? 'var(--accent-muted)' : 'transparent',
                  }}
                >
                  {link.label}
                </Link>
              ))}
              {/* Grades sub-links */}
              <div className="px-4 py-1 text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>Grades</div>
              {GRADES.map((g) => (
                <Link
                  key={g.id}
                  to={`/grade/${g.id}`}
                  onClick={() => setMenuOpen(false)}
                  className="pl-8 pr-4 py-2 rounded-xl text-sm font-medium no-underline transition-colors"
                  style={{
                    color: location.pathname === `/grade/${g.id}` ? 'var(--accent)' : 'var(--text-primary)',
                    background: location.pathname === `/grade/${g.id}` ? 'var(--accent-muted)' : 'transparent',
                  }}
                >
                  {g.label}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
