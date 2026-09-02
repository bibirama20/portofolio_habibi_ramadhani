import { FaGithub, FaLinkedin, FaInstagram, FaWhatsapp } from 'react-icons/fa'
import { HiArrowDown, HiArrowRight, HiChip } from 'react-icons/hi'
import { useFetch } from '../hooks/useFetch'
import { useTypewriter } from '../hooks/useTypewriter'
import NeuralBg from '../components/NeuralBg'
import ErrorState from '../components/ErrorState'

const ROLES = [
  'Programmer & Web Developer',
]

const INFO_PILLS = [
  { label: 'Django',      dot: 'bg-emerald-400' },
  { label: 'React',       dot: 'bg-sky-400'     },
  { label: 'Laravel',     dot: 'bg-rose-400'    },
  { label: 'Web Dev',     dot: 'bg-violet-400'  },
]

function HeroSkeleton() {
  return (
    <div className="animate-pulse flex flex-col md:flex-row items-center gap-12">
      <div className="flex-1 space-y-5">
        {[28, 64, 40, 32, 48].map((w, i) => (
          <div key={i} className={`h-${i === 1 ? 16 : i === 2 ? 8 : 4} w-${w === 64 ? '4/5' : w + '[%]'} bg-white/[0.07] rounded-xl`} />
        ))}
      </div>
      <div className="w-64 h-64 rounded-full bg-white/[0.07]" />
    </div>
  )
}

export default function Hero() {
  const { data: p, loading, error, retry } = useFetch('/data/profile.json')
  const role = useTypewriter(ROLES)

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">

      {/* ── Neural network background ── */}
      <NeuralBg className="opacity-[0.18] dark:opacity-[0.22]" />

      {/* ── Gradient blobs ── */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute -top-32 -left-32 w-[600px] h-[600px] bg-indigo-600/25 rounded-full blur-[130px] animate-blob" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-violet-600/20 rounded-full blur-[120px] animate-blob-slow" style={{ animationDelay: '4s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-[350px] h-[350px] bg-cyan-600/10 rounded-full blur-[90px] animate-blob" style={{ animationDelay: '7s' }} />
        {/* Subtle grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(99,102,241,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(99,102,241,0.05)_1px,transparent_1px)] bg-[size:3.5rem_3.5rem]" />
      </div>

      <div className="container-max section-wrap pt-28 w-full">
        {loading && <HeroSkeleton />}
        {error   && <ErrorState message={error} onRetry={retry} />}

        {p && (
          <div className="flex flex-col-reverse md:flex-row items-center gap-10 md:gap-16 animate-fade-up">

            {/* ── Left: Text ── */}
            <div className="flex-1 text-center md:text-left space-y-7">

              {/* AI badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full
                bg-gradient-to-r from-indigo-500/10 to-violet-500/10
                border border-indigo-500/20 backdrop-blur-sm">
                <HiChip size={14} className="text-indigo-400 animate-pulse" />
                <span className="text-xs font-bold tracking-widest uppercase text-indigo-400">
                  Programmer &amp; Web Developer
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              </div>

              {/* Name */}
              <div>
                <p className="text-slate-500 dark:text-slate-400 font-mono text-sm mb-2 tracking-wider">
                  <span className="text-indigo-400">&gt;</span> hello_world.py
                </p>
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.05]">
                  <span className="block text-slate-800 dark:text-white">I'm</span>
                  <span className="gradient-text block">{p.name}</span>
                </h1>
              </div>

              {/* Typewriter role */}
              <div className="h-8 flex items-center justify-center md:justify-start">
                <span className="font-mono text-base sm:text-lg text-slate-600 dark:text-slate-300">
                  <span className="text-violet-400">{'{ '}</span>
                  <span className="text-cyan-400">{role}</span>
                  <span className="inline-block w-0.5 h-5 bg-cyan-400 ml-1 align-middle animate-pulse" />
                  <span className="text-violet-400">{' }'}</span>
                </span>
              </div>

              {/* Summary */}
              <p className="text-slate-500 dark:text-slate-400 max-w-lg mx-auto md:mx-0 leading-relaxed">
                {p.summary}
              </p>

              {/* Tech pills */}
              <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                {INFO_PILLS.map(pill => (
                  <span key={pill.label}
                    className="flex items-center gap-1.5 px-3 py-1 text-xs font-semibold
                      bg-slate-100 dark:bg-white/[0.05] text-slate-600 dark:text-slate-300
                      border border-slate-200 dark:border-white/[0.08] rounded-full">
                    <span className={`w-1.5 h-1.5 rounded-full ${pill.dot}`} />
                    {pill.label}
                  </span>
                ))}
              </div>

              {/* Social */}
              <div className="flex items-center gap-3 justify-center md:justify-start">
                {[
                  { href: p.github,        Icon: FaGithub,    label: 'GitHub'    },
                  { href: p.linkedin.startsWith('http') ? p.linkedin : `https://${p.linkedin}`, Icon: FaLinkedin, label: 'LinkedIn' },
                  { href: p.instagram_url, Icon: FaInstagram, label: 'Instagram' },
                  { href: `https://wa.me/${p.whatsapp}`, Icon: FaWhatsapp, label: 'WhatsApp' },
                ].map(({ href, Icon, label }) => (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                    aria-label={label}
                    className="p-2.5 rounded-xl glass-hover text-slate-500 dark:text-slate-400
                      hover:text-indigo-600 dark:hover:text-indigo-400">
                    <Icon size={18} />
                  </a>
                ))}
              </div>

              {/* CTA */}
              <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                <button onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                  className="btn-primary">
                  View Projects <HiArrowRight size={16} />
                </button>
                <button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className="btn-outline">
                  Contact Me
                </button>
              </div>
            </div>

            {/* ── Right: Photo ── */}
            <div className="shrink-0">
              <div className="relative">
                {/* Rotating gradient ring */}
                <div className="absolute -inset-3 rounded-full bg-gradient-to-br from-indigo-500 via-violet-500 to-cyan-500 opacity-40 blur-lg animate-spin-slow" />
                {/* Photo border */}
                <div className="relative p-[3px] rounded-full bg-gradient-to-br from-indigo-400 via-violet-500 to-cyan-400">
                  <img src={p.photo} alt={p.name}
                    className="w-52 h-52 sm:w-60 sm:h-60 lg:w-72 lg:h-72 rounded-full object-cover bg-slate-900" />
                </div>
                {/* Floating "Open to Work" */}
                <div className="absolute -bottom-3 -right-4 glass flex items-center gap-2 px-3 py-2 animate-float shadow-[0_0_20px_rgba(99,102,241,0.2)]">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs font-semibold text-slate-700 dark:text-slate-200">Open to Work</span>
                </div>
                {/* Floating "Web Dev" badge */}
                <div className="absolute -top-3 -left-4 glass flex items-center gap-1.5 px-3 py-2 animate-float shadow-[0_0_20px_rgba(139,92,246,0.2)]" style={{ animationDelay: '1.5s' }}>
                  <HiChip size={13} className="text-violet-400" />
                  <span className="text-xs font-semibold gradient-text">Web Developer</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Scroll down */}
        {!loading && !error && (
          <button onClick={() => document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' })}
            className="hidden md:flex absolute bottom-10 left-1/2 -translate-x-1/2 flex-col items-center gap-1.5
              text-slate-400 hover:text-indigo-400 transition-colors animate-float">
            <span className="text-[10px] font-mono tracking-widest uppercase">scroll</span>
            <HiArrowDown size={16} />
          </button>
        )}
      </div>
    </section>
  )
}
