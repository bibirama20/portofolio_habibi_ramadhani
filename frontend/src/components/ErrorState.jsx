import { HiExclamationCircle, HiRefresh } from 'react-icons/hi'

export default function ErrorState({ message = 'Gagal memuat data', onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-4 text-center animate-fade-in">
      <HiExclamationCircle size={48} className="text-red-400" />
      <div>
        <p className="font-semibold text-slate-700 dark:text-slate-300">Terjadi Kesalahan</p>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{message}</p>
      </div>
      {onRetry && (
        <button
          onClick={onRetry}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-lg transition-colors"
        >
          <HiRefresh size={16} /> Coba Lagi
        </button>
      )}
    </div>
  )
}
