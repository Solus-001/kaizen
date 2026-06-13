import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BookOpen, ChevronDown, Search, ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import notesData from '../data/notes.json'

const SUBJECTS = [...new Set(notesData.map(n => n.subject))].sort()

export default function Notes() {
  const [activeSubject, setActiveSubject] = useState<string | null>(null)
  const [openNote, setOpenNote] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

  const filtered = notesData.filter(note => {
    const matchesSubject = !activeSubject || note.subject === activeSubject
    const matchesSearch = !searchQuery || 
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesSubject && matchesSearch
  })

  const toggleNote = (id: string) => {
    setOpenNote(prev => prev === id ? null : id)
  }

  // Simple markdown renderer
  const renderMarkdown = (text: string) => {
    return text
      .replace(/^### (.+)$/gm, '<h3 class="text-base font-bold mt-4 mb-2" style="color: var(--text-primary)">$1</h3>')
      .replace(/^## (.+)$/gm, '<h2 class="text-lg font-bold mt-5 mb-2" style="color: var(--text-primary)">$1</h2>')
      .replace(/^# (.+)$/gm, '<h1 class="text-xl font-extrabold mt-6 mb-3" style="color: var(--text-primary)">$1</h1>')
      .replace(/\*\*(.+?)\*\*/g, '<strong class="font-bold" style="color: var(--text-primary)">$1</strong>')
      .replace(/\*(.+?)\*/g, '<em>$1</em>')
      .replace(/`([^`]+)`/g, '<code class="px-1.5 py-0.5 rounded text-xs font-mono" style="background: var(--accent-muted); color: var(--accent)">$1</code>')
      .replace(/^- (.+)$/gm, '<li class="ml-4 list-disc text-sm" style="color: var(--text-primary)">$1</li>')
      .replace(/^(\d+)\. (.+)$/gm, '<li class="ml-4 list-decimal text-sm" style="color: var(--text-primary)">$2</li>')
      .replace(/\n\n/g, '</p><p class="text-sm leading-relaxed mb-2" style="color: var(--text-primary)">')
      .replace(/\n/g, '<br/>')
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-8 pb-20">
      {/* Back */}
      <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
        <Link to="/" className="inline-flex items-center gap-1.5 text-sm font-medium mb-6 no-underline" style={{ color: 'var(--accent)' }}>
          <ArrowLeft size={16} /> Back to Home
        </Link>
      </motion.div>

      {/* Header */}
      <motion.div className="mb-8" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="flex items-center gap-3 mb-2">
          <BookOpen size={28} style={{ color: 'var(--accent)' }} />
          <h1 className="text-3xl sm:text-4xl font-extrabold" style={{ color: 'var(--text-primary)' }}>Ntokzin's Notes</h1>
        </div>
        <p className="text-base mb-6" style={{ color: 'var(--text-secondary)' }}>
          Personal study notes for Grade 12 — {notesData.length} notes across {SUBJECTS.length} subjects.
        </p>

        {/* Search */}
        <div className="mb-6">
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl border" style={{ background: 'var(--bg-surface)', borderColor: 'var(--border)' }}>
            <Search size={18} style={{ color: 'var(--text-secondary)' }} />
            <input
              type="text"
              placeholder="Search notes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent outline-none text-sm"
              style={{ color: 'var(--text-primary)' }}
            />
          </div>
        </div>

        {/* Subject Filter */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          <button
            onClick={() => setActiveSubject(null)}
            className="shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all cursor-pointer whitespace-nowrap"
            style={{
              background: !activeSubject ? 'var(--accent)' : 'var(--bg-surface)',
              color: !activeSubject ? 'white' : 'var(--text-secondary)',
              border: `1px solid ${!activeSubject ? 'var(--accent)' : 'var(--border)'}`,
            }}
          >
            All ({notesData.length})
          </button>
          {SUBJECTS.map(subj => {
            const count = notesData.filter(n => n.subject === subj).length
            return (
              <button
                key={subj}
                onClick={() => setActiveSubject(activeSubject === subj ? null : subj)}
                className="shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all cursor-pointer whitespace-nowrap"
                style={{
                  background: activeSubject === subj ? 'var(--accent)' : 'var(--bg-surface)',
                  color: activeSubject === subj ? 'white' : 'var(--text-secondary)',
                  border: `1px solid ${activeSubject === subj ? 'var(--accent)' : 'var(--border)'}`,
                }}
              >
                {subj} ({count})
              </button>
            )
          })}
        </div>
      </motion.div>

      {/* Notes List */}
      <div className="space-y-3">
        {filtered.map((note, i) => (
          <motion.div
            key={note.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.03 }}
          >
            <div
              className="rounded-xl border overflow-hidden"
              style={{ background: 'var(--bg-surface)', borderColor: 'var(--border)' }}
            >
              {/* Note Header */}
              <button
                onClick={() => toggleNote(note.id)}
                className="w-full px-5 py-4 flex items-center justify-between cursor-pointer text-left"
                style={{ background: 'var(--bg-surface)' }}
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold" style={{ background: 'var(--accent-muted)', color: 'var(--accent)' }}>
                      {note.subject}
                    </span>
                    <span className="text-[10px]" style={{ color: 'var(--text-secondary)' }}>
                      {note.wordCount} words
                    </span>
                  </div>
                  <h3 className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>{note.title}</h3>
                </div>
                <motion.div animate={{ rotate: openNote === note.id ? 180 : 0 }} transition={{ duration: 0.2 }} className="shrink-0 ml-3">
                  <ChevronDown size={18} style={{ color: 'var(--text-secondary)' }} />
                </motion.div>
              </button>

              {/* Note Content */}
              <AnimatePresence>
                {openNote === note.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div
                      className="px-5 pb-5 pt-2 border-t prose-sm max-w-none"
                      style={{ borderColor: 'var(--border)' }}
                      dangerouslySetInnerHTML={{ __html: `<p class="text-sm leading-relaxed" style="color: var(--text-primary)">${renderMarkdown(note.content)}</p>` }}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16">
          <BookOpen size={48} className="mx-auto mb-4" style={{ color: 'var(--text-secondary)', opacity: 0.3 }} />
          <p className="text-lg font-bold mb-2" style={{ color: 'var(--text-primary)' }}>No notes found</p>
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Try a different search or subject filter.</p>
        </div>
      )}
    </div>
  )
}
