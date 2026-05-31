import { FaGithub } from 'react-icons/fa'
import { HiCalendar, HiPhotograph } from 'react-icons/hi'
import { useFetch } from '../hooks/useFetch'
import CardSkeleton from '../components/skeletons/CardSkeleton'
import ErrorState from '../components/ErrorState'
import SectionHeader from '../components/SectionHeader'

function ProjectCard({ project }) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col">
      {/* Image */}
      <div className="relative h-44 bg-slate-100 dark:bg-slate-700 overflow-hidden">
        {project.image ? (
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
            onError={e => { e.currentTarget.style.display = 'none'; e.currentTarget.nextElementSibling.style.display = 'flex' }}
          />
        ) : null}
        <div className="absolute inset-0 hidden items-center justify-center text-slate-400 dark:text-slate-500 flex-col gap-2">
          <HiPhotograph size={36} />
          <span className="text-xs">Screenshot tidak tersedia</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-bold text-slate-800 dark:text-white text-base leading-snug">{project.title}</h3>
          <span className="flex items-center gap-1 text-xs text-slate-400 dark:text-slate-500 shrink-0">
            <HiCalendar size={13} />{project.year}
          </span>
        </div>
        <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed flex-1">{project.description}</p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-1.5 mt-4">
          {project.technologies.map(tech => (
            <span key={tech}
              className="px-2.5 py-1 text-xs font-medium bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-lg">
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function Projects() {
  const { data, loading, error, retry } = useFetch('/api/projects/')

  return (
    <section className="section-padding pt-24">
      <div className="container-max">
        <SectionHeader
          title="Academic Projects"
          subtitle="Proyek akademik dan proyek pribadi yang telah saya kerjakan."
        />

        {loading && <CardSkeleton count={4} />}
        {error   && <ErrorState message={error} onRetry={retry} />}
        {data?.projects && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 animate-fade-in">
            {data.projects.map(project => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
        {data?.projects?.length === 0 && (
          <p className="text-center text-slate-400 py-12">Belum ada proyek tersedia.</p>
        )}
      </div>
    </section>
  )
}
