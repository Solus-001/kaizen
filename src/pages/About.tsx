import { motion } from 'framer-motion'
import { ExternalLink, Shield, Globe, BookOpen, Users } from 'lucide-react'
import catalog from '../data/catalog.json'
import type { Catalog } from '../data/types'

const data = catalog as Catalog

export default function About() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-8 pb-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Hero */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-4" style={{ color: 'var(--text-primary)' }}>
            About Kaizen
          </h1>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
            Kaizen (改善) means "continuous improvement" in Japanese. We believe every South African student deserves easy access to quality study resources.
          </p>
        </div>

        {/* Mission */}
        <Section title="Our Mission" icon={<BookOpen size={20} />}>
          <p className="mb-4">
            Kaizen is a free, open educational resource aggregator designed specifically for South African high school students. We organize past exam papers, study guides, and curriculum materials in one clean, searchable platform.
          </p>
          <p>
            We don't host copyrighted material — we link directly to official sources like the Department of Basic Education, IEB, and provincial education departments. Our goal is to make finding study materials as effortless as possible.
          </p>
        </Section>

        {/* What We Cover */}
        <Section title="What We Cover" icon={<Globe size={20} />}>
          <div className="grid sm:grid-cols-2 gap-4 mt-2">
            <InfoCard title="CAPS Curriculum" items={['Grades 8–12', 'All NSC subjects', 'November, June, March papers']} />
            <InfoCard title="IEB Curriculum" items={['Grade 12 NSC exams', 'IEB syllabus-aligned', 'Supplementary papers']} />
          </div>
        </Section>

        {/* Sources */}
        <Section title="Official Sources" icon={<Shield size={20} />}>
          <p className="mb-4">All papers link to official or trusted sources. We never host PDFs ourselves.</p>
          <div className="space-y-2">
            {data.sources.map((source: any) => (
              <a
                key={source.name}
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 rounded-xl border no-underline transition-all hover:shadow-sm"
                style={{ background: 'var(--bg-base)', borderColor: 'var(--border)' }}
              >
                <div>
                  <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{source.name}</span>
                  <span
                    className="ml-2 px-2 py-0.5 rounded text-[10px] font-medium"
                    style={{
                      background: source.reliability === 'official' ? '#16A34A20' : '#F9731620',
                      color: source.reliability === 'official' ? '#16A34A' : '#F97316',
                    }}
                  >
                    {source.reliability}
                  </span>
                </div>
                <ExternalLink size={14} style={{ color: 'var(--text-secondary)' }} />
              </a>
            ))}
          </div>
        </Section>

        {/* Community */}
        <Section title="For the Community" icon={<Users size={20} />}>
          <p>
            Kaizen is built by students, for students. Whether you're in Soshanguve, Johannesburg, Cape Town, or anywhere in South Africa — this platform is for you. We welcome contributions, feedback, and resource suggestions.
          </p>
        </Section>

        {/* Disclaimer */}
        <div
          className="p-5 rounded-2xl border mt-8"
          style={{ background: 'var(--accent-muted)', borderColor: 'var(--border)' }}
        >
          <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            <strong style={{ color: 'var(--text-primary)' }}>Disclaimer:</strong> Kaizen is not affiliated with the Department of Basic Education, IEB, or any provincial education department. All trademarks and copyrighted materials belong to their respective owners. We operate under fair use for educational purposes.
          </p>
        </div>
      </motion.div>
    </div>
  )
}

function Section({ title, icon, children }: { title: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <motion.div
      className="mb-10"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
    >
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
        <span style={{ color: 'var(--accent)' }}>{icon}</span> {title}
      </h2>
      <div style={{ color: 'var(--text-secondary)' }}>{children}</div>
    </motion.div>
  )
}

function InfoCard({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="p-4 rounded-xl border" style={{ background: 'var(--bg-surface)', borderColor: 'var(--border)' }}>
      <h4 className="text-sm font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>{title}</h4>
      <ul className="space-y-1 text-sm" style={{ color: 'var(--text-secondary)' }}>
        {items.map(item => <li key={item}>• {item}</li>)}
      </ul>
    </div>
  )
}
