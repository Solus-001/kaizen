import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, BookOpen } from 'lucide-react'
import { useState } from 'react'
import catalog from '../data/catalog.json'
import type { Catalog, Subject } from '../data/types'

const data = catalog as Catalog

const CATEGORIES = ['All', 'Languages', 'Sciences', 'Commerce', 'Humanities', 'Technology'] as const

export default function Grade() {
  const { gradeId } = useParams<{ gradeId: string }>()
  const grade = data.gradeInfo.find(g => g.id === gradeId)
  const gradeNum = Number(gradeId)

  // Find subjects that have resources or papers for this grade
  const subjectsWithContent = data.subjects.filter((subject: Subject) => {
    const hasPapers = data.papers.some(p => p.subjectId === subject.id && p.grade === gradeNum)
    const hasResources = data.resources.some(r =>
      r.subjectIds.includes(subject.id) && r.gradeRelevance.includes(gradeId as '10' | '11' | '12')
    )
    return hasPapers || hasResources
  })

  const [activeCategory, setActiveCategory] = useState('All')

  const filtered = activeCategory === 'All'
    ? subjectsWithContent
    : subjectsWithContent.filter(s => s.categories.includes(activeCategory))

  const getSubjectCounts = (subjectId: string) => {
    const papers = data.papers.filter(p => p.subjectId === subjectId && p.grade === gradeNum).length
    const resources = data.resources.filter(r =>
      r.subjectIds.includes(subjectId) && r.gradeRelevance.includes(gradeId as '10' | '11' | '12')
    ).length
    return { papers, resources, total: papers + resources }
  }

  if (!grade) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-8 pb-20 text-center">
        <BookOpen size={64} className="mx-auto mb-4" style={{ color: 'var(--text-secondary)', opacity: 0.3 }} />
        <h1 className="text-2xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Grade not found</h1>
        <Link to="/" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white no-underline" style={{ background: 'linear-gradient(135deg, var(--gradient-start), var(--gradient-end))' }}>
          <ArrowLeft size={16} /> Back to Home
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-8 pb-20">
      {/* Back */}
      <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
        <Link to="/" className="inline-flex items-center gap-1.5 text-sm font-medium mb-6 no-underline" style={{ color: 'var(--accent)' }}>
          <ArrowLeft size={16} /> Back to Home
        </Link>
      </motion.div>

      {/* Header */}
      <motion.div className="mb-8" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <h1 className="text-3xl sm:text-4xl font-extrabold mb-2" style={{ color: 'var(--text-primary)' }}>
          {grade.label}
        </h1>
        <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>{grade.subtitle}</p>
      </motion.div>

      {/* Category Filter Pills */}
      <motion.div className="flex gap-2 mb-8 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 }}>
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className="shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all cursor-pointer whitespace-nowrap"
            style={{
              background: activeCategory === cat ? 'var(--accent)' : 'var(--bg-surface)',
              color: activeCategory === cat ? 'white' : 'var(--text-secondary)',
              border: `1px solid ${activeCategory === cat ? 'var(--accent)' : 'var(--border)'}`,
            }}
          >
            {cat}
          </button>
        ))}
      </motion.div>

      {/* Subject Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((subject: Subject, i: number) => {
          const counts = getSubjectCounts(subject.id)
          return (
            <motion.div
              key={subject.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.15 + i * 0.05 }}
            >
              <Link
                to={`/grade/${gradeId}/${subject.id}`}
                className="block p-5 rounded-2xl border transition-all hover:shadow-md hover:scale-[1.02] no-underline h-full"
                style={{ background: 'var(--bg-surface)', borderColor: 'var(--border)' }}
              >
                <div className="flex items-start gap-3">
                  <span className="text-3xl">{subject.icon}</span>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-bold mb-1" style={{ color: 'var(--text-primary)' }}>{subject.name}</h3>
                    <p className="text-xs leading-relaxed mb-3 line-clamp-2" style={{ color: 'var(--text-secondary)' }}>
                      {subject.description}
                    </p>
                    <div className="flex items-center gap-2 text-xs" style={{ color: 'var(--text-secondary)' }}>
                      {counts.papers > 0 && (
                        <span className="px-2 py-0.5 rounded-md" style={{ background: 'var(--bg-base)' }}>
                          {counts.papers} paper{counts.papers !== 1 ? 's' : ''}
                        </span>
                      )}
                      {counts.resources > 0 && (
                        <span className="px-2 py-0.5 rounded-md" style={{ background: 'var(--accent-muted)', color: 'var(--accent)' }}>
                          {counts.resources} resource{counts.resources !== 1 ? 's' : ''}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          )
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16">
          <BookOpen size={48} className="mx-auto mb-4" style={{ color: 'var(--text-secondary)', opacity: 0.3 }} />
          <p className="text-lg font-bold mb-2" style={{ color: 'var(--text-primary)' }}>No subjects found</p>
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Try selecting a different category.</p>
        </div>
      )}
    </div>
  )
}
