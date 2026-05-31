export default function SkillsSkeleton() {
  return (
    <div className="animate-pulse space-y-8">
      <div>
        <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded w-32 mb-4" />
        <div className="flex flex-wrap gap-3">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="h-9 bg-slate-200 dark:bg-slate-700 rounded-lg"
              style={{ width: `${60 + Math.random() * 40}px` }} />
          ))}
        </div>
      </div>
      <div>
        <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded w-32 mb-4" />
        <div className="flex flex-wrap gap-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-9 bg-slate-200 dark:bg-slate-700 rounded-full"
              style={{ width: `${80 + Math.random() * 60}px` }} />
          ))}
        </div>
      </div>
    </div>
  )
}
