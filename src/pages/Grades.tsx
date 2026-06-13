import { motion } from 'framer-motion'
import { BookOpen, ArrowRight, GraduationCap } from 'lucide-react'
import { Link } from 'react-router-dom'
import catalog from '../data/catalog.json'
import type { Catalog } from '../data/types'

const data = catalog as Catalog

/** Count unique subjects that have papers for a given grade */
function subjectsForGrade(gradeId: string): number {
  const grade = Number(gradeId)
  const ids = new Set(data.papers.filter((p) => p.grade === grade).map((p) => p.subjectId))
  return ids.size
}

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.55,
      delay: 0.3 + i * 0.15,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
    },
  }),
}

const ACCENT_COLOURS = ['var(--accent)', 'var(--accent-2, #8B5CF6)', 'var(--accent-3, #F97316)']

export default function Grades() {
  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-base)' }}>
      {/* Hero */}
      <motion.section
        className="max-w-4xl mx-auto px-4 sm:px-6 pt-14 pb-6 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <motion.div
          className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6"
          style={{ background: 'var(--accent)', color: 'var(--bg-base)' }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.1 }}
        >
          <GraduationCap size={32} />
        </motion.div>

        <h1
          className="text-4xl sm:text-5xl font-extrabold mb-3 tracking-tight"
          style={{ color: 'var(--text-primary)' }}
        >
          Welcome to Kaizen
        </h1>
        <p className="text-lg sm:text-xl max-w-lg mx-auto" style={{ color: 'var(--text-secondary)' }}>
          Past papers, study guides and resources — pick your grade to get started.
        </p>
      </motion.section>

      {/* Grade Cards */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 pb-20 pt-8">
        <div className="grid sm:grid-cols-3 gap-6">
          {data.gradeInfo.map((grade, i) => {
            const count = subjectsForGrade(grade.id)
            const accent = ACCENT_COLOURS[i % ACCENT_COLOURS.length]

            return (
              <motion.div
                key={grade.id}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                whileHover={{ y: -6, boxShadow: '0 20px 40px rgba(0,0,0,.12)' }}
                className="rounded-2xl border overflow-hidden"
                style={{ background: 'var(--bg-surface)', borderColor: 'var(--border)' }}
              >
                <Link
                  to={`/grade/${grade.id}`}
                  className="block p-8 text-center no-underline group"
                >
                  {/* Grade number */}
                  <div
                    className="text-7xl font-black leading-none mb-4"
                    style={{ color: accent }}
                  >
                    {grade.id}
                  </div>

                  {/* Label */}
                  <h2
                    className="text-xl font-bold mb-1"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {grade.label}
                  </h2>

                  {/* Subtitle */}
                  <p
                    className="text-sm mb-5"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    {grade.subtitle}
                  </p>

                  {/* Subject count badge */}
                  <div
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold mb-5"
                    style={{ background: 'var(--bg-muted, rgba(0,0,0,.06))', color: accent }}
                  >
                    <BookOpen size={13} />
                    {count} {count === 1 ? 'subject' : 'subjects'}
                  </div>

                  {/* CTA */}
                  <div
                    className="flex items-center justify-center gap-1.5 text-sm font-semibold transition-transform group-hover:translate-x-1"
                    style={{ color: accent }}
                  >
                    Explore papers <ArrowRight size={14} />
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </section>
    </div>
  )
}
