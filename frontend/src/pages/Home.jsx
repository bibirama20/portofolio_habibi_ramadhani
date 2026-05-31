import { Link } from 'react-router-dom'
import { FaGithub, FaLinkedin, FaInstagram, FaWhatsapp } from 'react-icons/fa'
import { HiArrowRight } from 'react-icons/hi'
import { useFetch } from '../hooks/useFetch'
import ProfileSkeleton from '../components/skeletons/ProfileSkeleton'
import ErrorState from '../components/ErrorState'

export default function Home() {
  const { data: profile, loading, error, retry } = useFetch('/api/profile/')

  return (
    <section className="min-h-screen flex items-center section-padding pt-24">
      <div className="container-max w-full">
        {loading && <ProfileSkeleton />}
        {error   && <ErrorState message={error} onRetry={retry} />}
        {profile && (
          <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16 animate-fade-in">
            {/* Text side */}
            <div className="flex-1 order-2 md:order-1 text-center md:text-left">
              <span className="inline-block px-3 py-1 text-xs font-semibold tracking-widest text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-700/20 rounded-full mb-4 uppercase">
                Programmer & Web Developer
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-800 dark:text-white leading-tight">
                Hi, saya <span className="text-primary-600 dark:text-primary-400">{profile.name}</span>
              </h1>
              <p className="mt-5 text-lg text-slate-500 dark:text-slate-400 max-w-lg mx-auto md:mx-0 leading-relaxed">
                {profile.summary}
              </p>

              {/* Social links */}
              <div className="flex items-center gap-4 mt-6 justify-center md:justify-start">
                <a href={profile.github} target="_blank" rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-primary-100 dark:hover:bg-primary-700/30 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                  <FaGithub size={20} />
                </a>
                <a href={profile.linkedin} target="_blank" rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-primary-100 dark:hover:bg-primary-700/30 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                  <FaLinkedin size={20} />
                </a>
                <a href={profile.instagram_url} target="_blank" rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-primary-100 dark:hover:bg-primary-700/30 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                  <FaInstagram size={20} />
                </a>
                <a href={`https://wa.me/${profile.whatsapp}`} target="_blank" rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-primary-100 dark:hover:bg-primary-700/30 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                  <FaWhatsapp size={20} />
                </a>
              </div>

              {/* CTA buttons */}
              <div className="flex flex-wrap gap-3 mt-8 justify-center md:justify-start">
                <Link to="/projects"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-xl transition-colors shadow-lg shadow-primary-600/20">
                  Lihat Proyek <HiArrowRight size={18} />
                </Link>
                <Link to="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-semibold rounded-xl border border-slate-200 dark:border-slate-700 hover:border-primary-400 dark:hover:border-primary-500 transition-colors">
                  Hubungi Saya
                </Link>
              </div>
            </div>

            {/* Photo side */}
            <div className="order-1 md:order-2 shrink-0">
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary-400 to-primary-700 blur-2xl opacity-20 scale-110" />
                <img
                  src={profile.photo}
                  alt={profile.name}
                  className="relative w-48 h-48 sm:w-56 sm:h-56 lg:w-64 lg:h-64 rounded-full object-cover ring-4 ring-white dark:ring-slate-800 shadow-2xl"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
