import { Link } from 'react-router-dom'

type EmptyStateProps = {
  title: string
  description: string
}

/** Friendly placeholder shown when there is no content yet. */
export const EmptyState = ({ title, description }: EmptyStateProps) => {
  return (
    <div className="rounded-xl border border-dashed border-slate-300 bg-white p-10 text-center">
      <p className="text-base font-semibold text-slate-900">{title}</p>
      <p className="mt-1 text-sm text-slate-500">{description}</p>
      <Link
        to="/journals/new"
        className="mt-4 inline-block rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
      >
        Write your first entry
      </Link>
    </div>
  )
}
