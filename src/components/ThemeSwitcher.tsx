import { useTheme, type Theme } from '../contexts/ThemeContext'
import { Palette } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const THEME_META: Record<Theme, { label: string; color: string; emoji: string }> = {
  'sakura':       { label: 'Sakura',       color: '#E85D8A', emoji: '🌸' },
  'indigo-night': { label: 'Indigo Night', color: '#8B5CF6', emoji: '🌙' },
  'sunset':       { label: 'Sunset',       color: '#F97316', emoji: '🌅' },
  'forest':       { label: 'Forest',       color: '#16A34A', emoji: '🌲' },
  'ocean':        { label: 'Ocean',        color: '#0EA5E9', emoji: '🌊' },
  'kanagawa':     { label: 'Kanagawa',     color: '#7E9CD8', emoji: '🏯' },
  'gruvbox':      { label: 'Gruvbox',      color: '#FE8019', emoji: '🟧' },
  'everforest':   { label: 'Everforest',   color: '#A7C080', emoji: '🌿' },
}

export function ThemeSwitcher() {
  const { theme, setTheme, themes } = useTheme()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200"
        style={{
          background: 'var(--bg-surface)',
          border: '1px solid var(--border)',
          color: 'var(--text-primary)',
        }}
        aria-label="Switch theme"
      >
        <Palette size={16} />
        <span className="hidden sm:inline">{THEME_META[theme].emoji} {THEME_META[theme].label}</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-2 w-48 rounded-xl overflow-hidden z-50"
            style={{
              background: 'var(--bg-surface)',
              border: '1px solid var(--border)',
              boxShadow: '0 8px 32px var(--shadow-color)',
            }}
          >
            {themes.map((t) => (
              <button
                key={t}
                onClick={() => { setTheme(t); setOpen(false) }}
                className="w-full flex items-center gap-3 px-4 py-3 text-sm transition-colors duration-150"
                style={{
                  color: t === theme ? 'var(--accent)' : 'var(--text-primary)',
                  background: t === theme ? 'var(--accent-muted)' : 'transparent',
                }}
              >
                <span
                  className="w-4 h-4 rounded-full border-2"
                  style={{
                    background: THEME_META[t].color,
                    borderColor: t === theme ? 'var(--accent)' : 'var(--border)',
                  }}
                />
                <span>{THEME_META[t].emoji} {THEME_META[t].label}</span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
