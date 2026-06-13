import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, ExternalLink, Clock, Award, FileText, Tag, BookOpen, Calendar, GraduationCap } from 'lucide-react'
import catalog from '../data/catalog.json'
import type { Paper, Subject, Catalog } from '../data/types'
import { Breadcrumbs } from '../components/Breadcrumbs'

const data = catalog as Catalog

export default function PaperDetail() {
  const { id } = useParams<{ id: string }>()
  const paper = data.papers.find((p: Paper) => p.id === id)
  const subject = paper ? data.subjects.find((s: Subject) => s.id === paper.subjectId) : undefined

  if (!paper) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-8 pb-20 text-center">
        <FileText size={64} className="mx-auto mb-4" style={{ color: 'var(--text-secondary)', opacity: 0.3 }} />
        <h1 className="text-2xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Paper not found</h1>
        <p className="mb-6" style={{ color: 'var(--text-secondary)' }}>The paper you're looking for doesn't exist or has been removed.</p>
        <Link
          to="/browse"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white no-underline"
          style={{ background: 'linear-gradient(135deg, var(--gradient-start), var(--gradient-end))' }}
        >
          <ArrowLeft size={16} /> Back to Browse
        </Link>
      </div>
    )
  }

  // Find related papers (same subject, different paper)
  const related = data.papers
    .filter((p: Paper) => p.subjectId === paper.subjectId && p.id !== paper.id)
    .slice(0, 4)

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-6 pb-20">
      {/* Breadcrumbs */}
      <Breadcrumbs items={[
        { label: 'Home', to: '/' },
        { label: 'Browse', to: '/browse' },
        { label: subject?.name || 'Subject', to: `/browse?subject=${paper.subjectId}` },
        { label: `Grade ${paper.grade}` },
      ]} />

      {/* Back button */}
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Link
          to="/browse"
          className="inline-flex items-center gap-1.5 text-sm font-medium mb-6 no-underline"
          style={{ color: 'var(--accent)' }}
        >
          <ArrowLeft size={16} /> Back to Browse
        </Link>
      </motion.div>

      {/* Main Card */}
      <motion.div
        className="rounded-2xl border overflow-hidden"
        style={{ background: 'var(--bg-surface)', borderColor: 'var(--border)' }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header strip */}
        <div
          className="px-6 py-4 flex items-center gap-3"
          style={{ background: 'linear-gradient(135deg, var(--gradient-start), var(--gradient-end))' }}
        >
          <span className="text-3xl">{subject?.icon}</span>
          <div>
            <h1 className="text-xl font-bold text-white">{paper.title}</h1>
            <p className="text-white/80 text-sm">{subject?.name}</p>
          </div>
        </div>

        {/* Details */}
        <div className="p-6">
          {/* Info grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
            <InfoItem icon={<GraduationCap size={16} />} label="Grade" value={`Grade ${paper.grade}`} />
            <InfoItem icon={<Calendar size={16} />} label="Year" value={String(paper.year)} />
            <InfoItem icon={<BookOpen size={16} />} label="Exam Type" value={paper.examType} />
            <InfoItem icon={<Clock size={16} />} label="Duration" value={paper.duration} />
            <InfoItem icon={<Award size={16} />} label="Total Marks" value={`${paper.marks} marks`} />
            <InfoItem icon={<FileText size={16} />} label="Curriculum" value={paper.curriculum} />
          </div>

          {/* Tags */}
          {paper.tags.length > 0 && (
            <div className="mb-6">
              <h3 className="text-xs font-semibold mb-2 flex items-center gap-1.5" style={{ color: 'var(--text-secondary)' }}>
                <Tag size={12} /> Topics
              </h3>
              <div className="flex flex-wrap gap-2">
                {paper.tags.map((tag: string) => (
                  <Link
                    key={tag}
                    to={`/browse?q=${encodeURIComponent(tag)}`}
                    className="px-3 py-1.5 rounded-lg text-xs font-medium no-underline transition-all hover:scale-105"
                    style={{ background: 'var(--accent-muted)', color: 'var(--accent)' }}
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Source */}
          <div
            className="p-4 rounded-xl border mb-6"
            style={{ background: 'var(--bg-base)', borderColor: 'var(--border)' }}
          >
            <h3 className="text-xs font-semibold mb-2" style={{ color: 'var(--text-secondary)' }}>Source</h3>
            <p className="text-sm mb-3" style={{ color: 'var(--text-primary)' }}>
              {paper.sourceName}
            </p>
            <a
              href={paper.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white no-underline transition-transform hover:scale-105"
              style={{ background: 'linear-gradient(135deg, var(--gradient-start), var(--gradient-end))' }}
            >
              <ExternalLink size={16} />
              View on {paper.sourceName}
            </a>
          </div>
        </div>
      </motion.div>

      {/* Related Papers */}
      {related.length > 0 && (
        <motion.div
          className="mt-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-lg font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
            Related Papers
          </h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {related.map((p: Paper) => (
              <Link
                key={p.id}
                to={`/browse/${p.id}`}
                className="p-4 rounded-xl border no-underline transition-all hover:shadow-md hover:scale-[1.01]"
                style={{ background: 'var(--bg-surface)', borderColor: 'var(--border)' }}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span>{subject?.icon}</span>
                  <span className="text-sm font-semibold truncate" style={{ color: 'var(--text-primary)' }}>
                    {p.title}
                  </span>
                </div>
                <div className="text-xs flex gap-2" style={{ color: 'var(--text-secondary)' }}>
                  <span>Gr {p.grade}</span>
                  <span>•</span>
                  <span>{p.year}</span>
                  <span>•</span>
                  <span>{p.examType}</span>
                </div>
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  )
}

function InfoItem({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="p-3 rounded-xl" style={{ background: 'var(--bg-base)' }}>
      <div className="flex items-center gap-1.5 mb-1" style={{ color: 'var(--text-secondary)' }}>
        {icon}
        <span className="text-[10px] font-medium uppercase tracking-wide">{label}</span>
      </div>
      <span className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{value}</span>
    </div>
  )
}
