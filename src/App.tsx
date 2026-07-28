import { useMemo, useState, type ReactNode } from 'react'

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

const publications: Publication[] = [
  {
    title:
      'Measuring food accessibility using walkability-integrated gaussian two-step floating catchment area method: A case study of Nanjing, China',
    link: 'https://www.sciencedirect.com/science/article/pii/S0966692326000840',
    authors: [
      { name: 'Yu Kong', highlight: false, corresponding: false },
      { name: 'Xi Wei', highlight: true, corresponding: true },
      { name: 'Feng Zhen', highlight: false, corresponding: false },
      { name: 'Shanqi Zhang', highlight: false, corresponding: false },
    ],
    venue: 'Journal of Transport Geography',
    year: '2026',
    themes: ['Accessibility', 'Street view'],
    status: 'Published',
  },
  {
    title:
      'The impact of inter-city railway connections on urban expansion: a heterogeneous perspective based on types and regional structures',
    link: 'https://www.nature.com/articles/s44333-025-00053-5',
    authors: [
      { name: 'Xi Wei', highlight: true, corresponding: false },
      { name: 'Feng Zhen', highlight: false, corresponding: true },
    ],
    venue: 'npj Sustainable Mobility and Transport',
    year: '2025',
    themes: ['Inter-city Travel', 'Urban development'],
    status: 'Published',
  },
  {
    title: '多层级公共服务设施对北京市住房租金的空间异质性影响',
    link: 'https://kns.cnki.net/kcms2/article/abstract?v=FCWB7knoBeTRWA2pShBpCME6qLSNSqaN6yFrY8YzzYjEdzWMKBicqxDYy5SeBy7eJj6uC5PQpnEaQJcYXJFpQ1xTfTT78NWCZQULF8hrVgC0O8vHV8jM_l6aHBiPn4nVWgf5GgJNdduCxOW1JKGyo0MUhKZX-0Sk4ozqVDyw7-eHN1pNjNprnQ==&uniplatform=NZKPT&language=CHS',
    authors: [
      { name: '申犁帆', highlight: false, corresponding: false },
      { name: '龙雨', highlight: false, corresponding: false },
      { name: '魏玺', highlight: true, corresponding: true },
      { name: '杨红', highlight: false, corresponding: false },
    ],
    venue: '中国土地科学',
    year: '2025',
    themes: ['Housing Price'],
    status: 'Published',
  },
  {
    title: '江苏省数字经济高质量发展的空间格局及影响要素',
    link: 'https://kns.cnki.net/kcms2/article/abstract?v=FCWB7knoBeQFtOqv8EE2kRZQaJ8sze-BjB7Y6lbB8LoaZvvGpfTFktGTTeQUVSfOOiNnURvDpqDA-ArjUUzlxpJyFMvPlxNlrJnYMjsz1ToxfoDBDA17O1mhEalz4r-5Nd9_o-opEhDqoRuC2nCawULXwjycmn30atob66uUfeM=&uniplatform=NZKPT',
    authors: [
      { name: '姚冲', highlight: false, corresponding: false },
      { name: '甄峰', highlight: false, corresponding: true },
      { name: '席广亮', highlight: false, corresponding: false },
      { name: '魏玺', highlight: true, corresponding: false },
      { name: '肖徐玏', highlight: false, corresponding: false },
    ],
    venue: '资源科学',
    year: '2025',
    themes: ['ICT', 'Urban development'],
    status: 'Published',
  },
  {
    title: '西方平台城市主义的兴起及对我国未来城市发展的影响',
    link: 'https://kns.cnki.net/kcms2/article/abstract?v=FCWB7knoBeQWXVajNUcXapsm6nDWMAbtd9BDdYeJ2xEUys8TGPSKhUmn8JpdmCXXDAyA7TRu4bM7O8uIaJdYpd9TciPh5Kj97gbooyHmlfRRp8jMYSyehRDF5BRlfS8_eKLARZxzsqiZ1Ffw3WrUfHa__A5XELLeHgZZROV57-Y=&uniplatform=NZKPT',
    authors: [
      { name: '孔宇', highlight: false, corresponding: false },
      { name: '甄峰', highlight: false, corresponding: true },
      { name: '张姗琪', highlight: false, corresponding: false },
      { name: '魏玺', highlight: true, corresponding: false },
    ],
    venue: '国际城市规划',
    year: '2025',
    themes: ['Platform Urbanism'],
    status: 'Published',
  },
  {
    title: '南京都市圈跨市日常人口流动影响因素及其空间效应研究',
    link: 'https://kns.cnki.net/kcms2/article/abstract?v=FCWB7knoBeQNZwxz-mR7fppOwzCzXprYtbfYA1-YzgkAsuAjzK24-AFafK9Y3WE1JtpnWT7AHVX7Td03jfYXtj0n9_ESuuln39KXkf0OT7EUvydlPnEthr4wjExZQiQ8XGk3rrzIyuC7JO40vuH0qAs5VH3FlNT8RAdhZ3AVW-Q=&uniplatform=NZKPT',
    authors: [
      { name: '魏玺', highlight: true, corresponding: false },
      { name: '甄峰', highlight: false, corresponding: true },
      { name: '席广亮', highlight: false, corresponding: false },
      { name: '肖徐玏', highlight: false, corresponding: false },
    ],
    venue: '现代城市研究',
    year: '2024',
    themes: ['Inter-city Travel', 'Travel behavior mechanism'],
    status: 'Published',
  },
  {
    title: '南京都市圈居民非通勤出行特征及其影响因素研究',
    link: 'https://kns.cnki.net/kcms2/article/abstract?v=FCWB7knoBeToDRz6ylcqMAr7re_HtdORz51quy0_6XzYJVgZMAQ9JiW6H2u6h9YGnZufpmWsfjAxdfghVYXDMj7JiTRnpA1cwuWR6Udr5rHNzP9MXPmJ9uQ1fcjhg_sPwrDqT1gspQ9W-YONbAiNnKqUzEVnch5g_uv4ERr-csU=&uniplatform=NZKPT',
    authors: [
      { name: '魏玺', highlight: true, corresponding: false },
      { name: '甄峰', highlight: false, corresponding: true },
      { name: '席广亮', highlight: false, corresponding: false },
    ],
    venue: '地理科学',
    year: '2023',
    themes: ['Inter-city Travel', 'Travel behavior mechanism'],
    status: 'Published',
  },
  {
    title: '社区智慧治理技术框架构建研究',
    link: 'https://kns.cnki.net/kcms2/article/abstract?v=FCWB7knoBeQrdFFoqEBf7dwUO3c4BzrVOri7ex8Aq7VvFJPF-kpSgbTFblxb-ioJv_fjjmog_yj6jG-VvAL9Y-aDfy3X8fdNUhjI1aPSZ9SiWLutu5LiC1BZdeU7mkD78ff7zI8XPMSKCe2wq6bv8jerq65ThUvnfAET58ATTxg=&uniplatform=NZKPT',
    authors: [
      { name: '魏玺', highlight: true, corresponding: false },
      { name: '甄峰', highlight: false, corresponding: true },
      { name: '孔宇', highlight: false, corresponding: false },
    ],
    venue: '规划师',
    year: '2023',
    themes: ['ICT', 'Community Governance'],
    status: 'Published',
  },
  {
    title: '城市新市民就业空间分异及其影响因素——以江苏省常熟市为例',
    link: 'https://kns.cnki.net/kcms2/article/abstract?v=FCWB7knoBeQV1fJPZJQ3E5H7n62Ihxjh51a4G70jJL5a6ejCPvDBpw19bgqJzlJTeKzxB9tcpUhw9yq6jrttvi7KTmYoZAhg5J2LOYs6UVbfOYsEw86Py8wO7s5YdHLnFE7Gla-FhjGqValmAXcApGwWcg4b3fxIC6LyUGPUIgE=&uniplatform=NZKPT',
    authors: [
      { name: '肖徐玏', highlight: false, corresponding: false },
      { name: '甄峰', highlight: false, corresponding: true },
      { name: '秦萧', highlight: false, corresponding: false },
      { name: '李智轩', highlight: false, corresponding: false },
      { name: '魏玺', highlight: true, corresponding: false },
    ],
    venue: '经济地理',
    year: '2023',
    themes: ['New-type urbanization', 'Employment Distribution'],
    status: 'Published',
  },
  {
    title: '商业体系与实际服务人口流动性耦合关系研究——以南京都市圈为例',
    link: 'https://kns.cnki.net/kcms2/article/abstract?v=FCWB7knoBeTu4mnGYKuf1Ttq9ASJM7zWKBTO-1bFIcIIpjtV4Ocxijjjl69qvrrQX0TI_iW4IRdnEw2jmFHM949DQdS5HUSf93yOYgA3Kgt00cgAaLpSnmI2C2LDBRXoxRCdFRfG2MFy7T559ol-2qhWjB5Rb9mDZ0z46bkWKp0=&uniplatform=NZKPT',
    authors: [
      { name: '魏玺', highlight: true, corresponding: false },
      { name: '席广亮', highlight: false, corresponding: true },
      { name: '甄峰', highlight: false, corresponding: false },
    ],
    venue: '经济地理',
    year: '2022',
    themes: ['Inter-city Travel', 'Urban Development'],
    status: 'Published',
  },
]

const services: ServiceItem[] = [
  {
    role: 'Student Fellow',
    organization: 'HKU Institute of Transport Studies',
    time: 'since 2024',
  },
]

const awards: Award[] = [
  {
    name: 'National Scholarship for Postgraduates',
    grantor: 'Ministry of Education, China',
    time: '2022, 2023',
  },
  {
    name: 'Excellent Postgraduates Pacesetter',
    grantor: 'Nanjing University, China',
    time: '2022',
  },
  {
    name: 'Scholarship of Academic Excellence for Postgraduates, First Level',
    grantor: 'Nanjing University, China',
    time: '2021, 2022, 2023',
  },
  {
    name: 'The 12th YuanYe Awards Competition, Third Prize',
    grantor:
      'Topic: The commercial spatial pattern in Nanjing metropolitan area from the perspective of mobility',
    time: '2021',
  },
  {
    name: 'The 6th Planning Decision Support Model Design Contest – Chengyuan Cup, Excellence Prize',
    grantor:
      'Topic: Evaluation and prediction model of neighborhood service facilities from the perspective of online-offline integration',
    time: '2022',
  },
  {
    name: 'The 6th Planning Decision Support Model Design Contest – Chengyuan Cup, Second Prize',
    grantor:
      'Topic: Identification and characteristics of cross border areas in Nanjing metropolitan area from the perspective of pedestrian flow network',
    time: '2022',
  },
]

const projectItems: ProjectItem[] = [
  {
    title: 'The Plan for the Development of Commercial Facility, Xuzhou',
    time: 'Oct. 2022 – Oct. 2023',
    description:
      'Allocated to summarize the current issues, and plan for city-level commercial centers and sub-city-level commercial centers.',
  },
  {
    title: 'The Plan for the Development of Industry in Xincheng Town, Yizheng',
    time: 'Jan. 2022 – Nov. 2022',
    description: 'Allocated to summarize the current development status and issues.',
  },
  {
    title: 'The Master Plan for the Construction of Beautiful Lianyungang, Lianyungang',
    time: 'Apr. 2021 – Nov. 2022',
    description:
      'Allocated to summarize the current development status and issues, and plan for culture and tourism development.',
  },
  {
    title: 'The Construction of Dynamic Perception Model for Urban Physical Examination, Changzhou',
    time: 'Jun. 2021 – Sep. 2022',
    description:
      'Allocated to build and calculate an indicator system. Specifically responsible for modules such as urban resilience assessment, smart city construction assessment, and ecological environment protection assessment.',
  },
  {
    title: 'The Plan for Regional Collaboration and Industrial Development in Longshan Town, Yizheng',
    time: 'Nov. 2021 – Jun. 2022',
    description:
      'Allocated to summarize the current development status and issues, and develop regional integration development strategies.',
  },
  {
    title: 'The 14th Five Year Plan for the Development of Food Industry, Yancheng',
    time: 'Apr. 2021 – Jun. 2022',
    description:
      'Allocated to summarize the current development status and issues, and plan the spatial layout of the food industry.',
  },
  {
    title: 'The Construction of Intelligent Brain Platform, Changshu',
    time: 'Nov. 2020 – Nov. 2021',
    description:
      'Allocated to complete the content of population diagnosis, including four parts: population basic information management, population spatial distribution analysis, population mobility characteristics analysis, and special group management.',
  },
  {
    title: 'The 14th Five Year Plan in Dafeng District, Yancheng',
    time: 'Nov. 2020 – Jan. 2021',
    description: 'Allocated to complete the framework and content of the social governance section.',
  },
]

const navItems = [
  { href: '#about', label: 'About' },
  { href: '#publications', label: 'Publications' },
  { href: '#projects-services', label: 'Projects & Services' },
  { href: '#awards', label: 'Honors & Awards' },
]

const researchAreas = [
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
]

const educationItems = [
  {
    school: 'The University of Hong Kong, Hong Kong SAR, China',
    degree: 'Ph.D. in Urban Planning',
    supervisor: 'Supervisor: Prof. Jiangping Zhou',
    time: 'Sep. 2024 – present',
  },
  {
    school: 'Nanjing University, Nanjing, China',
    degree: 'M.Eng. in Urban Planning',
    supervisor: 'Supervisor: Prof. Feng Zhen',
    time: 'Sep. 2021 – Jun. 2024',
  },
  {
    school: 'Nanjing University, Nanjing, China',
    degree: 'B.Eng. in Urban and Rural Planning',
    supervisor: 'Supervisor: Prof. Guangliang Xi',
    time: 'Sep. 2016 – Jun. 2021',
  },
]

function uniqueSortedYears(items: Publication[]) {
  return ['All', ...Array.from(new Set(items.map((p) => p.year))).sort((a, b) => Number(b) - Number(a))]
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

function HeroSection() {
  return (
    <section id="about" className="relative overflow-hidden border-b border-slate-200 bg-[radial-gradient(circle_at_top_left,_#dbeafe,_transparent_34%),linear-gradient(135deg,_#f8fafc_0%,_#eef2f7_100%)]">
      <div className="absolute right-[-8rem] top-[-8rem] h-80 w-80 rounded-full bg-[#8B1E3F]/10 blur-3xl" />
      <div className="absolute bottom-[-12rem] left-[-8rem] h-96 w-96 rounded-full bg-[#1E3A5F]/10 blur-3xl" />

      <div className="relative mx-auto grid max-w-6xl gap-12 px-6 py-20 md:grid-cols-[1.08fr_0.92fr] md:items-center md:py-24">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#8B1E3F]">Academic Website</p>
          <h1 className="mt-5 text-5xl font-semibold tracking-tight text-slate-950 md:text-7xl">Xi Wei</h1>
          <p className="mt-5 max-w-2xl text-xl leading-9 text-slate-700">
            PhD Candidate in Urban Planning at The University of Hong Kong, studying intercity mobility, activity spaces, accessibility, and climate-adaptive community life circles.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <LinkButton href="mailto:weixi1998@connect.hku.hk" variant="primary">Email</LinkButton>
            <LinkButton href="https://github.com/xiweihku">GitHub</LinkButton>
            <LinkButton href="#publications">Publications</LinkButton>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            <StatCard value={`${publications.length}+`} label="Publications and research outputs" />
            <StatCard value="HKU" label="Department of Urban Planning and Design" />
            <StatCard value="2" label="Core research themes" />
          </div>
        </div>

        <div className="rounded-[2rem] border border-white/70 bg-white/80 p-6 shadow-2xl shadow-slate-200/70 backdrop-blur">
          <img
            src="/photo.jpg"
            alt="Xi Wei"
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

function AboutDetails() {
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
          <p>
            Xi Wei is a PhD candidate in the Department of Urban Planning and Design at The University of Hong Kong. He received his master's degree in Urban Planning from Nanjing University in June 2024 and his bachelor's degree in Urban and Rural Planning from Nanjing University in June 2021.
          </p>
          <p>
            His research focuses on intercity mobility, X-minute cities, activity spaces, accessibility, and urban spatial restructuring. By combining mobile phone data, geospatial analytics, and urban planning theory, his work aims to inform more inclusive, efficient, and climate-resilient urban and regional planning.
          </p>
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
            {educationItems.map((edu) => (
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
            <a className="mt-3 block text-base font-medium text-slate-950 underline decoration-slate-300 underline-offset-4 hover:decoration-[#1E3A5F]" href="mailto:weixi1998@connect.hku.hk">
              weixi1998@connect.hku.hk
            </a>
            <p className="mt-6 text-sm font-semibold uppercase tracking-[0.18em] text-[#8B1E3F]">Location</p>
            <p className="mt-3 text-base leading-7 text-slate-700">Hong Kong SAR, China</p>
          </div>
        </section>
      </div>
    </section>
  )
}

function PublicationsSection({
  selectedYear,
  setSelectedYear,
  selectedTheme,
  setSelectedTheme,
}: {
  selectedYear: string
  setSelectedYear: (value: string) => void
  selectedTheme: string
  setSelectedTheme: (value: string) => void
}) {
  const years = uniqueSortedYears(publications)
  const themes = uniqueThemes(publications)
  const filtered = useMemo(() => filterPublications(publications, selectedYear, selectedTheme), [selectedYear, selectedTheme])

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
              onChange={(e) => setSelectedYear(e.target.value)}
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
              onChange={(e) => setSelectedTheme(e.target.value)}
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
                  <p className="mt-2 text-sm text-slate-500"><span className="italic">{pub.venue}</span> · {pub.year}</p>
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

function ProjectsServicesSection() {
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
            {projectItems.map((project) => (
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

function AwardsSection() {
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
  const [selectedYear, setSelectedYear] = useState('All')
  const [selectedTheme, setSelectedTheme] = useState('All')

  return (
    <div className="min-h-screen bg-slate-50 text-slate-950">
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-4">
          <a href="#about" className="text-left">
            <h1 className="text-lg font-semibold tracking-tight text-slate-950">Xi Wei</h1>
            <p className="text-sm text-slate-500">Urban Planning · Mobility · Accessibility</p>
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
        <HeroSection />
        <AboutDetails />
        <PublicationsSection
          selectedYear={selectedYear}
          setSelectedYear={setSelectedYear}
          selectedTheme={selectedTheme}
          setSelectedTheme={setSelectedTheme}
        />
        <ProjectsServicesSection />
        <AwardsSection />
      </main>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-8 text-sm text-slate-500 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Xi Wei. Built with React, Vite, and GitHub Pages.</p>
          <a href="mailto:weixi1998@connect.hku.hk" className="hover:text-[#1E3A5F]">weixi1998@connect.hku.hk</a>
        </div>
      </footer>
    </div>
  )
}
