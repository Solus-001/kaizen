import { Link, useLocation } from 'react-router-dom'
import { ThemeSwitcher } from '../ThemeSwitcher'
import { Menu, X, ChevronDown } from 'lucide-react'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/browse', label: 'Browse' },
  { to: '/notes', label: 'Notes' },
  { to: '/quiz', label: 'Quiz' },
]

const GRADES = [
  { id: '10', label: 'Grade 10', subtitle: 'Start of the FET phase' },
  { id: '11', label: 'Grade 11', subtitle: 'Deepening your understanding' },
  { id: '12', label: 'Grade 12', subtitle: 'Matric year — you\'ve got this' },
]

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [gradesOpen, setGradesOpen] = useState(false)
  const location = useLocation()

  const isGradeActive = location.pathname.startsWith('/grade/')

  return (
    <header
      className="sticky top-0 z-40 backdrop-blur-md border-b"
      style={{
        background: 'color-mix(in srgb, var(--bg-base) 85%, transparent)',
        borderColor: 'var(--border)',
      }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 no-underline">
          <motion.div
            className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-bold text-lg shrink-0"
            style={{ background: 'linear-gradient(135deg, var(--gradient-start), var(--gradient-end))' }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            K
          </motion.div>
          <span className="text-xl font-bold hidden sm:block" style={{ color: 'var(--text-primary)' }}>
            Kaizen
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => {
            const active = location.pathname === link.to
            return (
              <Link
                key={link.to}
                to={link.to}
                className="relative px-4 py-2 rounded-xl text-sm font-medium no-underline transition-colors"
                style={{
                  color: active ? 'var(--accent)' : 'var(--text-secondary)',
                  background: active ? 'var(--accent-muted)' : 'transparent',
                }}
              >
                {link.label}
              </Link>
            )
          })}

          {/* Grades Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setGradesOpen(true)}
            onMouseLeave={() => setGradesOpen(false)}
          >
            <button
              className="flex items-center gap-1 px-4 py-2 rounded-xl text-sm font-medium cursor-pointer transition-colors"
              style={{
                color: isGradeActive ? 'var(--accent)' : 'var(--text-secondary)',
                background: isGradeActive ? 'var(--accent-muted)' : 'transparent',
                border: 'none',
              }}
            >
              Grades <ChevronDown size={14} className={`transition-transform ${gradesOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
              {gradesOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.96 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 top-full mt-1 w-56 rounded-xl border overflow-hidden shadow-xl z-50"
                  style={{ background: 'var(--bg-surface)', borderColor: 'var(--border)' }}
                >
                  {GRADES.map((grade) => (
                    <Link
                      key={grade.id}
                      to={`/grade/${grade.id}`}
                      className="block px-4 py-3 no-underline transition-colors hover:bg-[var(--accent-muted)]"
                      onClick={() => setGradesOpen(false)}
                    >
                      <div className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>{grade.label}</div>
                      <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>{grade.subtitle}</div>
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </nav>

        {/* Right side */}
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
              {NAV_LINKS.map((link) => {
                const active = location.pathname === link.to
                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={() => setMenuOpen(false)}
                    className="px-4 py-2.5 rounded-xl text-sm font-medium no-underline transition-colors"
                    style={{
                      color: active ? 'var(--accent)' : 'var(--text-primary)',
                      background: active ? 'var(--accent-muted)' : 'transparent',
                    }}
                  >
                    {link.label}
                  </Link>
                )
              })}

              {/* Mobile Grades */}
              <div className="px-4 py-2.5 rounded-xl" style={{ background: isGradeActive ? 'var(--accent-muted)' : 'transparent' }}>
                <div className="text-sm font-bold mb-2" style={{ color: isGradeActive ? 'var(--accent)' : 'var(--text-secondary)' }}>
                  Grades
                </div>
                <div className="flex flex-col gap-1 pl-2">
                  {GRADES.map((grade) => (
                    <Link
                      key={grade.id}
                      to={`/grade/${grade.id}`}
                      onClick={() => setMenuOpen(false)}
                      className="py-1.5 text-sm no-underline"
                      style={{ color: location.pathname === `/grade/${grade.id}` ? 'var(--accent)' : 'var(--text-primary)' }}
                    >
                      {grade.label}
                    </Link>
                  ))}
                </div>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
