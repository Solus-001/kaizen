import { useState, useMemo, useCallback } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Filter, FileText, X, ArrowUpDown, Link2, Check, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react'
import catalog from '../data/catalog.json'
import type { Paper, Subject, Curriculum, Catalog } from '../data/types'
import { Breadcrumbs } from '../components/Breadcrumbs'
import { FilterDrawer } from '../components/FilterDrawer'

const data = catalog as Catalog

// Grade badge colour map
const gradeColors: Record<number, string> = {
  10: '#22c55e',
  11: '#f59e0b',
  12: '#ef4444',
}

export default function Browse() {
  const [searchParams, setSearchParams] = useSearchParams()

  // Filter state from URL params
  const [search, setSearch] = useState(searchParams.get('q') || '')
  const subjectFilter = searchParams.get('subject') || ''
  const gradeFilter = searchParams.get('grade') || ''
  const yearFilter = searchParams.get('year') || ''
  const curriculumFilter = (searchParams.get('curriculum') || '') as Curriculum | ''

  const setParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams)
    if (value) params.set(key, value)
    else params.delete(key)
    setSearchParams(params)
  }

  const clearFilters = () => {
    setSearch('')
    setSearchParams({})
  }

  const hasFilters = search || subjectFilter || gradeFilter || yearFilter || curriculumFilter

  // Sort
  type SortKey = 'newest' | 'oldest' | 'subject' | 'grade'
  const sortParam = (searchParams.get('sort') || 'newest') as SortKey
  const setSort = (key: SortKey) => setParam('sort', key === 'newest' ? '' : key)

  // Filtered papers
  const filtered = useMemo(() => {
    return data.papers.filter((p: Paper) => {
      if (subjectFilter && p.subjectId !== subjectFilter) return false
      if (gradeFilter && p.grade !== Number(gradeFilter)) return false
      if (yearFilter && p.year !== Number(yearFilter)) return false
      if (curriculumFilter && p.curriculum !== curriculumFilter) return false
      if (search) {
        const q = search.toLowerCase().trim()
        const subject = data.subjects.find((s: Subject) => s.id === p.subjectId)
        const haystack = `${p.title} ${p.tags.join(' ')} ${subject?.name || ''} ${p.examType} Grade ${p.grade} ${p.year} ${p.sourceName}`.toLowerCase()
        // Support multi-word search: all words must match
        const words = q.split(/\s+/)
        if (!words.every(w => haystack.includes(w))) return false
      }
      return true
    }) as Paper[]
  }, [search, subjectFilter, gradeFilter, yearFilter, curriculumFilter])

  const sorted = useMemo(() => {
    const copy = [...filtered]
    switch (sortParam) {
      case 'oldest':
        return copy.sort((a: Paper, b: Paper) => a.year - b.year)
      case 'subject':
        return copy.sort((a: Paper, b: Paper) => a.subjectId.localeCompare(b.subjectId))
      case 'grade':
        return copy.sort((a: Paper, b: Paper) => a.grade - b.grade)
      case 'newest':
      default:
        return copy.sort((a: Paper, b: Paper) => b.year - a.year || a.title.localeCompare(b.title))
    }
  }, [filtered, sortParam])

  const getSubject = (id: string) => data.subjects.find((s: Subject) => s.id === id)

  // Group by subject (preserves sort order within groups)
  const grouped = useMemo(() => {
    const map = new Map<string, Paper[]>()
    for (const paper of sorted) {
      const list = map.get(paper.subjectId)
      if (list) list.push(paper)
      else map.set(paper.subjectId, [paper])
    }
    return map
  }, [sorted])

  // Mobile drawer
  const [drawerOpen, setDrawerOpen] = useState(false)
  const activeFilterCount = [subjectFilter, gradeFilter, yearFilter, curriculumFilter, search].filter(Boolean).length

  // Copy link
  const [copied, setCopied] = useState(false)
  const copyLink = useCallback(() => {
    navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }, [])

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-8 pb-20">
      <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Browse' }]} />

      {/* Page Header */}
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-3xl sm:text-4xl font-extrabold mb-2" style={{ color: 'var(--text-primary)' }}>
          Browse Papers
        </h1>
        <p style={{ color: 'var(--text-secondary)' }}>
          {data.papers.length} papers across {data.subjects.length} subjects
        </p>
      </motion.div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar Filters */}
        <FilterDrawer
          open={drawerOpen}
          onToggle={() => setDrawerOpen(!drawerOpen)}
          onClose={() => setDrawerOpen(false)}
          activeCount={activeFilterCount}
        >
          <motion.aside
            className="lg:w-64 shrink-0"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <div
              className="p-5 rounded-2xl border sticky top-20"
              style={{ background: 'var(--bg-surface)', borderColor: 'var(--border)' }}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                  <Filter size={14} /> Filters
                </h3>
                {hasFilters && (
                  <button onClick={clearFilters} className="text-xs font-medium" style={{ color: 'var(--accent)' }}>
                    Clear all
                  </button>
                )}
              </div>

              {/* Search */}
              <div className="mb-4">
                <div
                  className="flex items-center gap-2 px-3 py-2 rounded-xl border"
                  style={{ background: 'var(--bg-base)', borderColor: 'var(--border)' }}
                >
                  <Search size={14} style={{ color: 'var(--text-secondary)' }} />
                  <input
                    type="text"
                    placeholder="Search papers..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="flex-1 bg-transparent outline-none text-sm"
                    style={{ color: 'var(--text-primary)' }}
                  />
                  {search && (
                    <button onClick={() => setSearch('')} style={{ color: 'var(--text-secondary)' }}>
                      <X size={12} />
                    </button>
                  )}
                </div>
              </div>

              {/* Subject */}
              <FilterSection label="Subject">
                <select
                  value={subjectFilter}
                  onChange={(e) => setParam('subject', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border text-sm bg-transparent outline-none cursor-pointer"
                  style={{ borderColor: 'var(--border)', color: 'var(--text-primary)', background: 'var(--bg-base)' }}
                >
                  <option value="">All Subjects</option>
                  {data.subjects.map((s: Subject) => (
                    <option key={s.id} value={s.id}>{s.icon} {s.name}</option>
                  ))}
                </select>
              </FilterSection>

              {/* Grade */}
              <FilterSection label="Grade">
                <div className="flex flex-wrap gap-2">
                  {data.grades.map((g: number) => (
                    <button
                      key={g}
                      onClick={() => setParam('grade', gradeFilter === String(g) ? '' : String(g))}
                      className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer"
                      style={{
                        background: gradeFilter === String(g) ? 'var(--accent)' : 'var(--bg-base)',
                        color: gradeFilter === String(g) ? 'white' : 'var(--text-secondary)',
                        border: `1px solid ${gradeFilter === String(g) ? 'var(--accent)' : 'var(--border)'}`,
                      }}
                    >
                      Gr {g}
                    </button>
                  ))}
                </div>
              </FilterSection>

              {/* Year */}
              <FilterSection label="Year">
                <div className="flex flex-wrap gap-2">
                  {data.years.map((y: number) => (
                    <button
                      key={y}
                      onClick={() => setParam('year', yearFilter === String(y) ? '' : String(y))}
                      className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer"
                      style={{
                        background: yearFilter === String(y) ? 'var(--accent)' : 'var(--bg-base)',
                        color: yearFilter === String(y) ? 'white' : 'var(--text-secondary)',
                        border: `1px solid ${yearFilter === String(y) ? 'var(--accent)' : 'var(--border)'}`,
                      }}
                    >
                      {y}
                    </button>
                  ))}
                </div>
              </FilterSection>

              {/* Curriculum */}
              <FilterSection label="Curriculum">
                <div className="flex gap-2">
                  {(['CAPS', 'IEB'] as Curriculum[]).map((c) => (
                    <button
                      key={c}
                      onClick={() => setParam('curriculum', curriculumFilter === c ? '' : c)}
                      className="flex-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer"
                      style={{
                        background: curriculumFilter === c ? 'var(--accent)' : 'var(--bg-base)',
                        color: curriculumFilter === c ? 'white' : 'var(--text-secondary)',
                        border: `1px solid ${curriculumFilter === c ? 'var(--accent)' : 'var(--border)'}`,
                      }}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </FilterSection>
            </div>
          </motion.aside>
        </FilterDrawer>

        {/* Results */}
        <div className="flex-1 min-w-0">
          {/* Active Filters */}
          {hasFilters && (
            <div className="flex items-center justify-between mb-4 gap-2">
              <div className="flex flex-wrap gap-2">
                {subjectFilter && (
                  <FilterTag label={getSubject(subjectFilter)?.name || subjectFilter} onRemove={() => setParam('subject', '')} />
                )}
                {gradeFilter && (
                  <FilterTag label={`Grade ${gradeFilter}`} onRemove={() => setParam('grade', '')} />
                )}
                {yearFilter && (
                  <FilterTag label={yearFilter} onRemove={() => setParam('year', '')} />
                )}
                {curriculumFilter && (
                  <FilterTag label={curriculumFilter} onRemove={() => setParam('curriculum', '')} />
                )}
              </div>
              <button
                onClick={copyLink}
                className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer"
                style={{ background: copied ? 'var(--accent-muted)' : 'var(--bg-base)', color: copied ? 'var(--accent)' : 'var(--text-secondary)' }}
                title="Copy filter link"
              >
                {copied ? <Check size={12} /> : <Link2 size={12} />}
                {copied ? 'Copied!' : 'Share'}
              </button>
            </div>
          )}

          {/* Results Count + Sort */}
          <div className="flex items-center justify-between mb-4 gap-3 flex-wrap">
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              {sorted.length} paper{sorted.length !== 1 ? 's' : ''} found
            </p>
            <div className="flex items-center gap-2">
              <ArrowUpDown size={14} style={{ color: 'var(--text-secondary)' }} />
              <select
                value={sortParam}
                onChange={(e) => setSort(e.target.value as SortKey)}
                className="px-3 py-1.5 rounded-lg text-xs font-medium border bg-transparent outline-none cursor-pointer"
                style={{ borderColor: 'var(--border)', color: 'var(--text-primary)', background: 'var(--bg-base)' }}
              >
                <option value="newest">Newest first</option>
                <option value="oldest">Oldest first</option>
                <option value="subject">By subject</option>
                <option value="grade">By grade</option>
              </select>
            </div>
          </div>

          {/* Grouped Paper Cards */}
          <div className="space-y-8">
            {Array.from(grouped.entries()).map(([subjectId, papers]) => {
              const subject = getSubject(subjectId)
              return (
                <SubjectGroup key={subjectId} subject={subject} papers={papers} />
              )
            })}
          </div>

          {sorted.length === 0 && (
            <motion.div
              className="text-center py-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <FileText size={56} className="mx-auto mb-4" style={{ color: 'var(--text-secondary)', opacity: 0.3 }} />
              <p className="text-lg font-bold mb-2" style={{ color: 'var(--text-primary)' }}>No papers found</p>
              <p className="text-sm mb-6 max-w-sm mx-auto" style={{ color: 'var(--text-secondary)' }}>
                {search ? (
                  <>No results for &ldquo;<strong>{search}</strong>&rdquo;. Try a different search term or adjust your filters.</>
                ) : (
                  "Try adjusting your filters to see more results."
                )}
              </p>
              <div className="flex items-center justify-center gap-3 flex-wrap">
                <button
                  onClick={clearFilters}
                  className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white cursor-pointer"
                  style={{ background: 'linear-gradient(135deg, var(--gradient-start), var(--gradient-end))' }}
                >
                  Clear All Filters
                </button>
                <Link
                  to="/"
                  className="px-5 py-2.5 rounded-xl text-sm font-semibold no-underline"
                  style={{ color: 'var(--accent)', border: '1px solid var(--border)' }}
                >
                  Back to Home
                </Link>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}

/* ──────────────────────────────────────────────── */
/*  Subject Group — collapsible section header      */
/* ──────────────────────────────────────────────── */
function SubjectGroup({ subject, papers }: { subject?: Subject; papers: Paper[] }) {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
    >
      {/* Group Header */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="w-full flex items-center gap-3 mb-3 cursor-pointer group"
      >
        {subject?.icon && (
          <span className="text-2xl" aria-hidden>{subject.icon}</span>
        )}
        <h2
          className="text-base font-bold flex-1 text-left"
          style={{ color: subject?.color || 'var(--text-primary)' }}
        >
          {subject?.name || subject?.id}
        </h2>
        <span
          className="text-xs font-medium px-2.5 py-0.5 rounded-full"
          style={{ background: 'var(--bg-base)', color: 'var(--text-secondary)', border: '1px solid var(--border)' }}
        >
          {papers.length}
        </span>
        {collapsed ? (
          <ChevronDown size={16} style={{ color: 'var(--text-secondary)' }} />
        ) : (
          <ChevronUp size={16} style={{ color: 'var(--text-secondary)' }} />
        )}
      </button>

      {/* Cards Grid */}
      <AnimatePresence initial={false}>
        {!collapsed && (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 gap-3"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {papers.map((paper, i) => (
              <PaperCard key={paper.id} paper={paper} subject={subject} index={i} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

/* ──────────────────────────────────────────────── */
/*  Paper Card — links directly to PDF source       */
/* ──────────────────────────────────────────────── */
function PaperCard({ paper, subject, index }: { paper: Paper; subject?: Subject; index: number }) {
  return (
    <motion.a
      href={paper.sourceUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="block rounded-2xl border transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 no-underline group"
      style={{
        background: 'var(--bg-surface)',
        borderColor: 'var(--border)',
        textDecoration: 'none',
      }}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, delay: Math.min(index * 0.04, 0.2) }}
    >
      <div className="p-4">
        {/* Top row: subject icon + title + arrow */}
        <div className="flex items-start gap-3 mb-3">
          <span
            className="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-lg"
            style={{
              background: subject?.color ? `${subject.color}18` : 'var(--bg-base)',
              color: subject?.color || 'var(--text-secondary)',
            }}
          >
            {subject?.icon || '📄'}
          </span>

          <div className="flex-1 min-w-0">
            <h3
              className="text-sm font-semibold leading-snug truncate"
              style={{ color: 'var(--text-primary)' }}
            >
              {paper.title}
            </h3>
            <p className="text-xs mt-0.5" style={{ color: 'var(--text-secondary)' }}>
              {subject?.name}
            </p>
          </div>

          <span
            className="shrink-0 w-8 h-8 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            style={{ background: 'var(--accent)', color: 'white' }}
            title={`Open PDF — ${paper.sourceName}`}
          >
            <ExternalLink size={14} />
          </span>
        </div>

        {/* Metadata row */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Grade badge */}
          <span
            className="px-2 py-0.5 rounded-md text-[11px] font-bold uppercase tracking-wide text-white"
            style={{ background: gradeColors[paper.grade] || 'var(--accent)' }}
          >
            Gr {paper.grade}
          </span>

          <span className="text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>
            {paper.year}
          </span>

          <span className="text-[10px]" style={{ color: 'var(--border)' }}>•</span>

          <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>
            {paper.examType}
          </span>

          <span className="text-[10px]" style={{ color: 'var(--border)' }}>•</span>

          <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>
            {paper.curriculum}
          </span>

          {paper.paperNumber && (
            <>
              <span className="text-[10px]" style={{ color: 'var(--border)' }}>•</span>
              <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                P{paper.paperNumber}
              </span>
            </>
          )}
        </div>
      </div>
    </motion.a>
  )
}

/* ──────────────────────────────────────────────── */
/*  Helper components                               */
/* ──────────────────────────────────────────────── */
function FilterSection({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mb-4">
      <label className="text-xs font-medium mb-2 block" style={{ color: 'var(--text-secondary)' }}>{label}</label>
      {children}
    </div>
  )
}

function FilterTag({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <span
      className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium"
      style={{ background: 'var(--accent-muted)', color: 'var(--accent)' }}
    >
      {label}
      <button onClick={onRemove} className="ml-0.5 hover:opacity-70 cursor-pointer"><X size={12} /></button>
    </span>
  )
}
