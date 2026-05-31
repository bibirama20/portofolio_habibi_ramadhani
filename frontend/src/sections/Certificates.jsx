import { HiOfficeBuilding, HiCalendar, HiPhotograph, HiBadgeCheck } from 'react-icons/hi'
import { useFetch } from '../hooks/useFetch'
import ErrorState from '../components/ErrorState'
import { useScrollReveal } from '../hooks/useScrollReveal'

const GRADIENTS = [
  'from-indigo-500 to-violet-600',
  'from-violet-500 to-fuchsia-600',
  'from-sky-500 to-indigo-600',
  'from-emerald-500 to-teal-600',
]

function CertCard({ cert, index }) {
  return (
    <div className="reveal group glass-hover overflow-hidden
      hover:-translate-y-2 hover:shadow-[0_8px_40px_rgba(99,102,241,0.18)] transition-all duration-300">
      {/* Gradient top bar */}
      <div className={`h-1 bg-gradient-to-r ${GRADIENTS[index % GRADIENTS.length]}`} />

      {/* Image */}
      <div className="relative h-44 overflow-hidden bg-slate-100 dark:bg-slate-800/50">
        <img src={cert.image} alt={cert.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={e => { e.currentTarget.style.display = 'none'; e.currentTarget.nextElementSibling.style.display = 'flex' }} />
        <div className="absolute inset-0 hidden items-center justify-center flex-col gap-2 text-slate-400">
          <HiPhotograph size={36} /><span className="text-xs">Gambar tidak tersedia</span>
        </div>
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className={`absolute bottom-3 right-3 p-1.5 rounded-lg bg-gradient-to-br ${GRADIENTS[index % GRADIENTS.length]}
          opacity-0 group-hover:opacity-100 transition-opacity duration-300`}>
          <HiBadgeCheck size={14} className="text-white" />
        </div>
      </div>

      <div className="p-5">
        <h3 className="font-bold text-sm text-slate-800 dark:text-white leading-snug mb-3
          group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
          {cert.title}
        </h3>
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <HiOfficeBuilding size={12} /><span>{cert.issuer}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-400 dark:text-slate-500">
            <HiCalendar size={12} /><span>{cert.year}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Certificates() {
  const { data, loading, error, retry } = useFetch('/data/certificates.json')
  const ref = useScrollReveal()

  return (
    <section id="certificates" className="section-wrap relative overflow-hidden">
      <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-violet-500/10 rounded-full blur-[120px] -z-10" />

      <div className="container-max" ref={ref}>
        <div className="text-center mb-14 reveal">
          <div className="flex items-center justify-center gap-2 mb-3">
            <div className="h-px flex-1 max-w-[60px] bg-gradient-to-r from-transparent to-indigo-500/50" />
            <span className="section-tag">03 — Certificates</span>
            <div className="h-px flex-1 max-w-[60px] bg-gradient-to-l from-transparent to-indigo-500/50" />
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-slate-800 dark:text-white">
            My <span className="gradient-text">Certificates</span>
          </h2>
          <p className="mt-3 text-slate-500 dark:text-slate-400 text-sm">
            Sertifikat kompetensi — dari AI/ML hingga DevOps.
          </p>
        </div>

        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 animate-pulse">
            {[1,2,3,4].map(i => <div key={i} className="h-72 rounded-2xl bg-white/[0.05]" />)}
          </div>
        )}
        {error && <ErrorState message={error} onRetry={retry} />}

        {Array.isArray(data) && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
            {data.map((cert, i) => <CertCard key={cert.id} cert={cert} index={i} />)}
          </div>
        )}
      </div>
    </section>
  )
}
