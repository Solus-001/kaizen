export interface Subject {
  id: string
  name: string
  icon: string
  color: string
  categories: string[]
  description?: string
}

export interface Paper {
  id: string
  subjectId: string
  grade: number
  year: number
  examType: ExamType
  paperNumber: number
  title: string
  curriculum: Curriculum
  sourceUrl: string
  sourceName: string
  fileType: string
  duration: string
  marks: number
  tags: string[]
}

export type ResourceType = 'caps-doc' | 'textbook' | 'study-guide' | 'past-papers' | 'video' | 'quiz'
export type ResourceSource = 'dbe' | 'siyavula' | 'mind-the-gap' | 'youtube' | 'gizmo' | 'other'

export interface Resource {
  id: string
  type: ResourceType
  title: string
  source: ResourceSource
  url: string
  description?: string
  metadata?: {
    year?: number
    language?: 'en' | 'af' | 'zu'
    format?: 'pdf' | 'web' | 'video'
    fileSize?: string
    duration?: string
    thumbnail?: string
    videoId?: string
  }
  gradeRelevance: ('10' | '11' | '12')[]
  subjectIds: string[]
}

export interface Source {
  name: string
  url: string
  type: 'government' | 'exam-board' | 'aggregator'
  reliability: 'official' | 'community'
}

export interface CatalogMeta {
  version: string
  lastUpdated: string
  curriculum: Curriculum[]
  country: string
}

export interface GradeInfo {
  id: string
  label: string
  subtitle: string
}

export interface Catalog {
  meta: CatalogMeta
  subjects: Subject[]
  grades: number[]
  gradeInfo: GradeInfo[]
  years: number[]
  examTypes: ExamType[]
  papers: Paper[]
  resources: Resource[]
  sources: Source[]
}

export type Curriculum = 'CAPS' | 'IEB'
export type ExamType = 'November' | 'March' | 'June' | 'September'
