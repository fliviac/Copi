import { Link } from 'react-router-dom'
import { getMoodByLabel } from '../moods'
import { formatDisplayDate } from '../../utils/date'
import type { JournalEntry } from '../types'

type JournalEntryCardProps = {
  entry: JournalEntry
  onDelete?: (date: string) => void
}

/** A single journal entry shown in the list. */
export const JournalEntryCard = ({
  entry,
  onDelete,
}: JournalEntryCardProps) => {
  const mood = getMoodByLabel(entry.mood)

  return (
    <article className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-sm font-medium text-slate-500">
            {formatDisplayDate(entry.date)}
          </p>
          <p className="mt-1 flex items-center gap-2 text-sm font-semibold text-slate-900">
            <span aria-hidden="true" className="text-lg">
              {mood?.emoji ?? '🙂'}
            </span>
            {mood?.label ?? entry.mood}
          </p>
          <p className="mt-2 line-clamp-3 text-sm text-slate-600">
            {entry.text}
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <Link
            to={`/journals/${entry.date}`}
            className="rounded-lg px-3 py-1.5 text-sm font-medium text-indigo-600 transition-colors hover:bg-indigo-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
          >
            Open
          </Link>
          {onDelete && (
            <button
              type="button"
              onClick={() => onDelete(entry.date)}
              className="rounded-lg px-3 py-1.5 text-sm font-medium text-red-600 transition-colors hover:bg-red-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
            >
              Delete
            </button>
          )}
        </div>
      </div>
    </article>
  )
}
