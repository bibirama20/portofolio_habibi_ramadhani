import { HiOfficeBuilding, HiCalendar, HiPhotograph } from 'react-icons/hi'
import { useFetch } from '../hooks/useFetch'
import CardSkeleton from '../components/skeletons/CardSkeleton'
import ErrorState from '../components/ErrorState'
import SectionHeader from '../components/SectionHeader'

function CertCard({ cert }) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
      {/* Certificate image */}
      <div className="relative h-44 bg-slate-100 dark:bg-slate-700 overflow-hidden">
        <img
          src={cert.image}
          alt={cert.title}
          className="w-full h-full object-cover"
          onError={e => { e.currentTarget.style.display = 'none'; e.currentTarget.nextElementSibling.style.display = 'flex' }}
        />
        <div className="absolute inset-0 hidden items-center justify-center text-slate-400 dark:text-slate-500 flex-col gap-2">
          <HiPhotograph size={36} />
          <span className="text-xs">Gambar tidak tersedia</span>
        </div>
      </div>

      <div className="p-5">
        <h3 className="font-bold text-slate-800 dark:text-white text-base leading-snug">{cert.title}</h3>
        <div className="flex items-center gap-1.5 mt-2 text-sm text-slate-500 dark:text-slate-400">
          <HiOfficeBuilding size={14} /> {cert.issuer}
        </div>
        <div className="flex items-center gap-1.5 mt-1.5 text-sm text-slate-400 dark:text-slate-500">
          <HiCalendar size={14} /> {cert.year}
        </div>
      </div>
    </div>
  )
}

export default function Certificates() {
  const { data, loading, error, retry } = useFetch('/api/certificates/')

  return (
    <section className="section-padding pt-24">
      <div className="container-max">
        <SectionHeader
          title="Certificates"
          subtitle="Sertifikat kompetensi yang saya miliki."
        />

        {loading && <CardSkeleton count={4} />}
        {error   && <ErrorState message={error} onRetry={retry} />}
        {data?.certificates && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 animate-fade-in">
            {data.certificates.map(cert => (
              <CertCard key={cert.id} cert={cert} />
            ))}
          </div>
        )}
        {data?.certificates?.length === 0 && (
          <p className="text-center text-slate-400 py-12">Belum ada sertifikat tersedia.</p>
        )}
      </div>
    </section>
  )
}
