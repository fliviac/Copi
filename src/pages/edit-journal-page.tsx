import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useJournal } from '../journal/use-journal'
import { getEntryByDate } from '../journal/journal.service'
import { JournalForm } from '../journal/components/journal-form'
import type { JournalEntryPayload } from '../journal/types'

/** Edit an existing journal entry by its date. */
export const EditJournalPage = () => {
  const { date } = useParams<{ date: string }>()
  const { saveEntry } = useJournal()
  const navigate = useNavigate()
  const [initial, setInitial] = useState<JournalEntryPayload | null>(null)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    if (!date) return
    let cancelled = false
    void getEntryByDate(date).then((entry) => {
      if (cancelled) return
      if (entry) {
        setInitial({ date: entry.date, mood: entry.mood, text: entry.text })
      } else {
        setNotFound(true)
      }
    })
    return () => {
      cancelled = true
    }
  }, [date])

  if (notFound) {
    return (
      <div className="space-y-4">
        <p className="text-sm text-slate-500">No entry found to edit.</p>
        <Link
          to="/journals"
          className="inline-block rounded-lg px-4 py-2 text-sm font-medium text-indigo-600 transition-colors hover:bg-indigo-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
        >
          Back to My Journals
        </Link>
      </div>
    )
  }

  if (!initial) {
    return <p className="text-sm text-slate-500">Loading entry…</p>
  }

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold text-slate-900">Edit entry</h1>
      <JournalForm
        initial={initial}
        submitLabel="Save changes"
        onSubmit={async (payload) => {
          await saveEntry(payload)
          navigate(`/journals/${payload.date}`)
        }}
        onCancel={() => navigate(`/journals/${initial.date}`)}
      />
    </div>
  )
}
