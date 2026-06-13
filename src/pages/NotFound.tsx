import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Home } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-20 pb-20 text-center">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="text-8xl font-extrabold mb-4" style={{ color: 'var(--accent)', opacity: 0.2 }}>404</div>
        <h1 className="text-3xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>Page not found</h1>
        <p className="text-lg mb-8" style={{ color: 'var(--text-secondary)' }}>
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white no-underline transition-transform hover:scale-105"
          style={{ background: 'linear-gradient(135deg, var(--gradient-start), var(--gradient-end))' }}
        >
          <Home size={18} /> Back to Home
        </Link>
      </motion.div>
    </div>
  )
}
