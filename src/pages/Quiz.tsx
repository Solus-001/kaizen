import { motion } from 'framer-motion'
import { ArrowLeft, ExternalLink, Download, Sparkles, BookOpen, Zap, Target } from 'lucide-react'
import { Link } from 'react-router-dom'

const STEPS = [
  { icon: <Download size={20} />, title: 'Get Gizmo', desc: 'Download the free app on iOS or Android' },
  { icon: <BookOpen size={20} />, title: 'Find content', desc: 'Paste a YouTube link or upload a PDF' },
  { icon: <Sparkles size={20} />, title: 'AI makes cards', desc: 'Gizmo generates flashcards automatically' },
  { icon: <Target size={20} />, title: 'Study & review', desc: 'Use spaced repetition to ace your exams' },
]

export default function Quiz() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-8 pb-20">
      {/* Back */}
      <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
        <Link to="/" className="inline-flex items-center gap-1.5 text-sm font-medium mb-6 no-underline" style={{ color: 'var(--accent)' }}>
          <ArrowLeft size={16} /> Back to Home
        </Link>
      </motion.div>

      {/* Hero */}
      <motion.div className="text-center mb-12" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-6" style={{ background: 'var(--accent-muted)', color: 'var(--accent)' }}>
          <Zap size={14} /> Study Smarter
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold mb-4" style={{ color: 'var(--text-primary)' }}>
          Study with <span style={{ color: 'var(--accent)' }}>Gizmo</span>
        </h1>
        <p className="text-lg max-w-xl mx-auto mb-8" style={{ color: 'var(--text-secondary)' }}>
          Turn any YouTube video or PDF into AI-generated flashcards. Free, fast, and built for spaced repetition.
        </p>

        {/* Download Buttons */}
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <a
            href="https://apps.apple.com/app/gizmo-ai-tutor/id1610516671"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white no-underline transition-transform hover:scale-105"
            style={{ background: '#000' }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
            App Store
          </a>
          <a
            href="https://play.google.com/store/apps/details?id=ai.saveall.app"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white no-underline transition-transform hover:scale-105"
            style={{ background: '#000' }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.199l2.302 2.302a1 1 0 010 1.38l-2.302 2.302L15.394 12l2.304-3.492zM5.864 2.658L16.8 8.99l-2.302 2.302L5.864 2.658z"/></svg>
            Google Play
          </a>
        </div>
      </motion.div>

      {/* How it Works */}
      <motion.div className="mb-12" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
        <h2 className="text-xl font-bold text-center mb-8" style={{ color: 'var(--text-primary)' }}>How it works</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.title}
              className="text-center p-4 rounded-2xl border"
              style={{ background: 'var(--bg-surface)', borderColor: 'var(--border)' }}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 + i * 0.1 }}
            >
              <div className="w-12 h-12 rounded-xl mx-auto mb-3 flex items-center justify-center" style={{ background: 'var(--accent-muted)', color: 'var(--accent)' }}>
                {step.icon}
              </div>
              <div className="text-xs font-bold mb-1" style={{ color: 'var(--accent)' }}>Step {i + 1}</div>
              <h3 className="text-sm font-bold mb-1" style={{ color: 'var(--text-primary)' }}>{step.title}</h3>
              <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Browse Public Decks */}
      <motion.div className="text-center" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }}>
        <a
          href="https://gizmo.ai/community/decks"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl text-base font-bold text-white no-underline transition-transform hover:scale-105 shadow-lg"
          style={{ background: 'linear-gradient(135deg, var(--gradient-start), var(--gradient-end))' }}
        >
          Browse Public Decks on Gizmo <ExternalLink size={16} />
        </a>
      </motion.div>
    </div>
  )
}
