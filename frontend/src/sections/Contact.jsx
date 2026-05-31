import { FaWhatsapp, FaInstagram, FaGithub, FaLinkedin } from 'react-icons/fa'
import { HiMail, HiArrowRight } from 'react-icons/hi'
import { useFetch } from '../hooks/useFetch'
import ErrorState from '../components/ErrorState'
import { useScrollReveal } from '../hooks/useScrollReveal'
import NeuralBg from '../components/NeuralBg'

const CONTACT_CFG = [
  { key: 'whatsapp',  label: 'WhatsApp',  Icon: FaWhatsapp,  gradient: 'from-emerald-400 to-green-500',           glow: 'hover:shadow-[0_0_25px_rgba(52,211,153,0.25)]',  getHref: p => `https://wa.me/${p.whatsapp}`,                getDisplay: p => p.whatsapp_display },
  { key: 'instagram', label: 'Instagram', Icon: FaInstagram, gradient: 'from-pink-500 via-rose-500 to-orange-400', glow: 'hover:shadow-[0_0_25px_rgba(236,72,153,0.25)]',  getHref: p => p.instagram_url,                              getDisplay: p => `@${p.instagram}`  },
  { key: 'github',    label: 'GitHub',    Icon: FaGithub,    gradient: 'from-slate-500 to-slate-700',              glow: 'hover:shadow-[0_0_25px_rgba(100,116,139,0.25)]', getHref: p => p.github,                                     getDisplay: p => p.github_username  },
  { key: 'linkedin',  label: 'LinkedIn',  Icon: FaLinkedin,  gradient: 'from-sky-500 to-blue-600',                 glow: 'hover:shadow-[0_0_25px_rgba(14,165,233,0.25)]',  getHref: p => p.linkedin.startsWith('http') ? p.linkedin : `https://${p.linkedin}`, getDisplay: p => { const m = p.linkedin.match(/linkedin\.com\/in\/([^/?]+)/); return m ? m[1] : p.linkedin } },
  { key: 'email',     label: 'Email',     Icon: HiMail,      gradient: 'from-indigo-500 to-violet-600',            glow: 'hover:shadow-[0_0_25px_rgba(99,102,241,0.25)]',  getHref: p => `mailto:${p.email}`,                          getDisplay: p => p.email },
]

export default function Contact() {
  const { data: p, loading, error, retry } = useFetch('/data/profile.json')
  const ref = useScrollReveal()

  return (
    <section id="contact" className="section-wrap relative overflow-hidden">
      {/* Neural network in background — very faint */}
      <NeuralBg className="opacity-[0.08] dark:opacity-[0.12]" />
      <div className="absolute -bottom-20 -right-20 w-[500px] h-[500px] bg-indigo-500/15 rounded-full blur-[130px] -z-10" />
      <div className="absolute -top-20 left-1/3 w-[300px] h-[300px] bg-violet-500/10 rounded-full blur-[100px] -z-10" />

      <div className="container-max max-w-3xl" ref={ref}>
        <div className="text-center mb-14 reveal">
          <div className="flex items-center justify-center gap-2 mb-3">
            <div className="h-px flex-1 max-w-[60px] bg-gradient-to-r from-transparent to-indigo-500/50" />
            <span className="section-tag">05 — Contact</span>
            <div className="h-px flex-1 max-w-[60px] bg-gradient-to-l from-transparent to-indigo-500/50" />
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-slate-800 dark:text-white">
            Let's <span className="gradient-text">Connect</span>
          </h2>
          <p className="mt-3 text-slate-500 dark:text-slate-400 text-sm max-w-sm mx-auto">
            Tertarik bekerja sama atau sekadar ngobrol tentang web development &amp; tech?
          </p>
        </div>

        {loading && (
          <div className="animate-pulse grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[1,2,3,4,5].map(i => <div key={i} className="h-20 rounded-2xl bg-white/[0.05]" />)}
          </div>
        )}
        {error && <ErrorState message={error} onRetry={retry} />}

        {p && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {CONTACT_CFG.map((cfg, i) => {
              const Icon = cfg.Icon
              return (
                <a key={cfg.key} href={cfg.getHref(p)} target="_blank" rel="noopener noreferrer"
                  className={`reveal group glass-hover flex items-center gap-4 p-5
                    ${cfg.glow} hover:-translate-y-1 transition-all duration-300`}
                  style={{ transitionDelay: `${i * 70}ms` }}>
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${cfg.gradient} shadow-lg shrink-0
                    group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}>
                    <Icon size={20} className="text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-0.5">{cfg.label}</p>
                    <p className="font-semibold text-slate-700 dark:text-slate-200 truncate
                      group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors text-sm">
                      {cfg.getDisplay(p)}
                    </p>
                  </div>
                  <HiArrowRight size={14} className="text-slate-300 dark:text-slate-600
                    group-hover:text-indigo-400 group-hover:translate-x-1 transition-all duration-200 shrink-0" />
                </a>
              )
            })}
          </div>
        )}

        {/* Footer line */}
        <div className="reveal mt-20 border-t border-slate-200 dark:border-white/[0.06] pt-8
          flex flex-col sm:flex-row items-center justify-between gap-4
          text-xs text-slate-400 dark:text-slate-500 font-mono">
          <p>
            <span className="text-emerald-400">// </span>
            © {new Date().getFullYear()} <span className="gradient-text font-bold">Habibi</span> — Built with React &amp; Django
          </p>
          <p className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Powered by spirit &amp; caffeine
          </p>
        </div>
      </div>
    </section>
  )
}
