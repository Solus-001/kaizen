import { motion } from 'framer-motion'

export function Skeleton({ className = '', style = {} }: { className?: string; style?: React.CSSProperties }) {
  return (
    <motion.div
      className={`rounded-xl animate-pulse ${className}`}
      style={{ background: 'var(--bg-surface-hover)', ...style }}
      initial={{ opacity: 0.6 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, repeat: Infinity, repeatType: 'reverse' }}
    />
  )
}

export function PaperCardSkeleton() {
  return (
    <div
      className="p-4 sm:p-5 rounded-2xl border"
      style={{ background: 'var(--bg-surface)', borderColor: 'var(--border)' }}
    >
      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <Skeleton className="w-7 h-7 rounded-lg" />
            <Skeleton className="h-4 w-48" />
          </div>
          <div className="flex gap-2 mb-2">
            <Skeleton className="h-3 w-16" />
            <Skeleton className="h-3 w-12" />
            <Skeleton className="h-3 w-20" />
            <Skeleton className="h-3 w-14" />
          </div>
          <div className="flex gap-1.5 mt-2">
            <Skeleton className="h-5 w-16 rounded-md" />
            <Skeleton className="h-5 w-20 rounded-md" />
            <Skeleton className="h-5 w-14 rounded-md" />
          </div>
        </div>
        <Skeleton className="h-9 w-28 rounded-xl shrink-0" />
      </div>
    </div>
  )
}

export function SubjectCardSkeleton() {
  return (
    <div
      className="p-4 rounded-xl border text-center"
      style={{ background: 'var(--bg-surface)', borderColor: 'var(--border)' }}
    >
      <Skeleton className="w-10 h-10 rounded-xl mx-auto mb-2" />
      <Skeleton className="h-3 w-16 mx-auto" />
    </div>
  )
}
