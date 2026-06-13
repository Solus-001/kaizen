import { Link } from 'react-router-dom'

export function Footer() {
  return (
    <footer className="border-t" style={{ borderColor: 'var(--border)', background: 'var(--bg-surface)' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-8">
          {/* Logo */}
          <div>
            <Link to="/" className="flex items-center gap-2 no-underline mb-3">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-sm"
                style={{ background: 'linear-gradient(135deg, var(--gradient-start), var(--gradient-end))' }}
              >
                K
              </div>
              <span className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>Kaizen</span>
            </Link>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              South Africa's premium study resource hub. Organizing past papers and study guides for Grades 10–12.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-sm font-bold mb-3" style={{ color: 'var(--text-primary)' }}>Quick Links</h4>
            <div className="flex flex-col gap-2">
              <Link to="/" className="text-sm no-underline" style={{ color: 'var(--text-secondary)' }}>Home</Link>
              <Link to="/browse" className="text-sm no-underline" style={{ color: 'var(--text-secondary)' }}>Browse Papers</Link>
              <Link to="/about" className="text-sm no-underline" style={{ color: 'var(--text-secondary)' }}>About</Link>
              <Link to="/contact" className="text-sm no-underline" style={{ color: 'var(--text-secondary)' }}>Contact</Link>
            </div>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-sm font-bold mb-3" style={{ color: 'var(--text-primary)' }}>Resources</h4>
            <div className="flex flex-col gap-2">
              <a href="https://www.education.gov.za" target="_blank" rel="noopener noreferrer" className="text-sm no-underline" style={{ color: 'var(--text-secondary)' }}>Dept. of Education</a>
              <a href="https://www.siyavula.com/read" target="_blank" rel="noopener noreferrer" className="text-sm no-underline" style={{ color: 'var(--text-secondary)' }}>Siyavula Textbooks</a>
              <a href="https://stanmorephysics.com" target="_blank" rel="noopener noreferrer" className="text-sm no-underline" style={{ color: 'var(--text-secondary)' }}>Stanmore Secondary</a>
              <a href="https://gizmo.ai" target="_blank" rel="noopener noreferrer" className="text-sm no-underline" style={{ color: 'var(--text-secondary)' }}>Gizmo AI Tutor</a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t pt-6 flex flex-col sm:flex-row items-center justify-between gap-4" style={{ borderColor: 'var(--border)' }}>
          <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
            Made with ❤️ by <strong>Ntokzin</strong> for SA students
          </p>
          <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
            © 2026 Kaizen — Not affiliated with the Department of Basic Education (DBE).
          </p>
        </div>
        <p className="text-[10px] mt-3 text-center" style={{ color: 'var(--text-secondary)' }}>
          Past papers and study materials belong to their respective owners.
        </p>
      </div>
    </footer>
  )
}
