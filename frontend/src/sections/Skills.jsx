import { useState } from 'react'
import {
  SiPython, SiDjango, SiPhp, SiLaravel, SiJavascript, SiReact,
  SiHtml5, SiCss, SiMysql, SiPostgresql, SiGit, SiGithub, SiDocker,
  SiScikitlearn, SiOpencv,
} from 'react-icons/si'
import { FaJava, FaNetworkWired, FaBrain, FaChartBar } from 'react-icons/fa'
import { HiChip, HiCode, HiCog } from 'react-icons/hi'
import { useFetch } from '../hooks/useFetch'
import ErrorState from '../components/ErrorState'
import { useScrollReveal } from '../hooks/useScrollReveal'

const ICON_MAP = {
  Python:            { Icon: SiPython,       color: '#3b82f6', bg: 'from-blue-500/20 to-blue-600/5'        },
  'Machine Learning':{ Icon: FaBrain,        color: '#a78bfa', bg: 'from-violet-500/20 to-violet-600/5'    },
  OpenCV:            { Icon: SiOpencv,       color: '#10b981', bg: 'from-emerald-500/20 to-emerald-600/5'  },
  'Data Analysis':   { Icon: FaChartBar,     color: '#38bdf8', bg: 'from-sky-500/20 to-sky-600/5'         },
  'Scikit-learn':    { Icon: SiScikitlearn,  color: '#f97316', bg: 'from-orange-500/20 to-orange-600/5'   },
  Django:            { Icon: SiDjango,       color: '#10b981', bg: 'from-emerald-500/20 to-emerald-600/5' },
  PHP:               { Icon: SiPhp,          color: '#818cf8', bg: 'from-indigo-400/20 to-indigo-600/5'   },
  Laravel:           { Icon: SiLaravel,      color: '#f43f5e', bg: 'from-rose-500/20 to-rose-600/5'       },
  React:             { Icon: SiReact,        color: '#38bdf8', bg: 'from-sky-400/20 to-sky-600/5'         },
  JavaScript:        { Icon: SiJavascript,   color: '#eab308', bg: 'from-yellow-400/20 to-yellow-600/5'   },
  HTML:              { Icon: SiHtml5,        color: '#f97316', bg: 'from-orange-500/20 to-orange-600/5'   },
  CSS:               { Icon: SiCss,          color: '#3b82f6', bg: 'from-blue-500/20 to-blue-600/5'       },
  Java:              { Icon: FaJava,         color: '#f97316', bg: 'from-orange-500/20 to-orange-600/5'   },
  MySQL:             { Icon: SiMysql,        color: '#38bdf8', bg: 'from-sky-500/20 to-sky-600/5'         },
  PostgreSQL:        { Icon: SiPostgresql,   color: '#6366f1', bg: 'from-indigo-500/20 to-indigo-600/5'   },
  'REST API':        { Icon: FaNetworkWired, color: '#a78bfa', bg: 'from-violet-400/20 to-violet-600/5'   },
  Git:               { Icon: SiGit,          color: '#f97316', bg: 'from-orange-500/20 to-orange-600/5'   },
  GitHub:            { Icon: SiGithub,       color: '#94a3b8', bg: 'from-slate-400/20 to-slate-600/5'     },
  Docker:            { Icon: SiDocker,       color: '#38bdf8', bg: 'from-sky-400/20 to-sky-600/5'         },
}

const CATEGORIES = [
  {
    key: 'ai',
    label: 'AI & Machine Learning',
    icon: <HiChip size={15} />,
    gradient: 'from-violet-500 to-indigo-600',
    glow: 'shadow-[0_0_20px_rgba(139,92,246,0.3)]',
    desc: 'Tools & libraries untuk AI/ML',
  },
  {
    key: 'web',
    label: 'Web Development',
    icon: <HiCode size={15} />,
    gradient: 'from-sky-500 to-indigo-600',
    glow: 'shadow-[0_0_20px_rgba(56,189,248,0.3)]',
    desc: 'Framework & bahasa pemrograman web',
  },
  {
    key: 'tools',
    label: 'Database & DevOps',
    icon: <HiCog size={15} />,
    gradient: 'from-emerald-500 to-teal-600',
    glow: 'shadow-[0_0_20px_rgba(16,185,129,0.3)]',
    desc: 'Database, version control, & tools',
  },
]

const SOFT_STYLES = [
  'border-indigo-500/30 text-indigo-500 dark:text-indigo-400 bg-indigo-500/5',
  'border-violet-500/30 text-violet-500 dark:text-violet-400 bg-violet-500/5',
  'border-sky-500/30 text-sky-500 dark:text-sky-400 bg-sky-500/5',
  'border-emerald-500/30 text-emerald-500 dark:text-emerald-400 bg-emerald-500/5',
  'border-rose-500/30 text-rose-500 dark:text-rose-400 bg-rose-500/5',
  'border-amber-500/30 text-amber-500 dark:text-amber-400 bg-amber-500/5',
]

function SkillCard({ skill }) {
  const meta = ICON_MAP[skill.name]
  const Icon = meta?.Icon
  return (
    <div className="group glass-hover flex flex-col items-center gap-3 p-4 cursor-default
      hover:shadow-[0_0_25px_rgba(99,102,241,0.15)] hover:-translate-y-1.5 transition-all duration-300">
      {Icon && (
        <div className={`p-3 rounded-xl bg-gradient-to-br ${meta.bg}
          group-hover:scale-110 transition-transform duration-300`}>
          <Icon size={22} style={{ color: meta.color }} />
        </div>
      )}
      <span className="text-[11px] font-semibold text-slate-600 dark:text-slate-300 text-center leading-tight">
        {skill.name}
      </span>
    </div>
  )
}

export default function Skills() {
  const { data, loading, error, retry } = useFetch('/data/skills.json')
  const [activeTab, setActiveTab] = useState('ai')
  const ref = useScrollReveal()

  const activeCategory = CATEGORIES.find(c => c.key === activeTab)
  const filteredSkills = data?.hard_skills?.filter(s => s.category === activeTab) ?? []

  return (
    <section id="skills" className="section-wrap relative overflow-hidden">
      <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[120px] -z-10" />

      <div className="container-max" ref={ref}>

        {/* Header */}
        <div className="text-center mb-14 reveal">
          <div className="flex items-center justify-center gap-2 mb-3">
            <div className="h-px flex-1 max-w-[60px] bg-gradient-to-r from-transparent to-indigo-500/50" />
            <span className="section-tag">01 — Skills</span>
            <div className="h-px flex-1 max-w-[60px] bg-gradient-to-l from-transparent to-indigo-500/50" />
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-slate-800 dark:text-white">
            Tech <span className="gradient-text">Stack</span>
          </h2>
          <p className="mt-3 text-slate-500 dark:text-slate-400 text-sm font-mono">
            <span className="text-indigo-400">const</span> skills <span className="text-violet-400">=</span>{' '}
            <span className="text-cyan-400">['AI', 'Web', 'DevOps']</span>
          </p>
        </div>

        {/* Category tabs */}
        <div className="reveal flex flex-col sm:flex-row justify-center gap-3 mb-10">
          {CATEGORIES.map(cat => (
            <button key={cat.key} onClick={() => setActiveTab(cat.key)}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
                activeTab === cat.key
                  ? `bg-gradient-to-r ${cat.gradient} text-white ${cat.glow}`
                  : 'glass-hover text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
              }`}>
              {cat.icon}
              {cat.label}
            </button>
          ))}
        </div>

        {loading && (
          <div className="animate-pulse grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-4">
            {Array.from({ length: 8 }).map((_, i) => <div key={i} className="h-24 rounded-2xl bg-white/[0.06]" />)}
          </div>
        )}
        {error && <ErrorState message={error} onRetry={retry} />}

        {data && (
          <>
            {/* Category description */}
            <p className="reveal text-center text-xs text-slate-400 dark:text-slate-500 font-mono mb-6">
              <span className="text-emerald-400">// </span>{activeCategory?.desc}
            </p>

            {/* Skill cards */}
            <div className="reveal grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 min-h-[160px]">
              {filteredSkills.map(skill => <SkillCard key={skill.name} skill={skill} />)}
            </div>

            {/* Soft skills */}
            <div className="reveal mt-14">
              <p className="text-center text-xs font-mono text-slate-400 dark:text-slate-500 mb-6">
                <span className="text-emerald-400">// </span>soft skills — non-technical
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                {data.soft_skills.map((s, i) => (
                  <span key={s}
                    className={`px-5 py-2.5 rounded-2xl text-sm font-semibold border ${SOFT_STYLES[i % SOFT_STYLES.length]}
                      hover:-translate-y-1 transition-transform duration-200 cursor-default`}>
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  )
}
