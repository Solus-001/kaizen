import { motion } from 'framer-motion'
import { Mail, Heart, ExternalLink, ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Contact() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 pt-8 pb-20">
      <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
        <Link to="/" className="inline-flex items-center gap-1.5 text-sm font-medium mb-6 no-underline" style={{ color: 'var(--accent)' }}>
          <ArrowLeft size={16} /> Back to Home
        </Link>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-extrabold mb-4" style={{ color: 'var(--text-primary)' }}>Contact</h1>
        <p className="text-base mb-8" style={{ color: 'var(--text-secondary)' }}>
          Got feedback, found a broken link, or want to contribute? Reach out.
        </p>

        <div className="space-y-4">
          {/* Email */}
          <a
            href="mailto:ntokzinnjoro@proton.me"
            className="flex items-center gap-4 p-5 rounded-2xl border transition-all hover:shadow-md no-underline group"
            style={{ background: 'var(--bg-surface)', borderColor: 'var(--border)' }}
          >
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
              style={{ background: 'linear-gradient(135deg, var(--gradient-start), var(--gradient-end))', color: 'white' }}
            >
              <Mail size={20} />
            </div>
            <div>
              <p className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>Email</p>
              <p className="text-sm" style={{ color: 'var(--accent)' }}>ntokzinnjoro@proton.me</p>
            </div>
            <ExternalLink size={14} className="ml-auto shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: 'var(--text-secondary)' }} />
          </a>

          {/* DMCA / Broken Links */}
          <div
            className="p-5 rounded-2xl border"
            style={{ background: 'var(--bg-surface)', borderColor: 'var(--border)' }}
          >
            <p className="text-sm font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Broken link?</p>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              If you find a dead link or a paper that's been taken down, please email me with the subject line "Broken Link" and include the page URL. I'll fix it as soon as possible.
            </p>
          </div>

          {/* Contribute */}
          <div
            className="p-5 rounded-2xl border"
            style={{ background: 'var(--bg-surface)', borderColor: 'var(--border)' }}
          >
            <p className="text-sm font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Want to contribute?</p>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              Kaizen is built by <strong style={{ color: 'var(--accent)' }}>Ntokzin</strong> for South African students. If you have papers, study notes, or resources to share, reach out — credit will be given.
            </p>
          </div>
        </div>

        <div className="mt-10 text-center">
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            Made with <Heart size={12} className="inline" style={{ color: 'var(--accent)' }} /> by <strong style={{ color: 'var(--accent)' }}>Ntokzin</strong>
          </p>
        </div>
      </motion.div>
    </div>
  )
}
