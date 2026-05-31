import { FaWhatsapp, FaInstagram, FaGithub, FaLinkedin } from 'react-icons/fa'
import { HiMail } from 'react-icons/hi'
import { useFetch } from '../hooks/useFetch'
import ErrorState from '../components/ErrorState'
import SectionHeader from '../components/SectionHeader'

const contactConfig = [
  {
    key:   'whatsapp',
    label: 'WhatsApp',
    icon:  <FaWhatsapp size={26} />,
    color: 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400',
    hover: 'hover:border-green-400 dark:hover:border-green-500',
    getHref:    p => `https://wa.me/${p.whatsapp}`,
    getDisplay: p => p.whatsapp_display,
  },
  {
    key:   'instagram',
    label: 'Instagram',
    icon:  <FaInstagram size={26} />,
    color: 'bg-pink-50 dark:bg-pink-900/20 text-pink-600 dark:text-pink-400',
    hover: 'hover:border-pink-400 dark:hover:border-pink-500',
    getHref:    p => p.instagram_url,
    getDisplay: p => `@${p.instagram}`,
  },
  {
    key:   'github',
    label: 'GitHub',
    icon:  <FaGithub size={26} />,
    color: 'bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-200',
    hover: 'hover:border-slate-400 dark:hover:border-slate-500',
    getHref:    p => p.github,
    getDisplay: p => p.github_username,
  },
  {
    key:   'linkedin',
    label: 'LinkedIn',
    icon:  <FaLinkedin size={26} />,
    color: 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400',
    hover: 'hover:border-blue-400 dark:hover:border-blue-500',
    getHref:    p => p.linkedin,
    getDisplay: p => p.linkedin.replace('https://linkedin.com/in/', ''),
  },
  {
    key:   'email',
    label: 'Email',
    icon:  <HiMail size={26} />,
    color: 'bg-primary-50 dark:bg-primary-700/20 text-primary-600 dark:text-primary-400',
    hover: 'hover:border-primary-400 dark:hover:border-primary-500',
    getHref:    p => `mailto:${p.email}`,
    getDisplay: p => p.email,
  },
]

function ContactSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 animate-pulse">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="h-28 bg-slate-200 dark:bg-slate-700 rounded-2xl" />
      ))}
    </div>
  )
}

export default function Contact() {
  const { data: profile, loading, error, retry } = useFetch('/api/profile/')

  return (
    <section className="section-padding pt-24">
      <div className="container-max max-w-3xl">
        <SectionHeader
          title="Contact"
          subtitle="Mari terhubung! Pilih cara yang paling nyaman untuk menghubungi saya."
        />

        {loading && <ContactSkeleton />}
        {error   && <ErrorState message={error} onRetry={retry} />}
        {profile && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-fade-in">
            {contactConfig.map(cfg => (
              <a
                key={cfg.key}
                href={cfg.getHref(profile)}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-4 p-5 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 ${cfg.hover} transition-all hover:shadow-md hover:-translate-y-0.5 group`}
              >
                <div className={`p-3 rounded-xl ${cfg.color} shrink-0`}>
                  {cfg.icon}
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">{cfg.label}</p>
                  <p className="font-semibold text-slate-700 dark:text-slate-200 mt-0.5 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                    {cfg.getDisplay(profile)}
                  </p>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
