export default function ProfileSkeleton() {
  return (
    <div className="animate-pulse flex flex-col md:flex-row items-center gap-10">
      <div className="w-48 h-48 rounded-full bg-slate-200 dark:bg-slate-700 shrink-0" />
      <div className="flex-1 space-y-4 w-full">
        <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/4" />
        <div className="h-10 bg-slate-200 dark:bg-slate-700 rounded w-3/4" />
        <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded w-2/4" />
        <div className="space-y-2 pt-2">
          <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-full" />
          <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-5/6" />
          <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-4/6" />
        </div>
        <div className="flex gap-3 pt-2">
          <div className="h-10 w-32 bg-slate-200 dark:bg-slate-700 rounded-lg" />
          <div className="h-10 w-32 bg-slate-200 dark:bg-slate-700 rounded-lg" />
        </div>
      </div>
    </div>
  )
}
