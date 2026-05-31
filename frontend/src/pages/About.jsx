import { HiLocationMarker, HiAcademicCap, HiCode, HiUser } from 'react-icons/hi'
import { useFetch } from '../hooks/useFetch'
import ProfileSkeleton from '../components/skeletons/ProfileSkeleton'
import ErrorState from '../components/ErrorState'
import SectionHeader from '../components/SectionHeader'

export default function About() {
  const { data: profile, loading, error, retry } = useFetch('/api/profile/')

  return (
    <section className="section-padding pt-24">
      <div className="container-max">
        <SectionHeader title="About Me" subtitle="Kenali saya lebih jauh." />

        {loading && <ProfileSkeleton />}
        {error   && <ErrorState message={error} onRetry={retry} />}
        {profile && (
          <div className="flex flex-col lg:flex-row items-center gap-12 animate-fade-in">
            {/* Photo */}
            <div className="shrink-0">
              <img
                src={profile.photo}
                alt={profile.name}
                className="w-56 h-56 rounded-2xl object-cover shadow-xl ring-4 ring-white dark:ring-slate-800"
              />
            </div>

            {/* Info */}
            <div className="flex-1 space-y-6">
              <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                {profile.summary}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { icon: <HiUser className="text-primary-500" size={20} />,          label: 'Nama',        value: profile.full_name },
                  { icon: <HiLocationMarker className="text-primary-500" size={20} />, label: 'Domisili',    value: profile.domicile },
                  { icon: <HiAcademicCap className="text-primary-500" size={20} />,    label: 'Pendidikan',  value: profile.education_summary },
                  { icon: <HiCode className="text-primary-500" size={20} />,           label: 'Bidang',      value: profile.field },
                ].map(item => (
                  <div key={item.label}
                    className="flex items-start gap-3 p-4 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700">
                    <div className="mt-0.5">{item.icon}</div>
                    <div>
                      <p className="text-xs text-slate-400 dark:text-slate-500 font-medium uppercase tracking-wide">{item.label}</p>
                      <p className="text-slate-700 dark:text-slate-200 font-semibold mt-0.5">{item.value}</p>
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
