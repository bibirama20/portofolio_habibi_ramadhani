import { HiCalendar, HiPhotograph, HiBriefcase, HiAcademicCap, HiSparkles } from 'react-icons/hi'
import { useFetch } from '../hooks/useFetch'
import ErrorState from '../components/ErrorState'
import { useScrollReveal } from '../hooks/useScrollReveal'

const PROJECT_TYPES = {
  Akademik: { icon: HiAcademicCap, badgeClass: 'bg-indigo-600/80' },
  Magang:   { icon: HiBriefcase,   badgeClass: 'bg-emerald-600/80' },
  Personal: { icon: HiSparkles,    badgeClass: 'bg-amber-600/80' },
}

function ProjectCard({ project, delay = 0 }) {
  const typeInfo = PROJECT_TYPES[project.type]

  return (
    <div className="reveal group glass-hover overflow-hidden flex flex-col
      hover:shadow-[0_8px_40px_rgba(99,102,241,0.2)] hover:-translate-y-2 transition-all duration-400"
      style={{ transitionDelay: `${delay}ms` }}>

      {/* Image */}
      <div className="relative h-48 overflow-hidden bg-slate-100 dark:bg-slate-800/50">
        <img src={project.image} alt={project.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={e => { e.currentTarget.style.display = 'none'; e.currentTarget.nextElementSibling.style.display = 'flex' }} />
        <div className="absolute inset-0 hidden items-center justify-center flex-col gap-2 text-slate-400 dark:text-slate-600">
          <HiPhotograph size={40} /><span className="text-xs font-medium">Screenshot</span>
        </div>
        {/* Dark overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {typeInfo && (
          <span className={`absolute top-3 left-3 flex items-center gap-1 px-2 py-1 rounded-lg
            backdrop-blur-sm text-white text-[10px] font-semibold ${typeInfo.badgeClass}`}>
            <typeInfo.icon size={10} /> {project.type}
          </span>
        )}

        <span className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 rounded-lg
          bg-black/50 backdrop-blur-sm text-white text-[10px] font-semibold">
          <HiCalendar size={10} /> {project.year}
        </span>
      </div>

      {/* Gradient top accent on hover */}
      <div className="h-[2px] bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-bold text-base text-slate-800 dark:text-white mb-2
          group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
          {project.title}
        </h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed flex-1">
          {project.description}
        </p>

        {/* Tech badges */}
        <div className="flex flex-wrap gap-1.5 mt-4">
          {project.technologies.map(tech => (
            <span key={tech}
              className="px-2.5 py-1 text-[11px] font-semibold rounded-lg
                bg-indigo-50 dark:bg-indigo-500/[0.08] text-indigo-600 dark:text-indigo-400
                border border-indigo-100 dark:border-indigo-500/20">
              {tech}
            </span>
          ))}
        </div>

      </div>
    </div>
  )
}

export default function Projects() {
  const { data, loading, error, retry } = useFetch('/data/projects.json')
  const ref = useScrollReveal()

  return (
    <section id="projects" className="section-wrap relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-fuchsia-500/10 rounded-full blur-[120px] -z-10" />

      <div className="container-max" ref={ref}>
        <div className="text-center mb-14 reveal">
          <div className="flex items-center justify-center gap-2 mb-3">
            <div className="h-px flex-1 max-w-[60px] bg-gradient-to-r from-transparent to-indigo-500/50" />
            <span className="section-tag">02 — Projects</span>
            <div className="h-px flex-1 max-w-[60px] bg-gradient-to-l from-transparent to-indigo-500/50" />
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-slate-800 dark:text-white">
            My <span className="gradient-text">Projects</span>
          </h2>
          <p className="mt-3 text-slate-500 dark:text-slate-400 text-sm">
            Proyek akademik, magang, &amp; personal.
          </p>
        </div>

        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 animate-pulse">
            {[1,2,3,4].map(i => <div key={i} className="h-80 rounded-2xl bg-white/[0.05]" />)}
          </div>
        )}
        {error && <ErrorState message={error} onRetry={retry} />}

        {Array.isArray(data) && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {data.map((p, i) => <ProjectCard key={p.id} project={p} delay={i * 80} />)}
          </div>
        )}
      </div>
    </section>
  )
}
