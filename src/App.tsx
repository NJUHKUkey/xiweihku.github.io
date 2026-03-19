import { useMemo, useState } from 'react'

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
    venue: 'Journal of Transport Geography',
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
  { key: 'about', label: 'About' },
  { key: 'publications', label: 'Publications' },
  { key: 'projects-services', label: 'Projects & Services' },
  { key: 'awards', label: 'Honors & Awards' },
] as const

type PageKey = (typeof navItems)[number]['key']

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
    <p className="mt-3 text-sm leading-7 text-neutral-600">
      {authors.map((author, index) => {
        const suffix = author.corresponding ? ' *' : ''
        return (
          <span key={`${author.name}-${index}`}>
            {index > 0 ? ', ' : ''}
            {author.highlight ? (
              <strong className="font-semibold text-neutral-900">{author.name}</strong>
            ) : (
              <span>{author.name}</span>
            )}
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
      <p className="text-sm uppercase tracking-[0.2em] text-neutral-500">{eyebrow}</p>
      <h2 className="mt-3 text-4xl font-semibold tracking-tight text-neutral-900">{title}</h2>
      {description ? <p className="mt-4 max-w-3xl text-base leading-7 text-neutral-600">{description}</p> : null}
    </div>
  )
}

function AboutPage() {
  const educationItems = [
    {
      school: 'The University of Hong Kong, Hong Kong SAR, China',
      degree: 'Ph.D in Urban Planning',
      supervisor: 'Supervisor: Prof. Jiangping Zhou',
      time: 'Sep. 2024 – present',
    },
    {
      school: 'Nanjing University, Nanjing, China',
      degree: 'M.Eng in Urban Planning',
      supervisor: 'Supervisor: Prof. Feng Zhen',
      time: 'Sep. 2021 – Jun. 2024',
    },
    {
      school: 'Nanjing University, Nanjing, China',
      degree: 'B.Eng in Urban and Rural Planning',
      supervisor: 'Supervisor: Prof. Guangliang Xi',
      time: 'Sep. 2016 – Jun. 2021',
    },
  ]

  const interests = ['Accessibility and Sustainable Mobility', 'Intercity Mobility and Regional Development']

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <SectionHeader
        eyebrow="About"
        title="About Me"
        description=" "
      />

      <div className="rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
        <div className="flex flex-col gap-6 md:flex-row md:items-start">
          <img
            src="/photo.jpg"
            alt="Xi Wei"
            className="h-36 w-36 shrink-0 rounded-full object-cover object-center ring-1 ring-neutral-200"
          />
          <div>
            <h3 className="text-3xl font-semibold tracking-tight text-neutral-900">Xi Wei</h3>
            <p className="mt-3 text-base leading-8 text-neutral-600">
              Department of Urban Planning and Design
              <br />
              The University of Hong Kong
            </p>
          </div>
        </div>
      </div>

      <div className="mt-10 space-y-10">
        <section>
          <div className="mb-4 border-b border-neutral-200 pb-4">
            <h3 className="text-2xl font-semibold tracking-tight text-neutral-900">Biography</h3>
          </div>
          <div className="rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
            <div className="space-y-5 text-base leading-8 text-neutral-700">
              <p>
                Xi Wei is a PhD candidate in the Department of Urban Planning and Design at The University of Hong Kong. He received his master's degree in Urban Planning from the School of Architecture and Urban Planning at Nanjing University in June 2024, and his bachelor's degree in Urban and Rural Planning from the School of Architecture and Urban Planning at Nanjing University in June 2021.
              </p>
              <p>
                His research focuses on two primary areas: X-minute cities and intercity mobility. By bridging the gap between cutting-edge technology and traditional planning principles, he is dedicated to informing future urban and regional planning policies that foster highly livable, inclusive, and efficient frameworks for transportation and community development.
              </p>
              <p>
                He has published several peer-reviewed papers and received multiple awards, including the National Scholarship awarded by the Ministry of Education of the PRC and the Chengyuan Cup Planning Decision-Support Model Competition prizes.
              </p>
            </div>
          </div>
        </section>

        <section>
          <div className="mb-4 border-b border-neutral-200 pb-4">
            <h3 className="text-2xl font-semibold tracking-tight text-neutral-900">Research Interests</h3>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {interests.map((item) => (
              <div
                key={item}
                className="rounded-3xl border border-neutral-200 bg-white px-6 py-8 text-center shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <p className="text-lg leading-8 text-neutral-800">{item}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <div className="mb-4 border-b border-neutral-200 pb-4">
            <h3 className="text-2xl font-semibold tracking-tight text-neutral-900">Education</h3>
          </div>
          <div className="space-y-4">
            {educationItems.map((edu) => (
              <div
                key={`${edu.school}-${edu.degree}`}
                className="rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <p className="text-lg font-semibold text-neutral-900">{edu.school}</p>
                <p className="mt-2 text-sm leading-7 text-neutral-600">{edu.degree}</p>
                <p className="text-sm leading-7 text-neutral-600">{edu.supervisor}</p>
                <p className="text-sm leading-7 text-neutral-600">{edu.time}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <div className="mb-4 border-b border-neutral-200 pb-4">
            <h3 className="text-2xl font-semibold tracking-tight text-neutral-900">Contact</h3>
          </div>
          <div className="rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
            <p className="text-base leading-8 text-neutral-700">Email: weixi1998@connect.hku.hk</p>
          </div>
        </section>
      </div>
    </div>
  )
}

function PublicationsPage({
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
    <div className="mx-auto max-w-6xl px-6 py-16">
      <SectionHeader
        eyebrow="Publications"
        title="Research Outputs"
        description=" "
      />

      <div className="mb-8 grid gap-4 rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-neutral-800">Filter by Year</label>
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="w-full rounded-2xl border border-neutral-300 bg-neutral-50 px-4 py-3 text-sm outline-none transition focus:border-neutral-500"
          >
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-neutral-800">Filter by Theme</label>
          <select
            value={selectedTheme}
            onChange={(e) => setSelectedTheme(e.target.value)}
            className="w-full rounded-2xl border border-neutral-300 bg-neutral-50 px-4 py-3 text-sm outline-none transition focus:border-neutral-500"
          >
            {themes.map((theme) => (
              <option key={theme} value={theme}>
                {theme}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="space-y-4">
        {filtered.map((pub) => (
          <div
            key={`${pub.title}-${pub.year}`}
            className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="max-w-4xl">
                <a
                  href={pub.link}
                  target="_blank"
                  rel="noreferrer"
                  className="text-lg font-medium text-neutral-900 underline decoration-neutral-300 underline-offset-4 transition hover:decoration-neutral-700"
                >
                  {pub.title}
                </a>
                <AuthorList authors={pub.authors} />
                <p className="mt-2 text-sm text-neutral-500">
                  {pub.venue} · {pub.year}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {pub.themes.map((theme) => (
                    <span
                      key={theme}
                      className="rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1 text-xs font-medium text-neutral-600"
                    >
                      {theme}
                    </span>
                  ))}
                </div>
              </div>
              <span className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-600">{pub.status}</span>
            </div>
          </div>
        ))}
      </div>

      <p className="mt-6 text-sm text-neutral-500">* Corresponding author</p>
    </div>
  )
}

function ProjectsServicesPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <SectionHeader
        eyebrow="Projects & Services"
        title="Grants, Projects, and Academic Service"
        description=" "
      />

      <section>
        <div className="mb-4 border-b border-neutral-200 pb-4">
          <h3 className="text-2xl font-semibold tracking-tight text-neutral-900">Research Grants</h3>
        </div>
        <div className="rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
          <p className="text-sm leading-7 text-neutral-600">Participatory role only (Non-PI status)</p>
        </div>
      </section>

      <section className="mt-10">
        <div className="mb-4 border-b border-neutral-200 pb-4">
          <h3 className="text-2xl font-semibold tracking-tight text-neutral-900">Projects</h3>
        </div>
        <div className="space-y-4">
          {projectItems.map((project) => (
            <div
              key={project.title}
              className="rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <p className="text-lg font-semibold leading-7 text-neutral-900">{project.title}</p>
              <p className="mt-2 text-sm leading-7 text-neutral-500">{project.time}</p>
              <p className="mt-3 text-sm leading-7 text-neutral-600">{project.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <div className="mb-4 border-b border-neutral-200 pb-4">
          <h3 className="text-2xl font-semibold tracking-tight text-neutral-900">Services</h3>
        </div>
        <div className="space-y-4">
          {services.map((service) => (
            <div
              key={`${service.role}-${service.organization}`}
              className="rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <p className="text-base font-semibold text-neutral-900">{service.role}</p>
              <p className="mt-2 text-sm leading-7 text-neutral-600">{service.organization}</p>
              <p className="text-sm leading-7 text-neutral-500">{service.time}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

function AwardsPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <SectionHeader
        eyebrow="Honors & Awards"
        title="Scholarships, prizes, and academic distinctions"
        description=" "
      />
      <div className="grid gap-4 md:grid-cols-2">
        {awards.map((award) => (
          <div
            key={award.name}
            className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            <p className="text-base font-semibold leading-7 text-neutral-900">{award.name}</p>
            <p className="mt-2 text-sm leading-7 text-neutral-500">{award.time}</p>
            <p className="text-sm leading-7 text-neutral-500">{award.grantor}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageKey>('about')
  const [selectedYear, setSelectedYear] = useState('All')
  const [selectedTheme, setSelectedTheme] = useState('All')

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900">
      <header className="sticky top-0 z-50 border-b border-neutral-200 bg-white/85 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-4">
          <button onClick={() => setCurrentPage('about')} className="text-left">
            <h1 className="text-lg font-semibold tracking-tight">Xi Wei</h1>
            <p className="text-sm text-neutral-500">Academic Website</p>
          </button>
          <nav className="flex flex-wrap gap-2 md:gap-3">
            {navItems.map((item) => {
              const active = currentPage === item.key
              return (
                <button
                  key={item.key}
                  onClick={() => setCurrentPage(item.key)}
                  className={`rounded-full px-4 py-2 text-sm transition duration-300 hover:shadow-md ${
                    active ? 'bg-neutral-900 text-white' : 'bg-white text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900'
                  }`}
                >
                  {item.label}
                </button>
              )
            })}
          </nav>
        </div>
      </header>

      <main>
        {currentPage === 'about' && <AboutPage />}
        {currentPage === 'publications' && (
          <PublicationsPage
            selectedYear={selectedYear}
            setSelectedYear={setSelectedYear}
            selectedTheme={selectedTheme}
            setSelectedTheme={setSelectedTheme}
          />
        )}
        {currentPage === 'projects-services' && <ProjectsServicesPage />}
        {currentPage === 'awards' && <AwardsPage />}
      </main>
    </div>
  )
}
