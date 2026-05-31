import { HiAcademicCap, HiCalendar } from 'react-icons/hi'
import { useFetch } from '../hooks/useFetch'
import TimelineSkeleton from '../components/skeletons/TimelineSkeleton'
import ErrorState from '../components/ErrorState'
import SectionHeader from '../components/SectionHeader'

export default function Education() {
  const { data, loading, error, retry } = useFetch('/api/education/')

  return (
    <section className="section-padding pt-24">
      <div className="container-max max-w-3xl">
        <SectionHeader
          title="Education"
          subtitle="Riwayat pendidikan formal yang telah saya tempuh."
        />

        {loading && <TimelineSkeleton count={2} />}
        {error   && <ErrorState message={error} onRetry={retry} />}
        {data?.education && (
          <div className="relative animate-fade-in">
            {/* Vertical line */}
            <div className="absolute left-4 top-0 bottom-0 w-px bg-slate-200 dark:bg-slate-700" />

            <div className="space-y-0">
              {data.education.map((edu, idx) => (
                <div key={edu.id} className="relative flex gap-6 pb-10 last:pb-0">
                  {/* Dot */}
                  <div className="relative z-10 flex-shrink-0 w-8 h-8 rounded-full bg-primary-600 flex items-center justify-center shadow-md shadow-primary-600/30 mt-1">
                    <HiAcademicCap size={16} className="text-white" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 p-5 hover:shadow-md transition-shadow">
                    <h3 className="font-bold text-slate-800 dark:text-white text-lg">{edu.institution}</h3>
                    <p className="text-primary-600 dark:text-primary-400 font-medium mt-0.5">{edu.major}</p>
                    <div className="flex items-center gap-1.5 text-sm text-slate-400 dark:text-slate-500 mt-2">
                      <HiCalendar size={14} />
                      <span>{edu.start_year} – {edu.end_year ?? 'Sekarang'}</span>
                    </div>
                    {edu.description && (
                      <p className="mt-3 text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                        {edu.description}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {data?.education?.length === 0 && (
          <p className="text-center text-slate-400 py-12">Belum ada data pendidikan.</p>
        )}
      </div>
    </section>
  )
}
