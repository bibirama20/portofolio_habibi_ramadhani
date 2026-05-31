import { HiLocationMarker, HiAcademicCap, HiCode, HiUser } from 'react-icons/hi'
import { useFetch } from '../hooks/useFetch'
import ErrorState from '../components/ErrorState'
import { useScrollReveal } from '../hooks/useScrollReveal'

const INFO_CARDS = [
  { key: 'full_name',          icon: <HiUser size={20} />,            label: 'Nama'       },
  { key: 'domicile',           icon: <HiLocationMarker size={20} />,  label: 'Domisili'   },
  { key: 'education_summary',  icon: <HiAcademicCap size={20} />,     label: 'Pendidikan' },
  { key: 'field',              icon: <HiCode size={20} />,            label: 'Bidang'     },
]

function AboutSkeleton() {
  return (
    <div className="animate-pulse flex flex-col lg:flex-row gap-12">
      <div className="w-56 h-56 rounded-2xl bg-white/10 shrink-0 mx-auto" />
      <div className="flex-1 space-y-4">
        <div className="h-4 w-full bg-white/10 rounded" />
        <div className="h-4 w-5/6 bg-white/10 rounded" />
        <div className="h-4 w-4/6 bg-white/10 rounded" />
        <div className="grid grid-cols-2 gap-4 pt-4">
          {[1,2,3,4].map(i => <div key={i} className="h-20 bg-white/10 rounded-xl" />)}
        </div>
      </div>
    </div>
  )
}

export default function About() {
  const { data: p, loading, error, retry } = useFetch('/api/profile/')
  const ref = useScrollReveal()

  return (
    <section id="about" className="section-wrap relative overflow-hidden">
      {/* Subtle accent blob */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-violet-500/10 rounded-full blur-[100px] -z-10" />

      <div className="container-max" ref={ref}>
        {/* Header */}
        <div className="text-center mb-14 reveal">
          <span className="section-tag">About</span>
          <h2 className="mt-4 text-3xl md:text-4xl font-black text-slate-800 dark:text-white">
            Siapa <span className="gradient-text">Saya?</span>
          </h2>
        </div>

        {loading && <AboutSkeleton />}
        {error   && <ErrorState message={error} onRetry={retry} />}

        {p && (
          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Photo */}
            <div className="reveal shrink-0">
              <div className="relative p-[2px] rounded-2xl bg-gradient-to-br from-indigo-400 to-violet-500 shadow-glow-sm">
                <img
                  src={p.photo}
                  alt={p.name}
                  className="w-52 h-52 rounded-2xl object-cover bg-slate-900"
                />
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 space-y-6">
              <p className="reveal text-slate-600 dark:text-slate-300 leading-relaxed text-base md:text-lg">
                {p.summary}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {INFO_CARDS.map((card, i) => (
                  <div
                    key={card.key}
                    className={`reveal reveal-delay-${i + 1} glass-hover p-4 flex items-start gap-3`}
                  >
                    <div className="p-2 rounded-lg bg-gradient-to-br from-indigo-500/20 to-violet-500/20 text-indigo-500 dark:text-indigo-400 shrink-0">
                      {card.icon}
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">{card.label}</p>
                      <p className="mt-0.5 font-semibold text-slate-700 dark:text-slate-200">{p[card.key]}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
