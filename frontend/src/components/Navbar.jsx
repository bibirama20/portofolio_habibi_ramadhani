import { useState, useEffect } from 'react'
import { HiMenu, HiX, HiSun, HiMoon } from 'react-icons/hi'
import { useTheme } from '../context/ThemeContext'
import { useActiveSection } from '../hooks/useActiveSection'
import { useFetch } from '../hooks/useFetch'

const NAV_ITEMS = [
  { id: 'home',         label: 'Home'         },
  { id: 'skills',       label: 'Skills'       },
  { id: 'projects',     label: 'Projects'     },
  { id: 'certificates', label: 'Certificates' },
  { id: 'education',    label: 'Education'    },
  { id: 'contact',      label: 'Contact'      },
]

const scrollTo = id =>
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })

export default function Navbar() {
  const { dark, toggle }        = useTheme()
  const [open, setOpen]         = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const active                  = useActiveSection(NAV_ITEMS.map(n => n.id))

  /* Fetch hanya untuk nama — browser cache, tidak ada request ulang */
  const { data: profile } = useFetch('/data/profile.json')
  const firstName = profile?.name ?? ''
  const initials  = firstName.charAt(0).toUpperCase()

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
      scrolled
        ? 'py-3 bg-white/80 dark:bg-[#02020a]/90 backdrop-blur-2xl border-b border-slate-200/50 dark:border-white/[0.06] shadow-lg shadow-black/5'
        : 'py-5 bg-transparent'
    }`}>
      <div className="container-max px-4 sm:px-6 lg:px-8 flex items-center justify-between">

        {/* Logo */}
        <button onClick={() => scrollTo('home')} className="flex items-center gap-2 group">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-[0_0_12px_rgba(99,102,241,0.5)] group-hover:shadow-[0_0_20px_rgba(99,102,241,0.7)] transition-shadow">
            <span className="text-white text-xs font-black leading-none">{initials}</span>
          </div>
          <span className="text-base font-black tracking-tight gradient-text">
            {firstName}<span className="text-slate-300 dark:text-slate-600">.</span>
          </span>
        </button>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV_ITEMS.map(item => (
            <button key={item.id} onClick={() => scrollTo(item.id)}
              className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                active === item.id
                  ? 'text-indigo-600 dark:text-indigo-400'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
              }`}>
              {active === item.id && (
                <span className="absolute inset-0 bg-indigo-50 dark:bg-indigo-500/10 rounded-lg" />
              )}
              <span className="relative">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button onClick={toggle} aria-label="Toggle theme"
            className="p-2.5 rounded-xl text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/[0.06] transition-colors">
            {dark ? <HiSun size={20} className="text-amber-400" /> : <HiMoon size={20} />}
          </button>
          <button onClick={() => setOpen(o => !o)} aria-label="Menu"
            className="md:hidden p-2.5 rounded-xl text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/[0.06] transition-colors">
            {open ? <HiX size={22} /> : <HiMenu size={22} />}
          </button>
        </div>
      </div>

      {open && (
        <div className={`md:hidden absolute inset-x-0 top-full backdrop-blur-xl border-b px-4 pb-5 pt-2 flex flex-col gap-1 animate-fade-in ${
          dark ? 'bg-[#02020a]/98 border-white/[0.06]' : 'bg-white/95 border-slate-200/50'
        }`}>
          {NAV_ITEMS.map(item => (
            <button key={item.id} onClick={() => { scrollTo(item.id); setOpen(false) }}
              className={`text-left px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                active === item.id
                  ? dark
                    ? 'bg-indigo-500/10 text-indigo-400'
                    : 'bg-indigo-50 text-indigo-600'
                  : dark
                    ? 'text-slate-300 hover:bg-white/[0.04]'
                    : 'text-slate-600 hover:bg-slate-50'
              }`}>
              {item.label}
            </button>
          ))}
        </div>
      )}
    </header>
  )
}
