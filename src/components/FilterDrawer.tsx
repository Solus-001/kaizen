import { motion, AnimatePresence } from 'framer-motion'
import { X, SlidersHorizontal } from 'lucide-react'
import { type ReactNode } from 'react'

interface FilterDrawerProps {
  open: boolean
  onToggle: () => void
  onClose: () => void
  activeCount: number
  children: ReactNode
}

export function FilterDrawer({ open, onToggle, onClose, activeCount, children }: FilterDrawerProps) {
  return (
    <>
      {/* Mobile trigger button */}
      <button
        onClick={onToggle}
        className="lg:hidden flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold mb-4 cursor-pointer"
        style={{
          background: activeCount > 0 ? 'var(--accent-muted)' : 'var(--bg-surface)',
          color: activeCount > 0 ? 'var(--accent)' : 'var(--text-primary)',
          border: `1px solid ${activeCount > 0 ? 'var(--accent)' : 'var(--border)'}`,
        }}
      >
        <SlidersHorizontal size={16} />
        Filters
        {activeCount > 0 && (
          <span
            className="ml-1 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold text-white"
            style={{ background: 'var(--accent)' }}
          >
            {activeCount}
          </span>
        )}
      </button>

      {/* Desktop sidebar — always visible */}
      <div className="hidden lg:block">{children}</div>

      {/* Mobile drawer overlay */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              className="lg:hidden fixed inset-0 z-40"
              style={{ background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
            />

            {/* Drawer */}
            <motion.aside
              className="lg:hidden fixed inset-y-0 left-0 z-50 w-80 max-w-[85vw] overflow-y-auto"
              style={{ background: 'var(--bg-base)' }}
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            >
              <div className="flex items-center justify-between p-4 border-b" style={{ borderColor: 'var(--border)' }}>
                <h3 className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>Filters</h3>
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg cursor-pointer"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  <X size={18} />
                </button>
              </div>
              <div className="p-4">
                {children}
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
