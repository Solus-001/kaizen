import { WifiOff } from 'lucide-react'
import { useOffline } from '../hooks/useOffline'

export function OfflineIndicator() {
  const isOffline = useOffline()

  if (!isOffline) return null

  return (
    <div
      className="fixed top-16 left-0 right-0 z-50 flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium"
      style={{ background: 'var(--accent)', color: 'white' }}
    >
      <WifiOff size={14} />
      You're offline — some features may be limited
    </div>
  )
}
