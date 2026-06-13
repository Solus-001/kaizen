import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, ExternalLink, Share2, Check } from 'lucide-react'
import { useState } from 'react'
import catalog from '../data/catalog.json'
import type { Catalog, Resource } from '../data/types'

const data = catalog as Catalog

export default function Watch() {
  const { videoId } = useParams<{ videoId: string }>()
  const [embedError, setEmbedError] = useState(false)
  const [copied, setCopied] = useState(false)

  // Find the video resource
  const video = data.resources.find(
    r => r.type === 'video' && r.metadata?.videoId === videoId
  )

  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
  const fallbackThumb = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (!video) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-8 pb-20 text-center">
        <p className="text-lg font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Video not found</p>
        <Link to="/" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white no-underline" style={{ background: 'linear-gradient(135deg, var(--gradient-start), var(--gradient-end))' }}>
          <ArrowLeft size={16} /> Back to Home
        </Link>
      </div>
    )
  }

  // Find related videos
  const related = data.resources.filter(
    r => r.type === 'video' && r.id !== video.id &&
    r.subjectIds.some(s => video.subjectIds.includes(s))
  ).slice(0, 4)

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-6 pb-20">
      {/* Back */}
      <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
        <Link
          to={video.gradeRelevance.length > 0 ? `/grade/${video.gradeRelevance[video.gradeRelevance.length - 1]}/${video.subjectIds[0]}` : '/'}
          className="inline-flex items-center gap-1.5 text-sm font-medium mb-6 no-underline"
          style={{ color: 'var(--accent)' }}
        >
          <ArrowLeft size={16} /> Back
        </Link>
      </motion.div>

      {/* Video Player */}
      <motion.div
        className="rounded-2xl border overflow-hidden mb-6"
        style={{ background: 'var(--bg-surface)', borderColor: 'var(--border)' }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="relative w-full" style={{ aspectRatio: '16/9' }}>
          {!embedError ? (
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${videoId}`}
              title={video.title}
              className="absolute inset-0 w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              onError={() => setEmbedError(true)}
              style={{ border: 0 }}
            />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center" style={{ background: 'var(--bg-base)' }}>
              <img
                src={thumbnailUrl}
                alt={video.title}
                className="absolute inset-0 w-full h-full object-cover opacity-30"
                onError={(e) => { (e.target as HTMLImageElement).src = fallbackThumb }}
              />
              <div className="relative z-10 text-center p-6">
                <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>
                  This video can't be embedded
                </p>
                <a
                  href={`https://www.youtube.com/watch?v=${videoId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white no-underline"
                  style={{ background: '#FF0000' }}
                >
                  Watch on YouTube ↗
                </a>
              </div>
            </div>
          )}
        </div>
      </motion.div>

      {/* Video Info */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <h1 className="text-xl sm:text-2xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>{video.title}</h1>
        {video.description && (
          <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>{video.description}</p>
        )}

        <div className="flex items-center gap-3 flex-wrap">
          <a
            href={`https://www.youtube.com/watch?v=${videoId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium no-underline"
            style={{ color: 'var(--accent)', border: '1px solid var(--border)' }}
          >
            <ExternalLink size={14} /> Open on YouTube
          </a>
          <button
            onClick={copyLink}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium cursor-pointer"
            style={{ color: copied ? 'var(--accent)' : 'var(--text-secondary)', background: copied ? 'var(--accent-muted)' : 'var(--bg-surface)', border: '1px solid var(--border)' }}
          >
            {copied ? <Check size={14} /> : <Share2 size={14} />}
            {copied ? 'Copied!' : 'Share'}
          </button>
        </div>
      </motion.div>

      {/* Related Videos */}
      {related.length > 0 && (
        <motion.div
          className="mt-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-lg font-bold mb-4" style={{ color: 'var(--text-primary)' }}>Related Videos</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {related.map((r: Resource) => (
              <Link
                key={r.id}
                to={`/watch/${r.metadata?.videoId}`}
                className="p-3 rounded-xl border no-underline transition-all hover:shadow-md hover:scale-[1.01] flex gap-3"
                style={{ background: 'var(--bg-surface)', borderColor: 'var(--border)' }}
              >
                <div className="w-20 h-14 rounded-lg overflow-hidden shrink-0 bg-gray-200">
                  <img
                    src={`https://img.youtube.com/vi/${r.metadata?.videoId}/mqdefault.jpg`}
                    alt={r.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate" style={{ color: 'var(--text-primary)' }}>{r.title}</p>
                  <p className="text-[10px] mt-1" style={{ color: 'var(--text-secondary)' }}>{r.metadata?.duration}</p>
                </div>
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  )
}
