import { lazy, Suspense, useEffect, useState } from 'react'
import { About } from './components/About'
import { Contact } from './components/Contact'
import { Hero } from './components/Hero'
import { ProjectGrid } from './components/ProjectGrid'
import { Skills } from './components/Skills'
import { visibleProfileLinks } from './data/profile'
import { projects } from './data/projects'
import type { Locale } from './i18n'
import { canUseProjectBackend, listPublishedProjects } from './lib/projects'

const AdminApp = lazy(() => import('./components/admin/AdminApp').then((module) => ({ default: module.AdminApp })))

function App() {
  const [locale, setLocale] = useState<Locale>('zh')
  const [hash, setHash] = useState(() => window.location.hash)
  const [portfolioProjects, setPortfolioProjects] = useState(projects)

  useEffect(() => {
    const handleHashChange = () => setHash(window.location.hash)
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  useEffect(() => {
    let isMounted = true

    async function loadProjects() {
      try {
        const remoteProjects = await listPublishedProjects()

        if (isMounted && canUseProjectBackend()) {
          setPortfolioProjects(remoteProjects)
        }
      } catch {
        if (isMounted) {
          setPortfolioProjects(projects)
        }
      }
    }

    void loadProjects()

    return () => {
      isMounted = false
    }
  }, [])

  useEffect(() => {
    const resetScroll = window.setTimeout(() => {
      const targetHash = hash.startsWith('#project/') ? '#projects' : hash

      if (targetHash) {
        const target = document.querySelector(targetHash)
        if (target instanceof HTMLElement) {
          window.scrollTo(0, target.offsetTop)
        }
      }
    }, 50)

    return () => window.clearTimeout(resetScroll)
  }, [hash])

  if (hash.startsWith('#admin')) {
    return (
      <Suspense fallback={<main className="admin-shell"><div className="admin-loading">正在打开管理后台</div></main>}>
        <AdminApp />
      </Suspense>
    )
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#10141a] text-[var(--ink)]">
      <Hero locale={locale} onLocaleChange={setLocale} />
      <ProjectGrid locale={locale} projects={portfolioProjects} />
      <Skills locale={locale} />
      <About locale={locale} />
      {visibleProfileLinks.length > 0 && <Contact locale={locale} />}
    </main>
  )
}

export default App
