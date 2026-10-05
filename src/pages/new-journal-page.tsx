import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useJournal } from '../journal/use-journal'
import { getEntryByDate } from '../journal/journal.service'
import { todayKey } from '../utils/date'
import { JournalForm } from '../journal/components/journal-form'
import type { JournalEntryPayload } from '../journal/types'

/**
 * Add New Journal: create an entry, or update it when the chosen date
 * already has one (one entry per calendar day).
 */
export const NewJournalPage = () => {
  const { saveEntry } = useJournal()
  const navigate = useNavigate()
  const [initial, setInitial] = useState<JournalEntryPayload>({
    date: todayKey(),
    mood: '',
    text: '',
  })
  const [existing, setExisting] = useState(false)

  // Load any existing entry for the selected date so the form can update it.
  useEffect(() => {
    let cancelled = false
    void getEntryByDate(initial.date).then((entry) => {
      if (cancelled) return
      if (entry) {
        setInitial({ date: entry.date, mood: entry.mood, text: entry.text })
        setExisting(true)
      }
    })
    return () => {
      cancelled = true
    }
  }, [initial.date])

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold text-slate-900">
        {existing ? 'Update entry' : 'Add new journal'}
      </h1>
      {existing && (
        <p className="text-sm text-slate-500">
          An entry already exists for this date. Saving will update it.
        </p>
      )}
      <JournalForm
        key={initial.date}
        initial={initial}
        submitLabel={existing ? 'Update entry' : 'Save entry'}
        onSubmit={async (payload) => {
          await saveEntry(payload)
          navigate(`/journals/${payload.date}`)
        }}
        onCancel={() => navigate('/journals')}
      />
    </div>
  )
}
