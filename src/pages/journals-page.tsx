import { useState } from 'react'
import { useJournal } from '../journal/use-journal'
import { JournalEntryCard } from '../journal/components/journal-entry-card'
import { EmptyState } from '../journal/components/empty-state'

/** My Journals: list all entries with open and delete actions. */
export const JournalsPage = () => {
  const { state, removeEntry } = useJournal()
  const [confirmingDate, setConfirmingDate] = useState<string | null>(null)

  if (state.status === 'loading') {
    return <p className="text-sm text-slate-500">Loading your journals…</p>
  }

  if (state.status === 'error') {
    return (
      <p role="alert" className="text-sm text-red-600">
        {state.message}
      </p>
    )
  }

  const handleDelete = async (date: string) => {
    await removeEntry(date)
    setConfirmingDate(null)
  }

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold text-slate-900">My Journals</h1>

      {state.entries.length === 0 ? (
        <EmptyState
          title="No entries yet"
          description="Your past journal entries will appear here."
        />
      ) : (
        <div className="space-y-3">
          {state.entries.map((entry) => (
            <div key={entry.date} className="space-y-2">
              <JournalEntryCard
                entry={entry}
                onDelete={() => setConfirmingDate(entry.date)}
              />
              {confirmingDate === entry.date && (
                <div className="flex items-center gap-3 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm">
                  <span className="text-red-700">
                    Delete this entry? This can&apos;t be undone.
                  </span>
                  <button
                    type="button"
                    onClick={() => void handleDelete(entry.date)}
                    className="rounded-lg bg-red-600 px-3 py-1.5 font-medium text-white transition-colors hover:bg-red-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
                  >
                    Delete
                  </button>
                  <button
                    type="button"
                    onClick={() => setConfirmingDate(null)}
                    className="rounded-lg px-3 py-1.5 font-medium text-slate-600 transition-colors hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
