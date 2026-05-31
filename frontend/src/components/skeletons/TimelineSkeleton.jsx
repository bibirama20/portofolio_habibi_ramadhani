export default function TimelineSkeleton({ count = 2 }) {
  return (
    <div className="space-y-6">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="animate-pulse flex gap-4">
          <div className="flex flex-col items-center">
            <div className="w-4 h-4 rounded-full bg-slate-200 dark:bg-slate-700 mt-1 shrink-0" />
            {i < count - 1 && <div className="w-0.5 flex-1 bg-slate-200 dark:bg-slate-700 mt-2" />}
          </div>
          <div className="flex-1 pb-6 space-y-3">
            <div className="h-5 bg-slate-200 dark:bg-slate-700 rounded w-2/3" />
            <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/3" />
            <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-full" />
            <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-4/5" />
          </div>
        </div>
      ))}
    </div>
  )
}
