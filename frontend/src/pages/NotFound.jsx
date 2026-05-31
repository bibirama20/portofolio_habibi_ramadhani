import { Link } from 'react-router-dom'
import { HiHome } from 'react-icons/hi'

export default function NotFound() {
  return (
    <section className="min-h-screen flex items-center justify-center section-padding">
      <div className="text-center animate-fade-in">
        <h1 className="text-8xl font-extrabold text-primary-600 dark:text-primary-400">404</h1>
        <h2 className="mt-4 text-2xl font-bold text-slate-800 dark:text-white">Halaman Tidak Ditemukan</h2>
        <p className="mt-2 text-slate-500 dark:text-slate-400">
          Halaman yang kamu cari tidak ada atau sudah dipindahkan.
        </p>
        <Link
          to="/"
          className="mt-8 inline-flex items-center gap-2 px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-xl transition-colors shadow-lg shadow-primary-600/20"
        >
          <HiHome size={18} /> Kembali ke Home
        </Link>
      </div>
    </section>
  )
}
