import { useEffect, useMemo, useState, type ReactNode } from 'react'

type Author = {
  name: string
  highlight: boolean
  corresponding: boolean
}

type Publication = {
  title: string
  link: string
  authors: Author[]
  venue: string
  year: string
  themes: string[]
  status: string
}

type RawPublication = {
  title?: string
  link?: string
  authors?: string
  venue?: string
  year?: string
  themes?: string
  status?: string
}

type Award = {
  name: string
  grantor: string
  time: string
}

type ServiceItem = {
  role: string
  organization: string
  time: string
}

type ProjectItem = {
  title: string
  time: string
  description: string
}

type ResearchArea = {
  title: string
  description: string
}

type EducationItem = {
  school: string
  degree: string
  supervisor: string
  time: string
}

type Profile = {
  name: string
  title: string
  affiliation: string
  email: string
  location: string
  github: string
  summary: string
  bio: string
}

type ContentData = {
  profile: Profile
  researchAreas: ResearchArea[]
  education: EducationItem[]
  publications: RawPublication[]
  services: ServiceItem[]
  projects: ProjectItem[]
  awards: Award[]
  news: unknown[]
}

const fallbackContent: ContentData = {
  profile: {
    name: 'Xi Wei',
    title: 'PhD Candidate in Urban Planning',
    affiliation: 'Department of Urban Planning and Design, The University of Hong Kong',
    email: 'weixi1998@connect.hku.hk',
    location: 'Hong Kong SAR, China',
    github: 'https://github.com/xiweihku',
    summary:
      'PhD Candidate in Urban Planning at The University of Hong Kong, studying intercity mobility, activity spaces, accessibility, and climate-adaptive community life circles.',
    bio:
      "Xi Wei is a PhD candidate in the Department of Urban Planning and Design at The University of Hong Kong. His research focuses on intercity mobility, X-minute cities, activity spaces, accessibility, and urban spatial restructuring.",
  },
  researchAreas: [
    {
      title: 'Intercity mobility and regional integration',
      description:
        'Understanding how daily cross-city movements reshape activity spaces, commuting systems, and regional urban networks.',
    },
    {
      title: 'Accessibility, activity space, and social equity',
      description:
        'Measuring how people actually reach urban opportunities across neighborhoods, facilities, and transport environments.',
    },
    {
      title: 'X-minute cities and climate-adaptive communities',
      description:
        'Evaluating community life circles, effective accessibility, and service provision under changing environmental conditions.',
    },
  ],
  education: [],
  publications: [],
  services: [],
  projects: [],
  awards: [],
  news: [],
}

const navItems = [
  { href: '#about', label: 'About' },
  { href: '#publications', label: 'Publications' },
  { href: '#projects-services', label: 'Projects & Services' },
  { href: '#awards', label: 'Honors & Awards' },
]

function splitList(value?: string) {
  return String(value || '')
    .split(/[;,]/)
    .map((item) => item.trim())
    .filter(Boolean)
}

function parseAuthors(value?: string): Author[] {
  return splitList(value).map((entry) => {
    const corresponding = entry.includes('*')
    const name = entry.replace(/\*/g, '').trim()
    return {
      name,
      highlight: ['Xi Wei', 'Wei Xi', '魏玺'].includes(name),
      corresponding,
    }
  })
}

function normalizePublication(pub: RawPublication): Publication {
  return {
    title: pub.title || 'Untitled publication',
    link: pub.link || '#',
    authors: parseAuthors(pub.authors),
    venue: pub.venue || '',
    year: pub.year || '',
    themes: splitList(pub.themes),
    status: pub.status || 'Published',
  }
}

function uniqueSortedYears(items: Publication[]) {
  return ['All', ...Array.from(new Set(items.map((p) => p.year).filter(Boolean))).sort((a, b) => Number(b) - Number(a))]
}

function uniqueThemes(items: Publication[]) {
  return ['All', ...Array.from(new Set(items.flatMap((p) => p.themes)))]
}

function filterPublications(items: Publication[], selectedYear: string, selectedTheme: string) {
  return items.filter((pub) => {
    const matchYear = selectedYear === 'All' || pub.year === selectedYear
    const matchTheme = selectedTheme === 'All' || pub.themes.includes(selectedTheme)
    return matchYear && matchTheme
  })
}

function useSiteContent() {
  const [content, setContent] = useState<ContentData>(fallbackContent)

  useEffect(() => {
    let cancelled = false

    async function loadContent() {
      try {
        const response = await fetch('/data/content.json', { cache: 'no-store' })
        if (!response.ok) {
          throw new Error(`Failed to load content: ${response.status}`)
        }
        const nextContent = (await response.json()) as ContentData
        if (!cancelled) {
          setContent({
            ...fallbackContent,
            ...nextContent,
            profile: { ...fallbackContent.profile, ...nextContent.profile },
          })
        }
      } catch (error) {
        console.warn(error)
      }
    }

    loadContent()
    return () => {
      cancelled = true
    }
  }, [])

  return content
}

function AuthorList({ authors }: { authors: Author[] }) {
  return (
    <p className="mt-3 text-sm leading-7 text-slate-600">
      {authors.map((author, index) => {
        const suffix = author.corresponding ? ' *' : ''
        return (
          <span key={`${author.name}-${index}`}>
            {index > 0 ? ', ' : ''}
            {author.highlight ? <strong className="font-semibold text-slate-950">{author.name}</strong> : <span>{author.name}</span>}
            <span>{suffix}</span>
          </span>
        )
      })}
    </p>
  )
}

function SectionHeader({ eyebrow, title, description }: { eyebrow: string; title: string; description?: string }) {
  return (
    <div className="mb-10">
      <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#8B1E3F]">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 md:text-4xl">{title}</h2>
      {description ? <p className="mt-4 max-w-3xl text-base leading-8 text-slate-600">{description}</p> : null}
    </div>
  )
}

function LinkButton({ href, children, variant = 'secondary' }: { href: string; children: ReactNode; variant?: 'primary' | 'secondary' }) {
  const className =
    variant === 'primary'
      ? 'inline-flex items-center justify-center rounded-full bg-[#1E3A5F] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-[#162c49] hover:shadow-md'
      : 'inline-flex items-center justify-center rounded-full border border-slate-300 bg-white/80 px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:border-[#1E3A5F] hover:text-[#1E3A5F] hover:shadow-md'

  const isInternal = href.startsWith('#')

  return (
    <a href={href} className={className} target={isInternal ? undefined : '_blank'} rel={isInternal ? undefined : 'noreferrer'}>
      {children}
    </a>
  )
}

function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-3xl border border-white/60 bg-white/80 p-5 shadow-sm backdrop-blur">
      <p className="text-2xl font-semibold text-[#1E3A5F]">{value}</p>
      <p className="mt-1 text-sm leading-6 text-slate-500">{label}</p>
    </div>
  )
}

function HeroSection({ profile, publicationCount, researchCount }: { profile: Profile; publicationCount: number; researchCount: number }) {
  return (
    <section id="about" className="relative overflow-hidden border-b border-slate-200 bg-[radial-gradient(circle_at_top_left,_#dbeafe,_transparent_34%),linear-gradient(135deg,_#f8fafc_0%,_#eef2f7_100%)]">
      <div className="absolute right-[-8rem] top-[-8rem] h-80 w-80 rounded-full bg-[#8B1E3F]/10 blur-3xl" />
      <div className="absolute bottom-[-12rem] left-[-8rem] h-96 w-96 rounded-full bg-[#1E3A5F]/10 blur-3xl" />

      <div className="relative mx-auto grid max-w-6xl gap-12 px-6 py-20 md:grid-cols-[1.08fr_0.92fr] md:items-center md:py-24">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#8B1E3F]">Academic Website</p>
          <h1 className="mt-5 text-5xl font-semibold tracking-tight text-slate-950 md:text-7xl">{profile.name}</h1>
          <p className="mt-5 max-w-2xl text-xl leading-9 text-slate-700">{profile.summary}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <LinkButton href={`mailto:${profile.email}`} variant="primary">Email</LinkButton>
            <LinkButton href={profile.github}>GitHub</LinkButton>
            <LinkButton href="#publications">Publications</LinkButton>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            <StatCard value={`${publicationCount}+`} label="Publications and research outputs" />
            <StatCard value="HKU" label="Department of Urban Planning and Design" />
            <StatCard value={`${researchCount}`} label="Core research themes" />
          </div>
        </div>

        <div className="rounded-[2rem] border border-white/70 bg-white/80 p-6 shadow-2xl shadow-slate-200/70 backdrop-blur">
          <img
            src="/photo.jpg"
            alt={profile.name}
            className="aspect-[4/5] w-full rounded-[1.5rem] object-cover object-center shadow-sm"
          />
          <div className="mt-6 rounded-3xl bg-slate-950 p-6 text-white">
            <p className="text-lg font-semibold">Department of Urban Planning and Design</p>
            <p className="mt-2 text-sm leading-7 text-slate-300">The University of Hong Kong</p>
          </div>
        </div>
      </div>
    </section>
  )
}

function AboutDetails({ profile, researchAreas, education }: { profile: Profile; researchAreas: ResearchArea[]; education: EducationItem[] }) {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <SectionHeader
            eyebrow="Profile"
            title="Research profile"
            description="My work connects transport geography, urban analytics, and planning policy to understand how mobility systems reshape everyday access to urban opportunities."
          />
        </div>
        <div className="space-y-5 text-base leading-8 text-slate-700">
          <p>{profile.bio}</p>
        </div>
      </div>

      <div className="mt-14 grid gap-5 md:grid-cols-3">
        {researchAreas.map((area, index) => (
          <article key={area.title} className="group rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:border-[#1E3A5F]/30 hover:shadow-xl">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#1E3A5F] text-sm font-semibold text-white">0{index + 1}</div>
            <h3 className="mt-6 text-xl font-semibold leading-7 text-slate-950">{area.title}</h3>
            <p className="mt-4 text-sm leading-7 text-slate-600">{area.description}</p>
          </article>
        ))}
      </div>

      <div className="mt-14 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <section>
          <h3 className="border-b border-slate-200 pb-4 text-2xl font-semibold tracking-tight text-slate-950">Education</h3>
          <div className="mt-5 space-y-4">
            {education.map((edu) => (
              <div key={`${edu.school}-${edu.degree}`} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <p className="text-lg font-semibold text-slate-950">{edu.school}</p>
                <p className="mt-2 text-sm leading-7 text-slate-600">{edu.degree}</p>
                <p className="text-sm leading-7 text-slate-600">{edu.supervisor}</p>
                <p className="text-sm leading-7 text-slate-500">{edu.time}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h3 className="border-b border-slate-200 pb-4 text-2xl font-semibold tracking-tight text-slate-950">Contact</h3>
          <div className="mt-5 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#8B1E3F]">Email</p>
            <a className="mt-3 block text-base font-medium text-slate-950 underline decoration-slate-300 underline-offset-4 hover:decoration-[#1E3A5F]" href={`mailto:${profile.email}`}>
              {profile.email}
            </a>
            <p className="mt-6 text-sm font-semibold uppercase tracking-[0.18em] text-[#8B1E3F]">Location</p>
            <p className="mt-3 text-base leading-7 text-slate-700">{profile.location}</p>
          </div>
        </section>
      </div>
    </section>
  )
}

function PublicationsSection({
  publications,
  selectedYear,
  setSelectedYear,
  selectedTheme,
  setSelectedTheme,
}: {
  publications: Publication[]
  selectedYear: string
  setSelectedYear: (value: string) => void
  selectedTheme: string
  setSelectedTheme: (value: string) => void
}) {
  const years = uniqueSortedYears(publications)
  const themes = uniqueThemes(publications)
  const filtered = useMemo(() => filterPublications(publications, selectedYear, selectedTheme), [publications, selectedYear, selectedTheme])

  return (
    <section id="publications" className="border-y border-slate-200 bg-white/70">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <SectionHeader
          eyebrow="Publications"
          title="Research outputs"
          description="Selected peer-reviewed articles and Chinese-language publications on mobility, accessibility, digital urbanism, and urban development."
        />

        <div className="mb-8 grid gap-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-800">Filter by year</label>
            <select
              value={selectedYear}
              onChange={(event) => setSelectedYear(event.target.value)}
              className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-[#1E3A5F] focus:ring-2 focus:ring-[#1E3A5F]/10"
            >
              {years.map((year) => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-800">Filter by theme</label>
            <select
              value={selectedTheme}
              onChange={(event) => setSelectedTheme(event.target.value)}
              className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-[#1E3A5F] focus:ring-2 focus:ring-[#1E3A5F]/10"
            >
              {themes.map((theme) => (
                <option key={theme} value={theme}>{theme}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="space-y-4">
          {filtered.map((pub) => (
            <article key={`${pub.title}-${pub.year}`} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="max-w-4xl">
                  <a
                    href={pub.link}
                    target="_blank"
                    rel="noreferrer"
                    className="text-lg font-semibold leading-8 text-slate-950 underline decoration-slate-300 underline-offset-4 transition hover:decoration-[#1E3A5F]"
                  >
                    {pub.title}
                  </a>
                  <AuthorList authors={pub.authors} />
                  <p className="mt-2 text-sm text-slate-500"><span className="italic">{pub.venue}</span> - {pub.year}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {pub.themes.map((theme) => (
                      <span key={theme} className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-600">
                        {theme}
                      </span>
                    ))}
                  </div>
                </div>
                <span className="rounded-full bg-[#1E3A5F]/10 px-3 py-1 text-xs font-semibold text-[#1E3A5F]">{pub.status}</span>
              </div>
            </article>
          ))}
        </div>

        <p className="mt-6 text-sm text-slate-500">* Corresponding author</p>
      </div>
    </section>
  )
}

function ProjectsServicesSection({ projects, services }: { projects: ProjectItem[]; services: ServiceItem[] }) {
  return (
    <section id="projects-services" className="mx-auto max-w-6xl px-6 py-16">
      <SectionHeader
        eyebrow="Projects & Services"
        title="Grants, projects, and academic service"
        description="Research-related projects, applied planning experience, and academic service roles."
      />

      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-8">
          <section>
            <h3 className="border-b border-slate-200 pb-4 text-2xl font-semibold tracking-tight text-slate-950">Research Grants</h3>
            <div className="mt-5 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-sm leading-7 text-slate-600">Participatory role only (Non-PI status)</p>
            </div>
          </section>

          <section>
            <h3 className="border-b border-slate-200 pb-4 text-2xl font-semibold tracking-tight text-slate-950">Academic Service</h3>
            <div className="mt-5 space-y-4">
              {services.map((service) => (
                <div key={`${service.role}-${service.organization}`} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                  <p className="text-base font-semibold text-slate-950">{service.role}</p>
                  <p className="mt-2 text-sm leading-7 text-slate-600">{service.organization}</p>
                  <p className="text-sm leading-7 text-slate-500">{service.time}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        <section>
          <h3 className="border-b border-slate-200 pb-4 text-2xl font-semibold tracking-tight text-slate-950">Projects</h3>
          <div className="mt-5 space-y-4">
            {projects.map((project) => (
              <article key={project.title} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
                <p className="text-lg font-semibold leading-7 text-slate-950">{project.title}</p>
                <p className="mt-2 text-sm leading-7 text-[#8B1E3F]">{project.time}</p>
                <p className="mt-3 text-sm leading-7 text-slate-600">{project.description}</p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </section>
  )
}

function AwardsSection({ awards }: { awards: Award[] }) {
  return (
    <section id="awards" className="border-t border-slate-200 bg-slate-950 text-white">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="mb-10">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#f4b6c6]">Honors & Awards</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">Scholarships, prizes, and academic distinctions</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {awards.map((award) => (
            <article key={award.name} className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-sm transition hover:-translate-y-1 hover:bg-white/10">
              <p className="text-base font-semibold leading-7 text-white">{award.name}</p>
              <p className="mt-2 text-sm leading-7 text-slate-300">{award.time}</p>
              <p className="text-sm leading-7 text-slate-300">{award.grantor}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default function App() {
  const content = useSiteContent()
  const [selectedYear, setSelectedYear] = useState('All')
  const [selectedTheme, setSelectedTheme] = useState('All')

  const publications = useMemo(
    () => content.publications.map(normalizePublication),
    [content.publications],
  )

  useEffect(() => {
    const years = uniqueSortedYears(publications)
    const themes = uniqueThemes(publications)
    if (!years.includes(selectedYear)) {
      setSelectedYear('All')
    }
    if (!themes.includes(selectedTheme)) {
      setSelectedTheme('All')
    }
  }, [publications, selectedTheme, selectedYear])

  return (
    <div className="min-h-screen bg-slate-50 text-slate-950">
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-4">
          <a href="#about" className="text-left">
            <h1 className="text-lg font-semibold tracking-tight text-slate-950">{content.profile.name}</h1>
            <p className="text-sm text-slate-500">Urban Planning - Mobility - Accessibility</p>
          </a>
          <nav className="flex flex-wrap gap-2 md:gap-3" aria-label="Primary navigation">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-full px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-[#1E3A5F]"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <main>
        <HeroSection profile={content.profile} publicationCount={publications.length} researchCount={content.researchAreas.length} />
        <AboutDetails profile={content.profile} researchAreas={content.researchAreas} education={content.education} />
        <PublicationsSection
          publications={publications}
          selectedYear={selectedYear}
          setSelectedYear={setSelectedYear}
          selectedTheme={selectedTheme}
          setSelectedTheme={setSelectedTheme}
        />
        <ProjectsServicesSection projects={content.projects} services={content.services} />
        <AwardsSection awards={content.awards} />
      </main>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-8 text-sm text-slate-500 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} {content.profile.name}. Built with React, Vite, and GitHub Pages.</p>
          <a href={`mailto:${content.profile.email}`} className="hover:text-[#1E3A5F]">{content.profile.email}</a>
        </div>
      </footer>
    </div>
  )
}
