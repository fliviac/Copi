import { useState } from 'react'
import type { FormEvent } from 'react'
import { MoodPicker } from './mood-picker'
import type { JournalEntryPayload } from '../types'

type JournalFormProps = {
  /** Initial values; when provided the form edits an existing entry. */
  initial?: JournalEntryPayload
  /** Submit label, e.g. "Save entry" or "Update entry". */
  submitLabel: string
  onSubmit: (payload: JournalEntryPayload) => Promise<void>
  onCancel?: () => void
}

/** Controlled form for creating or updating a journal entry. */
export const JournalForm = ({
  initial,
  submitLabel,
  onSubmit,
  onCancel,
}: JournalFormProps) => {
  const [date, setDate] = useState(initial?.date ?? '')
  const [mood, setMood] = useState(initial?.mood ?? '')
  const [text, setText] = useState(initial?.text ?? '')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!date || !mood || !text.trim()) {
      setError('Please choose a date, a mood, and write a few words.')
      return
    }
    setSubmitting(true)
    setError(null)
    try {
      await onSubmit({ date, mood, text: text.trim() })
    } catch {
      setError('Something went wrong saving your entry. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
    >
      <div className="space-y-1.5">
        <label
          htmlFor="journal-date"
          className="block text-sm font-medium text-slate-700"
        >
          Date
        </label>
        <input
          id="journal-date"
          type="date"
          value={date}
          onChange={(event) => setDate(event.target.value)}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
        />
      </div>

      <div className="space-y-1.5">
        <span className="block text-sm font-medium text-slate-700">Mood</span>
        <MoodPicker value={mood} onChange={setMood} />
      </div>

      <div className="space-y-1.5">
        <label
          htmlFor="journal-text"
          className="block text-sm font-medium text-slate-700"
        >
          Journal
        </label>
        <textarea
          id="journal-text"
          rows={5}
          value={text}
          onChange={(event) => setText(event.target.value)}
          placeholder="How was your day?"
          className="w-full resize-y rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
        />
      </div>

      {error && (
        <p role="alert" className="text-sm text-red-600">
          {error}
        </p>
      )}

      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={submitting}
          className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? 'Saving…' : submitLabel}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg px-4 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  )
}
