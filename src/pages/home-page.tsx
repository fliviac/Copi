import { Link } from 'react-router-dom'
import { useJournal } from '../journal/use-journal'
import { getMoodByLabel } from '../journal/moods'
import { todayKey } from '../utils/date'
import { JournalForm } from '../journal/components/journal-form'
import { EmptyState } from '../journal/components/empty-state'

/** Home: today's summary, a quick-add form, and a link to all journals. */
export const HomePage = () => {
  const { state, saveEntry } = useJournal()
  const today = todayKey()

  if (state.status === 'loading') {
    return <p className="text-sm text-slate-500">Loading your journal…</p>
  }

  if (state.status === 'error') {
    return (
      <p role="alert" className="text-sm text-red-600">
        {state.message}
      </p>
    )
  }

  const todayEntry = state.entries.find((entry) => entry.date === today)
  const todayMood = todayEntry ? getMoodByLabel(todayEntry.mood) : undefined

  return (
    <div className="space-y-8">
      <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <h1 className="text-xl font-semibold text-slate-900">
          Today&apos;s summary
        </h1>
        {todayEntry ? (
          <div className="mt-3 space-y-2">
            <p className="flex items-center gap-2 text-lg font-semibold text-slate-900">
              <span aria-hidden="true" className="text-2xl">
                {todayMood?.emoji ?? '🙂'}
              </span>
              {todayMood?.label ?? todayEntry.mood}
            </p>
            <p className="text-sm text-slate-600">{todayEntry.text}</p>
            <Link
              to={`/journals/${today}`}
              className="inline-block rounded text-sm font-medium text-indigo-600 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
            >
              View today&apos;s entry
            </Link>
          </div>
        ) : (
          <p className="mt-3 text-sm text-slate-500">
            No entry yet for today. Capture how you&apos;re feeling below.
          </p>
        )}
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-slate-900">Quick add</h2>
        <JournalForm
          initial={{ date: today, mood: '', text: '' }}
          submitLabel={todayEntry ? 'Update today' : 'Save today'}
          onSubmit={async (payload) => {
            await saveEntry(payload)
          }}
        />
      </section>

      {state.entries.length === 0 && (
        <EmptyState
          title="Your journal is empty"
          description="Start by writing your first entry above."
        />
      )}
    </div>
  )
}
