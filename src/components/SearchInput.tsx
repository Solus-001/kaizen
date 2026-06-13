import { Search, X } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

interface SearchInputProps {
  className?: string
}

export function SearchInput({ className = '' }: SearchInputProps) {
  const [query, setQuery] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()

  // Keyboard shortcut: / to focus
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === '/' && !e.ctrlKey && !e.metaKey && !e.altKey) {
        const tag = (e.target as HTMLElement).tagName
        if (tag !== 'INPUT' && tag !== 'TEXTAREA') {
          e.preventDefault()
          inputRef.current?.focus()
        }
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      navigate(`/browse?q=${encodeURIComponent(query.trim())}`)
    } else {
      navigate('/browse')
    }
  }

  return (
    <form onSubmit={handleSubmit} className={className}>
      <div
        className="flex items-center gap-3 px-5 py-3 rounded-2xl border-2 transition-all focus-within:shadow-lg focus-within:border-[var(--accent)]"
        style={{ background: 'var(--bg-surface)', borderColor: 'var(--border)' }}
      >
        <Search size={20} style={{ color: 'var(--text-secondary)' }} />
        <input
          ref={inputRef}
          type="text"
          placeholder='Search papers, subjects... (press "/")'
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 bg-transparent outline-none text-base"
          style={{ color: 'var(--text-primary)' }}
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery('')}
            className="p-1 rounded-lg cursor-pointer"
            style={{ color: 'var(--text-secondary)' }}
          >
            <X size={16} />
          </button>
        )}
        <button
          type="submit"
          className="px-4 py-2 rounded-xl text-sm font-semibold text-white cursor-pointer"
          style={{ background: 'linear-gradient(135deg, var(--gradient-start), var(--gradient-end))' }}
        >
          Search
        </button>
      </div>
    </form>
  )
}
