import { ExternalLink, FileText, GitBranch, Mail, Send } from 'lucide-react'
import type { ProfileLink } from '../data/profile'
import { visibleProfileLinks } from '../data/profile'
import { text, type Locale } from '../i18n'

const contactContent = {
  kicker: {
    zh: '联系',
    en: 'Contact',
  },
  heading: {
    zh: '欢迎交流项目、岗位与 AI 应用开发。',
    en: 'Open to discussing projects, roles, and AI application development.',
  },
  projects: {
    zh: '项目',
    en: 'Projects',
  },
}

function iconForLink(type: ProfileLink['type']) {
  if (type === 'github') return <GitBranch size={18} />
  if (type === 'email') return <Mail size={18} />
  if (type === 'resume') return <FileText size={18} />
  return <ExternalLink size={18} />
}

type ContactProps = {
  locale: Locale
}

export function Contact({ locale }: ContactProps) {
  return (
    <section id="contact" className="border-t border-[var(--line)] bg-[var(--ink)] px-5 py-20 text-white sm:px-8 lg:px-10">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_0.8fr] lg:items-end">
        <div>
          <p className="mb-4 text-xs font-semibold uppercase text-[#b8f05a]">{contactContent.kicker[locale]}</p>
          <h2 className="max-w-3xl text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl">
            {contactContent.heading[locale]}
          </h2>
        </div>
        <div className="flex flex-wrap gap-3 lg:justify-end">
          {visibleProfileLinks.map((link) => (
            <a key={link.href} className="contact-action" href={link.href}>
              {iconForLink(link.type)}
              {text(link.label, locale)}
            </a>
          ))}
          <a className="contact-action" href="#projects">
            <Send size={18} />
            {contactContent.projects[locale]}
          </a>
        </div>
      </div>
    </section>
  )
}
