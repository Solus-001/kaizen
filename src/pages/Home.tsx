import { motion } from 'framer-motion'
import { BookOpen, GraduationCap, Search, ArrowRight, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import catalog from '../data/catalog.json'
import { SearchInput } from '../components/SearchInput'
import type { Catalog } from '../data/types'

const data = catalog as Catalog

const FEATURES = [
  { icon: <BookOpen size={24} />, title: 'Past Papers', desc: `${data.papers.length}+ papers from Grades 8–12, organized by subject and year.`, link: '/browse' },
  { icon: <GraduationCap size={24} />, title: 'Study Guides', desc: 'Curated CAPS resources, Siyavula textbooks, and Mind the Gap guides.', link: '/grade/12' },
  { icon: <Search size={24} />, title: 'Smart Search', desc: 'Find exactly what you need across hundreds of resources instantly.', link: '/browse' },
]

export default function Home() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-12 pb-20">
      {/* Hero */}
      <motion.div
        className="text-center mb-14"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-6" style={{ background: 'var(--accent-muted)', color: 'var(--accent)' }}>
          <Sparkles size={14} /> Built for South African students
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-4 leading-tight" style={{ color: 'var(--text-primary)' }}>
          Study smarter.<br />
          <span style={{ color: 'var(--accent)' }}>Not harder.</span>
        </h1>
        <p className="text-lg sm:text-xl max-w-2xl mx-auto mb-8" style={{ color: 'var(--text-secondary)' }}>
          South Africa's premium study resource hub. Past papers, study guides, and everything you need — organized, searchable, and free.
        </p>

        {/* Search Bar */}
        <div className="max-w-xl mx-auto">
          <SearchInput />
        </div>
      </motion.div>

      {/* Grade Tiles */}
      <motion.div
        className="mb-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <h2 className="text-2xl font-bold text-center mb-6" style={{ color: 'var(--text-primary)' }}>
          Pick your grade
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
          {data.gradeInfo.filter(g => ['10', '11', '12'].includes(g.id)).map((grade, i) => (
            <motion.div
              key={grade.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.4 + i * 0.1 }}
            >
              <Link
                to={`/grade/${grade.id}`}
                className="block p-5 rounded-2xl border transition-all hover:shadow-lg hover:scale-[1.02] no-underline text-center group min-h-[120px]"
                style={{ background: 'var(--bg-surface)', borderColor: 'var(--border)' }}
              >
                <div className="text-3xl font-extrabold mb-1" style={{ color: 'var(--accent)' }}>
                  {grade.label}
                </div>
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{grade.subtitle}</p>
                <div className="flex items-center justify-center gap-1 text-xs font-semibold mt-3 group-hover:translate-x-1 transition-transform" style={{ color: 'var(--accent)' }}>
                  Explore <ArrowRight size={12} />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Feature Cards */}
      <div className="grid sm:grid-cols-3 gap-6 mb-16">
        {FEATURES.map((card, i) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.6 + i * 0.1 }}
          >
            <Link to={card.link} className="no-underline">
              <div
                className="p-6 rounded-2xl border transition-all hover:scale-[1.02] hover:shadow-lg group h-full"
                style={{ background: 'var(--bg-surface)', borderColor: 'var(--border)' }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 text-white"
                  style={{ background: 'linear-gradient(135deg, var(--gradient-start), var(--gradient-end))' }}
                >
                  {card.icon}
                </div>
                <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--text-primary)' }}>{card.title}</h3>
                <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>{card.desc}</p>
                <div className="flex items-center gap-1 text-sm font-semibold" style={{ color: 'var(--accent)' }}>
                  Explore <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Stats */}
      <motion.div
        className="grid grid-cols-3 gap-4 max-w-lg mx-auto text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.9 }}
      >
        {[
          { value: `${data.papers.length}+`, label: 'Past Papers' },
          { value: `${data.resources.length}+`, label: 'Resources' },
          { value: `${data.subjects.length}`, label: 'Subjects' },
        ].map((stat) => (
          <div key={stat.label}>
            <div className="text-2xl sm:text-3xl font-extrabold" style={{ color: 'var(--accent)' }}>{stat.value}</div>
            <div className="text-xs sm:text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>{stat.label}</div>
          </div>
        ))}
      </motion.div>
    </div>
  )
}
