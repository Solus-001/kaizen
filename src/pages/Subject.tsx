import { useParams, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ExternalLink, FileText, BookOpen, GraduationCap, Video, Brain, ChevronDown, Play, Download } from 'lucide-react'
import { useState } from 'react'
import catalog from '../data/catalog.json'
import type { Catalog, Paper, Resource, ResourceType } from '../data/types'

const data = catalog as Catalog

const RESOURCE_TYPE_LABELS: Record<ResourceType, string> = {
  'caps-doc': 'CAPS Documents',
  'textbook': 'Textbooks',
  'study-guide': 'Study Guides',
  'past-papers': 'Past Papers',
  'video': 'Videos',
  'quiz': 'Practice Quizzes',
}

const RESOURCE_TYPE_ICONS: Record<ResourceType, React.ReactNode> = {
  'caps-doc': <FileText size={18} />,
  'textbook': <BookOpen size={18} />,
  'study-guide': <GraduationCap size={18} />,
  'past-papers': <FileText size={18} />,
  'video': <Video size={18} />,
  'quiz': <Brain size={18} />,
}

const SOURCE_LABELS: Record<string, string> = {
  'dbe': 'DBE',
  'siyavula': 'Siyavula',
  'mind-the-gap': 'Mind the Gap',
  'youtube': 'YouTube',
  'gizmo': 'Gizmo',
  'other': 'Other',
}

export default function SubjectPage() {
  const { gradeId, subjectId } = useParams<{ gradeId: string; subjectId: string }>()
  const grade = data.gradeInfo.find(g => g.id === gradeId)
  const subject = data.subjects.find(s => s.id === subjectId)

  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    'caps-doc': true,
    'textbook': true,
    'study-guide': true,
    'past-papers': true,
    'video': true,
    'quiz': true,
  })

  const toggleSection = (type: string) => {
    setOpenSections(prev => ({ ...prev, [type]: !prev[type] }))
  }

  if (!grade || !subject) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-8 pb-20 text-center">
        <BookOpen size={64} className="mx-auto mb-4" style={{ color: 'var(--text-secondary)', opacity: 0.3 }} />
        <h1 className="text-2xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Subject not found</h1>
        <p className="mb-6" style={{ color: 'var(--text-secondary)' }}>This subject or grade doesn't exist.</p>
        <Link to="/" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white no-underline" style={{ background: 'linear-gradient(135deg, var(--gradient-start), var(--gradient-end))' }}>
          <ArrowLeft size={16} /> Back to Home
        </Link>
      </div>
    )
  }

  // Get papers for this subject+grade
  const papers = data.papers.filter(p => p.subjectId === subjectId && p.grade === Number(gradeId))

  // Get other resources for this subject+grade
  const resources = data.resources.filter(r =>
    subjectId && gradeId &&
    r.subjectIds.includes(subjectId) &&
    r.gradeRelevance.includes(gradeId as '10' | '11' | '12')
  )

  // Group resources by type
  const grouped: Record<string, (Resource | (Paper & { type: ResourceType }))[]> = {}
  for (const type of Object.keys(RESOURCE_TYPE_LABELS)) {
    grouped[type] = []
  }

  // Add papers as past-papers type
  for (const paper of papers) {
    grouped['past-papers'].push({ ...paper, type: 'past-papers' })
  }

  // Add other resources
  for (const resource of resources) {
    if (grouped[resource.type]) {
      grouped[resource.type].push(resource)
    }
  }

  const hasContent = Object.values(grouped).some(items => items.length > 0)

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-6 pb-20">
      {/* Breadcrumbs */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
        <div className="flex items-center gap-2 text-sm mb-6 flex-wrap" style={{ color: 'var(--text-secondary)' }}>
          <Link to="/" className="no-underline hover:underline" style={{ color: 'var(--accent)' }}>Home</Link>
          <span>›</span>
          <Link to={`/grade/${gradeId}`} className="no-underline hover:underline" style={{ color: 'var(--accent)' }}>{grade.label}</Link>
          <span>›</span>
          <span style={{ color: 'var(--text-primary)' }}>{subject.name}</span>
        </div>
      </motion.div>

      {/* Back */}
      <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
        <Link to={`/grade/${gradeId}`} className="inline-flex items-center gap-1.5 text-sm font-medium mb-6 no-underline" style={{ color: 'var(--accent)' }}>
          <ArrowLeft size={16} /> Back to {grade.label}
        </Link>
      </motion.div>

      {/* Subject Header */}
      <motion.div className="rounded-2xl border overflow-hidden mb-8" style={{ background: 'var(--bg-surface)', borderColor: 'var(--border)' }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="px-6 py-5 flex items-center gap-4" style={{ background: 'linear-gradient(135deg, var(--gradient-start), var(--gradient-end))' }}>
          <span className="text-4xl">{subject.icon}</span>
          <div>
            <h1 className="text-2xl font-bold text-white">{subject.name}</h1>
            <p className="text-white/80 text-sm">{subject.description}</p>
          </div>
        </div>
      </motion.div>

      {/* Resource Sections */}
      {hasContent ? (
        <div className="space-y-4">
          {Object.entries(grouped).map(([type, items]) => {
            if (items.length === 0) return null
            const isOpen = openSections[type] !== false
            return (
              <motion.div
                key={type}
                className="rounded-2xl border overflow-hidden"
                style={{ background: 'var(--bg-surface)', borderColor: 'var(--border)' }}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                {/* Section Header */}
                <button
                  onClick={() => toggleSection(type)}
                  className="w-full px-5 py-4 flex items-center justify-between cursor-pointer"
                  style={{ background: 'var(--bg-surface)' }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'var(--accent-muted)', color: 'var(--accent)' }}>
                      {RESOURCE_TYPE_ICONS[type as ResourceType]}
                    </div>
                    <span className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>
                      {RESOURCE_TYPE_LABELS[type as ResourceType]}
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold" style={{ background: 'var(--bg-base)', color: 'var(--text-secondary)' }}>
                      {items.length}
                    </span>
                  </div>
                  <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                    <ChevronDown size={18} style={{ color: 'var(--text-secondary)' }} />
                  </motion.div>
                </button>

                {/* Section Content */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-4 space-y-2">
                        {items.map((item: any) => (
                          <ResourceItem key={item.id} item={item} />
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>
      ) : (
        <div className="text-center py-16">
          <BookOpen size={48} className="mx-auto mb-4" style={{ color: 'var(--text-secondary)', opacity: 0.3 }} />
          <p className="text-lg font-bold mb-2" style={{ color: 'var(--text-primary)' }}>No resources yet</p>
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Resources for this subject are being added. Check back soon!</p>
        </div>
      )}
    </div>
  )
}

function ResourceItem({ item }: { item: any }) {
  const isVideo = item.type === 'video' && item.metadata?.videoId
  const isPaper = item.type === 'past-papers' && item.subjectId
  const sourceLabel = item.sourceName || SOURCE_LABELS[item.source] || item.source || 'External'
  const linkUrl = item.url || item.sourceUrl || '#'

  if (isVideo) {
    return (
      <Link
        to={`/watch/${item.metadata.videoId}`}
        className="flex items-center gap-3 p-3 rounded-xl border transition-all hover:shadow-sm no-underline group"
        style={{ background: 'var(--bg-base)', borderColor: 'var(--border)' }}
      >
        <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style={{ background: 'var(--accent-muted)', color: 'var(--accent)' }}>
          <Play size={16} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium truncate" style={{ color: 'var(--text-primary)' }}>{item.title}</p>
          <div className="flex items-center gap-2 text-[10px]" style={{ color: 'var(--text-secondary)' }}>
            <span>{sourceLabel}</span>
            {item.metadata?.duration && <span>• {item.metadata.duration}</span>}
          </div>
        </div>
        <ExternalLink size={14} className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: 'var(--text-secondary)' }} />
      </Link>
    )
  }

  return (
    <a
      href={linkUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-3 p-3 rounded-xl border transition-all hover:shadow-sm no-underline group"
      style={{ background: 'var(--bg-base)', borderColor: 'var(--border)' }}
    >
      <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style={{ background: 'var(--accent-muted)', color: 'var(--accent)' }}>
        {item.metadata?.format === 'pdf' ? <Download size={16} /> : <ExternalLink size={16} />}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium truncate" style={{ color: 'var(--text-primary)' }}>{item.title}</p>
        <div className="flex items-center gap-2 text-[10px]" style={{ color: 'var(--text-secondary)' }}>
          <span>{sourceLabel}</span>
          {item.metadata?.format && <span>• {item.metadata.format.toUpperCase()}</span>}
          {item.metadata?.fileSize && <span>• {item.metadata.fileSize}</span>}
          {item.metadata?.year && <span>• {item.metadata.year}</span>}
          {isPaper && item.grade && <span>• Grade {item.grade}</span>}
          {isPaper && item.examType && <span>• {item.examType}</span>}
        </div>
      </div>
      <ExternalLink size={14} className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: 'var(--text-secondary)' }} />
    </a>
  )
}
