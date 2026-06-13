import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'

export interface BreadcrumbItem {
  label: string
  to?: string
}

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav className="flex items-center gap-1.5 text-sm mb-6 flex-wrap">
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-1.5">
          {i > 0 && <ChevronRight size={12} style={{ color: 'var(--text-secondary)', opacity: 0.5 }} />}
          {item.to ? (
            <Link to={item.to} className="no-underline font-medium" style={{ color: 'var(--accent)' }}>
              {item.label}
            </Link>
          ) : (
            <span style={{ color: 'var(--text-secondary)' }}>{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  )
}
