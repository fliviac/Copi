import { Link, useParams } from 'react-router-dom'
import { useJournal } from '../journal/use-journal'
import { getMoodByLabel } from '../journal/moods'
import { formatDisplayDate } from '../utils/date'

/** View a single journal entry by its date. */
export const JournalDetailPage = () => {
  const { date } = useParams<{ date: string }>()
  const { state } = useJournal()

  if (state.status === 'loading') {
    return <p className="text-sm text-slate-500">Loading entry…</p>
  }

  if (state.status === 'error') {
    return (
      <p role="alert" className="text-sm text-red-600">
        {state.message}
      </p>
    )
  }

  const entry = state.entries.find((item) => item.date === date)

  if (!entry) {
    return (
      <div className="space-y-4">
        <p className="text-sm text-slate-500">No entry found for this date.</p>
        <Link
          to="/journals"
          className="inline-block rounded-lg px-4 py-2 text-sm font-medium text-indigo-600 transition-colors hover:bg-indigo-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
        >
          Back to My Journals
        </Link>
      </div>
    )
  }

  const mood = getMoodByLabel(entry.mood)

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-slate-900">
          {formatDisplayDate(entry.date)}
        </h1>
        <Link
          to={`/journals/${entry.date}/edit`}
          className="rounded-lg px-3 py-1.5 text-sm font-medium text-indigo-600 transition-colors hover:bg-indigo-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
        >
          Edit
        </Link>
      </div>

      <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <p className="flex items-center gap-2 text-lg font-semibold text-slate-900">
          <span aria-hidden="true" className="text-2xl">
            {mood?.emoji ?? '🙂'}
          </span>
          {mood?.label ?? entry.mood}
        </p>
        <p className="mt-4 whitespace-pre-line text-sm leading-relaxed text-slate-700">
          {entry.text}
        </p>
      </article>

      <Link
        to="/journals"
        className="inline-block text-sm font-medium text-slate-500 hover:text-slate-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded"
      >
        Back to My Journals
      </Link>
    </div>
  )
}
