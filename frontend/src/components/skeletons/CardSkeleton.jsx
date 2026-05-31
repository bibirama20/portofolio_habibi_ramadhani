export default function CardSkeleton({ count = 3, showImage = true }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="animate-pulse rounded-2xl bg-white dark:bg-slate-800 overflow-hidden shadow-sm">
          {showImage && (
            <div className="h-44 bg-slate-200 dark:bg-slate-700" />
          )}
          <div className="p-5 space-y-3">
            <div className="h-5 bg-slate-200 dark:bg-slate-700 rounded w-3/4" />
            <div className="space-y-2">
              <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-full" />
              <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-5/6" />
            </div>
            <div className="flex gap-2 pt-1">
              <div className="h-6 w-16 bg-slate-200 dark:bg-slate-700 rounded-full" />
              <div className="h-6 w-16 bg-slate-200 dark:bg-slate-700 rounded-full" />
              <div className="h-6 w-16 bg-slate-200 dark:bg-slate-700 rounded-full" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
