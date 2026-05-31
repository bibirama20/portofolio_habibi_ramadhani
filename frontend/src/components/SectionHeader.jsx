export default function SectionHeader({ title, subtitle }) {
  return (
    <div className="text-center mb-12">
      <h2 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
          {subtitle}
        </p>
      )}
      <div className="mt-4 mx-auto w-16 h-1 bg-primary-600 rounded-full" />
    </div>
  )
}
