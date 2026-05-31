import {
  SiPython, SiDjango, SiPhp, SiLaravel, SiJavascript, SiReact,
  SiHtml5, SiCss, SiMysql, SiPostgresql, SiGit, SiGithub, SiDocker,
} from 'react-icons/si'
import { FaJava, FaNetworkWired } from 'react-icons/fa'
import { useFetch } from '../hooks/useFetch'
import SkillsSkeleton from '../components/skeletons/SkillsSkeleton'
import ErrorState from '../components/ErrorState'
import SectionHeader from '../components/SectionHeader'

const iconMap = {
  Python:     { icon: <SiPython />,     color: 'text-yellow-500' },
  Django:     { icon: <SiDjango />,     color: 'text-green-600'  },
  PHP:        { icon: <SiPhp />,        color: 'text-indigo-500' },
  Laravel:    { icon: <SiLaravel />,    color: 'text-red-500'    },
  Java:       { icon: <FaJava />,       color: 'text-orange-500' },
  JavaScript: { icon: <SiJavascript />, color: 'text-yellow-400' },
  React:      { icon: <SiReact />,      color: 'text-sky-400'    },
  HTML:       { icon: <SiHtml5 />,      color: 'text-orange-600' },
  CSS:        { icon: <SiCss />,        color: 'text-blue-500'   },
  MySQL:      { icon: <SiMysql />,      color: 'text-blue-700'   },
  PostgreSQL: { icon: <SiPostgresql />, color: 'text-blue-600'   },
  'REST API': { icon: <FaNetworkWired />, color: 'text-slate-500' },
  Git:        { icon: <SiGit />,        color: 'text-orange-600' },
  GitHub:     { icon: <SiGithub />,     color: 'text-slate-800 dark:text-white' },
  Docker:     { icon: <SiDocker />,     color: 'text-sky-500'    },
}

export default function Skills() {
  const { data, loading, error, retry } = useFetch('/api/skills/')

  return (
    <section className="section-padding pt-24">
      <div className="container-max">
        <SectionHeader
          title="Skills"
          subtitle="Kemampuan teknis dan non-teknis yang saya miliki."
        />

        {loading && <SkillsSkeleton />}
        {error   && <ErrorState message={error} onRetry={retry} />}
        {data    && (
          <div className="space-y-12 animate-fade-in">
            {/* Hard Skills */}
            <div>
              <h3 className="text-lg font-bold text-slate-700 dark:text-slate-200 mb-5 flex items-center gap-2">
                <span className="w-2 h-6 bg-primary-600 rounded-full inline-block" />
                Hard Skills
              </h3>
              <div className="flex flex-wrap gap-3">
                {data.hard_skills.map(skill => {
                  const meta = iconMap[skill.name]
                  return (
                    <div key={skill.name}
                      className="flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 hover:border-primary-400 dark:hover:border-primary-500 hover:shadow-md transition-all group">
                      {meta && (
                        <span className={`text-lg ${meta.color} group-hover:scale-110 transition-transform`}>
                          {meta.icon}
                        </span>
                      )}
                      <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
                        {skill.name}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Soft Skills */}
            <div>
              <h3 className="text-lg font-bold text-slate-700 dark:text-slate-200 mb-5 flex items-center gap-2">
                <span className="w-2 h-6 bg-primary-600 rounded-full inline-block" />
                Soft Skills
              </h3>
              <div className="flex flex-wrap gap-3">
                {data.soft_skills.map(skill => (
                  <span key={skill}
                    className="px-4 py-2 bg-primary-50 dark:bg-primary-700/20 text-primary-700 dark:text-primary-300 rounded-full text-sm font-medium border border-primary-100 dark:border-primary-700/40">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
