import { HiAcademicCap, HiCalendar } from 'react-icons/hi'
import { useFetch } from '../hooks/useFetch'
import ErrorState from '../components/ErrorState'
import { useScrollReveal } from '../hooks/useScrollReveal'

export default function Education() {
  const { data, loading, error, retry } = useFetch('/data/education.json')
  const ref = useScrollReveal()

  return (
    <section id="education" className="section-wrap relative overflow-hidden">
      <div className="absolute top-0 -left-20 w-[400px] h-[400px] bg-sky-500/10 rounded-full blur-[100px] -z-10" />

      <div className="container-max max-w-3xl" ref={ref}>
        <div className="text-center mb-14 reveal">
          <div className="flex items-center justify-center gap-2 mb-3">
            <div className="h-px flex-1 max-w-[60px] bg-gradient-to-r from-transparent to-indigo-500/50" />
            <span className="section-tag">04 — Education</span>
            <div className="h-px flex-1 max-w-[60px] bg-gradient-to-l from-transparent to-indigo-500/50" />
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-slate-800 dark:text-white">
            <span className="gradient-text">Education</span> Path
          </h2>
          <p className="mt-3 text-slate-500 dark:text-slate-400 text-sm font-mono">
            <span className="text-emerald-400">// </span>riwayat pendidikan formal
          </p>
        </div>

        {loading && (
          <div className="space-y-6 animate-pulse">
            {[1,2].map(i => <div key={i} className="h-36 rounded-2xl bg-white/[0.05]" />)}
          </div>
        )}
        {error && <ErrorState message={error} onRetry={retry} />}

        {Array.isArray(data) && (
          <div className="relative">
            {/* Gradient timeline line */}
            <div className="absolute left-5 top-4 bottom-4 w-[2px] bg-gradient-to-b from-indigo-500 via-violet-500 to-fuchsia-500 rounded-full" />

            <div className="space-y-0">
              {data.map((edu, i) => (
                <div key={edu.id} className="relative flex gap-8 pb-10 last:pb-0 reveal"
                  style={{ transitionDelay: `${i * 150}ms` }}>
                  {/* Glow dot */}
                  <div className="relative z-10 shrink-0 mt-1">
                    <div className="glow-dot flex items-center justify-center">
                      <HiAcademicCap size={8} className="text-white" />
                    </div>
                  </div>

                  {/* Card */}
                  <div className="flex-1 glass-hover p-5 hover:shadow-[0_0_30px_rgba(99,102,241,0.15)] hover:-translate-y-1 transition-all duration-300">
                    <div className="flex items-center justify-between flex-wrap gap-2 mb-3">
                      <span className="flex items-center gap-1.5 text-xs font-semibold
                        text-indigo-600 dark:text-indigo-400
                        bg-indigo-50 dark:bg-indigo-500/10
                        px-3 py-1 rounded-full border border-indigo-100 dark:border-indigo-500/20">
                        <HiCalendar size={11} />
                        {edu.start_year} – {edu.end_year ?? 'Sekarang'}
                      </span>
                    </div>
                    <h3 className="font-black text-lg text-slate-800 dark:text-white">{edu.institution}</h3>
                    <p className="gradient-text font-semibold mt-0.5 text-sm">{edu.major}</p>
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
      </div>
    </section>
  )
}
