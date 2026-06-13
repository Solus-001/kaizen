import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Layout } from './components/layout/Layout'

const Home = lazy(() => import('./pages/Home'))
const Grades = lazy(() => import('./pages/Grades'))
const Grade = lazy(() => import('./pages/Grade'))
const SubjectPage = lazy(() => import('./pages/Subject'))
const Watch = lazy(() => import('./pages/Watch'))
const Quiz = lazy(() => import('./pages/Quiz'))
const Browse = lazy(() => import('./pages/Browse'))
const PaperDetail = lazy(() => import('./pages/PaperDetail'))
const About = lazy(() => import('./pages/About'))
const Contact = lazy(() => import('./pages/Contact'))
const Notes = lazy(() => import('./pages/Notes'))

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', color: 'var(--text-secondary)' }}>Loading...</div>}>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/grades" element={<Grades />} />
            <Route path="/grade/:gradeId" element={<Grade />} />
            <Route path="/grade/:gradeId/:subjectId" element={<SubjectPage />} />
            <Route path="/watch/:videoId" element={<Watch />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/browse" element={<Browse />} />
            <Route path="/browse/:id" element={<PaperDetail />} />
            <Route path="/notes" element={<Notes />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App
